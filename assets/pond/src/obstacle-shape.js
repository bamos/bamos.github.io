// A compact, rotation-aware envelope of the visible artwork, not its SVG box.
// Cache raster tracing elsewhere; this module only works with polygon geometry.
export const fieldClearance=1;
const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
export function convexOutline(points) {
    const sorted=points.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
    const side=points=>{const out=[];for(const p of points){while(out.length>1&&cross(out.at(-2),out.at(-1),p)<=0)out.pop();out.push(p);}return out;};
    return side(sorted).slice(0,-1).concat(side(sorted.slice().reverse()).slice(0,-1));
}
export function silhouetteBody(contours) {
    const hull=convexOutline(contours.flat());if(hull.length<3)return null;
    const x=hull.reduce((sum,p)=>sum+p[0],0)/hull.length,y=hull.reduce((sum,p)=>sum+p[1],0)/hull.length;
    const outline=hull.map(p=>[p[0]-x,p[1]-y]),radius=Math.max(...outline.map(p=>Math.hypot(...p)));
    const radii=Array.from({length:256},(_,i)=>{
        const angle=i/256*Math.PI*2,dx=Math.cos(angle),dy=Math.sin(angle);
        let distance=0;
        for(let j=0;j<outline.length;j++) {
            const a=outline[j],b=outline[(j+1)%outline.length],ex=b[0]-a[0],ey=b[1]-a[1],den=dx*ey-dy*ex;
            if(Math.abs(den)<1e-9)continue;
            const t=(a[0]*ey-a[1]*ex)/den,u=(a[0]*dy-a[1]*dx)/den;
            if(t>=0&&u>=0&&u<=1)distance=Math.max(distance,t);
        }
        return distance;
    });
    return {x,y,radius,radii,outline};
}
const worldOutline=body=>(body.outline||Array.from({length:48},(_,i)=>[Math.cos(i*Math.PI/24)*body.radius,Math.sin(i*Math.PI/24)*body.radius])).map(([x,y])=>[x+body.x,y+body.y]);
function overlaps(a,b) {
    for(const polygon of [a,b])for(let i=0;i<polygon.length;i++) {
        const p=polygon[i],q=polygon[(i+1)%polygon.length],nx=p[1]-q[1],ny=q[0]-p[0];
        const aa=a.map(([x,y])=>x*nx+y*ny),bb=b.map(([x,y])=>x*nx+y*ny);
        if(Math.max(...aa)<Math.min(...bb)||Math.max(...bb)<Math.min(...aa))return false;
    }
    return true;
}
// Touching artwork displaces water as one solid. Separate overlapping flow
// obstacles have incompatible boundaries and can trap paths between them.
export function mergeTouchingBodies(input) {
    const bodies=input.slice();
    for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++) {
        const a=bodies[i],b=bodies[j];
        if(Math.hypot(a.x-b.x,a.y-b.y)>a.radius+b.radius)continue;
        const aa=worldOutline(a),bb=worldOutline(b);
        if(!overlaps(aa,bb))continue;
        bodies[i]=silhouetteBody([aa,bb]);bodies.splice(j,1);i=-1;break;
    }
    return bodies;
}
export function boundaryRadius(body,angle) {
    if(!body.radii)return body.radius;
    const t=((angle/(2*Math.PI)%1)+1)%1*body.radii.length,i=Math.floor(t),f=t-i;
    return body.radii[i]*(1-f)+body.radii[(i+1)%body.radii.length]*f;
}
// Contract the circular flow solution onto the silhouette. The map is monotone
// outside the envelope, so neighboring lines do not cross or end at a cutout.
export function hugObstacle([x,y],body,clearance=fieldClearance) {
    if(!body.radii)return [x,y];
    const dx=x-body.x,dy=y-body.y,r=Math.hypot(dx,dy),circle=body.radius+2;
    if(r>circle*4)return [x,y];
    const angle=Math.atan2(dy,dx),edge=boundaryRadius(body,angle)+clearance;
    const excess=Math.max(0,r-circle),weight=Math.exp(-((excess/(circle*.65))**2));
    const mapped=Math.max(edge,r-(circle-edge)*weight);
    return [body.x+Math.cos(angle)*mapped,body.y+Math.sin(angle)*mapped];
}
export function clearObstacle([x,y],body) {
    const angle=Math.atan2(y-body.y,x-body.x),r=Math.hypot(x-body.x,y-body.y);
    const edge=boundaryRadius(body,angle)+(body.radii?fieldClearance:1.5);
    return r>=edge?[x,y]:[body.x+Math.cos(angle)*edge,body.y+Math.sin(angle)*edge];
}
