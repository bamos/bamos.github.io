import { prepare } from './silhouettes.js';

export function initDragging({ floats, pictures, dropObject, addWake, breakWake, onHome, canDrag=()=>true, boundsFor=()=>null }) {
    let drag = null;
    const isPicture = item => item.classList.contains('water-image-frame');
    function center(item) {
        var rect = item.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    function home(item) {
        item.style.left = item.style.top = item.style.right = item.style.animation = item.style.transform = '';
        item.dataset.waterX = item.dataset.waterY = '0';
        item.style.removeProperty('--scroll-drift');
        item.style.rotate='';delete item.dataset.currentAngle;item.classList.remove('water-in-current');
        item.classList.remove('water-placed', 'water-grabbed');
        item.dispatchEvent(new Event('pond:move'));
    }
    function place(item, x, y) {
        var width = document.documentElement.clientWidth, height = window.innerHeight;
        var rect = item.getBoundingClientRect();
        var halfW = rect.width / 2, halfH = rect.height / 2;
        var top = (document.querySelector('.navbar')?.getBoundingClientRect().bottom || 0);
        x = Math.max(halfW + 4, Math.min(width - halfW - 4, x));
        y = Math.max(top + halfH + 8, Math.min(height - halfH - 64, y));
        const boundary=item.closest('[data-pond-bounds]'),r=boundsFor(item)||boundary?.getBoundingClientRect();
        if(r) {
            x=Math.max(r.left+halfW,Math.min(r.right-halfW,x));
            y=Math.max(r.top+halfH,Math.min(r.bottom-halfH,y));
        }
        item.classList.add('water-placed');
        item.style.setProperty('--scroll-drift', '0px');
        item.style.animation = 'none';
        if (isPicture(item)) {
            // Keep the original layout space while the portrait floats.
            var oldX = Number(item.dataset.waterX || 0), oldY = Number(item.dataset.waterY || 0);
            var nextX = oldX + x - (rect.left + halfW), nextY = oldY + y - (rect.top + halfH);
            item.style.transform = 'translate(' + nextX + 'px,' + nextY + 'px)';
            item.dataset.waterX = nextX;
            item.dataset.waterY = nextY;
        } else {
            var pond = item.parentElement.getBoundingClientRect();
            item.style.left = (x - pond.left - item.offsetWidth / 2) + 'px';
            item.style.top = (y - pond.top - item.offsetHeight / 2) + 'px';
            item.style.right = 'auto';
        }
        item.dispatchEvent(new Event('pond:move'));
    }
    function finishDrag(splash) {
        if (!drag) return;
        var item = drag.item, control = drag.control, pointerId = drag.id;
        item.dataset.waterDragged = String(drag.moved);
        drag = null;
        item.classList.remove('water-grabbed');
        document.body.classList.remove('water-dragging');
        item.dispatchEvent(new Event('pond:release'));
        if (control.hasPointerCapture(pointerId)) control.releasePointerCapture(pointerId);
        var point = center(item);
        if (splash) dropObject(item);
        breakWake();
    }
    function bind(item) {
        if(item.hasAttribute('data-pond-stationary'))return;
        var control = isPicture(item) ? item.querySelector('img') : item;
        const keyControl=isPicture(item)?item.querySelector('a'):control;
        control.addEventListener('pointerenter', function () { prepare(item); }, { once: true });
        keyControl.addEventListener('focus', function () { prepare(item); }, { once: true });
        control.addEventListener('pointerdown', function (event) {
            if(!canDrag(item)) {item.dataset.waterDragged='false';return;}
            if (event.button !== 0 || !event.isPrimary || drag) return;
            event.preventDefault();
            prepare(item);
            var point = center(item);
            place(item, point.x, point.y);
            drag = { item: item, control: control, id: event.pointerId, dx: event.clientX - point.x, dy: event.clientY - point.y, x: event.clientX, y: event.clientY, moved: false };
            item.classList.add('water-grabbed');
            document.body.classList.add('water-dragging');
            item.dispatchEvent(new Event('pond:grab', { bubbles: true }));
            item.classList.add('water-pointer-focus');
            control.classList.add('water-pointer-focus');
            keyControl.classList.add('water-pointer-focus');
            if (!isPicture(item)) item.firstElementChild.style.transform = '';
            control.setPointerCapture(event.pointerId);
            keyControl.focus({ preventScroll: true });
            breakWake();
        });
        control.addEventListener('pointermove', function (event) {
            if (!drag || drag.item !== item || drag.id !== event.pointerId) return;
            if(!canDrag(item)){finishDrag(false);return;}
            if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 6) drag.moved = true;
            place(item, event.clientX - drag.dx, event.clientY - drag.dy);
            var point = center(item);
            addWake(point.x, point.y, item);
        });
        control.addEventListener('pointerup', function (event) {
            if (drag && drag.id === event.pointerId) finishDrag(true);
        });
        control.addEventListener('pointercancel', function () { if (drag && drag.item === item) finishDrag(false); });
        control.addEventListener('lostpointercapture', function () { if (drag && drag.item === item) finishDrag(false); });
        keyControl.addEventListener('keydown', function (event) {
            if(!canDrag(item))return;
            item.classList.remove('water-pointer-focus');
            control.classList.remove('water-pointer-focus');
            keyControl.classList.remove('water-pointer-focus');
            var point = center(item), step = event.shiftKey ? 24 : 8;
            var directions = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
            if (directions[event.key]) {
                event.preventDefault();
                place(item, point.x + directions[event.key][0], point.y + directions[event.key][1]);
                addWake(point.x, point.y, item);
            } else if (event.key === 'Escape') {
                if (drag) finishDrag(false);
                home(item);
                onHome();
            } else if (isPicture(item) && event.key === ' ') {
                event.preventDefault(); dropObject(item);
            }
        });
        keyControl.addEventListener('blur', function () {
            item.classList.remove('water-pointer-focus');
            control.classList.remove('water-pointer-focus');
            keyControl.classList.remove('water-pointer-focus');
        });
        keyControl.addEventListener('click', function (event) {
            if(isPicture(item)) {
                if(item.dataset.waterDragged==='true') { event.preventDefault(); item.dataset.waterDragged='false'; }
                return;
            }
            // Pointer release already splashed; native keyboard clicks do not.
            if (event.detail === 0) {
                var point = center(item);
                dropObject(item);
            }
        });
    }
    floats.concat(pictures).forEach(bind);
    return { add: bind, home, cancel: () => finishDrag(false), get active() { return !!drag; } };
}
