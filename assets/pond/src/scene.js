import {dropsIntoField} from './field-contact.js';
import { initDrawing } from './drawing.js';
import { imageRippleContours } from './image-ripples.js';
import { prepareImages } from './images.js';
import { capture, captureReady } from './silhouettes.js';
import { objectWave, drawDrop, drawWake } from './waves.js';
import { clickShapes, footprintRadius } from './ripple-geometry.js';
import { objectPositions, backgroundOffset } from './layout.js';
import { initDragging } from './dragging.js';
import { initSwimmers } from './swimmers.js';
import { initCurrents } from './currents.js';
import {interactionRegion,mobileItemAllowed} from './mobile-policy.js';

export function initPond() {
    'use strict';
    var scene = document.querySelector('.water-scene');
    if (!scene) return;
    var canvas = scene.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var floats = Array.from(document.querySelectorAll('.water-float'));
    var pictures = prepareImages(Array.from(document.querySelectorAll('.index-profile-img, .publicationImg')));
    var drops = [], wake = [], frame = 0, lastFrame = 0, stroke = 0;
    var width = 0, height = 0, scrollFrame = 0, scrollTimer = 0, ready = false, onPage = true;
    let introBottom=0;
    const region=()=>interactionRegion(width,introBottom,window.scrollY);
    function syncRegion() {
        const area=region();scene.style.height=area.mobile?Math.min(height,area.visibleHeight)+'px':'';
        if(!area.active){interactions.cancel();reset();}
    }

    function running() { return ready && onPage && region().active && !reducedMotion.matches && !document.hidden; }
    function start() { if (!frame && running()) frame = requestAnimationFrame(draw); }
    function breakWake() { stroke++; }
    function updateObjects() {
        var content = document.querySelector('.water-content');
        var end = content.getBoundingClientRect().bottom + window.scrollY;
        introBottom=(document.querySelector('#publications')?.getBoundingClientRect().top||height)+window.scrollY-12;
        const readingRight=content.querySelector('table').getBoundingClientRect().right;
        document.querySelector('.water-objects').style.height = Math.floor(region().mobile?introBottom:end) + 'px';
        const ranks = ['water-float-one','water-float-four','water-currents','water-lotus','water-lorenz','water-fish-one','water-float-three','water-fish-two','water-float-two','water-float-five'];
        const rank = item => item.hasAttribute('data-water-slot') ? Number(item.dataset.waterSlot) : ranks.findIndex(name=>item.classList.contains(name));
        var order = floats.map((_,i)=>i).filter(i=>!floats[i].hasAttribute('data-water-companion')).sort((a,b)=>rank(floats[a])-rank(floats[b]));
        // Permanent places along the document: no swapping or vanishing on scroll.
        var positions = objectPositions(order.length, height, end);
        order.forEach(function (index, position) {
            var item = floats[index];
            if (item && positions[position] === undefined) { item.hidden = true; return; }
            if (item) item.hidden = false;
            if (!item) return;
            if (item.classList.contains('water-placed')) {
                item.style.top=Math.min(parseFloat(item.style.top)||0,end-item.offsetHeight-4)+'px';
                item.style.left=Math.max(0,Math.min(width-item.offsetWidth,parseFloat(item.style.left)||0))+'px';
                return;
            }
            item.style.top = positions[position] + 'px';
            if(item.classList.contains('water-currents')) item.style.right=Math.max(8,(width-readingRight-item.offsetWidth)/2)+'px';
            if (item.hasAttribute('data-water-slot')) item.style.setProperty('--water-home-top', item.style.top);
            item.classList.add('water-visible');
        });
        document.dispatchEvent(new Event('pond:layout'));
        syncRegion();
    }
    function reset() {
        cancelAnimationFrame(frame);
        frame = 0;
        drops.length = 0;
        wake.length = 0;
        ctx.clearRect(0, 0, width, height);
        floats.forEach(function (item) { item.firstElementChild.style.transform = ''; });
    }
    function syncMotion() {
        interactions.cancel();
        reset();
        document.body.classList.toggle('water-running', running());
    }
    function resize() {
        interactions.cancel();
        width = document.documentElement.clientWidth;
        height = window.innerHeight;
        var scale = Math.min(window.devicePixelRatio || 1, 1.5, 2200 / Math.max(width, height));
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        // Reset moved pieces only on width changes (not mobile browser-bar changes).
        if (resize.previousWidth !== width) {
            floats.concat(pictures).forEach(interactions.home);
            resize.previousWidth = width;
        }
        reset();
        updateObjects();
    }
    function drop(x, y, radius, contours) {
        if (!running()) return;
        if (drops.length >= 32) drops.shift();
        drops.push({ x: x, y: y + window.scrollY, start: performance.now(), seed: Math.random() * 6,
            radius: radius || 2, wave: contours ? objectWave(contours) : null, shape: clickShapes[0] });
        start();
    }
    function dropObject(item) {
        if (!running() || dropsIntoField(item)) return;
        capture(item).then(function (contours) {
            var rect = item.getBoundingClientRect();
            var point = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            drop(point.x, point.y, 2, imageRippleContours(item,contours));
        });
    }
    function addWake(x, y, item) {
        if (!running()) return;
        const outline = item && captureReady(item)?.flat();
        if (outline?.length) {
            x = (Math.min(...outline.map(p=>p[0]))+Math.max(...outline.map(p=>p[0])))/2;
            y = (Math.min(...outline.map(p=>p[1]))+Math.max(...outline.map(p=>p[1])))/2-window.scrollY;
        }
        var now = performance.now(), last = wake[wake.length - 1];
        const direction = last ? [x-last.x,y+window.scrollY-last.y] : [0,1];
        const radius = outline ? footprintRadius(outline,[x,y+window.scrollY],direction) : 0;
        if (last && last.stroke === stroke) {
            var distance = Math.hypot(x - last.x, y + window.scrollY - last.y);
            if (now - last.start < 28 || distance < 6) return;
            if (now - last.start > 180 || distance > 150) breakWake();
        }
        if (wake.length >= 400) wake.shift();
        wake.push({ x: x, y: y + window.scrollY, start: now, stroke: stroke, radius: radius, lifetime: item ? 1.8 : 10 });
        start();
    }
    function draw(now) {
        frame = 0;
        if (!running()) return;
        if (now - lastFrame < 1000 / 30) { start(); return; }
        lastFrame = now;
        ctx.clearRect(0, 0, width, height);
        wake = wake.filter(function (p) { return now - p.start < (p.lifetime || 1.8)*1000; });
        drops = drops.filter(function (p) { return now - p.start < 3000; });
        drawWake(ctx, wake, now, window.scrollY);
        drops.forEach(splash => drawDrop(ctx, splash, (now - splash.start) / 1000, window.scrollY));
        floats.forEach(function (item) {
            if (!item.classList.contains('water-visible') || item.classList.contains('water-grabbed')) return;
            var rect = item.getBoundingClientRect(), bob = 0;
            drops.forEach(function (splash) {
                var distance = Math.hypot(rect.left + rect.width / 2 - splash.x,
                    (rect.top + rect.height / 2 + window.scrollY - splash.y) / .78);
                var age = (now - splash.start) / 1000;
                var wave = splash.radius + age * 78 - distance;
                if (wave > 0 && wave < 90) bob += Math.sin(wave / 90 * Math.PI * 2) * 2 * (1 - age / 3);
            });
            bob = Math.max(-3, Math.min(3, bob));
            item.firstElementChild.style.transform = bob ? 'translateY(' + bob + 'px) rotate(' + bob * 2 + 'deg)' : '';
        });
        if (wake.length || drops.length) start();
    }
    window.addEventListener('scroll', function () {
        breakWake();
        if (scrollFrame) return;
        scrollFrame = requestAnimationFrame(function () {
            scrollFrame = 0;
            syncRegion();
            if (!running()) return;
            scene.querySelector('.water-contours').style.translate = '0 ' + backgroundOffset(window.scrollY) + 'px';
            floats.forEach(function (item, i) {
                if (!item.classList.contains('water-placed') && !item.classList.contains('water-swimmer')) item.style.setProperty('--scroll-drift',
                    Math.sin(window.scrollY * .0015 + i) * 10 + 'px');
            });
            document.body.classList.add('water-scrolling');
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () { document.body.classList.remove('water-scrolling'); }, 700);
        });
    }, { passive: true });
    reducedMotion.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    window.addEventListener('pagehide', function () { onPage = false; syncMotion(); });
    window.addEventListener('pageshow', function () { onPage = true; syncMotion(); });
    window.addEventListener('resize', resize, { passive: true });
    function reveal() {
        resize();
        ready = true;
        document.body.classList.add('pond-ready');
        syncMotion();
        document.dispatchEvent(new Event('pond:ready'));
    }
    const interactions = initDragging({ floats, pictures, dropObject, addWake, breakWake, onHome: updateObjects,
        canDrag:item=>mobileItemAllowed(width,introBottom,window.scrollY,item.classList.contains('water-profile-frame')||item.classList.contains('water-mobius-ball')),
        boundsFor:()=>region().mobile?{left:0,right:width,top:0,bottom:introBottom-window.scrollY}:null });
    initSwimmers();
    initCurrents();
    initDrawing({onStart:breakWake, onEnd:breakWake,
        canDraw:event=>!region().mobile||(region().active&&event.clientY+window.scrollY<introBottom),
        onClick:(x,y)=>drop(x,y,2), onMove:(x,y)=>addWake(x,y)});
    resize();
    let contentHeight=0;
    new ResizeObserver(entries=>{
        const next=entries[0].contentRect.height;
        if(Math.abs(next-contentHeight)>1) {contentHeight=next;updateObjects();}
    }).observe(document.querySelector('.water-content'));
    if (document.readyState === 'complete') reveal();
    else window.addEventListener('load', reveal, { once: true });
}
