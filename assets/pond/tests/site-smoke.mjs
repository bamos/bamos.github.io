// Run after `bundle exec jekyll build`. Inspect actual output, including paths
// injected by Liquid, so missing fixture assets cannot silently disappear.
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
const root=new URL('../../../_site/',import.meta.url);
const html=await readFile(new URL('index.html',root),'utf8');
const post=await readFile(new URL('pond/index.html',root),'utf8');
for(const id of ['publications','code','talks'])assert.ok(html.includes(`id="${id}"`));
assert.ok(html.includes('/assets/pond/src/index.js'));assert.ok(!post.includes('/assets/pond/src/index.js'));
assert.ok(post.includes('/assets/pond/src/gallery.js'));assert.ok(/November\s+7, 2026/.test(post));
const homeImages=[...html.matchAll(/<img src="([^"]+)" class="publicationImg"/g)].map(m=>'/'+m[1].replace(/^\//,''));
const fixtures=[...post.matchAll(/data-gallery-publication src="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(fixtures,homeImages,'every homepage publication image must be available to the gallery');
for(const path of fixtures)await access(new URL(path.slice(1),root));
const checked=new Set();
async function moduleExists(path){
    if(checked.has(path.href))return;checked.add(path.href);
    const source=await readFile(path,'utf8');
    for(const match of source.matchAll(/from ['"](\.[^'"]+)['"]/g))await moduleExists(new URL(match[1],path));
}
for(const entry of ['index','gallery'])await moduleExists(new URL(`assets/pond/src/${entry}.js`,root));
for(const page of [html,post])for(const match of page.matchAll(/href="(\/assets\/pond\/[^\"]+\.css)"/g))await access(new URL(match[1].slice(1),root));
for(const privatePath of ['review','tests','VALIDATION.md','AGENTS.md'])await assert.rejects(access(new URL(`assets/pond/${privatePath}`,root)));
console.log(`Site smoke checks passed: ${fixtures.length} image fixtures, ${checked.size} shared modules, clean section links, and private tooling excluded.`);
