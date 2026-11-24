// Equal-distance samples make smoothing independent of pointer speed and the
// raster grid. Convex averaging removes jitter without spline overshoot.
export function smoothPath(input,{spacing=3,closed=false,passes=2,limit=768}={}) {
    if(input.length<3)return input.map(p=>p.slice());
    let source=input;
    if(closed&&input[0][0]===input.at(-1)[0]&&input[0][1]===input.at(-1)[1])source=input.slice(0,-1);
    const line=closed?[...source,source[0]]:source,distances=[0];
    for(let i=1;i<line.length;i++)distances.push(distances.at(-1)+Math.hypot(line[i][0]-line[i-1][0],line[i][1]-line[i-1][1]));
    const total=distances.at(-1);if(total<.01)return [source[0].slice()];
    const steps=Math.min(limit-1,Math.max(closed?8:2,Math.ceil(total/spacing)));
    let segment=1,points=[];
    for(let i=0;i<(closed?steps:steps+1);i++) {
        const distance=total*i/steps;
        while(segment<line.length-1&&distances[segment]<distance)segment++;
        const t=(distance-distances[segment-1])/(distances[segment]-distances[segment-1]||1);
        points.push(line[segment-1].map((v,k)=>v+(line[segment][k]-v)*t));
    }
    for(let pass=0;pass<passes;pass++)points=points.map((p,i,a)=>{
        if(!closed&&(i===0||i===a.length-1))return p;
        return p.map((v,k)=>{
            if(k>1)return v;
            return [1,4,6,4,1].reduce((sum,w,n)=>sum+w*a[closed?(i+n-2+a.length)%a.length:Math.max(0,Math.min(a.length-1,i+n-2))][k],0)/16;
        });
    });
    return closed?[...points,points[0]]:points;
}

export function pathNormals(points) {
    return points.map((p,i)=>{
        const a=points[Math.max(0,i-2)],b=points[Math.min(points.length-1,i+2)];
        const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy)||1;
        return [-dy/length,dx/length];
    });
}

// Limit spreading near a tight reversal, so offset curves cannot grow spikes.
export function offsetTrail(points,distances) {
    const normals=pathNormals(points);
    return points.map((p,i)=>{
        const before=Math.max(0,i-2),after=Math.min(points.length-1,i+2);
        const normalChange=Math.hypot(normals[after][0]-normals[before][0],normals[after][1]-normals[before][1]);
        const span=Math.hypot(points[after][0]-points[before][0],points[after][1]-points[before][1]);
        const safe=normalChange>.01?Math.max(2,span/normalChange*.4):Infinity;
        const distance=Math.sign(distances[i])*Math.min(Math.abs(distances[i]),safe);
        return [p[0]+normals[i][0]*distance,p[1]+normals[i][1]*distance];
    });
}
