// A smooth radial map opens space around obstacles without collapsing vertices
// onto one radius. Sampling near each sphere preserves curved boundaries.
import {hugObstacle,mergeTouchingBodies} from './obstacle-shape.js';
export function bendField(points,obstacles=[]) {
    let result=points;
    for(const ball of mergeTouchingBodies(obstacles)) {
        const radius=ball.radius+1.5, next=[];
        function map([x,y]) {
            const dx=x-ball.x,dy=y-ball.y,r=Math.hypot(dx,dy);
            const spread=Math.sqrt(r*r+radius*radius*Math.exp(-r*r/(9*radius*radius)));
            return hugObstacle([ball.x+(r?dx/r:1)*spread,ball.y+(r?dy/r:0)*spread],ball);
        }
        result.forEach((point,i)=>{
            if(i) {
                const before=result[i-1];
                const nearby=Math.min(Math.hypot(point[0]-ball.x,point[1]-ball.y),Math.hypot(before[0]-ball.x,before[1]-ball.y))<radius*3;
                const count=nearby?Math.min(64,Math.ceil(Math.hypot(point[0]-before[0],point[1]-before[1]))):1;
                for(let n=1;n<count;n++)next.push(map([before[0]+(point[0]-before[0])*n/count,before[1]+(point[1]-before[1])*n/count]));
            }
            next.push(map(point));
        });
        result=next;
    }
    return result;
}
