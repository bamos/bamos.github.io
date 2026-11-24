import test from 'node:test';
import assert from 'node:assert/strict';
import {smoothPath,offsetTrail} from '../src/path-smoothing.js';
import {createStrokeWave,drawStrokeWave,strokeLifetime} from '../src/stroke-waves.js';
import {drawPointerWake,trailStyles,prepareTrail} from '../src/trails.js';
import {distanceField} from '../src/distance-field.js';
import {waveContours} from '../src/waves.js';

function turning(points) {
    return points.slice(1,-1).reduce((sum,p,i)=>{
        const a=points[i],b=points[i+2],u=[p[0]-a[0],p[1]-a[1]],v=[b[0]-p[0],b[1]-p[1]];
        return sum+Math.abs(Math.atan2(u[0]*v[1]-u[1]*v[0],u[0]*v[0]+u[1]*v[1]));
    },0);
}
function canvasRecorder() {
    return {paints:[],path:[],beginPath(){this.path=[];},moveTo(x,y){this.path.push([x,y]);},lineTo(x,y){this.path.push([x,y]);},closePath(){},fill(){this.paints.push({points:this.path,fill:this.fillStyle});}};
}
test('pointer smoothing removes hand jitter without moving endpoints or overshooting',()=>{
    const input=Array.from({length:120},(_,i)=>[i*3,100+Math.sin(i/20)*30+Math.sin(i*2.1)*4]);
    const result=prepareTrail(input);
    assert.deepEqual(result[0],input[0]);assert.deepEqual(result.at(-1),input.at(-1));
    assert.ok(turning(result)<turning(input)*.05,'high-frequency scratches are removed');
    for(const [x,y]of result){assert.ok(x>=0&&x<=357);assert.ok(y>=Math.min(...input.map(p=>p[1]))&&y<=Math.max(...input.map(p=>p[1])));}
    const sparse=[[0,0],[100,50],[200,0]],dense=[];
    for(let i=0;i<2;i++)for(let n=0;n<40;n++)dense.push(sparse[i].map((v,k)=>v+(sparse[i+1][k]-v)*n/40));dense.push(sparse.at(-1));
    const a=smoothPath(sparse),b=smoothPath(dense);assert.equal(a.length,b.length);
    a.forEach((p,i)=>assert.ok(Math.hypot(p[0]-b[i][0],p[1]-b[i][1])<1e-8,'sampling frequency cannot change the shape'));
});
test('leaf fronts retain their silhouette while removing raster-grid corners',()=>{
    const width=220,height=220,mask=Uint8Array.from({length:width*height},(_,i)=>{
        const x=i%width-110,y=Math.floor(i/width)-110;return Math.abs(x)/34+Math.abs(y)/17<1;
    });
    const field=distanceField(mask,width,height);
    for(const age of [.06,.16,.65,1.4]) {
        const contours=waveContours({field,left:0,top:0,scale:1},age);assert.equal(contours.length,1);
        const points=contours[0],w=Math.max(...points.map(p=>p[0]))-Math.min(...points.map(p=>p[0])),h=Math.max(...points.map(p=>p[1]))-Math.min(...points.map(p=>p[1]));
        assert.ok(w>h+20,'smoothing cannot turn a leaf into a circular ripple');
        assert.ok(turning([...points,points[0],points[1]])<7.3,'no accumulating staircase corners');
    }
});
test('each trail option is one tapered crest, fully gone after ten seconds',()=>{
    const wave=createStrokeWave([[20,80],[100,110],[200,60],[300,80]]);
    for(const style of Object.keys(trailStyles)) {
        const ctx=canvasRecorder();drawStrokeWave(ctx,wave,1,0,style);
        assert.ok(ctx.paints.length>=1&&ctx.paints.length<=2,'only a crest and optional colocated sheen');
        const crest=ctx.paints.at(-1).points,half=crest.length/2;
        const widths=crest.slice(0,half).map((p,i)=>Math.hypot(p[0]-crest.at(-1-i)[0],p[1]-crest.at(-1-i)[1]));
        assert.ok(widths[0]<1e-8&&widths.at(-1)<1e-8,'both ends taper to nothing');
        assert.ok(Math.max(...widths)<5,'no inflated bubble enclosing the gesture');
        const empty=canvasRecorder();drawStrokeWave(empty,wave,strokeLifetime,0,style);assert.equal(empty.paints.length,0);
    }
});
test('pointer wakes remain separate across lifted strokes, with bounded geometry on reversals',()=>{
    const wake=Array.from({length:40},(_,i)=>({x:i<20?i*5:400+(i-20)*5,y:80,start:i*20,stroke:i<20?0:1}));
    const ctx=canvasRecorder();drawPointerWake(ctx,wake,800);
    assert.equal(ctx.paints.length,4);
    ctx.paints.forEach(p=>assert.ok(Math.max(...p.points.map(v=>v[0]))-Math.min(...p.points.map(v=>v[0]))<110,'no joining line across separate strokes'));
    const reversed=smoothPath([[0,0],[60,0],[60,3],[0,3],[60,6]]),shifted=offsetTrail(reversed,reversed.map(()=>60));
    assert.equal(shifted.length,reversed.length);assert.ok(shifted.flat().every(Number.isFinite));
    shifted.forEach((p,i)=>assert.ok(Math.hypot(p[0]-reversed[i][0],p[1]-reversed[i][1])<=60.00001));
    assert.ok(smoothPath(Array.from({length:20000},(_,i)=>[i,Math.sin(i)] )).length<=768);
});
