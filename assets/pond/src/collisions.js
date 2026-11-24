// Circle contacts preserve the incoming angle. Rectangles represent reading
// areas; circles represent other pond objects. No grid/orthogonal steering.
export function bounceContacts(body, obstacles) {
    const width=body.width||44,height=body.height||44,radius=body.radius||12;
    for(const obstacle of obstacles) {
        let cx=body.x+width/2,cy=body.y+height/2,nx,ny,depth;
        if('radius' in obstacle) {
            const dx=cx-obstacle.x,dy=cy-obstacle.y,d=Math.hypot(dx,dy);
            depth=radius+obstacle.radius-d;
            if(depth<=0)continue;
            const speed=Math.hypot(body.vx,body.vy)||1;
            nx=d?dx/d:-body.vx/speed;ny=d?dy/d:-body.vy/speed;
        } else {
            const x=Math.max(obstacle.left,Math.min(obstacle.right,cx)),y=Math.max(obstacle.top,Math.min(obstacle.bottom,cy));
            const dx=cx-x,dy=cy-y,d=Math.hypot(dx,dy);
            if(d>=radius)continue;
            if(d) {nx=dx/d;ny=dy/d;depth=radius-d;}
            else {
                const exits=[[cx-obstacle.left,-1,0],[obstacle.right-cx,1,0],[cy-obstacle.top,0,-1],[obstacle.bottom-cy,0,1]].sort((a,b)=>a[0]-b[0]);
                [depth,nx,ny]=exits[0];depth+=radius;
            }
        }
        body.x+=nx*(depth+.1);body.y+=ny*(depth+.1);
        const toward=body.vx*nx+body.vy*ny;
        if(toward<0) {body.vx-=2*toward*nx;body.vy-=2*toward*ny;}
    }
    body.x=Math.max(body.bounds.left,Math.min(body.bounds.right,body.x));
    body.y=Math.max(body.bounds.top,Math.min(body.bounds.bottom,body.y));
}

export function obstacleReader(pond, self) {
    let text=[],dirty=true;
    function refresh() {
        const origin=pond.getBoundingClientRect();
        const scope=pond.closest('.pond-demo')?pond:document.querySelector('.water-content');
        text=[...(scope?.querySelectorAll('p,h2,table,.abstract-box')||[])].map(element=>{
            const r=element.getBoundingClientRect();
            return {left:r.left-origin.left,right:r.right-origin.left,top:r.top-origin.top,bottom:r.bottom-origin.top};
        }).filter(r=>r.right>r.left&&r.bottom>r.top);
        dirty=false;
    }
    const mark=()=>{dirty=true;};
    document.addEventListener('pond:layout',mark);
    const observer=new ResizeObserver(mark);
    const content=document.querySelector('.water-content');if(content)observer.observe(content);
    return {
        read(body) {
            if(dirty)refresh();
            const origin=pond.getBoundingClientRect();
            const nearby=text.filter(r=>r.bottom>body.y-60&&r.top<body.y+100);
            pond.querySelectorAll('.water-float').forEach(other=>{
                if(other===self||other.hidden||getComputedStyle(other).display==='none')return;
                const r=other.getBoundingClientRect(),x=r.left+r.width/2-origin.left,y=r.top+r.height/2-origin.top;
                if(Math.abs(y-body.y)<110&&Math.abs(x-body.x)<110)nearby.push({x,y,radius:Math.min(r.width,r.height)*.3});
            });
            return nearby;
        },
        destroy(){observer.disconnect();document.removeEventListener('pond:layout',mark);}
    };
}
