import test from 'node:test';
import assert from 'node:assert/strict';
import { createSwimmer, advanceSwimmer, grabSwimmer, releaseSwimmer } from '../src/swimmer-motion.js';
import { currentFlow } from '../src/current-flow.js';
import { objectPositions } from '../src/layout.js';
import { footprintRadius } from '../src/ripple-geometry.js';
import { strokePath } from '../src/drawing.js';
const bounds={left:8,right:900,top:80,bottom:700};

test('Fish take varied, repeatable headings across all four quadrants',()=>{
    const directions=new Set();
    for(let seed=1;seed<=40;seed++) {
        const a=createSwimmer(seed,400,300,bounds), b=createSwimmer(seed,400,300,bounds);
        assert.deepEqual(a,b); directions.add(`${Math.sign(a.vx)},${Math.sign(a.vy)}`);
        assert.ok(Math.hypot(a.vx,a.vy)>=8&&Math.hypot(a.vx,a.vy)<=13);
    }
    assert.equal(directions.size,4);
});
test('drag freezes the swimming phase and position; drop resumes from the new position',()=>{
    const state=createSwimmer(23,300,200,bounds);
    for(let i=0;i<20;i++) advanceSwimmer(state,.05);
    grabSwimmer(state); const held=structuredClone(state);
    for(let i=0;i<100;i++) advanceSwimmer(state,.05);
    assert.deepEqual(state,held);
    releaseSwimmer(state,500,400);
    assert.equal(state.elapsed,held.elapsed);
    advanceSwimmer(state,.05);
    assert.ok(Math.hypot(state.x-500,state.y-400)>0);
    const paused=structuredClone(state); advanceSwimmer(state,100,false); assert.deepEqual(state,paused);
});
test('Fish stay in bounds and does not catch up after a long pause',()=>{
    const state=createSwimmer(4,8,80,bounds);
    for(let i=0;i<10000;i++) {
        advanceSwimmer(state,.05);
        assert.ok(state.x>=8&&state.x<=900&&state.y>=80&&state.y<=700);
    }
    const x=state.x,y=state.y; advanceSwimmer(state,10000);
    assert.ok(Math.hypot(state.x-x,state.y-y)<2);
});
test('moving the sphere changes the stream; time alone leaves the field stationary',()=>{
    const input={width:800,height:1200,anchorY:300,ball:{x:650,y:300,radius:20}};
    const a=currentFlow({...input,time:0}),b=currentFlow({...input,time:1});
    assert.deepEqual(a.paths,b.paths);
    assert.notDeepEqual(a.paths,currentFlow({...input,ball:{x:350,y:380,radius:20}}).paths);
    for(const ball of [{x:650,y:300,radius:20},{x:350,y:380,radius:20},{x:780,y:1170,radius:20}]) {
        const f=currentFlow({...input,ball});
        assert.ok(f.top>=0&&f.bottom<=input.height);
        f.paths.forEach(points=>points.forEach(([x,y])=>{
            assert.ok(Number.isFinite(x)&&Number.isFinite(y));
            assert.ok(Math.hypot(x-ball.x,y-ball.y)>=ball.radius+1.499);
        }));
    }
});
test('all scheduled objects fit actual content length at short and long viewport sizes',()=>{
    for(const end of [2000,8000,15000]) for(const height of [720,900,1200]) {
        const positions=objectPositions(24,height,end);
        positions.forEach(y=>assert.ok(y>=0&&y+180<=end));
        for(let y=0;y<end;y+=10) assert.ok(positions.filter(p=>p+90>y&&p<y+height).length<=2);
    }
});
test('object wake width follows its visible footprint and drag direction',()=>{
    const rectangle=[[-50,-20],[50,-20],[50,20],[-50,20]];
    assert.equal(footprintRadius(rectangle,[0,0],[0,10]),50);
    assert.equal(footprintRadius(rectangle,[0,0],[10,0]),20);
});
test('drawing paths keep exact endpoints without randomness',()=>{
    const points=[[10,20],[20,40],[40,60]];
    assert.equal(strokePath(points),strokePath(points));
    assert.ok(strokePath(points).startsWith('M10,20')); assert.ok(strokePath(points).endsWith('L40,60'));
});
