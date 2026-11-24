import {registerField} from './field-contact.js';
import {bendField} from './field-bending.js';
import {fieldObstacles} from './field-obstacles.js';
import {fieldMarks} from './field-marks.js';
import {visibleLoop} from './visible-loop.js';
import {curvePath} from './curves.js';

// Shared stationary flow ink. Deform in display coordinates, so spheres remain
// circular even when a tall margin changes the projection's aspect ratio.
export function createAttractorRenderer(svg,{points,lines=[points],tracks,size,lineWidth=.65,surface}) {
    svg.replaceChildren();
    const makePath=attributes=>{
        const node=document.createElementNS('http://www.w3.org/2000/svg','path');
        for(const [name,value]of Object.entries(attributes))node.setAttribute(name,value);
        svg.append(node);return node;
    };
    const band=surface?makePath({fill:'#ecf6fe',opacity:.65,'fill-rule':'evenodd'}):null;
    const orbits=lines.map(()=>makePath({fill:'none',stroke:'#756187','stroke-width':lineWidth,opacity:.65,'stroke-linejoin':'round','stroke-linecap':'round'}));
    const marks=fieldMarks(svg,{tracers:tracks.length,showTracks:true,speed:25,trackWidth:Math.max(.7,lineWidth*1.3)});
    let previous='',field,circuits;
    return (time,obstacles=[],viewport=size)=>{
        const key=JSON.stringify([obstacles,viewport]);
        if(key!==previous) {
            const project=p=>[p[0]*viewport.width/size.width,p[1]*viewport.height/size.height];
            field=lines.map(line=>bendField(line.map(project),obstacles));circuits=tracks.map(track=>bendField(track.map(project),obstacles));
            orbits.forEach((orbit,i)=>orbit.setAttribute('d',curvePath(field[i])));
            if(band)band.setAttribute('d',curvePath(bendField(surface.map(project),obstacles))+'Z');svg.setAttribute('viewBox',`0 0 ${viewport.width} ${viewport.height}`);previous=key;
        }
        marks(field,time*Math.sqrt(viewport.width/size.width*viewport.height/size.height),0,circuits);
        return field;
    };
}
export function mountAttractor(field,ball,definition,options={}) {
    const pond=field.parentElement,svg=field.querySelector('svg'),draw=createAttractorRenderer(svg,definition);
    const contacts=fieldObstacles(pond,[field]);
    const contact=registerField(pond,field);
    let lastPaths=null,lastOrigin='';
    const loop=visibleLoop(field,({time})=>{
        const p=pond.getBoundingClientRect(),r=svg.getBoundingClientRect();if(!r.width||!r.height)return;
        const region={left:r.left-p.left,top:r.top-p.top,right:r.right-p.left,bottom:r.bottom-p.top};
        const {obstacles}=contacts.read(region);
        const paths=draw(time,obstacles.map(o=>({...o,x:o.x-region.left,y:o.y-region.top})),{width:r.width,height:r.height});
        const originKey=`${region.left},${region.top}`;
        if(paths!==lastPaths||originKey!==lastOrigin) {
            contact.update(paths.map(line=>line.map(([x,y])=>[x+region.left,y+region.top])));
            lastPaths=paths;lastOrigin=originKey;
        }
    },options);
    const move=()=>loop.invalidate();pond.addEventListener('pond:move',move);ball?.addEventListener('pond:move',move);
    return {invalidate:move,destroy(){contact.destroy();loop.destroy();contacts.destroy();pond.removeEventListener('pond:move',move);ball?.removeEventListener('pond:move',move);}};
}

export function marginPlacement(gutter,{aspect=1.95,maxWidth=300}={}) {
    const width=Math.max(0,Math.min(maxWidth,gutter-24));
    return {width,height:width*aspect,left:Math.max(12,(gutter-width)/2),clear:width};
}
