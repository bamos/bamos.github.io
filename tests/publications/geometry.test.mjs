import test from 'node:test';
import assert from 'node:assert/strict';
import {abstractOutline} from '../../js/publication-abstracts.js';

test('abstract outlines handle wide, tall, small and absent image corners without invalid geometry',()=>{
    for(const width of [120,268,500,900])for(const height of [8,20,44,120,300])for(const imageWidth of [0,60,100])for(const bottom of [0,6,24,100,400]) {
        const path=abstractOutline(width,height,width-imageWidth,bottom);
        assert.ok(!/NaN|Infinity/.test(path));assert.ok(path.endsWith('Z'));
    }
});
test('an image taller than the abstract leaves no empty lower shelf',()=>{
    for(const height of [20,44,120]) {
        assert.equal(abstractOutline(900,height,650,height+20),abstractOutline(650,height));
        assert.notEqual(abstractOutline(900,300,650,70),abstractOutline(650,300));
    }
});

test('a shallow image notch never doubles back vertically', () => {
    for (const depth of [0.1, 0.5, 1, 6, 7.9140625, 12, 23, 24, 30, 70]) {
        const path = abstractOutline(730, 280, 572, depth);
        const notch = path.match(/^M[^H]+H[^Q]+Q([^ ]+) ([^V]+)V([^Q]+)Q([^ ]+) ([^H]+)/);
        assert.ok(notch, `Missing notch at depth ${depth}`);
        const y = [0.5, ...[notch[1], notch[2], notch[3], notch[4], notch[5]]
            .map(point => Number(point.split(',').at(-1)))];
        for (let i = 1; i < y.length; i++) {
            assert.ok(y[i] >= y[i - 1], `Notch doubles back at depth ${depth}: ${y}`);
        }
    }
});
