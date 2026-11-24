import {smoothPath} from './path-smoothing.js';
export {drawPointerWake as drawWake} from './trails.js';
import { distanceField, contoursAt } from './distance-field.js';
import { clickContours, waveDistance, waveOpacity } from './ripple-geometry.js';

// Construct once per release, at bounded resolution. No image decoding happens
// in a frame. World coordinates keep a released wave attached while scrolling.
export function objectWave(contours) {
    const points = contours.flat(), padding = 84;
    const left = Math.min(...points.map(p => p[0])) - padding;
    const top = Math.min(...points.map(p => p[1])) - padding;
    const w = Math.max(...points.map(p => p[0])) - left + padding;
    const h = Math.max(...points.map(p => p[1])) - top + padding;
    const scale = Math.min(2, 384 / Math.max(w, h));
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(w * scale); canvas.height = Math.ceil(h * scale);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.beginPath();
    contours.forEach(points => {
        points.forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo']((x - left) * scale, (y - top) * scale));
        ctx.closePath();
    });
    ctx.fill('evenodd');
    const rgba = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const mask = new Uint8Array(canvas.width * canvas.height);
    for (let i = 0; i < mask.length; i++) mask[i] = rgba[i * 4 + 3] > 80;
    return { field: distanceField(mask, canvas.width, canvas.height), left, top, scale };
}

export function waveContours(wave, age) {
    const { field, left, top, scale } = wave;
    return contoursAt(field, Math.max(.6, waveDistance(age) * scale))
        .map(points => smoothPath(points.map(([x, y]) => [left + x / scale, top + y / scale]),{spacing:1.5,closed:true,passes:2}).slice(0,-1));
}

export function strokeContours(ctx, contours, alpha, scrollY = 0, smooth = true) {
    ctx.strokeStyle = `rgba(61,121,135,${alpha})`;
    ctx.lineWidth = 1.15; ctx.lineJoin = 'round';
    contours.forEach(points => {
        ctx.beginPath();
        if (smooth) {
            const last = points.at(-1), first = points[0];
            ctx.moveTo((last[0] + first[0]) / 2, (last[1] + first[1]) / 2 - scrollY);
            points.forEach((p, i) => {
                const next = points[(i + 1) % points.length];
                ctx.quadraticCurveTo(p[0], p[1] - scrollY, (p[0] + next[0]) / 2, (p[1] + next[1]) / 2 - scrollY);
            });
        } else points.forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo'](x, y - scrollY));
        ctx.closePath(); ctx.stroke();
    });
}

export function drawDrop(ctx, splash, age, scrollY = 0) {
    if (splash.wave) return strokeContours(ctx, waveContours(splash.wave, age), waveOpacity(age), scrollY);
    const radius = 3 + 65 * age;
    const contours = clickContours(splash.shape, splash.seed, age).map(points => points.map(([x, y]) => [splash.x + x * radius, splash.y + y * radius]));
    strokeContours(ctx, contours, waveOpacity(age), scrollY);
}
