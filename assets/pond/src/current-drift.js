// Rotation follows the local streamline, with gentle damping and no snapping.
export function flowHeading(paths,x,y,radius=0) {
    let distance=Infinity,angle=0;
    for(const path of paths)for(let i=2;i<path.length-2;i+=4) {
        const p=path[i],d=Math.hypot(p[0]-x,p[1]-y);
        if(d<distance){distance=d;angle=Math.atan2(path[i+2][1]-path[i-2][1],path[i+2][0]-path[i-2][0])*180/Math.PI;}
    }
    return distance<radius+24?angle:null;
}
export function turnWithFlow(current,target,dt) {
    const delta=(target-current)*Math.PI/180;
    const shortest=Math.atan2(Math.sin(delta*2),Math.cos(delta*2))/2*180/Math.PI;
    return current+shortest*(1-Math.exp(-Math.max(0,dt)*.9));
}
export function driftPieces(pieces,paths,dt,headingAt) {
    if(!dt)return;
    for(const {element,body}of pieces) {
        if(!element.matches('.water-float-one,.water-float-two,.water-float-three,.water-float-four,.water-float-five')||element.classList.contains('water-grabbed'))continue;
        const heading=flowHeading(paths,body.x,body.y,body.radius);
        if(heading===null)continue;
        const angle=Number(element.dataset.currentAngle??parseFloat(getComputedStyle(element).getPropertyValue('--turn')))||0;
        // Align to the river, not to the piece's own displaced boundary.
        const next=turnWithFlow(angle,(headingAt?headingAt(body.y):heading)+25,dt);
        element.classList.add('water-in-current');element.style.rotate=next+'deg';element.dataset.currentAngle=String(next);
    }
}
