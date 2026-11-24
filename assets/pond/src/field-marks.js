import {warmGradient} from './flow-color.js';
import { curvePoints } from './curves.js';
import { flowPath } from './current-flow.js';
const ns='http://www.w3.org/2000/svg';
const lengths=new WeakMap();
function pathLength(points) {
    if(!lengths.has(points))lengths.set(points,points.reduce((length,p,i)=>length+(i?Math.hypot(p[0]-points[i-1][0],p[1]-points[i-1][1]):0),0));
    return lengths.get(points);
}
export function pointAlong(points,fraction) {
    const distances=[0];
    for(let i=1;i<points.length;i++)distances.push(distances.at(-1)+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
    const target=((fraction%1)+1)%1*distances.at(-1);
    let index=1;while(index<distances.length-1&&distances[index]<target)index++;
    const a=points[index-1],b=points[index],t=(target-distances[index-1])/(distances[index]-distances[index-1]||1);
    return {x:a[0]+(b[0]-a[0])*t,y:a[1]+(b[1]-a[1])*t,angle:Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI};
}
export function fieldMarks(svg,{tracers=1,showTracks=false,speed=35,trackWidth=.7}={}) {
    const colors=['#d86779','#648ba5'],warm=showTracks?warmGradient(svg):null;
    const tracks=Array.from({length:showTracks?tracers:0},(_,i)=>{
        const path=document.createElementNS(ns,'path');path.setAttribute('fill','none');path.setAttribute('stroke',i===0?warm:colors[i]);path.setAttribute('stroke-width',trackWidth);path.setAttribute('opacity','.8');svg.append(path);return path;
    });
    const particles=Array.from({length:tracers},(_,i)=>{const particle=document.createElementNS(ns,'circle');particle.setAttribute('r','1.7');particle.setAttribute('fill',colors[i]);svg.append(particle);return particle;});
    return (paths,time,top=0,tracerPaths=[])=>{
        particles.forEach((particle,i)=>{
            const points=paths[Math.floor(paths.length/2)];
            const line=curvePoints(tracerPaths[i]||points);
            if(tracks[i])tracks[i].setAttribute('d',flowPath(line,top));
            const p=pointAlong(line,time*speed/pathLength(line)+i*.4);
            particle.setAttribute('cx',p.x);particle.setAttribute('cy',p.y-top);
        });
    };
}
