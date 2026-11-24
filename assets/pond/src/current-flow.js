// Integrate one steady velocity field. Every streamline follows the same field,
// so an obstacle bends the water continuously instead of bending each line ad hoc.
import {clearObstacle,mergeTouchingBodies} from './obstacle-shape.js';
import {smoothPath} from './path-smoothing.js';
import {bendField} from './field-bending.js';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function currentHeading({width,height,anchorX=width-133,anchorY},y) {
    const reach=Math.max(110,Math.min(280,width*.4));
    const top=Math.max(0,anchorY-reach),bottom=Math.min(height,anchorY+reach);
    const slope=-(width+45-anchorX)*Math.PI*Math.sin(2*Math.PI*clamp((y-top)/(bottom-top||1),0,1))/(bottom-top||1);
    return Math.atan2(1,slope)*180/Math.PI;
}
export function currentFlow({width,height,anchorX=width-133,anchorY,ball,obstacles=[]}) {
    const reach=Math.max(110,Math.min(280,width*.4));
    const top=Math.max(0,anchorY-reach),bottom=Math.min(height,anchorY+reach),edge=width+45;
    const band=Math.min(42,width*.08);
    const bodies=mergeTouchingBodies([ball,...obstacles].filter(Boolean).filter(b=>b.y+b.radius*5>top&&b.y-b.radius*5<bottom));
    const solids=bodies.filter(b=>!b.radii),shapes=bodies.filter(b=>b.radii);
    const slope=y=>-(edge-anchorX)*Math.PI*Math.sin(2*Math.PI*clamp((y-top)/(bottom-top||1),0,1))/(bottom-top||1);
    function velocity(x,y) {
        // Recover gently toward the downstream edge even after a large obstacle
        // diverts a streamline. Ending at a fixed y used to leave visible stubs.
        const returnWeight=clamp((y-anchorY)/(Math.max(1,bottom-anchorY))-.35,0,1);
        let vx=slope(y)+returnWeight*Math.max(0,width+60-x)/Math.max(12,bottom-y),vy=1;
        for(const b of solids) {
            const dx=x-b.x,dy=y-b.y,r2=Math.max(1,dx*dx+dy*dy),radius=b.radius+2;
            const q=Math.min(1,radius*radius/r2),projection=(vx*dx+vy*dy)/r2;
            vx-=q*(2*projection*dx-vx);vy-=q*(2*projection*dy-vy);
        }
        const length=Math.hypot(vx,vy)||1;
        return [vx/length,vy/length];
    }
    let paths=Array.from({length:25},(_,stripe)=>{
        const offset=(stripe-12)*band/12;
        let x=edge+offset,y=top;
        const points=[[x,y]],step=1.4;
        for(let i=0;i<1200;i++) {
            if(y>anchorY&&x>width+18&&bendField([[x,y]],shapes)[0][0]>width+18)break;
            const a=velocity(x,y),b=velocity(x+a[0]*step/2,y+a[1]*step/2),c=velocity(x+b[0]*step/2,y+b[1]*step/2),d=velocity(x+c[0]*step,y+c[1]*step);
            x+=step*(a[0]+2*b[0]+2*c[0]+d[0])/6;y+=step*(a[1]+2*b[1]+2*c[1]+d[1])/6;
            if(i>50&&Math.hypot(x-points.at(-1)[0],y-points.at(-1)[1])<.01)break;
            points.push([x,y]);
        }
        return points;
    });
    // A silhouette's enclosing circle is only a coordinate map, not a physical
    // obstacle. Integrating overlapping proxy circles trapped lines beside the
    // sphere. Bend these small shapes locally after the steady river solution.
    if(shapes.length)paths=paths.map(path=>bendField(path,shapes));
    if(bodies.some(b=>b.radii))paths=paths.map(path=>smoothPath(path,{spacing:.9,passes:2}).map(p=>bodies.reduce((point,body)=>clearObstacle(point,body),p)));
    const pathBottom=Math.max(...paths.map(path=>Math.max(...path.map(p=>p[1]))));
    return {paths,top:Math.max(0,top-band),bottom:Math.min(height,Math.max(bottom+band,pathBottom+4))};
}
export const flowPath=(points,top=0)=>points.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)},${(y-top).toFixed(2)}`).join('');
