import test from 'node:test';
import assert from 'node:assert/strict';
import { initDragging } from '../src/dragging.js';
import { createSwimmer, grabSwimmer, releaseSwimmer, advanceSwimmer } from '../src/swimmer-motion.js';
import { visibleLoop } from '../src/visible-loop.js';

class Classes {
    values=new Set(); add(...xs){xs.forEach(x=>this.values.add(x));} remove(...xs){xs.forEach(x=>this.values.delete(x));} contains(x){return this.values.has(x);}
}
class Piece extends EventTarget {
    classList=new Classes(); dataset={}; captured=new Set(); offsetWidth=44; offsetHeight=44;
    style={left:'40px',top:'140px',setProperty(){},removeProperty(){}};
    firstElementChild={style:{}};
    parentElement={getBoundingClientRect:()=>({left:0,top:0})};
    getBoundingClientRect(){return {left:parseFloat(this.style.left)||40,top:parseFloat(this.style.top)||140,width:44,height:44};}
    hasAttribute(){return false;} closest(){return null;} querySelector(){return null;} focus(){}
    setPointerCapture(id){this.captured.add(id);} hasPointerCapture(id){return this.captured.has(id);} releasePointerCapture(id){this.captured.delete(id);}
}
function pointer(target,type,props={}) {
    const event=new Event(type,{cancelable:true});
    Object.assign(event,{button:0,isPrimary:true,pointerId:1,clientX:62,clientY:162,...props}); target.dispatchEvent(event);
}
test('real drag handlers pause/resume a swimmer and every rapid release emits one drop',()=>{
    globalThis.document={documentElement:{clientWidth:960},querySelector:()=>null,body:{classList:new Classes()}};
    globalThis.window={innerHeight:720};
    const piece=new Piece(),bounds={left:0,right:916,top:0,bottom:676};
    const swimmer=createSwimmer(7,40,140,bounds);
    piece.addEventListener('pond:grab',()=>grabSwimmer(swimmer));
    piece.addEventListener('pond:release',()=>releaseSwimmer(swimmer,parseFloat(piece.style.left),parseFloat(piece.style.top)));
    let drops=0,allowed=true;
    initDragging({canDrag:()=>allowed,floats:[piece],pictures:[],dropObject:()=>drops++,addWake:()=>{},breakWake:()=>{},onHome:()=>{}});
    pointer(piece,'pointerdown'); const before=structuredClone(swimmer);
    pointer(piece,'pointermove',{clientX:300,clientY:300}); advanceSwimmer(swimmer,.1);
    assert.deepEqual(swimmer,before,'pointer movement cannot advance the animation while held');
    pointer(piece,'pointerup',{clientX:300,clientY:300});
    assert.equal(swimmer.held,false); assert.equal(swimmer.x,278); assert.equal(swimmer.y,278); assert.equal(drops,1);
    const x=swimmer.x; advanceSwimmer(swimmer,.05); assert.notEqual(swimmer.x,x);
    for(let i=0;i<20;i++){pointer(piece,'pointerdown');pointer(piece,'pointerup');}
    assert.equal(drops,21,'no debounce or double-click suppression');
    pointer(piece,'pointerdown');pointer(piece,'pointercancel');
    assert.equal(swimmer.held,false); assert.equal(drops,21,'cancel releases without a splash');
    allowed=false;const stationary=structuredClone(swimmer);pointer(piece,'pointerdown');pointer(piece,'pointermove',{clientX:500,clientY:500});pointer(piece,'pointerup');
    assert.deepEqual(swimmer,stationary,'disabled mobile image dragging must leave normal navigation and scrolling alone');assert.equal(drops,21);
});

