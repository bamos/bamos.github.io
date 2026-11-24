// Shared fish locomotion: a small stroke, then a glide. The same clock drives
// translation and articulation, so grabs/offscreen pauses freeze both together.
export function randomSequence(seed) {
    return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function createSwimmer(seed,x,y,bounds) {
    const random=randomSequence(seed),angle=random()*Math.PI*2,speed=8+random()*5;
    return {x,y,bounds,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,held:false,elapsed:0,phase:random()*Math.PI*2};
}
export function fishPose(time,phase=0) {
    const cycle=time*Math.PI*2*1.45+phase,beat=Math.sin(cycle);
    return {tail:beat*17,body:-beat*2.2,fin:Math.sin(cycle+.8)*7,
        thrust:1+.28*Math.cos(cycle*2-.5)};
}
export function grabSwimmer(state) {state.held=true;}
export function releaseSwimmer(state,x,y,bounds=state.bounds) {
    state.x=x;state.y=y;state.bounds=bounds;state.held=false;
}
export function advanceSwimmer(state,seconds,active=true) {
    if(!active||state.held)return;
    const dt=Math.min(.1,Math.max(0,seconds));state.elapsed+=dt;
    // Gentle course changes, rather than a rigid floating diagonal. Reflection
    // at obstacles still operates on the underlying velocity without speed gain.
    const turn=Math.sin(state.elapsed*.8+state.phase)*.1*dt,c=Math.cos(turn),s=Math.sin(turn),vx=state.vx;
    state.vx=vx*c-state.vy*s;state.vy=vx*s+state.vy*c;
    const thrust=fishPose(state.elapsed,state.phase).thrust;
    for(const [axis,velocity,min,max] of [['x','vx','left','right'],['y','vy','top','bottom']]) {
        state[axis]+=state[velocity]*dt*thrust;
        if(state[axis]<state.bounds[min]){state[axis]=state.bounds[min];state[velocity]=Math.abs(state[velocity]);}
        if(state[axis]>state.bounds[max]){state[axis]=state.bounds[max];state[velocity]=-Math.abs(state[velocity]);}
    }
}
export const swimmerHeading=state=>Math.atan2(state.vy,state.vx)*180/Math.PI;
