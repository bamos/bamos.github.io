// Bounded animation clock for a visible discovery. No catch-up after a tab
// switch; invalidation still updates a reduced-motion scene when moved.
export function visibleLoop(element, render, { ready = () => document.body.classList.contains('pond-ready'), animated = () => true } = {}) {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false, onPage = true, held = false, frame = 0, last = 0, time = 0;
    const active = () => visible && onPage && !held && !document.hidden && !motion.matches && ready() && animated();
    function tick(now) {
        frame = 0;
        const moving = active();
        if (moving && last && now - last < 1000 / 30) { frame = requestAnimationFrame(tick); return; }
        const dt = moving && last ? Math.min(.05, (now - last) / 1000) : 0;
        last = moving ? now : 0; time += dt;
        render({ dt, time });
        element.dataset.pondMotion = moving ? 'running' : 'paused';
        if (moving) frame = requestAnimationFrame(tick);
    }
    function invalidate() { if (!frame) frame = requestAnimationFrame(tick); }
    function sync() { cancelAnimationFrame(frame); frame = 0; last = 0; invalidate(); }
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer.observe(element);
    const listeners = [
        [document, 'visibilitychange', sync], [document, 'pond:ready', sync], [motion, 'change', sync],
        [window, 'pagehide', () => { onPage = false; sync(); }],
        [window, 'pageshow', () => { onPage = true; sync(); }]
    ];
    listeners.forEach(([target,event,callback]) => target.addEventListener(event,callback));
    return {
        invalidate,
        hold(value) { held = value; sync(); },
        destroy() { cancelAnimationFrame(frame); observer.disconnect(); listeners.forEach(([target,event,callback]) => target.removeEventListener(event,callback)); }
    };
}