test('visible animation clock stops offscreen, hidden, held, and reduced-motion; resumes without time jumps',()=>{
    const frames=new Map();let id=0,observer;
    globalThis.requestAnimationFrame=callback=>{frames.set(++id,callback);return id;};
    globalThis.cancelAnimationFrame=id=>frames.delete(id);
    globalThis.document=new EventTarget();document.hidden=false;document.body={classList:{contains:()=>true}};
    globalThis.window=new EventTarget();
    const media=new EventTarget();media.matches=false;globalThis.matchMedia=()=>media;
    globalThis.IntersectionObserver=class{constructor(callback){observer=callback;}observe(){}disconnect(){}};
    const element={dataset:{}},samples=[];let animated=true;
    const loop=visibleLoop(element,sample=>samples.push(sample),{animated:()=>animated});
    function tick(time){const pending=[...frames.values()];frames.clear();pending.forEach(callback=>callback(time));}
    observer([{isIntersecting:true}]);tick(100);tick(150);assert.equal(samples.at(-1).dt,.05);
    loop.hold(true);tick(200);assert.equal(frames.size,0);assert.equal(samples.at(-1).dt,0);
    loop.hold(false);tick(10000);assert.equal(samples.at(-1).dt,0);tick(10050);assert.equal(samples.at(-1).dt,.05);
    document.hidden=true;document.dispatchEvent(new Event('visibilitychange'));tick(10100);assert.equal(frames.size,0);
    document.hidden=false;document.dispatchEvent(new Event('visibilitychange'));tick(10200);assert.equal(frames.size,1);
    media.matches=true;media.dispatchEvent(new Event('change'));tick(10300);assert.equal(frames.size,0);
    media.matches=false;observer([{isIntersecting:false}]);tick(10400);assert.equal(frames.size,0);
    observer([{isIntersecting:true}]);tick(10500);assert.equal(frames.size,1);
    animated=false;tick(10550);assert.equal(frames.size,0,'an idle preview cannot keep a canvas loop alive');
    animated=true;loop.invalidate();tick(10600);assert.equal(frames.size,1);
    loop.destroy();assert.equal(frames.size,0);
});

test('open-water wake requires a held pointer; release, cancellation and controls cannot keep drawing',async()=>{
    const {initDrawing}=await import('../src/drawing.js');
    const doc=new EventTarget(),body=new Piece();
    globalThis.document=doc;globalThis.scrollY=0;
    doc.body=body;doc.querySelector=()=>({clientWidth:960,clientHeight:3000});
    const water={closest:()=>null},control={closest:()=>({})};
    let moves=0,clicks=0,starts=0,ends=0,allowed=true;
    initDrawing({canDraw:()=>allowed,onMove:()=>moves++,onClick:()=>clicks++,onStart:()=>starts++,onEnd:()=>ends++});
    const send=(type,x,target=water,props={})=>{
        const event=new Event(type,{cancelable:true});
        Object.assign(event,{button:0,isPrimary:true,pointerId:1,pointerType:'mouse',clientX:x,clientY:100,...props});
        Object.defineProperty(event,'target',{value:target});doc.dispatchEvent(event);
    };
    for(let i=0;i<30;i++)send('pointermove',100+i*10);
    assert.equal(moves,0,'hover is completely quiet');
    send('pointerdown',100);send('pointermove',102);assert.equal(moves,0,'click jitter is not drawing');
    send('pointermove',130);send('pointermove',160);assert.equal(moves,3);
    send('pointerup',160);send('pointermove',190);assert.equal(moves,3);assert.equal(clicks,0);
    send('pointerdown',100);send('pointercancel',100);send('pointermove',130);assert.equal(moves,3);
    for(let i=0;i<20;i++){send('pointerdown',100);send('pointerup',100);}
    assert.equal(clicks,20,'rapid ordinary clicks retain changing drops');
    send('pointerdown',100,control);send('pointermove',130);assert.equal(moves,3);
    send('pointerdown',100,water,{pointerType:'touch'});send('pointermove',130);assert.equal(moves,3,'touch scrolling remains native');
    assert.equal(starts,22);assert.equal(ends,22);
    allowed=false;send('pointerdown',100);send('pointermove',150);send('pointerup',150);assert.equal(starts,22);
    allowed=true;send('pointerdown',100);allowed=false;send('pointermove',150);send('pointerup',150);assert.equal(ends,23);assert.equal(clicks,20,'leaving the intro cancels without a ripple');
});
