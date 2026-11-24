import {registerField} from './field-contact.js';
import {warmGradient} from './flow-color.js';
import { currentFlow, flowPath, currentHeading } from './current-flow.js';
import { visibleLoop } from './visible-loop.js';
import { fieldObstacles } from './field-obstacles.js';
import { fieldMarks } from './field-marks.js';
import { driftPieces } from './current-drift.js';

const ns = 'http://www.w3.org/2000/svg';
function path(stroke, width, opacity = 1) {
    const node = document.createElementNS(ns, 'path');
    node.setAttribute('fill','none'); node.setAttribute('stroke',stroke);
    node.setAttribute('stroke-width',width); node.setAttribute('opacity',opacity);
    node.setAttribute('stroke-linecap','round'); return node;
}

export function createCurrentRenderer(svg) {
    const warm=warmGradient(svg);
    const lines = Array.from({length:25},(_,i) => path(i === 12 ? warm : '#756187',i === 12 ? 2.2 : .75));
    const streaks = [2,6,10,14,18,22].map(i => {
        const node = path(i === 14 ? '#a55d85' : '#756686',1.15,.65);
        node.setAttribute('stroke-dasharray','5 82'); svg.append(node); return {i,node};
    });
    svg.prepend(...lines);
    const marks=fieldMarks(svg);
    let key='',flow,paths;
    return (input,time=0) => {
        const next=JSON.stringify(input);
        if(next!==key){
            flow=currentFlow(input);key=next;
            svg.setAttribute('viewBox',`0 0 ${input.width} ${Math.max(1,flow.bottom-flow.top)}`);
            paths=flow.paths.map(points=>flowPath(points,flow.top));
            lines.forEach((line,i)=>line.setAttribute('d',paths[i]));
            streaks.forEach(({i,node})=>node.setAttribute('d',paths[i]));
        }
        streaks.forEach(({i,node})=>node.setAttribute('stroke-dashoffset',String(-time*35-i*9)));
        marks(flow.paths,time,flow.top);
        return flow;
    };
}

// Shared by the homepage and interactive review. Pond-relative coordinates
// keep scrolling from detaching the ball from the water.
export function mountCurrent(pebble, options = {}) {
    const pond = pebble.parentElement, stream = document.createElement('div');
    stream.className = 'water-current-stream'; stream.setAttribute('aria-hidden','true');
    const svg=document.createElementNS(ns,'svg');
    stream.append(svg);pebble.before(stream);
    const contact=registerField(pond,stream);
    const draw=createCurrentRenderer(svg);
    const contacts=fieldObstacles(pond,[pebble]);
    let anchorY = null, anchorInset = null;
    function geometry() {
        const parent = pond.getBoundingClientRect(), rect = pebble.querySelector('svg').getBoundingClientRect();
        return { width:pond.clientWidth, height:pond.clientHeight,
            ball:{x:rect.left + rect.width/2 - parent.left, y:rect.top + rect.height/2 - parent.top, radius:Math.min(rect.width,rect.height)*.4375} };
    }
    function render({time,dt=0}) {
        const input = geometry();
        if (!input.width || !input.height) return;
        if (anchorY === null) { anchorY = input.ball.y; anchorInset = input.width-input.ball.x; }
        const neighbors=contacts.read({left:input.width-anchorInset-100,right:input.width,top:anchorY-240,bottom:anchorY+240});
        const flow = draw({...input,obstacles:neighbors.obstacles,anchorX:input.width-anchorInset,anchorY},time);
        contact.update(flow.paths);
        driftPieces(neighbors.pieces,flow.paths,dt,y=>currentHeading({...input,anchorX:input.width-anchorInset,anchorY},y));
        stream.style.top = `${flow.top}px`; stream.style.height = `${Math.max(1,flow.bottom-flow.top)}px`;
    }
    const loop = visibleLoop(stream,render,options);
    const move = () => loop.invalidate();
    const layout = () => { if (!pebble.classList.contains('water-placed')) anchorY = null; loop.invalidate(); };
    pebble.addEventListener('pond:move',move);
    document.addEventListener('pond:layout',layout);
    layout();
    return { render, layout, destroy() { contact.destroy(); contacts.destroy(); loop.destroy(); pebble.removeEventListener('pond:move',move); document.removeEventListener('pond:layout',layout); stream.remove(); } };
}

export function initCurrents() {
    const pebble = document.querySelector('.water-currents');
    if (pebble) return mountCurrent(pebble);
}
