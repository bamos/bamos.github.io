import {visibleLoop} from './visible-loop.js';
import {createSwimmer,advanceSwimmer,grabSwimmer,releaseSwimmer,swimmerHeading} from './swimmer-motion.js';
import {bounceContacts,obstacleReader} from './collisions.js';
import {articulateFish} from './fish-articulation.js';

export function mountSwimmer(element,options={}) {
    const pond=element.parentElement,svg=element.querySelector('.water-object'),pose=articulateFish(svg);
    element.classList.add('water-swimmer');
    const obstacles=obstacleReader(pond,element);
    let state=null,loop;
    function position(){const r=element.getBoundingClientRect(),p=pond.getBoundingClientRect();return {x:r.left-p.left,y:r.top-p.top};}
    function bounds(y) {
        const span=Math.min(150,innerHeight*.2),bottom=Math.max(0,pond.clientHeight-element.offsetHeight-8);
        return {left:8,right:Math.max(8,pond.clientWidth-element.offsetWidth-8),top:Math.max(8,y-span),bottom:Math.min(bottom,y+span)};
    }
    function layout() {
        const p=position();
        if(!state)state=createSwimmer(Number(element.dataset.swimSeed)||Math.floor(Math.random()*1e8),p.x,p.y,bounds(p.y));
        else releaseSwimmer(state,p.x,p.y,bounds(p.y));
        state.width=element.offsetWidth;state.height=element.offsetHeight;state.radius=Math.min(state.width,state.height)*.28;
        loop?.invalidate();
    }
    function render({dt}) {
        if(!state||!pond.clientHeight)return;
        advanceSwimmer(state,dt);
        if(dt&&!state.held)bounceContacts(state,obstacles.read(state));
        if(!state.held){element.style.left=`${state.x}px`;element.style.right='auto';element.style.top=`${state.y}px`;}
        svg.style.rotate=`${swimmerHeading(state)}deg`;
        pose(state.elapsed,state.phase);
    }
    const grab=()=>{if(state)grabSwimmer(state);loop.hold(true);};
    const release=()=>{const p=position();if(state)releaseSwimmer(state,p.x,p.y,bounds(p.y));loop.hold(false);};
    const move=()=>{if(state&&!state.held)release();};
    loop=visibleLoop(element,render,options);
    const listeners=[[element,'pond:grab',grab],[element,'pond:release',release],[element,'pond:move',move],[document,'pond:layout',layout]];
    listeners.forEach(([target,event,handler])=>target.addEventListener(event,handler));layout();
    return {destroy(){loop.destroy();obstacles.destroy();listeners.forEach(([target,event,handler])=>target.removeEventListener(event,handler));}};
}
export function initSwimmers() {
    return [...document.querySelectorAll('.water-fish-one,.water-fish-two')].map(element=>mountSwimmer(element));
}
