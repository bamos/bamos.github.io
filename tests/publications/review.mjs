// Local browser layout regressions using production markup, CSS and JavaScript.
// Run after `bundle exec jekyll build`, then open http://127.0.0.1:4003/.
// No generated files or screenshots are written into the repository.
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../../',import.meta.url));
const ids=['amos2021modelbased','atanackovic2024meta','haviv2024wasserstein','reflection2026beam','cohen2021riemannian','chen2021learning'];
const widths=[320,390,767,768,1024,1440];
const html=await readFile(path.join(root,'_site/index.html'),'utf8');
const rows=ids.map(id=>html.match(new RegExp(`<tr id="tr-${id}"[\\s\\S]*?</tr>`))?.[0]).filter(Boolean);
if(rows.length!==ids.length)throw new Error('Missing publication fixture');
const types={'.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml','.woff':'font/woff','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
    try {
        const url=new URL(req.url,'http://localhost');let body,type='text/html';
        if(url.pathname==='/') {
            body=`<!doctype html><meta charset="utf-8"><title>Publication wrapping regressions</title><style>body{font:16px system-ui;margin:24px}iframe{display:block;height:900px;border:1px solid #ddd;margin:16px 0}pre{white-space:pre-wrap}</style><h1>Publication wrapping regressions</h1><p id="result">Checking 72 cases…</p><pre id="details"></pre>`;
            body+=widths.map(width=>['long','short'].map(variant=>`<h2>${width}px · ${variant}</h2><iframe title="${width}px ${variant}" width="${width}" src="/fixture?width=${width}&variant=${variant}"></iframe>`).join('')).join('');
            body+=`<script>const results=new Map();addEventListener('message',e=>{if(e.origin!==location.origin||!e.data.publicationResults)return;results.set(e.data.key,e.data);const cases=[...results.values()].flatMap(r=>r.cases);const failures=cases.filter(c=>c.errors.length);document.querySelector('#result').textContent=cases.length+'/72 cases checked — '+failures.length+' failures';document.querySelector('#details').textContent=failures.map(c=>c.name+': '+c.errors.join('; ')).join('\\n')||'All measured clearances and image positions pass.';document.body.dataset.complete=String(results.size===12);document.body.dataset.failures=String(failures.length);});</script>`;
        }else if(url.pathname==='/fixture') {
            const variant=url.searchParams.get('variant');
            const script=await readFile(new URL('./validate.js',import.meta.url),'utf8');
            body=`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/vendor/css/bootstrap.min.css"><link rel="stylesheet" href="/css/bamos.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700&display=swap"><style>body{padding-top:12px}.case-result{font:12px system-ui;color:#284a63;padding:12px}</style>${url.searchParams.has('bad-gap')?'<style>.publicationImg{margin-bottom:32px!important}</style>':''}<main class="container"><div class="row"><div class="col-md-10 col-md-offset-1">${rows.map(row=>'<table class="table"><tbody>'+row+'</tbody></table>').join('')}</div></div></main><script type="module">${script}\nvalidate(${JSON.stringify(variant)});</script>`;
        }else {
            if(!['/css/','/js/','/images/','/vendor/'].some(prefix=>url.pathname.startsWith(prefix)))throw new Error('Not found');
            const target=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!target.startsWith(root))throw new Error('Not found');
            body=await readFile(target);type=types[path.extname(target)]||'application/octet-stream';
        }
        res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});res.end(body);
    }catch(error){res.writeHead(404);res.end(error.message);}
}).listen(4003,'127.0.0.1',()=>console.log('Publication layout review: http://127.0.0.1:4003/'));
