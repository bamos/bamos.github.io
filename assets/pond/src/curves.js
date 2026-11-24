// Rounded joins follow the sampled trajectory without polygonal corners.
export function curvePath(points, top = 0) {
    if (!points.length) return '';
    const pair = p => `${p[0].toFixed(2)},${(p[1]-top).toFixed(2)}`;
    const first=points[0],last=points.at(-1);
    if(points.length>3&&first[0]===last[0]&&first[1]===last[1]) {
        const loop=points.slice(0,-1),mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
        let path=`M${pair(mid(loop.at(-1),loop[0]))}`;
        loop.forEach((p,i)=>{path+=`Q${pair(p)} ${pair(mid(p,loop[(i+1)%loop.length]))}`;});
        return path+'Z';
    }
    let path = `M${pair(points[0])}`;
    for (let i=1; i<points.length-1; i++) {
        const p=points[i], next=points[i+1];
        path+=`Q${pair(p)} ${pair([(p[0]+next[0])/2,(p[1]+next[1])/2])}`;
    }
    return path+`L${pair(points.at(-1))}`;
}

// Sample the same rounded closed curve for both ink and particle travel. Sharing
// this polyline avoids a tracer cutting across a smoothed corner or the seam.
const sampled = new WeakMap();
export function curvePoints(points) {
    if(sampled.has(points))return sampled.get(points);
    if(points.length<4||points[0][0]!==points.at(-1)[0]||points[0][1]!==points.at(-1)[1])return points;
    const loop=points.slice(0,-1),mid=(a,b)=>a.map((x,i)=>(x+b[i])/2),result=[];
    loop.forEach((b,i)=>{
        const a=mid(loop[(i+loop.length-1)%loop.length],b),c=mid(b,loop[(i+1)%loop.length]);
        const samples=Math.max(4,Math.ceil((Math.hypot(b[0]-a[0],b[1]-a[1])+Math.hypot(c[0]-b[0],c[1]-b[1]))/2));
        for(let n=0;n<samples;n++){const t=n/samples;result.push(a.map((x,k)=>(1-t)*(1-t)*x+2*(1-t)*t*b[k]+t*t*c[k]));}
    });
    result.push(result[0]);sampled.set(points,result);return result;
}
