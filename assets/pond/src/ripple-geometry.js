// Seeded click shapes, wave envelope, and silhouette width. No DOM dependencies.
export function clickContours(shape, seed = 0, age = 0) {
    const angle = Math.sin(seed * 1.9) * .12, stretch = 1 + Math.sin(seed) * .025;
    const points = Array.from({length:128},(_,i)=>{
        const t=i/128*Math.PI*2;
        const r=1+.024*Math.sin(t*3+seed+age*.25)+.009*Math.cos(t*5-seed);
        return [Math.cos(t)*r,Math.sin(t)*.96*r];
    });
    return [points.map(([x,y])=>[stretch*(x*Math.cos(angle)-y*Math.sin(angle)),x*Math.sin(angle)+y*Math.cos(angle)])];
}

export const clickShapes = ['organic'];
export const waveOpacity = age => .34 * Math.min(1, age / .16) * Math.max(0, 1 - age / 3) ** 1.6;
export const waveDistance = age => 25 * age + 5 * (1 - Math.exp(-age * 3));

export function footprintRadius(points, center, direction) {
    const [dx,dy]=direction, length=Math.hypot(dx,dy)||1;
    return Math.max(0,...points.map(([x,y])=>Math.abs((x-center[0])*(-dy/length)+(y-center[1])*(dx/length))));
}
