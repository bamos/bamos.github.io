import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

test('review tools and tests are excluded from the published site', async () => {
    const yaml = await readFile(new URL('../../../_config.yml',import.meta.url),'utf8');
    for(const path of ['assets/pond/review','assets/pond/tests','assets/pond/package.json','assets/pond/VALIDATION.md']) assert.ok(yaml.includes('  - '+path));
    const files = await readdir(new URL('../src/',import.meta.url));
    for(const file of files) {
        const source = await readFile(new URL('../src/'+file,import.meta.url),'utf8');
        assert.ok(!source.includes('/review/'),'production cannot depend on review tools');
        assert.ok(!source.includes('window.WaterShapes'),'no feature namespace leaked onto window');
    }
});

test('pond feature contains no generated raster images or recordings', async () => {
    const files = await readdir(new URL('../', import.meta.url), { recursive: true });
    assert.deepEqual(files.filter(file => /\.(png|jpe?g|gif|webp|mp4|webm)$/i.test(file)), []);
});
