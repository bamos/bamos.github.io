import {prepareTrail} from './trails.js';
export function strokePath(input) {
    const points=prepareTrail(input);
    if (!points.length) return '';
    let path=`M${points[0][0]},${points[0][1]}`;
    for(let i=1;i<points.length-1;i++) {
        const p=points[i],n=points[i+1]; path+=`Q${p[0]},${p[1]} ${(p[0]+n[0])/2},${(p[1]+n[1])/2}`;
    }
    if(points.length>1) path+=`L${points.at(-1).join(',')}`;
    return path;
}

// The pointer only makes a wake while held in open water. Reuse the same
// renderer as object wakes; there is no separate live line or release bubble.
export function initDrawing({onClick,onMove,onStart=()=>{},onEnd=()=>{},canDraw=()=>true}) {
    const pond=document.querySelector('.water-objects');
    let drawing=null;
    function point(event) { return [Math.max(0,Math.min(pond.clientWidth,event.clientX)),Math.max(0,Math.min(pond.clientHeight,event.clientY+scrollY))]; }
    function openWater(target) { return !target.closest('a,button,input,textarea,select,[contenteditable],.navbar,.section-nav,p,td,th,h1,h2,h3'); }
    document.addEventListener('pointerdown',event=>{
        if(!canDraw(event))return;
        if(event.button!==0 || !event.isPrimary || event.pointerType==='touch' || !openWater(event.target)) return;
        event.preventDefault(); onStart(); const p=point(event);
        drawing={id:event.pointerId,first:p,last:p,moved:false};
        document.body.setPointerCapture(event.pointerId);
    });
    document.addEventListener('pointermove',event=>{
        if(!drawing || drawing.id!==event.pointerId) return;
        if(!canDraw(event)){finish(event,true);return;}
        const p=point(event);
        if(Math.hypot(p[0]-drawing.last[0],p[1]-drawing.last[1])<3) return;
        if(!drawing.moved && Math.hypot(p[0]-drawing.first[0],p[1]-drawing.first[1])<=6)return;
        if(!drawing.moved) onMove(drawing.first[0],drawing.first[1]-scrollY);
        drawing.moved=true;drawing.last=p;onMove(p[0],p[1]-scrollY);
    });
    function finish(event,cancel=false) {
        if(!drawing || drawing.id!==event.pointerId) return;
        const saved=drawing; drawing=null;
        if(document.body.hasPointerCapture(event.pointerId)) document.body.releasePointerCapture(event.pointerId);
        onEnd();
        if(!cancel && !saved.moved) onClick(saved.first[0],saved.first[1]-scrollY);
    }
    document.addEventListener('pointerup',event=>finish(event));
    document.addEventListener('pointercancel',event=>finish(event,true));
    document.body.addEventListener('lostpointercapture',event=>finish(event,true));
}
