import test from 'node:test';
import assert from 'node:assert/strict';
import { distanceField, contoursAt } from '../src/distance-field.js';
import { clickContours, clickShapes, waveOpacity, waveDistance } from '../src/ripple-geometry.js';
import { objectPositions, backgroundOffset } from '../src/layout.js';

function field(w, h, solid) {
    return distanceField(Uint8Array.from({ length:w*h }, (_, i) => solid(i % w, Math.floor(i / w)) ? 1 : 0), w, h);
}
test('distance field matches Euclidean distances, including empty masks', () => {
    const f = field(17, 13, (x,y) => x === 4 && y === 5 || x === 12 && y === 9);
    for (let y=0;y<13;y++) for(let x=0;x<17;x++) {
        assert.ok(Math.abs(f.values[y*17+x] - Math.min(Math.hypot(x-4,y-5),Math.hypot(x-12,y-9))) < 1e-5);
    }
    assert.ok(field(10,10,()=>false).values.every(Number.isFinite));
    assert.equal(contoursAt(field(10,10,()=>false),1).length,0);
});

test('disconnected islands merge as one wave instead of crossing', () => {
    const f = field(80,70,(x,y) => Math.hypot(x-26,y-35)<6 || Math.hypot(x-47,y-35)<6);
    assert.equal(contoursAt(f,1).length,2);
    assert.equal(contoursAt(f,8).length,1);
});

test('concave silhouettes, thin sticks, and holes produce finite, closed fronts', () => {
    const shapes = [
        (x,y) => x>20 && x<45 && y>20 && y<45 && !(x>30 && y<35),
        (x,y) => x>20 && x<50 && Math.abs(y-x)<1.5,
        (x,y) => Math.hypot(x-35,y-35)<12 && Math.hypot(x-35,y-35)>6,
        (x,y) => x>20 && x<50 && y>20 && y<45
    ];
    shapes.forEach(solid => {
        const f = field(80,80,solid);
        for(const level of [.6,2,5,10]) {
            const loops = contoursAt(f,level);
            assert.ok(loops.length);
            loops.forEach(points => points.forEach((p,i) => {
                assert.ok(p.every(Number.isFinite));
                assert.ok(Math.hypot(p[0]-points[(i+1)%points.length][0],p[1]-points[(i+1)%points.length][1])<=Math.SQRT2+1e-6, 'no jumps or spikes');
            }));
        }
    });
});

test('every click design is repeatable by seed and actually varies', () => {
    for (const shape of clickShapes) {
        assert.deepEqual(clickContours(shape,7,.6),clickContours(shape,7,.6));
        assert.notDeepEqual(clickContours(shape,7,.6),clickContours(shape,8,.6));
        assert.ok(clickContours(shape,7,.6).flat(2).every(Number.isFinite));
    }
    assert.deepEqual(clickShapes,['organic']);
    for(let seed=0;seed<30;seed++) {
        const contours=clickContours('organic',seed,.6);assert.equal(contours.length,1);
        for(const [x,y] of contours[0])assert.ok(Math.hypot(x,y)>.85&&Math.hypot(x,y)<1.1);
    }
});

test('a drop has one brightness peak and a continuously advancing wavefront', () => {
    const brightness = Array.from({length:301},(_,i)=>waveOpacity(i/100));
    const peak=brightness.indexOf(Math.max(...brightness));
    for(let i=peak+1;i<brightness.length;i++) assert.ok(brightness[i]<=brightness[i-1]);
    assert.equal(brightness.at(-1),0);
    for(let i=1;i<=300;i++) assert.ok(waveDistance(i/100)>waveDistance((i-1)/100));
});

test('default distribution has at most two objects in any viewport', () => {
    for(const height of [650,844,1000]) for(const end of [12000,45000]) {
        const positions = objectPositions(19,height,end);
        for(let y=0;y<end;y+=20) assert.ok(positions.filter(p=>p+90>y&&p<y+height).length<=2);
        assert.deepEqual(positions,objectPositions(19,height,end),'scroll cannot change identity or position');
    }
});

test('parallax reverses without discontinuities and is slower than scroll', () => {
    for(let y=0;y<60000;y+=100) {
        assert.ok(Math.abs(backgroundOffset(y))<=70);
        assert.ok(Math.abs(backgroundOffset(y+1)-backgroundOffset(y))<.06);
    }
    assert.ok(backgroundOffset(0) === 0);
});
