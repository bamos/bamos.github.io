import test from 'node:test';
import assert from 'node:assert/strict';
import {interactionRegion,mobileItemAllowed,portraitField} from '../src/mobile-policy.js';

test('mobile pond interaction ends at the introduction; desktop remains available throughout',()=>{
    for(const width of [320,390,491,767]) {
        assert.equal(interactionRegion(width,650,0).active,true);
        assert.equal(interactionRegion(width,650,651).active,false);
        assert.equal(interactionRegion(width,650,900).visibleHeight,0);
        assert.equal(mobileItemAllowed(width,650,100,true),true,'portrait and Möbius ball remain draggable');
        assert.equal(mobileItemAllowed(width,650,100,false),false,'publication images use their ordinary links and scroll');
        assert.equal(mobileItemAllowed(width,650,700,true),false);
    }
    assert.equal(interactionRegion(1440,650,14000).active,true);
    assert.equal(mobileItemAllowed(1440,650,14000,false),true);
});
test('mobile Möbius fits beside the portrait, without touching it or the page edge',()=>{
    for(const width of [320,375,390,491,767]) {
        const portrait={right:230,top:94,height:200},field=portraitField(width,portrait);
        assert.ok(field.left>=portrait.right+8);assert.ok(field.left+field.width<=width-12);
        assert.ok(field.top>=portrait.top);assert.ok(field.top+field.height<=portrait.top+portrait.height);
        assert.equal(field.width,width-portrait.right-20,'fill all available horizontal room');
        assert.equal(field.height,portrait.height-8,'use the full portrait height');
    }
});
