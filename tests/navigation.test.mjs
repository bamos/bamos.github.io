import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import '../js/home-view.js';

const {parseViewHash, formatViewHash} = globalThis.homeView;

test('section and biography choices survive a shared URL', () => {
    for (const [section, fragment] of [
        ['publications', '#publications'], ['code', '#code'],
        ['talks', '#talks'], [null, '#collapsed'],
    ]) {
        for (const formalBio of [false, true]) {
            const hash = fragment + (formalBio ? '+formal' : '');
            assert.equal(formatViewHash(section, formalBio), hash);
            const parsed = parseViewHash(hash);
            assert.equal(parsed.section, section);
            assert.equal(parsed.formalBio, formalBio);
        }
    }
});

test('the default page opens Publications, and #formal independently enables its formal biography', () => {
    assert.equal(parseViewHash('').section, 'publications');
    assert.equal(parseViewHash('').formalBio, false);
    assert.deepEqual(parseViewHash('#formal'), {section: 'publications', formalBio: true, anchor: ''});
    assert.equal(parseViewHash('#formal+code').section, 'code');
    assert.equal(parseViewHash('#code+bio').formalBio, true);
});

test('year, publication, and legacy heading links keep their original anchors', () => {
    for (const anchor of ['publications-2021', 'tr-amos2021modelbased', '-talks']) {
        const parsed = parseViewHash('#' + anchor + '+formal');
        assert.equal(parsed.anchor, anchor);
        assert.equal(parsed.formalBio, true);
    }
});

test('encoded and malformed fragments do not break navigation', () => {
    assert.equal(parseViewHash('#code%2Bformal').formalBio, true);
    assert.doesNotThrow(() => parseViewHash('#%broken'));
});

test('the initial view is applied before the interactive module or page content loads', () => {
    const bootstrap = readFileSync(new URL('../js/home-view.js', import.meta.url), 'utf8');
    for (const [hash, section, formal] of [
        ['#talks', 'talks', 'false'], ['#talks+formal', 'talks', 'true'],
        ['#code+bio', 'code', 'true'], ['#collapsed+formal', 'collapsed', 'true'],
        ['#-talks+formal', 'talks', 'true'], ['', 'publications', 'false'],
    ]) {
        const dataset = {};
        vm.runInNewContext(bootstrap, {
            document: {documentElement: {dataset}}, location: {hash},
        });
        assert.deepEqual(dataset, {homeSection: section, homeFormal: formal});
    }
});
