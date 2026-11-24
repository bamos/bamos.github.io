import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {silhouetteBody,boundaryRadius,hugObstacle,fieldClearance} from '../src/obstacle-shape.js';
import {currentFlow} from '../src/current-flow.js';
import {bendField} from '../src/field-bending.js';
import {fishPose,createSwimmer,advanceSwimmer,grabSwimmer,releaseSwimmer,swimmerHeading} from '../src/swimmer-motion.js';
import {fieldMarks} from '../src/field-marks.js';
import {articulateFish} from '../src/fish-articulation.js';

const transform=(points,scale,angle,x=0,y=0)=>points.map(([a,b])=>[x+scale*(a*Math.cos(angle)-b*Math.sin(angle)),y+scale*(a*Math.sin(angle)+b*Math.cos(angle))]);
const shapes={twig:[[-30,-1],[30,-1],[30,1],[-30,1]],fish:[[-30,-11],[-14,-5],[0,-10],[18,-7],[28,0],[18,7],[0,10],[-14,5],[-30,11]]};

test('flow envelopes follow small, large and rotated artwork within one pixel, not a circular box',()=>{
    for(const points of Object.values(shapes))for(const scale of [.55,1,1.8])for(const angle of [0,.3,1.2,2.8]) {
        const body=silhouetteBody([transform(points,scale,angle,200,300)]);
        for(let i=0;i<256;i++) {
            const t=i/256*Math.PI*2,r=body.radius+2;
            const p=hugObstacle([body.x+r*Math.cos(t),body.y+r*Math.sin(t)],body);
            const gap=Math.hypot(p[0]-body.x,p[1]-body.y)-boundaryRadius(body,t);
            assert.ok(Math.abs(gap-fieldClearance)<1e-7,'the inner streamline must sit on the artwork envelope');
        }
        assert.ok(Math.min(...body.radii)<body.radius*.55,'thin pieces cannot become circles');
    }
});
test('shape wrapping preserves ordered lines and returns smoothly to the undisturbed flow',()=>{
    const body=silhouetteBody([shapes.twig]);
    for(let angle=0;angle<Math.PI*2;angle+=.08) {
        let before=0;
        for(let r=body.radius+2;r<180;r+=.5) {
            const p=hugObstacle([body.x+r*Math.cos(angle),body.y+r*Math.sin(angle)],body),distance=Math.hypot(p[0]-body.x,p[1]-body.y);
            assert.ok(distance>before,'no folded streamlines');before=distance;
        }
    }
    assert.deepEqual(hugObstacle([1000,1000],body),[1000,1000]);
});
test('actual current and attractor render geometry hugs slender obstacles without truncating',()=>{
    for(const width of [320,520,1000])for(const angle of [0,.7,1.5]) {
        const input={width,height:800,anchorX:width-150,anchorY:350};
        const original=currentFlow(input),line=original.paths[12],center=line[Math.floor(line.length*.28)];
        const body=silhouetteBody([transform(shapes.twig,.65,angle,...center)]);
        for(const paths of [currentFlow({...input,obstacles:[body]}).paths,[bendField(line,[body])]]) {
            let nearest=Infinity;
            for(const [x,y] of paths.flat()) {
                const dx=x-body.x,dy=y-body.y,clearance=Math.hypot(dx,dy)-boundaryRadius(body,Math.atan2(dy,dx));
                assert.ok(clearance>=.98,'no stream through the artwork');nearest=Math.min(nearest,clearance);
            }
            assert.ok(nearest<2,'no oversized empty bubble');
        }
        currentFlow({...input,obstacles:[body]}).paths.forEach(path=>assert.ok(path.at(-1)[0]>width+18));
    }
});
test('field marks contain tracks and moving dots, without directional arrows',()=>{
    const make=()=>({attributes:{},setAttribute(k,v){this.attributes[k]=v;},append(...nodes){this.children.push(...nodes);},children:[]});
    globalThis.document={createElementNS:()=>make()};const svg=make(),draw=fieldMarks(svg);
    draw([[[0,0],[100,0]]],0);const before=svg.children[0].attributes.cx;draw([[[0,0],[100,0]]],1);
    assert.equal(svg.children.length,1);assert.equal(svg.children[0].attributes.r,'1.7');assert.notEqual(svg.children[0].attributes.cx,before);
});
test('fish tail beats, body sway and glide vary gently; drag and pause freeze all movement',()=>{
    const state=createSwimmer(7,300,300,{left:0,right:800,top:0,bottom:800});
    const poses=[];
    for(let i=0;i<120;i++){advanceSwimmer(state,1/30);poses.push(fishPose(state.elapsed,state.phase));}
    assert.ok(Math.max(...poses.map(p=>p.tail))>16&&Math.min(...poses.map(p=>p.tail))<-16);
    assert.ok(poses.every(p=>Math.abs(p.body)<=2.2&&p.thrust>=.72&&p.thrust<=1.28));
    const speed=Math.hypot(state.vx,state.vy);grabSwimmer(state);const held=structuredClone(state);
    for(let i=0;i<100;i++)advanceSwimmer(state,.1);assert.deepEqual(state,held);
    releaseSwimmer(state,400,400);advanceSwimmer(state,.05);assert.ok(state.elapsed>held.elapsed);
    assert.ok(Math.abs(Math.hypot(state.vx,state.vy)-speed)<1e-8);
    const facing=swimmerHeading(state)*Math.PI/180;assert.ok(Math.cos(facing)*state.vx+Math.sin(facing)*state.vy>0);
});
test('fish articulation changes actual SVG parts and can be held at an exact phase',()=>{
    const parts=Object.fromEntries(['.water-fish-body','.water-fish-tail','.water-fish-fin'].map(name=>[name,{setAttribute(k,v){this[k]=v;}}]));
    const pose=articulateFish({querySelector:name=>parts[name]});pose(.1,7);const first=parts['.water-fish-tail'].transform;
    pose(.4,7);assert.notEqual(parts['.water-fish-tail'].transform,first);
    const held=parts['.water-fish-tail'].transform;pose(.4,7);assert.equal(parts['.water-fish-tail'].transform,held);
});
test('removed Life pieces and extra click designs cannot reappear in either entry point',async()=>{
    const root=new URL('../../../',import.meta.url);
    for(const file of ['_includes/pond/objects.html','_posts/2026-11-07-pond.md','assets/pond/src/previews.js','assets/pond/src/swimmers.js']) {
        const source=await readFile(new URL(file,root),'utf8');
        assert.ok(!/water-life|water-frog|water-lizard|Conway|glider|data-shape="(?:heart|donut|triangle|avicii)"/.test(source),file);
    }
});

