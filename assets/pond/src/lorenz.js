import {createAttractorRenderer,mountAttractor,marginPlacement} from './attractor-renderer.js';

export const lorenzSize={width:248.4,height:220};
export const lorenzPlacement=gutter=>marginPlacement(gutter);

// Lorenz (1963), sigma=10, rho=28, beta=8/3. Fixed RK4 streamlines;
// only the shared direction marks and red tracer travel through the field.
export function lorenzField() {
    const step=.006;
    const velocity=p=>[10*(p[1]-p[0]),p[0]*(28-p[2])-p[1],p[0]*p[1]-8/3*p[2]];
    const offset=(p,v,s)=>p.map((x,i)=>x+v[i]*s);
    function advance(p) {
        const a=velocity(p),b=velocity(offset(p,a,step/2)),c=velocity(offset(p,b,step/2)),d=velocity(offset(p,c,step));
        return p.map((x,i)=>x+step*(a[i]+2*b[i]+2*c[i]+d[i])/6);
    }
    let point=[.1,0,0];for(let i=0;i<4000;i++)point=advance(point);
    const points=[];
    for(let i=0;i<5000;i++) {point=advance(point);if(i%2===0)points.push([110+point[0]*4.4,171-point[2]*3.05]);}
    const projected=points.map(([x,y])=>[(184-y)*1.35,x]);
    const min=Math.min(...projected.map(p=>p[0])),max=Math.max(...projected.map(p=>p[0]));
    // Use the visible margin instead of losing a third of it to viewBox padding.
    return projected.map(([x,y])=>[4+(x-min)/(max-min)*(lorenzSize.width-8),y]);
}
export function lorenzTracks(points) {
    function closeOrbit(orbit) {
        const first=orbit[0],last=orbit.at(-1);
        let closed=orbit.slice(0,-1).map((p,i)=>p.map((v,axis)=>v-i/(orbit.length-1)*(last[axis]-first[axis])));
        for(let pass=0;pass<2;pass++)closed=closed.map((p,i,a)=>p.map((v,axis)=>.6*v+.2*a[(i+a.length-1)%a.length][axis]+.2*a[(i+1)%a.length][axis]));
        return [...closed,closed[0]];
    }
    // Return sections crossing the waist in the same direction. Each selected
    // circuit visits both lobes; close the small return drift without a chord.
    const returns=[];
    for(let i=1;i<points.length;i++)if(points[i-1][1]<110&&points[i][1]>=110)returns.push(i);
    const circuits=returns.slice(1).map((end,i)=>{
        const start=returns[i],a=points[start],b=points[end];
        return {start,end,gap:Math.hypot(b[0]-a[0],b[1]-a[1])};
    }).filter(p=>p.end-p.start>=120&&p.end-p.start<=450).sort((a,b)=>a.gap-b.gap);
    return circuits.slice(0,2).map(({start,end})=>closeOrbit(points.slice(start,end+1)));
}
export function lorenzDefinition(){const points=lorenzField();return {points,tracks:lorenzTracks(points),size:lorenzSize};}
export const createLorenzRenderer=svg=>createAttractorRenderer(svg,lorenzDefinition());
export const mountLorenz=(field,ball,options)=>mountAttractor(field,ball,lorenzDefinition(),options);
export function initLorenz() {
    const field=document.querySelector('.water-lorenz');if(!field)return;
    const ball=document.querySelector('.water-lorenz-ball'),pond=field.parentElement;
    const layout=()=>{
        const gutter=document.querySelector('.water-content table').getBoundingClientRect().left;
        if(gutter>=95){
            const p=lorenzPlacement(gutter);
            field.style.left=p.left+'px';field.style.width=p.width+'px';field.style.height=p.height+'px';
            field.style.setProperty('--field-clear-width',(p.width+40)+'px');
            ball.style.width=ball.style.height=Math.max(32,Math.min(64,p.width*.32))+'px';
        }else{
            const portrait=document.querySelector('.index-profile-img').getBoundingClientRect();
            const space=pond.clientWidth-portrait.right-12,width=Math.max(48,Math.min(145,space));
            field.style.width=width+'px';field.style.height=width*lorenzSize.height/lorenzSize.width+'px';
            ball.style.width=ball.style.height=Math.max(26,Math.min(36,width*.4))+'px';
            field.style.left=(pond.clientWidth-width-6)+'px';field.style.top=(portrait.top+scrollY+24)+'px';
            field.style.setProperty('--field-clear-width',(width+80)+'px');
        }
        if(!ball.classList.contains('water-placed')) {
            const x=field.offsetLeft+field.offsetWidth*.42-ball.offsetWidth/2;
            ball.style.left=x+'px';ball.style.top=(field.offsetTop+field.offsetHeight*.67)+'px';
        }
        ball.hidden=field.hidden;ball.classList.add('water-visible');
    };
    document.addEventListener('pond:layout',layout);layout();
    return mountLorenz(field,ball);
}
