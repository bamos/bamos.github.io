// Keep the illustration in place while the abstract's outline follows the float.
// Text clearance is set independently in bamos.css, including below the image.
export function abstractOutline(width, height, notchX = width, notchY = 0) {
    // A short abstract may end above the image: no artificial lower shelf.
    if (notchY > 0 && notchY >= height - 12) return abstractOutline(Math.min(width, notchX), height);
    const w = Math.max(1, width - 1), h = Math.max(1, height - 1);
    const radius = Math.min(12, w / 4, h / 4);
    const x = Math.max(radius * 2, Math.min(w, notchX));
    const y = Math.max(0, Math.min(h - radius * 2, notchY));
    let path = `M${radius},.5H${y ? x - radius : w - radius}`;
    if (y) {
        path += `Q${x},.5 ${x},${radius}V${Math.max(radius, y - radius)}`;
        path += `Q${x},${y} ${x + radius},${y}H${w - radius}Q${w},${y} ${w},${y + radius}`;
    } else {
        path += `Q${w},.5 ${w},${radius}`;
    }
    return path + `V${h - radius}Q${w},${h} ${w - radius},${h}H${radius}Q.5,${h} .5,${h - radius}V${radius}Q.5,.5 ${radius},.5Z`;
}

// Move one stable slot so image links and any interactive wrappers stay intact.
// Keep the generated publication markup unchanged and restore its desktop order.
function initPublicationImages(root) {
    const slots = [];
    root.querySelectorAll('.abstract-box').forEach(box => {
        const cell = box.closest('td'), image = cell?.querySelector('.publicationImg');
        if (!image || image.closest('.publication-image-slot')) return;
        let illustration = image;
        while (illustration.parentElement !== cell) illustration = illustration.parentElement;
        const marker = document.createComment('Publication image desktop position');
        const slot = document.createElement('span');
        slot.className = 'publication-image-slot';
        illustration.before(marker, slot);
        slot.append(illustration);
        slots.push({box, marker, slot});
    });
    if (!slots.length) return;
    const mobile = matchMedia('(max-width: 767px)');
    const positionImages = () => slots.forEach(({box, marker, slot}) => {
        if (mobile.matches) box.before(slot);
        else marker.after(slot);
    });
    positionImages();
    mobile.addEventListener('change', positionImages);
}

export function initAbstracts(root = document) {
    initPublicationImages(root);
    root.querySelectorAll('.abstract-box').forEach(box => {
        const cell = box.closest('td'), image = cell?.querySelector('.publicationImg');
        if (!image || box.querySelector('.abstract-outline')) return;
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns, 'svg'), path = document.createElementNS(ns, 'path');
        svg.classList.add('abstract-outline');
        svg.setAttribute('aria-hidden', 'true');
        svg.append(path);
        box.prepend(svg);
        box.classList.add('shaped-abstract');
        let pending = 0;
        function update() {
            pending = 0;
            const b = box.getBoundingClientRect(), picture = image.getBoundingClientRect();
            if (!b.width || !b.height) return;
            const overlaps = picture.bottom > b.top && picture.top < b.bottom && picture.left > b.left && picture.left < b.right;
            const sideGap = 10, bottomGap = 6;
            svg.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`);
            path.setAttribute('d', abstractOutline(b.width, b.height,
                overlaps ? picture.left - b.left - sideGap : b.width,
                overlaps ? picture.bottom - b.top + bottomGap : 0));
        }
        const schedule = () => { if (!pending) pending = requestAnimationFrame(update); };
        const resize = new ResizeObserver(schedule);
        resize.observe(box);
        resize.observe(image);
        // Includes image movement, without coupling publication layout to a feature.
        new MutationObserver(schedule).observe(cell, {subtree: true, childList: true, attributes: true, attributeFilter: ['style']});
        schedule();
    });
}

if (typeof document !== 'undefined') initAbstracts();
