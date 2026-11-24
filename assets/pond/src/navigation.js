export function initNavigation() {
    'use strict';
    var content = document.querySelector('.water-content');
    if (!content) return;
    var headings = Array.from(content.querySelectorAll('h2')).filter(function (heading) {
        return heading.querySelector('.fa-chevron-right');
    });
    if (headings.length !== 3) return;
    headings.forEach(function (heading) { heading.classList.add('page-section-heading'); });
    var nav = document.createElement('nav');
    nav.className = 'section-nav';
    nav.hidden = true;
    nav.setAttribute('aria-label', 'Page sections');
    content.id = 'introduction';
    var links = headings.map(function (heading, i) {
        var link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent.trim();
        link.addEventListener('click', function (event) {
            event.preventDefault();
            history.replaceState(null, '', link.getAttribute('href'));
            window.scrollTo(0, heading.getBoundingClientRect().top + window.scrollY - 84);
            update();
        });
        nav.appendChild(link);
        return link;
    });
    document.body.appendChild(nav);
    var pending = 0;
    function update() {
        pending = 0;
        nav.hidden = innerWidth<768||window.scrollY < 120;
        nav.style.setProperty('--section-gutter',content.querySelector('table').getBoundingClientRect().left+'px');
        var active = -1;
        headings.forEach(function (heading, i) {
            if (heading.getBoundingClientRect().top <= 120) active = i;
        });
        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0 && window.scrollY >= maxScroll - 2) active = links.length - 1;
        links.forEach(function (link, i) {
            if (i === active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    function followHash() {
        var id;
        try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
        if (['-publications','-code','-talks'].includes(id)) {
            id=id.slice(1); history.replaceState(null,'','#'+id);
        }
        var target = id && document.getElementById(id);
        if (!target) return;
        window.scrollTo(0, target === content ? 0 : target.getBoundingClientRect().top + window.scrollY - 84);
        update();
    }
    window.addEventListener('scroll', function () { if (!pending) pending = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('hashchange', followHash);
    window.addEventListener('load', function () { if (location.hash) followHash(); else update(); });
    followHash();
    update();
}