test('silhouette wrapping near the downstream edge still exits beyond the visible surface',()=>{
    for(const width of [250,390,800])for(const dy of [60,120,190]) {
        const body=silhouetteBody([transform(shapes.fish,.8,.5,width-4,260+dy)]);
        const flow=currentFlow({width,height:700,anchorX:width-100,anchorY:260,obstacles:[body]});
        for(const path of flow.paths) {
            assert.ok(path.at(-1)[0]>width+18,'a contracted path cannot terminate inside the viewport');
            for(const [x,y]of path)if(x<=width)assert.ok(y<flow.bottom,'do not crop a downstream turn');
        }
    }
});

test('fish near a sphere never traps a streamline between overlapping circular proxies',()=>{
    const input={width:520,height:800,anchorX:245,anchorY:350,ball:{x:245,y:350,radius:40}};
    for(const [dx,dy]of [[55,15],[40,50],[0,65],[-50,30],[65,-15]])for(const angle of [0,.7,2]) {
        const fish=silhouetteBody([transform(shapes.fish,.9,angle,input.ball.x+dx,input.ball.y+dy)]);
        const flow=currentFlow({...input,obstacles:[fish]});
        for(const path of flow.paths) {
            assert.ok(path.at(-1)[0]>input.width+18,'no dangling curl inside the river');
            assert.ok(path.flat().every(Number.isFinite));
            for(const [x,y]of path)assert.ok(Math.hypot(x-input.ball.x,y-input.ball.y)>=input.ball.radius,'no line through a sphere when artwork overlaps');
        }
    }
});
