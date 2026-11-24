import {dropsIntoField} from './field-contact.js';
import {mobiusSpherePlacement} from './mobius.js';
import {mountAttractor} from './attractor-renderer.js';
import {attractorDefinition} from './attractors.js';
import { initDragging } from './dragging.js';
import { capture } from './silhouettes.js';
import { objectWave, drawDrop } from './waves.js';
import { visibleLoop } from './visible-loop.js';
import { mountCurrent } from './currents.js';
import { mountLorenz, lorenzSize } from './lorenz.js';
import { mountSwimmer } from './swimmers.js';

// Small interactive ponds reuse the real input, motion, field and drop modules.
// Coordinates stay local to each surface; interactions cannot affect the page.
export function pondPreview(section,{field=false,wide=false}={}) {
    const pond=document.createElement('div');pond.className='pond-preview pond-demo pond-ready'+(field?' pond-preview-field':'')+(wide?' pond-preview-wide':'');
    pond.setAttribute('data-pond-bounds','');section.append(pond);
    const canvas=document.createElement('canvas');canvas.className='pond-preview-ripples';canvas.setAttribute('aria-hidden','true');pond.append(canvas);
    const ctx=canvas.getContext('2d'),pieces=new Map(),layouts=[];
    let drops=[];
    const ripples=visibleLoop(pond,()=>{
        const now=performance.now();drops=drops.filter(p=>now-p.start<3000);
        ctx.clearRect(0,0,pond.clientWidth,pond.clientHeight);
        drops.forEach(p=>drawDrop(ctx,p,(now-p.start)/1000));
    },{ready:()=>true,animated:()=>drops.length>0});
    const drag=initDragging({floats:[],pictures:[],addWake:()=>{},breakWake:()=>{},onHome:layout,dropObject:async item=>{
        if(dropsIntoField(item))return;
        const contours=await capture(item),r=pond.getBoundingClientRect();
        if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
        const local=contours.map(points=>points.map(([x,y])=>[x-r.left,y-r.top-scrollY]));
        drops.push({wave:objectWave(local),start:performance.now()});drops=drops.slice(-12);ripples.invalidate();
    }});
    function layout() {
        const scale=Math.min(devicePixelRatio||1,1.5);
        canvas.width=Math.round(pond.clientWidth*scale);canvas.height=Math.round(pond.clientHeight*scale);ctx.setTransform(scale,0,0,scale,0,0);
        for(const [item,home]of pieces) {
            if(!item.classList.contains('water-placed')) {
                item.style.left=(home.x*pond.clientWidth-item.offsetWidth/2)+'px';item.style.top=(home.y*pond.clientHeight-item.offsetHeight/2)+'px';
            }else{
                item.style.left=Math.max(0,Math.min(pond.clientWidth-item.offsetWidth,parseFloat(item.style.left)||0))+'px';
                item.style.top=Math.max(0,Math.min(pond.clientHeight-item.offsetHeight,parseFloat(item.style.top)||0))+'px';
            }
            item.dispatchEvent(new Event('pond:move'));
        }
        layouts.forEach(fn=>fn());ripples.invalidate();
    }
    new ResizeObserver(layout).observe(pond);
    return {pond,layout,onLayout(fn){layouts.push(fn);fn();},
        add(selector,{x=.5,y=.5,size,seed}={}) {
            const item=document.querySelector('#pond-fixtures '+selector).cloneNode(true);
            item.removeAttribute('aria-describedby');item.removeAttribute('data-water-companion');item.classList.add('water-visible');item.style.right='auto';
            if(size){item.style.width=size+'px';item.style.height=size+'px';}
            if(seed)item.dataset.swimSeed=String(seed);
            pond.append(item);pieces.set(item,{x,y});layout();drag.add(item);return item;
        }
    };
}

export function currentPreview(section,{passage=false}={}) {
    const view=pondPreview(section,{field:true,wide:passage});
    const ball=view.add('.water-currents',{x:passage ? .76 : .48,y:.52,size:62});
    const current=mountCurrent(ball,{ready:()=>true});view.onLayout(current.layout);
    view.add('.water-float-four',{x:passage ? .89 : .78,y:.29,size:54});
    const fish=view.add('.water-fish-one',{x:passage ? .24 : .7,y:.73,size:54,seed:7});mountSwimmer(fish,{ready:()=>true});
    return view;
}

export function lorenzPreview(section) {
    const view=pondPreview(section,{field:true}),field=document.createElement('div');
    field.className='water-lorenz';field.setAttribute('data-pond-stationary','');
    field.innerHTML='<svg class="water-object" aria-hidden="true"></svg>';view.pond.prepend(field);
    const ball=view.add('.water-lorenz-ball',{x:.42,y:.68,size:50});
    const renderer=mountLorenz(field,ball,{ready:()=>true});
    view.onLayout(()=>{
        const width=Math.min(view.pond.clientWidth*.96,(view.pond.clientHeight-36)*lorenzSize.width/lorenzSize.height),height=width*lorenzSize.height/lorenzSize.width;
        field.style.width=width+'px';field.style.height=height+'px';field.style.left=(view.pond.clientWidth-width)/2+'px';field.style.top=(view.pond.clientHeight-height)/2+'px';renderer.invalidate();
    });
    return view;
}

export function piecePreview(section,selector) {
    const view=pondPreview(section),item=view.add(selector,{size:selector==='.water-lotus'?48:70});
    if(item.matches('.water-fish-one,.water-fish-two'))mountSwimmer(item,{ready:()=>true});
    return view;
}

export function extraAttractorPreview(section,kind) {
    const view=pondPreview(section,{field:true}),field=document.createElement('div');
    field.className='water-attractor water-extra-preview';field.innerHTML='<svg class="water-object" aria-hidden="true"></svg>';view.pond.prepend(field);
    const ball=view.add('.water-mobius-ball',{x:.72,y:.55,size:50});
    const renderer=mountAttractor(field,ball,attractorDefinition(kind),{ready:()=>true});
    view.onLayout(()=>{
        const width=Math.min(view.pond.clientWidth*.94,view.pond.clientHeight-28);
        const region={width,height:width,left:(view.pond.clientWidth-width)/2,top:(view.pond.clientHeight-width)/2};
        Object.assign(field.style,{position:'absolute',width:width+'px',height:width+'px',left:region.left+'px',top:region.top+'px'});
        if(!ball.classList.contains('water-placed')) {
            const home=mobiusSpherePlacement(region,ball.offsetWidth);
            ball.style.left=home.left+'px';ball.style.top=home.top+'px';
        }
        renderer.invalidate();
    });
    return view;
}
