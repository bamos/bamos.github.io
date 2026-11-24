import {trailStyles,drawPointerWake,defaultTrailStyle} from '../src/trails.js';
import {createStrokeWave,drawStrokeWave} from '../src/stroke-waves.js';
import {visibleLoop} from '../src/visible-loop.js';

// Private comparison only. Every option calls the production trail renderer.
export function mountTrailOptions(container,leafSnapshot) {
    const controls=document.createElement('div');controls.className='trail-controls';
    const note=document.createElement('p');note.textContent='Move over a panel, or click and draw. All three show the same gesture. Silk ribbon is selected for the homepage.';
    controls.append(note);container.append(controls);
    const cards=Object.entries(trailStyles).map(([style,{title}])=>{
        const figure=document.createElement('figure'),heading=document.createElement('h2'),canvas=document.createElement('canvas'),caption=document.createElement('figcaption');
        heading.textContent=title+(style===defaultTrailStyle?' · selected':'');canvas.width=840;canvas.height=580;canvas.style.touchAction='none';
        canvas.setAttribute('aria-label',title+' — move or drag to compare');canvas.setAttribute('role','img');
        caption.textContent={soft:'A narrow crest with a soft edge.',silk:'A broader, more diffuse ribbon.',quiet:'A fine line with very little spread.'}[style];
        figure.append(heading,canvas,caption);container.append(figure);
        const ctx=canvas.getContext('2d');ctx.scale(2,2);return {canvas,ctx,style};
    });
    let points=[],drawing=false,wake=[],wave=null,elapsed=1.4,playing=false,clock=0,last=-Infinity;
    const loop=visibleLoop(container,({dt})=>{
        clock=performance.now();if(playing)elapsed+=dt;
        if(elapsed>=10)playing=false;
        wake=wake.filter(p=>clock-p.start<1800);
        for(const {ctx,style}of cards) {
            ctx.clearRect(0,0,420,290);
            if(drawing&&points.length>2)drawStrokeWave(ctx,createStrokeWave(points),0,0,style);
            else if(wave)drawStrokeWave(ctx,wave,elapsed,0,style);
            drawPointerWake(ctx,wake,clock,0,style);
        }
    },{ready:()=>true,animated:()=>playing||wake.length>0||drawing});
    function example(kind,play=true) {
        const path=Array.from({length:110},(_,i)=>{
            const t=i/109;
            if(kind==='Loop')return [210+110*Math.sin(t*Math.PI*2.3),145+65*Math.cos(t*Math.PI*2.3)];
            return [40+340*t,145+Math.sin(t*Math.PI*2)*48+(kind==='Shaky hand'?Math.sin(i*1.9)*5:0)];
        });
        wave=createStrokeWave(path);wake=[];elapsed=play?0:1.4;playing=play;loop.invalidate();
    }
    for(const name of ['Smooth sweep','Shaky hand','Loop']) {
        const button=document.createElement('button');button.type='button';button.textContent=name;
        button.addEventListener('click',()=>example(name));controls.append(button);
    }
    const listeners=[];
    for(const {canvas}of cards) {
        const local=e=>{const r=canvas.getBoundingClientRect();return[(e.clientX-r.left)*420/r.width,(e.clientY-r.top)*290/r.height];};
        const listen=(event,fn)=>{canvas.addEventListener(event,fn);listeners.push(()=>canvas.removeEventListener(event,fn));};
        listen('pointerdown',e=>{if(e.button!==0)return;drawing=true;playing=false;wave=null;wake=[];points=[local(e)];canvas.setPointerCapture(e.pointerId);loop.invalidate();});
        listen('pointermove',e=>{
            const p=local(e);
            if(drawing){if(Math.hypot(p[0]-points.at(-1)[0],p[1]-points.at(-1)[1])>3)points.push(p);}
            else if(e.buttons===0&&performance.now()-last>20){const now=performance.now();wake.push({x:p[0],y:p[1],start:now,stroke:0});last=now;wake=wake.slice(-100);}
            loop.invalidate();
        });
        const finish=e=>{if(!drawing)return;drawing=false;wave=createStrokeWave(points);elapsed=0;playing=true;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);loop.invalidate();};
        listen('pointerup',finish);listen('pointercancel',finish);
    }
    if(leafSnapshot)for(const age of [.16,.65,1.4]) {
        const figure=document.createElement('figure'),canvas=document.createElement('canvas'),caption=document.createElement('figcaption');
        canvas.width=840;canvas.height=580;const ctx=canvas.getContext('2d');ctx.scale(2,2);leafSnapshot(ctx,age);
        canvas.setAttribute('role','img');canvas.setAttribute('aria-label',`Leaf contour at ${age} seconds`);caption.textContent=`Leaf drop · ${age} seconds · refined contour`;
        figure.append(canvas,caption);container.append(figure);
    }
    example('Smooth sweep',false);
    return {destroy(){loop.destroy();listeners.forEach(fn=>fn());}};
}
