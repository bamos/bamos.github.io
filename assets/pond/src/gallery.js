import { pieceSnapshot } from './snapshots.js';
import { drawDrop, drawWake } from './waves.js';
import { createStrokeWave, drawStrokeWave } from './stroke-waves.js';
import { currentPreview, lorenzPreview, piecePreview, extraAttractorPreview } from './previews.js';
import { prepare } from './silhouettes.js';
import { imageStudy } from './gallery-images.js';

// Still ripple studies and interactive objects share the production modules.
const ns='http://www.w3.org/2000/svg';
const gesture=Array.from({length:40},(_,i)=>[75+i*5.3,120+Math.sin(i/9)*30]);
const drawn=createStrokeWave(gesture);
function svgFor(section,width,height) {
    const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    svg.setAttribute('role','img');svg.setAttribute('aria-label',section.querySelector('h3').textContent);
    section.append(svg);return svg;
}
for(const section of document.querySelectorAll('[data-pond-study]')) {
    try {
        const study=section.dataset.pondStudy;
        if(study==='background') {
            const svg=svgFor(section,1440,900);svg.style.color='rgba(43,111,130,.24)';svg.append(document.querySelector('#pond-fixtures .water-contours > g').cloneNode(true));
        } else if(study==='current') {
            currentPreview(section);
        } else if(study==='lorenz') {
            lorenzPreview(section);
        } else if(study==='mobius') {
            extraAttractorPreview(section,study);
        } else if(study==='passage') {
            currentPreview(section,{passage:true});
        } else if(study==='piece'&&section.dataset.piece!=='index-profile-img') {
            piecePreview(section,'.'+section.dataset.piece);
        } else {
            const canvas=document.createElement('canvas');canvas.width=720;canvas.height=480;
            canvas.setAttribute('role','img');canvas.setAttribute('aria-label',section.querySelector('h3').textContent);section.append(canvas);
            const ctx=canvas.getContext('2d');ctx.scale(2,2);
            if(study==='click')drawDrop(ctx,{shape:section.dataset.shape,seed:7,x:180,y:120},1.1);
            if(study==='wake')drawWake(ctx,gesture.map(([x,y],i)=>({x,y,start:i*28,stroke:0,lifetime:10})),1350);
            if(study==='stroke')drawStrokeWave(ctx,drawn,Number(section.dataset.age));
            if(study==='piece') {
                const item=document.querySelector('#pond-fixtures .'+section.dataset.piece);
                (await pieceSnapshot(item))(ctx,.65);
            }
        }
        section.dataset.ready='true';
    } catch(error) { section.dataset.error=error.message;const message=document.createElement('p');message.textContent=error.message;section.append(message);console.error(error); }
}

// Discover alpha-bearing illustrations from the homepage, rather than keeping
// a second publication list that silently becomes out of date.
const imageDrops=document.querySelector('#pond-image-drops');
for(const item of document.querySelectorAll('[data-gallery-publication]')) {
    const study=imageStudy(item.getAttribute('src'),item.alt);
    if(!study.show)continue;
    const shape=await prepare(item);
    if(!shape?.transparent)continue;
    const section=document.createElement('section'),heading=document.createElement('h3'),canvas=document.createElement('canvas');
    heading.textContent=study.title;canvas.width=720;canvas.height=480;
    canvas.setAttribute('role','img');canvas.setAttribute('aria-label',item.alt+' — image drop');
    const ctx=canvas.getContext('2d');ctx.scale(2,2);
    (await pieceSnapshot(item,{width:360,height:240,imageWidth:160,imageHeight:110}))(ctx,.65);
    section.dataset.ready='true';section.dataset.imageSource=item.getAttribute('src');
    section.append(heading,canvas);imageDrops.append(section);
}
