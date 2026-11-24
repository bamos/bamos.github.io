const ns='http://www.w3.org/2000/svg';
let serial=0;
export const warmStops=[[0,'#d75283'],[.48,'#df6d68'],[1,'#dda348']];
export function warmGradient(svg) {
    const defs=document.createElementNS(ns,'defs'),gradient=document.createElementNS(ns,'linearGradient'),id='pond-warm-flow-'+(++serial);
    for(const [key,value]of Object.entries({id,x1:'0%',y1:'0%',x2:'20%',y2:'100%'}))gradient.setAttribute(key,value);
    for(const [offset,color]of warmStops){const stop=document.createElementNS(ns,'stop');stop.setAttribute('offset',offset);stop.setAttribute('stop-color',color);gradient.append(stop);}
    defs.append(gradient);svg.append(defs);return `url(#${id})`;
}
