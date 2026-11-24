import test from 'node:test';
import assert from 'node:assert/strict';
import { currentFlow } from '../src/current-flow.js';
import { bendField } from '../src/field-bending.js';
import { createCurrentRenderer } from '../src/currents.js';
import { createLorenzRenderer, lorenzField } from '../src/lorenz.js';
import { strokeProfile, strokeLifetime } from '../src/stroke-waves.js';
import { bounceContacts } from '../src/collisions.js';
import { createSwimmer, advanceSwimmer } from '../src/swimmer-motion.js';
import { abstractOutline } from '../../../js/publication-abstracts.js';
class Node {
    children=[];attributes={};
    setAttribute(name,value){this.attributes[name]=String(value);}
    append(...nodes){this.children.push(...nodes);} prepend(...nodes){this.children.unshift(...nodes);}
    replaceChildren(...nodes){this.children=nodes;}
}
function svgDocument(){globalThis.document={createElementNS:()=>new Node()};return new Node();}
const input={width:800,height:1200,anchorX:650,anchorY:300,ball:{x:650,y:300,radius:24}};

test('current stays continuous near spheres, at the edge, and outside its channel',()=>{
    for(const width of [320,800,1440])for(const [dx,dy]of [[0,0],[-70,0],[40,-85],[60,80],[125,20],[-250,-40]]) {
        const ball={x:width-150+dx,y:300+dy,radius:24};
        const flow=currentFlow({...input,width,anchorX:width-150,ball});assert.equal(flow.paths.length,25);
        for(const path of flow.paths){
            assert.ok(path.length<1201,'no trapped streamline');
            path.forEach(([x,y],i)=>{
                assert.ok(Number.isFinite(x)&&Number.isFinite(y));
                assert.ok(Math.hypot(x-ball.x,y-ball.y)>=ball.radius+1.4,'no line through the sphere');
                if(i)assert.ok(Math.hypot(x-path[i-1][0],y-path[i-1][1])<=1.401,'no long connecting artifacts');
            });
        }
    }
});
test('river entrance and bounds stay fixed when the ball moves; drawing leaves it unchanged',()=>{
    const original=currentFlow(input),moved=currentFlow({...input,ball:{x:550,y:350,radius:24}});
    assert.deepEqual(original.paths.map(p=>p[0]),moved.paths.map(p=>p[0]));
    assert.equal(original.top,moved.top);assert.equal(original.bottom,moved.bottom);assert.notDeepEqual(original.paths,moved.paths);
    assert.deepEqual(original,currentFlow({...input,disturbances:[{x:640,y:280,age:2}]}));
});
test('a passing object bends the flow and its removal restores the original field',()=>{
    const original=currentFlow(input),fish={x:725,y:395,radius:16};
    const changed=currentFlow({...input,obstacles:[fish]});assert.notDeepEqual(changed.paths,original.paths);
    for(const [x,y]of changed.paths.flat())assert.ok(Math.hypot(x-fish.x,y-fish.y)>fish.radius);
    assert.deepEqual(currentFlow({...input,obstacles:[]}),original);
});
test('current renderer moves a steady tracer over fixed geometry without accumulating nodes',()=>{
    const svg=svgDocument(),draw=createCurrentRenderer(svg);draw(input,0);
    const count=svg.children.length,geometry=svg.children.slice(0,25).map(p=>p.attributes.d);
    const particle=svg.children.at(-1),start=[Number(particle.attributes.cx),Number(particle.attributes.cy)];draw(input,1);
    assert.deepEqual(svg.children.slice(0,25).map(p=>p.attributes.d),geometry);assert.equal(svg.children.length,count);
    const distance=Math.hypot(Number(particle.attributes.cx)-start[0],Number(particle.attributes.cy)-start[1]);
    assert.ok(distance>0&&distance<36,'no chaotic jumps');
});
test('Lorenz has fixed dense geometry, two colored tracks, and steady particles',()=>{
    const svg=svgDocument(),draw=createLorenzRenderer(svg),ball={x:76,y:155,radius:13};assert.equal(lorenzField().length,2500);
    draw(0,[ball]);const geometry=svg.children[0].attributes.d,count=svg.children.length;
    const particles=svg.children.filter(n=>'r'in n.attributes),before=particles.map(p=>[Number(p.attributes.cx),Number(p.attributes.cy)]);
    draw(1,[ball]);assert.equal(svg.children[0].attributes.d,geometry);assert.equal(svg.children.length,count);assert.equal(particles.length,2);
    assert.deepEqual(particles.map(p=>p.attributes.fill),['#d86779','#648ba5']);
    particles.forEach((p,i)=>assert.ok(Math.hypot(Number(p.attributes.cx)-before[i][0],Number(p.attributes.cy)-before[i][1])<26));
    draw(1,[{...ball,x:100}]);assert.notEqual(svg.children[0].attributes.d,geometry);
    for(const [x,y]of bendField(lorenzField(),[ball]))assert.ok(Math.hypot(x-ball.x,y-ball.y)>=ball.radius+1.49);
});
test('drawn ripples spread continuously and fully disappear after ten seconds',()=>{
    let previous=strokeProfile(0);for(let t=.1;t<=10.1;t+=.1){const p=strokeProfile(t);assert.ok(p.distance>=previous.distance);assert.ok(p.opacity<=previous.opacity);previous=p;}
    assert.equal(strokeLifetime,10);assert.equal(strokeProfile(10).opacity,0);assert.equal(strokeProfile(10).alive,false);
});
test('swimmers bounce off text and objects at arbitrary angles without gaining speed',()=>{
    const bounds={left:0,right:800,top:0,bottom:800},body={x:75,y:200,width:20,height:20,radius:12,vx:8,vy:3,bounds};
    bounceContacts(body,[{left:90,right:300,top:150,bottom:300}]);assert.equal(body.vx,-8);assert.equal(body.vy,3);assert.ok(body.x+10+12<90);
    const fish={x:120,y:120,width:20,height:20,radius:12,vx:8,vy:6,bounds};bounceContacts(fish,[{x:145,y:145,radius:16}]);
    assert.ok(Math.abs(Math.hypot(fish.vx,fish.vy)-10)<1e-9);assert.ok(fish.vx<0&&fish.vy<0);
});
test('abstract outline adapts around a fixed image and handles small mobile boxes',()=>{
    for(const [w,h,x,y]of [[800,300,600,100],[320,80,260,50],[100,40,80,120]]){
        const outline=abstractOutline(w,h,x,y);assert.ok(!/NaN|Infinity/.test(outline));assert.ok(outline.endsWith('Z'));assert.notEqual(outline,abstractOutline(w,h));
    }
});

test('every current streamline exits off the side after downstream and edge drags',()=>{
    for(const width of [250,320,520,1440])for(const height of [360,1000])for(const [dx,dy]of [[0,0],[-65,160],[-5,240],[45,190]]) {
        const anchorY=Math.min(300,height*.52),ball={x:width-50+dx,y:anchorY+dy,radius:40};
        const flow=currentFlow({width,height,anchorX:width-90,anchorY,ball});
        for(const path of flow.paths) {
            assert.ok(path.at(-1)[0]>width+18,'no visible downstream stub');
            assert.ok(path.length<1201,'must exit before iteration limit');
            for(const [x,y]of path)if(x<=width)assert.ok(y+1<flow.bottom,'stroke stays inside its SVG surface');
        }
    }
});
