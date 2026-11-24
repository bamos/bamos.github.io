import {prepare,captureReady} from './silhouettes.js';
import {silhouetteBody} from './obstacle-shape.js';

// All fields share visible, pond-relative object boundaries. A not-yet-decoded
// object is skipped for a frame instead of opening a spurious circular hole.
export function fieldObstacles(pond,excluded=[]) {
    return {
        read(region) {
            const origin=pond.getBoundingClientRect();
            const objects=[...pond.querySelectorAll('.water-float:not([data-pond-stationary])'),...document.querySelectorAll('.water-image-frame.water-placed')];
            const pieces=[];
            for(const item of objects) {
                if(excluded.includes(item)||item.hidden||getComputedStyle(item).display==='none')continue;
                const r=(item.querySelector('svg,img')||item).getBoundingClientRect(),reach=Math.max(r.width,r.height)*2;
                if(r.right-origin.left+reach<region.left||r.left-origin.left-reach>region.right||r.bottom-origin.top+reach<region.top||r.top-origin.top-reach>region.bottom)continue;
                let body;
                if(item.matches('.water-currents,.water-lorenz-ball,.water-mobius-ball')) {
                    body={x:r.left+r.width/2-origin.left,y:r.top+r.height/2-origin.top,radius:Math.min(r.width,r.height)*.4375};
                }else {
                    prepare(item);
                    const contours=captureReady(item);if(!contours)continue;
                    body=silhouetteBody(contours.map(line=>line.map(([x,y])=>[x-origin.left,y-origin.top-window.scrollY])));
                }
                if(body)pieces.push({element:item,body});
            }
            return {obstacles:pieces.map(p=>p.body),pieces};
        },destroy(){}
    };
}
