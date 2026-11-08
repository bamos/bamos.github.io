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
