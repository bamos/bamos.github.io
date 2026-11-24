import {fishPose} from './swimmer-motion.js';

// Expose the shared symbol's parts on each fish. Animating a <use> shadow tree
// via CSS was unreliable, and continued independently of the swimming clock.
export function articulateFish(svg) {
    const use=svg.querySelector('use');
    if(use) {
        const symbol=document.querySelector(use.getAttribute('href'));
        const body=document.createElementNS('http://www.w3.org/2000/svg','g');
        body.classList.add('water-fish-body');
        body.append(...[...symbol.children].map(part=>part.cloneNode(true)));
        use.replaceWith(body);
    }
    const body=svg.querySelector('.water-fish-body'),tail=svg.querySelector('.water-fish-tail'),fin=svg.querySelector('.water-fish-fin');
    return (time,phase)=>{
        const pose=fishPose(time,phase);
        body?.setAttribute('transform',`rotate(${pose.body} 52 24)`);
        tail?.setAttribute('transform',`rotate(${pose.tail} 25 24)`);
        fin?.setAttribute('transform',`rotate(${pose.fin} 44 24)`);
    };
}
