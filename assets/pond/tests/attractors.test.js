import test from 'node:test';
import assert from 'node:assert/strict';
import {attractorDefinition} from '../src/attractors.js';
import {mobiusPoint} from '../src/mobius.js';

test('Möbius band has a half twist, one boundary and exactly one centerline',()=>{
    for(const v of [-.46,-.2,0,.2,.46]) {
        const a=mobiusPoint(0,-v),b=mobiusPoint(2*Math.PI,v);
        a.forEach((value,i)=>assert.ok(Math.abs(value-b[i])<1e-10));
    }
    const {points,tracks,lines,size}=attractorDefinition('mobius');
    assert.equal(tracks.length,1);assert.equal(tracks[0].length,241);
    assert.equal(lines.length,8);assert.equal(points.length,481);
    for(const line of [...lines,...tracks]) {
        assert.deepEqual(line[0],line.at(-1));assert.ok(line.flat().every(Number.isFinite));
        line.forEach(([x,y])=>assert.ok(x>0&&y>0&&x<size.width&&y<size.height));
    }
    assert.equal(attractorDefinition('mobius').points,points);
});
test('Möbius sphere starts on the band in margin and offset gallery layouts',async()=>{
    const {mobiusSpherePlacement}=await import('../src/mobius.js');
    const {touchesField}=await import('../src/field-contact.js');
    const track=attractorDefinition('mobius').tracks[0];
    for(const region of [
        {left:1117,top:9400,width:136,height:156},
        {left:1180,top:17000,width:244,height:280},
        {left:12,top:80,width:258,height:258},
        {left:33,top:14,width:402,height:402},
        {left:20,top:50,width:180,height:230}
    ])for(const size of [28,40,50]) {
        const home=mobiusSpherePlacement(region,size),center={x:home.left+size/2,y:home.top+size/2,radius:0};
        const path=track.map(([x,y])=>[region.left+x/240*region.width,region.top+y/240*region.height]);
        assert.ok(touchesField(center,[path],.1),'sphere center must lie on the actual rendered centerline');
        assert.ok(home.left>=region.left&&home.left+size<=region.left+region.width);
        assert.ok(home.top>=region.top&&home.top+size<=region.top+region.height);
    }
});

test('drops inside curved fields use flow feedback; the empty center and nearby open water still splash',async()=>{
    const {touchesField}=await import('../src/field-contact.js');
    const loop=Array.from({length:101},(_,i)=>[100+70*Math.cos(i*Math.PI/50),100+70*Math.sin(i*Math.PI/50)]);
    assert.equal(touchesField({x:165,y:100,radius:10},[loop]),true);
    assert.equal(touchesField({x:100,y:100,radius:10},[loop]),false,'do not use the bounding rectangle');
    assert.equal(touchesField({x:230,y:100,radius:10},[loop]),false);
    assert.equal(touchesField({x:50,y:50,radius:4},[[[0,0],[100,100]]]),true,'check segments even between sparse samples');
});

test('field drop detection uses pond coordinates, ignores hidden fields and cleans up',async()=>{
    const {registerField,dropsIntoField}=await import('../src/field-contact.js');
    const pond={getBoundingClientRect:()=>({left:200,top:300})};
    const field={getBoundingClientRect:()=>({width:240})};
    let rect={left:290,top:390,width:20,height:20};
    const item={closest:()=>pond,querySelector:()=>null,getBoundingClientRect:()=>rect};
    const contact=registerField(pond,field);contact.update([[[40,100],[160,100]]]);
    assert.equal(dropsIntoField(item),true);
    rect={...rect,top:490};assert.equal(dropsIntoField(item),false);
    rect={...rect,top:390};field.getBoundingClientRect=()=>({width:0});assert.equal(dropsIntoField(item),false);
    field.getBoundingClientRect=()=>({width:240});contact.destroy();assert.equal(dropsIntoField(item),false);
});

test('desktop Möbius stays within publications instead of falling into the final page slot',async()=>{
    const {publicationFieldTop}=await import('../src/layout.js');
    for(const [start,end,height]of [[514,9766,322],[600,15000,280],[850,22000,150],[300,1300,300]]) {
        const top=publicationFieldTop(start,end,height);
        assert.ok(top>start+(end-start)*.5,'keep the right/left/right field sequence');
        assert.ok(top+height<end,'finish before Code rather than drifting into Talks');
        assert.ok(top<start+(end-start)*.8,'stay visibly above the bottom of publications');
    }
});
test('portrait Möbius fills its region, has a broader band, and keeps its sphere on the sole centerline',async()=>{
    const {mobiusDefinition,mobiusSpherePlacement}=await import('../src/mobius.js');
    const {portraitField}=await import('../src/mobile-policy.js');
    const {touchesField}=await import('../src/field-contact.js');
    assert.equal(mobiusDefinition().lines.length,8,'desktop and gallery keep their existing projection');
    // Both narrow and landscape spaces use their own fitted projection; also
    // exercise a fixed-size portrait to catch cramped embedding regressions.
    for(const [width,right,height] of [[320,180,196],[375,210,236],[390,218,246],[491,230,260],[767,230,260],[320,230,260]]) {
        const field=portraitField(width,{right,top:94,height});
        const options={portrait:true,wide:field.width>field.height};
        const definition=mobiusDefinition(options);
        assert.equal(definition.tracks.length,1);assert.equal(definition.lines.length,12);
        assert.equal(mobiusDefinition(options),definition,'reuse geometry when resizing within one orientation');
        const path=definition.points.map(([x,y])=>[field.left+x/240*field.width,field.top+y/240*field.height]);
        const xs=path.map(p=>p[0]),ys=path.map(p=>p[1]);
        assert.ok(Math.max(...xs)-Math.min(...xs)>=field.width*.94);
        assert.ok(Math.max(...ys)-Math.min(...ys)>=field.height*.94);
        const size=Math.max(24,Math.min(58,Math.min(field.width,field.height)*.3));
        const sphere=mobiusSpherePlacement(field,size,options);
        assert.ok(sphere.left>=field.left&&sphere.left+size<=field.left+field.width);
        assert.ok(sphere.top>=field.top&&sphere.top+size<=field.top+field.height);
        const track=definition.tracks[0].map(([x,y])=>[field.left+x/240*field.width,field.top+y/240*field.height]);
        assert.ok(touchesField({x:sphere.left+size/2,y:sphere.top+size/2,radius:0},[track],.1));
    }
});
