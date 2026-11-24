// Generated review pages live outside the repository. No screenshot/image
// generation is part of a build, and nothing here is shipped by Jekyll.
import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';

const repo = fileURLToPath(new URL('../../../', import.meta.url));
const output = process.env.POND_REVIEW_DIR || path.join(os.homedir(), '.codex', 'pond-review');
if (path.resolve(output) === path.resolve(repo) || path.resolve(output).startsWith(path.resolve(repo) + path.sep)) throw new Error('Review output must be outside the Git repository');
await mkdir(output, { recursive: true });
async function generate() {
    let scene = await readFile(path.join(repo, '_includes/pond/scene.html'), 'utf8');
    for (const name of ['symbols','background','objects','fields']) scene = scene.replace(`{% include pond/${name}.html %}`, await readFile(path.join(repo, `_includes/pond/${name}.html`), 'utf8'));
    const index = await readFile(path.join(repo, 'index.md'), 'utf8');
    const images = [...index.matchAll(/<img\s+src="([^"]+)"\s+class="publicationImg"[^>]*>/g)].map(match => match[1]);
    const html = (await readFile(new URL('./template.html', import.meta.url), 'utf8'))
        .replace('<!-- FIXTURES -->', scene + '<img class="index-profile-img" src="/images/me.jpg" alt="Headshot">' + images.map(src => `<img class="publicationImg" src="/${src}" alt="${path.basename(src)}">`).join(''));
    await writeFile(path.join(output, 'pond-review.html'), html);
}
await generate();
const types = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
    try {
        const url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        if (url === '/') await generate();
        const target = url === '/' ? path.join(output, 'pond-review.html') : path.resolve(repo, '.' + url);
        if (url !== '/' && (!target.startsWith(repo) || !['/assets/pond/', '/images/'].some(prefix => url.startsWith(prefix)))) {
            res.writeHead(404); res.end(); return;
        }
        const bytes = await readFile(target);
        res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(bytes);
    } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(Number(process.env.POND_REVIEW_PORT || 4001), '127.0.0.1', () => console.log(`Pond review: http://127.0.0.1:${server.address().port}/\nGenerated page: ${path.join(output, 'pond-review.html')}`));
