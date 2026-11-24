import {smoothPath,pathNormals,offsetTrail} from './path-smoothing.js';

export const trailStyles={
    soft:{title:'Soft wake',width:1.4,halo:7,alpha:.23,glow:.018,spread:1},
    silk:{title:'Silk ribbon',width:4.4,halo:12,alpha:.09,glow:.014,spread:.65},
    quiet:{title:'Quiet line',width:.85,halo:0,alpha:.27,glow:0,spread:.35}
};
export const defaultTrailStyle='silk';
export function prepareTrail(points){return smoothPath(points,{spacing:3,passes:12});}

function ribbon(ctx,points,normals,widths,alpha,scrollY) {
    if(points.length<3||alpha<=0)return;
    ctx.beginPath();
    for(let side=1;side>=-1;side-=2)for(let n=0;n<points.length;n++) {
        const i=side===1?n:points.length-1-n,p=points[i],normal=normals[i],w=widths[i]*side/2;
        ctx[side===1&&n===0?'moveTo':'lineTo'](p[0]+normal[0]*w,p[1]+normal[1]*w-scrollY);
    }
    ctx.closePath();ctx.fillStyle=`rgba(61,121,135,${alpha})`;ctx.fill();
}

// A single tapered crest, never a closed outline around the drawn gesture.
// All layers share a centerline, so a soft highlight cannot become two bubbles.
export function paintTrail(ctx,points,ages,{lifetime=10,distance=age=>age*6,style=defaultTrailStyle,scrollY=0,side=1,alpha=1,footprint=false}={}) {
    if(points.length<3)return;
    const treatment=trailStyles[style]||trailStyles[defaultTrailStyle];
    const tapers=points.map((p,i)=>Math.sin(Math.PI*i/(points.length-1))**.7);
    const offsets=points.map((p,i)=>side*((footprint?p[3]||0:0)+distance(ages[i])*treatment.spread*tapers[i]));
    const center=offsetTrail(points,offsets),normals=pathNormals(center);
    const envelopes=ages.map((age,i)=>tapers[i]*Math.max(0,1-age/lifetime)**1.2);
    if(treatment.halo)ribbon(ctx,center,normals,envelopes.map(v=>v*treatment.halo),treatment.glow*alpha,scrollY);
    ribbon(ctx,center,normals,envelopes.map(v=>v*treatment.width),treatment.alpha*alpha,scrollY);
}

export function drawPointerWake(ctx,wake,now,scrollY=0,style=defaultTrailStyle) {
    const groups=[];
    for(const p of wake){if(!groups.length||groups.at(-1)[0].stroke!==p.stroke)groups.push([]);groups.at(-1).push(p);}
    for(const group of groups) {
        if(group.length<3)continue;
        const points=prepareTrail(group.map(p=>[p.x,p.y,p.start,p.radius||0]));
        const ages=points.map(p=>Math.max(0,(now-p[2])/1000));
        const object=points.some(p=>p[3]>2);
        const lifetime=group[0].lifetime||1.8;
        const options={lifetime,distance:age=>age*(object?9:6),style,scrollY,footprint:object};
        paintTrail(ctx,points,ages,options);
        if(object)paintTrail(ctx,points,ages,{...options,side:-1,alpha:.55});
    }
}
