// A half-twisted band: P(2π,v) = P(0,-v). Its single boundary takes
// two turns; its centerline takes exactly one. The projection stays fixed.
export function mobiusPoint(u,v) {
    const radius=1+v*Math.cos(u/2);
    return [radius*Math.cos(u),radius*Math.sin(u),v*Math.sin(u/2)];
}
function project([x,y,z]) {
    const a=-.25,py=y*.64-z*.85,px=x+z*.12;
    return [120+76*(px*Math.cos(a)-py*Math.sin(a)),120+76*(px*Math.sin(a)+py*Math.cos(a))];
}
function circuit(v,turns,projection=project) {
    const count=turns*240;
    const points=Array.from({length:count},(_,i)=>projection(mobiusPoint(i/count*turns*2*Math.PI,v)));
    return [...points,points[0]];
}
const definitions=new Map();
export function mobiusDefinition({portrait=false,wide=false}={}) {
    const variant=portrait?(wide?'wide':'tall'):'margin';
    if(!definitions.has(variant)) {
        const thickness=portrait ? .64 : .46,count=portrait?12:8;
        let projection=project;
        if(portrait) {
            // Use the tall space beside the headshot. Normalize the *visible*
            // band, rather than enlarging the empty margins in its square SVG.
            const orient=([x,y])=>wide?[x,y]:[240-y,x];
            const outline=circuit(thickness,2).map(orient);
            const min=[0,1].map(axis=>Math.min(...outline.map(p=>p[axis])));
            const max=[0,1].map(axis=>Math.max(...outline.map(p=>p[axis])));
            projection=p=>orient(project(p)).map((v,axis)=>6+(v-min[axis])/(max[axis]-min[axis])*228);
        }
        const lines=Array.from({length:count},(_,i)=>circuit((i+1)*thickness/count,2,projection));
        definitions.set(variant,{points:lines.at(-1),lines,tracks:[circuit(0,1,projection)],size:{width:240,height:240},lineWidth:portrait ? .75 : .65,surface:lines.at(-1),sphere:projection(mobiusPoint(.65,0))});
    }
    return definitions.get(variant);
}

// Shared by the homepage and gallery: place the sphere on the band itself,
// after accounting for the field's position inside its preview surface.
export function mobiusSpherePlacement({left=0,top=0,width,height},diameter,options) {
    const p=mobiusDefinition(options).sphere;
    return {left:left+p[0]/240*width-diameter/2,top:top+p[1]/240*height-diameter/2};
}
