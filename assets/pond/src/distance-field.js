// Pure geometry: shared by the website, deterministic studies, and Node tests.
// Squared Euclidean distance transform (separable lower envelope of parabolas).
export function distanceField(mask, width, height) {
    const size = Math.max(width, height), f = new Float64Array(size);
    const d = new Float64Array(size), v = new Int32Array(size), z = new Float64Array(size + 1);
    const field = new Float32Array(width * height);
    function transform(n) {
        let k = 0;
        v[0] = 0; z[0] = -Infinity; z[1] = Infinity;
        for (let q = 1; q < n; q++) {
            let s;
            do {
                const p = v[k];
                s = ((f[q] + q * q) - (f[p] + p * p)) / (2 * (q - p));
                if (s > z[k]) break;
                k--;
            } while (k >= 0);
            k++; v[k] = q; z[k] = s; z[k + 1] = Infinity;
        }
        k = 0;
        for (let q = 0; q < n; q++) {
            while (z[k + 1] < q) k++;
            d[q] = (q - v[k]) ** 2 + f[v[k]];
        }
    }
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) f[y] = mask[y * width + x] ? 0 : 1e12;
        transform(height);
        for (let y = 0; y < height; y++) field[y * width + x] = d[y];
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) f[x] = field[y * width + x];
        transform(width);
        for (let x = 0; x < width; x++) field[y * width + x] = Math.sqrt(d[x]);
    }
    return { values: field, width, height };
}

// Marching squares, with shared edge IDs so contours stay closed as separate
// silhouettes merge. Unlike vertex normals this cannot produce offset spikes.
export function contoursAt({ values, width, height }, level) {
    const nodes = new Map(), segments = [];
    function connect(a, b) {
        const i = segments.length; segments.push([a, b]);
        for (const p of [a, b]) {
            if (!nodes.has(p.id)) nodes.set(p.id, []);
            nodes.get(p.id).push(i);
        }
    }
    for (let y = 0; y < height - 1; y++) for (let x = 0; x < width - 1; x++) {
        const i = y * width + x;
        const code = (values[i] < level ? 1 : 0) | (values[i + 1] < level ? 2 : 0) |
            (values[i + width + 1] < level ? 4 : 0) | (values[i + width] < level ? 8 : 0);
        if (code === 0 || code === 15) continue;
        const samples = [values[i], values[i + 1], values[i + width + 1], values[i + width]];
        const corners = [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]];
        const edgeIDs = [i * 2, (i + 1) * 2 + 1, (i + width) * 2, i * 2 + 1];
        const hits = [];
        for (let e = 0; e < 4; e++) {
            const n = (e + 1) % 4, a = samples[e], b = samples[n];
            if ((a < level) === (b < level)) continue;
            const t = (level - a) / (b - a);
            hits.push({ id: edgeIDs[e], point: corners[e].map((p, axis) => p + t * (corners[n][axis] - p)) });
        }
        if (hits.length === 2) connect(...hits);
        if (hits.length === 4) {
            // Resolve the saddle without crossing segments.
            if ((samples[0] < level) === ((samples.reduce((a, b) => a + b) / 4) < level)) {
                connect(hits[0], hits[1]); connect(hits[2], hits[3]);
            } else { connect(hits[0], hits[3]); connect(hits[1], hits[2]); }
        }
    }
    const used = new Set(), loops = [];
    segments.forEach((segment, index) => {
        if (used.has(index)) return;
        const first = segment[0]; let current = first, edge = index;
        const points = [];
        while (!used.has(edge)) {
            used.add(edge); points.push(current.point);
            const pair = segments[edge]; current = pair[0].id === current.id ? pair[1] : pair[0];
            if (current.id === first.id) break;
            edge = nodes.get(current.id).find(candidate => !used.has(candidate));
            if (edge === undefined) break;
        }
        if (current.id === first.id && points.length > 5) loops.push(points);
    });
    return loops;
}
