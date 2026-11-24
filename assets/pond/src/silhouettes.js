/* Small, cached silhouettes. No image pixels are processed in the animation loop. */

    var cache = new WeakMap(), resolved = new WeakMap();
    function trace(image, source, viewBox) {
        var ratio = viewBox ? viewBox.width / viewBox.height : image.naturalWidth / image.naturalHeight;
        var w = Math.max(8, Math.round(192 * Math.min(1, ratio)));
        var h = Math.max(8, Math.round(192 / Math.max(1, ratio)));
        var sample = document.createElement('canvas');
        sample.width = w + 2; sample.height = h + 2;
        var c = sample.getContext('2d', { willReadFrequently: true });
        var radius = parseFloat(getComputedStyle(source).borderTopLeftRadius) || 0;
        if (radius && !viewBox) {
            c.beginPath(); c.roundRect(1, 1, w, h, radius * w / (source.clientWidth || w)); c.clip();
        }
        c.drawImage(image, 1, 1, w, h);
        var pixels = c.getImageData(0, 0, w + 2, h + 2).data;
        function solid(x, y) { return pixels[(y * (w + 2) + x) * 4 + 3] > 40; }
        var edges = new Map();
        function edge(x, y, nx, ny) {
            var key = x + ',' + y;
            if (!edges.has(key)) edges.set(key, []);
            edges.get(key).push([nx, ny]);
        }
        for (var y = 1; y <= h; y++) for (var x = 1; x <= w; x++) {
            if (!solid(x, y)) continue;
            if (!solid(x, y - 1)) edge(x, y, x + 1, y);
            if (!solid(x + 1, y)) edge(x + 1, y, x + 1, y + 1);
            if (!solid(x, y + 1)) edge(x + 1, y + 1, x, y + 1);
            if (!solid(x - 1, y)) edge(x, y + 1, x, y);
        }
        var solidPixels=0;
        for(var sy=1;sy<=h;sy++)for(var sx=1;sx<=w;sx++)if(solid(sx,sy))solidPixels++;
        var contours = [];
        while (edges.size) {
            var first = edges.keys().next().value;
            var key = first, points = [], area = 0;
            do {
                var point = key.split(',').map(Number), choices = edges.get(key);
                if (!choices) break;
                var next = choices.pop();
                if (!choices.length) edges.delete(key);
                points.push(point);
                area += point[0] * next[1] - next[0] * point[1];
                key = next[0] + ',' + next[1];
            } while (key !== first && points.length < 65536);
            // Keep holes and disconnected pieces; the distance field merges them naturally.
            if (Math.abs(area) < 8 || points.length < 8) continue;
            var stride = Math.max(1, Math.ceil(points.length / 256));
            points = points.filter(function (_, i) { return i % stride === 0; });
            for (var pass = 0; pass < 2; pass++) points = points.map(function (p, i, all) {
                var a = all[(i + all.length - 1) % all.length], b = all[(i + 1) % all.length];
                return [(a[0] + 2 * p[0] + b[0]) / 4, (a[1] + 2 * p[1] + b[1]) / 4];
            });
            contours.push({ area: Math.abs(area), points: points.map(function (p) { return [(p[0] - 1) / w, (p[1] - 1) / h]; }) });
        }
        return { image: image, source: source, viewBox: viewBox, transparent: solidPixels < w*h*.995, contours: contours.sort(function (a, b) { return b.area - a.area; }).slice(0, 16).map(function (c) { return c.points; }) };
    }
    export function prepare(item) {
        if (cache.has(item)) return cache.get(item);
        var promise = (async function () {
            var source = item.tagName === 'IMG' ? item : item.querySelector('svg, img');
            if (!source) return null;
            if (source.tagName.toLowerCase() === 'svg') {
                var viewBox = source.viewBox.baseVal;
                var box = { x: viewBox.x, y: viewBox.y, width: viewBox.width, height: viewBox.height };
                var clone = source.cloneNode(true);
                clone.removeAttribute('class'); clone.removeAttribute('style');
                clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                clone.setAttribute('width', box.width); clone.setAttribute('height', box.height);
                clone.style.color = getComputedStyle(source).color;
                clone.prepend(document.querySelector('.water-contours defs').cloneNode(true));
                var url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' }));
                try {
                    var image = new Image(); image.src = url; await image.decode();
                    return trace(image, source, box);
                } finally { URL.revokeObjectURL(url); }
            }
            if (!source.complete) await source.decode();
            return trace(source, source, null);
        }()).catch(function () { return null; }).then(function (shape) { resolved.set(item, shape); return shape; });
        cache.set(item, promise);
        return promise;
    }
    function mapContours(item, shape) {
        var source = shape ? shape.source : item;
        var rect = source.getBoundingClientRect();
        var matrix = shape && shape.viewBox && source.getScreenCTM();
        var contours = shape && shape.contours.length ? shape.contours : [[[0, 0], [1, 0], [1, 1], [0, 1]]];
        var style = getComputedStyle(source);
        var left = parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft) || 0;
        var top = parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop) || 0;
        var right = parseFloat(style.borderRightWidth) + parseFloat(style.paddingRight) || 0;
        var bottom = parseFloat(style.borderBottomWidth) + parseFloat(style.paddingBottom) || 0;
        return contours.map(function (contour) {
            return contour.map(function (point) {
                if (matrix) {
                    var x = shape.viewBox.x + point[0] * shape.viewBox.width;
                    var y = shape.viewBox.y + point[1] * shape.viewBox.height;
                    return [matrix.a * x + matrix.c * y + matrix.e, matrix.b * x + matrix.d * y + matrix.f + window.scrollY];
                }
                return [rect.left + left + point[0] * (rect.width - left - right), rect.top + top + point[1] * (rect.height - top - bottom) + window.scrollY];
            });
        });
    }
export async function capture(item) { return mapContours(item, await prepare(item)); }
export function captureReady(item) { const shape=resolved.get(item); return shape ? mapContours(item,shape) : null; }
export function invalidate(item) { cache.delete(item); resolved.delete(item); }
