import test from 'node:test';
import assert from 'node:assert/strict';
import {lorenzField,lorenzTracks,lorenzPlacement} from '../src/lorenz.js';
import {bendField} from '../src/field-bending.js';
import {curvePoints} from '../src/curves.js';
import {pointAlong} from '../src/field-marks.js';
import {flowHeading,turnWithFlow,driftPieces} from '../src/current-drift.js';
import {exteriorContours} from '../src/image-ripples.js';
import {imageStudy} from '../src/gallery-images.js';

test('both Lorenz colors complete both lobes without a restart gap, even around a moved ball',()=>{
    const tracks=lorenzTracks(lorenzField());assert.equal(tracks.length,2);
    for(const obstacles of [[],[{x:110,y:145,radius:20}],[{x:155,y:65,radius:18}]])for(const track of tracks) {
        const points=curvePoints(bendField(track,obstacles));
        assert.deepEqual(points[0],points.at(-1));
        assert.ok(Math.min(...points.map(p=>p[1]))<80&&Math.max(...points.map(p=>p[1]))>140,'each color visits both lobes');
        const a=pointAlong(points,.99999),b=pointAlong(points,.00001);
        assert.ok(Math.hypot(a.x-b.x,a.y-b.y)<.05,'wraparound must be continuous');
        const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));
        assert.ok(Math.max(...lengths)<4,'no closing chord or sharp step');
    }
});
test('Lorenz stays wholly inside the left margin',()=>{
    for(const gutter of [95,110,160,250,320,700]) {
        const p=lorenzPlacement(gutter);
        assert.ok(p.width>60);assert.ok(p.left>=12);assert.ok(p.left+p.width<=gutter-12);assert.ok(p.height>p.width*1.5);
    }
});
test('a floating twig turns gently into nearby flow and stays still while grabbed',()=>{
    const line=Array.from({length:50},(_,i)=>[i*3,i*3]);
    assert.equal(flowHeading([line],40,40),45);assert.equal(flowHeading([line],400,40),null);
    let angle=0;for(let i=0;i<100;i++)angle=turnWithFlow(angle,70,.05);
    assert.ok(angle>68&&angle<70);assert.ok(turnWithFlow(0,70,.05)<5,'no abrupt rotation');
    const item={matches:()=>true,classList:{contains:()=>true},style:{},dataset:{}};
    driftPieces([{element:item,body:{x:40,y:40,radius:8}}],[line],.05);
    assert.equal(item.style.rotate,undefined,'held object does not turn');
    item.classList.contains=()=>false;item.classList.add=()=>{};item.dataset.currentAngle='0';
    for(let i=0;i<100;i++)driftPieces([{element:item,body:{x:40,y:40,radius:8}}],[line],.05,()=>0);
    assert.ok(parseFloat(item.style.rotate)>24&&parseFloat(item.style.rotate)<25,'align with the river, not the self-distorted diagonal');
});
test('Beam emits from exterior contours, without an inner-eye ripple',()=>{
    const square=(x,y,s)=>[[x,y],[x+s,y],[x+s,y+s],[x,y+s],[x,y]];
    const outside=square(0,0,10),hole=square(2,2,6),pupil=square(4,4,2),separate=square(20,0,8);
    assert.deepEqual(exteriorContours([outside,hole,pupil,separate]),[outside,separate]);
});
test('the six omitted image studies stay out of the gallery without changing publication fixtures',()=>{
    for(const id of ['chen2022semi','cohen2021riemannian','paulus2021comboptnet','chen2021neural','sercu2020neural','amos2019limited'])assert.equal(imageStudy(`/images/${id}.png`,'title').show,false);
    assert.deepEqual(imageStudy('/images/reflection2026beam.png','report'),{show:true,title:'Beam'});
});
