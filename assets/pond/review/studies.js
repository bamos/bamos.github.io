import {createAttractorRenderer} from '../src/attractor-renderer.js';
import {attractorDefinition} from '../src/attractors.js';
import {mountTrailOptions} from './trail-options.js';
import { pieceSnapshot } from '../src/snapshots.js';
import { prepare } from '../src/silhouettes.js';
import { clickShapes } from '../src/ripple-geometry.js';
import { objectWave, drawDrop, drawWake } from '../src/waves.js';
import { mountCurrent } from '../src/currents.js';
import { mountSwimmer } from '../src/swimmers.js';
import { initDragging } from '../src/dragging.js';
import { createLorenzRenderer } from '../src/lorenz.js';

const group = document.querySelector('#group'), age = document.querySelector('#age'), seed = document.querySelector('#seed');
const fixtures = [...document.querySelectorAll('#fixtures .water-float, #fixtures img')];
const prepared = new Map(), snapshots = new Map(), cards = [];
let frame = 0, live = [];
createLorenzRenderer(document.querySelector('#fixtures .water-lorenz svg'))(8);
for(const field of document.querySelectorAll('#fixtures [data-attractor]'))createAttractorRenderer(field.querySelector('svg'),attractorDefinition(field.dataset.attractor))(8);
const started = performance.now();
for (const item of fixtures) {
    const shape = await prepare(item);
    if (shape?.contours.length) { prepared.set(item, shape); snapshots.set(item,await pieceSnapshot(item,{width:420,height:290,size:Math.min(shape.source.getBoundingClientRect().width,96),imageWidth:210,imageHeight:160})); }
}
const failed = fixtures.filter(item => !prepared.has(item));
const status = document.querySelector('#status');
status.dataset.failures = failed.length;
status.textContent = `${prepared.size}/${fixtures.length} silhouettes ready · ${Math.round(performance.now() - started)} ms · ${failed.length ? 'Failed: ' + failed.map(item => item.ariaLabel || item.alt).join(', ') : 'same renderer as the site'}`;

function card(label, render) {
    const figure = document.createElement('figure'), canvas = document.createElement('canvas'), caption = document.createElement('figcaption');
    canvas.width = 420; canvas.height = 290;
    canvas.setAttribute('aria-label', label); canvas.setAttribute('role', 'img');
    caption.textContent = label; figure.append(canvas, caption); document.querySelector('#studies').append(figure);
    cards.push({ ctx: canvas.getContext('2d'), render });
}
function draw() {
    const time = Number(age.value), variation = Number(seed.value);
    document.querySelector('#time').value = `${time.toFixed(2)} s`;
    for (const { ctx, render } of cards) { ctx.clearRect(0, 0, 420, 290); render(ctx, time, variation); }
}
function rebuild() {
    cancelAnimationFrame(frame); live.forEach(controller=>controller.destroy()); live=[]; cards.length = 0; document.querySelector('#studies').replaceChildren();
    if(group.value==='Trail options')live.push(mountTrailOptions(document.querySelector('#studies'),snapshots.get(document.querySelector('#fixtures .water-float-one'))));
    if (group.value === 'Clicks') clickShapes.forEach(shape => card(shape, (ctx, time, seed) => drawDrop(ctx, { shape, seed, x:210, y:145 }, time)));
    if (group.value === 'Wakes') for (const kind of ['Straight sweep', 'Broad curve', 'Turn and lift']) {
        card(kind, (ctx, time) => {
            const wake = Array.from({ length:50 }, (_, i) => ({ x:45 + i * 6.3, y:kind === 'Straight sweep' ? 145 : 145 + Math.sin(i / 10) * 50,
                stroke:kind === 'Turn and lift' && i > 26 ? 1 : 0, start:i * 28 }));
            drawWake(ctx, wake, 1400 + time * 250);
        });
    }
    if (group.value === 'Objects' || group.value === 'Images') {
        for (const item of fixtures.filter(item => (item.tagName === 'IMG') === (group.value === 'Images'))) {
            const shape = prepared.get(item); if (!shape) continue;
            card(item.ariaLabel || item.alt,snapshots.get(item));
        }
    }
    const interactive = ['Currents','Chrome','Fish'].includes(group.value);
    age.disabled=interactive||group.value==='Trail options'; document.querySelector('#play').disabled=age.disabled;
    if (interactive) {
        const figure=document.createElement('figure'), pond=document.createElement('div'), caption=document.createElement('figcaption');
        pond.className='pond-demo pond-ready water-running'; pond.setAttribute('data-pond-bounds','');
        const selectors=['Currents','Chrome'].includes(group.value)?['.water-currents']:['.water-fish-one','.water-fish-two'];
        const floats=selectors.map((selector,i)=>{
            const item=document.querySelector('#fixtures '+selector).cloneNode(true);
            item.classList.add('water-visible'); item.style.left=(['Currents','Chrome'].includes(group.value)?260:25+i*85)+'px'; item.style.top=(['Currents','Chrome'].includes(group.value)?180:85+i*65)+'px'; item.style.right='auto';
            if(group.value==='Chrome'){item.style.width=item.style.height='170px';item.style.left='130px';item.style.top='125px';item.style.opacity='1';}
            item.dataset.swimSeed=Number(seed.value)+i*179;
            pond.append(item); return item;
        });
        caption.textContent=['Currents','Chrome'].includes(group.value)?'Drag the sphere to redirect the flowing stream.':'Drag to pause; drop to resume. The fish swim in their own directions.';
        figure.append(pond,caption); document.querySelector('#studies').append(figure);
        initDragging({floats,pictures:[],dropObject:()=>{},addWake:()=>{},breakWake:()=>{},onHome:()=>document.dispatchEvent(new Event('pond:layout'))});
        live=floats.map(item=>['Currents','Chrome'].includes(group.value)?mountCurrent(item,{ready:()=>true}):mountSwimmer(item,{ready:()=>true}));
    }
    draw();
}
for (const control of [age, seed]) control.addEventListener('input', draw);
group.addEventListener('change', rebuild);
document.querySelector('#play').addEventListener('click', () => {
    cancelAnimationFrame(frame); const start = performance.now();
    function tick(now) { age.value = Math.min(2.8, .12 + (now - start) / 1000); draw(); if (Number(age.value) < 2.8) frame = requestAnimationFrame(tick); }
    frame = requestAnimationFrame(tick);
});
document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(frame); });
const requested=new URLSearchParams(location.search).get('study');
if([...group.options].some(option=>option.value===requested))group.value=requested;
rebuild();
