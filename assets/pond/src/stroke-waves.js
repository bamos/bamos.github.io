import {prepareTrail,paintTrail,defaultTrailStyle} from './trails.js';

export const strokeLifetime=10;
export function strokeProfile(age) {
    const t=Math.max(0,Math.min(1,age/strokeLifetime));
    return {distance:60*t,opacity:.23*(1-t)**1.2,alive:age<strokeLifetime};
}
export function createStrokeWave(points) {return {points:prepareTrail(points)};}
export function drawStrokeWave(ctx,wave,age,scrollY=0,style=defaultTrailStyle) {
    if(!strokeProfile(age).alive)return;
    paintTrail(ctx,wave.points,wave.points.map(()=>Math.max(0,age)),{lifetime:strokeLifetime,scrollY,style});
}
