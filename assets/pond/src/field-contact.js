// Drop feedback follows the medium: fields bend around objects without a
// separate pond splash. Track the rendered paths, not a rectangular hit area.
const fields=new WeakMap();
export function touchesField(body,paths,padding=8) {
    const limit=body.radius+padding;
    return paths.some(points=>points.some((b,i)=>{
        if(!i)return false;
        const a=points[i-1],dx=b[0]-a[0],dy=b[1]-a[1];
        const t=Math.max(0,Math.min(1,((body.x-a[0])*dx+(body.y-a[1])*dy)/(dx*dx+dy*dy||1)));
        return Math.hypot(body.x-a[0]-t*dx,body.y-a[1]-t*dy)<=limit;
    }));
}
export function registerField(pond,element) {
    if(!fields.has(pond))fields.set(pond,new Set());
    const record={element,paths:[]};fields.get(pond).add(record);
    return {update(paths){record.paths=paths;},destroy(){fields.get(pond).delete(record);}};
}
export function dropsIntoField(item) {
    const pond=item.closest('[data-pond-bounds]')||document.querySelector('.water-objects');
    if(!pond)return false;
    const origin=pond.getBoundingClientRect(),r=(item.querySelector('svg,img')||item).getBoundingClientRect();
    const body={x:r.left+r.width/2-origin.left,y:r.top+r.height/2-origin.top,radius:Math.min(r.width,r.height)/2};
    return [...(fields.get(pond)||[])].some(field=>field.element.getBoundingClientRect().width>0&&touchesField(body,field.paths));
}
