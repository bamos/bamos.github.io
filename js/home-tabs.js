const {sectionIds, parseViewHash, formatViewHash, applyView} = globalThis.homeView;

// All section content stays in the HTML, with ordinary jump links without JavaScript.
function initHomeTabs() {
    const tablist = document.querySelector('.home-tabs');
    if (!tablist) return;
    const tabs = [...tablist.querySelectorAll('a')];
    const panels = sectionIds.map(id => document.getElementById(id));
    const sections = tablist.closest('.home-sections');
    const slot = tablist.closest('.home-tabs-slot');
    const navbar = document.querySelector('.navbar');
    const intro = document.getElementById('about-intro');
    const formalBio = document.getElementById('bio');
    const bioToggle = document.getElementById('bio-toggle');
    const lastUpdated = document.getElementById('last-updated');
    const desktop = matchMedia('(min-width: 1100px)');
    let view = {section: 'publications', formalBio: false};
    let sidebarFrame = 0;

    tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', sectionIds[index]);
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', tab.id);
        panels[index].tabIndex = 0;
    });
    sections.classList.add('has-home-tabs');
    document.body.classList.add('has-home-tabs');
    tablist.setAttribute('role', 'tablist');

    const years = [...panels[0].querySelectorAll(':scope > h2')]
        .filter(heading => /^\d{4}/.test(heading.textContent));
    const yearNav = document.createElement('nav');
    yearNav.className = 'home-publication-years';
    yearNav.setAttribute('aria-label', 'Publication years');
    const yearLinks = years.map(heading => {
        if (!heading.id) heading.id = 'publications-' + heading.textContent.slice(0, 4);
        const link = document.createElement('a');
        link.textContent = heading.textContent;
        link.setAttribute('aria-label', heading.textContent);
        link.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            writeHash(link.getAttribute('href'));
            restoreLocation(true);
        });
        yearNav.append(link);
        return link;
    });
    tablist.after(yearNav);

    function contentTop() {
        return (navbar?.offsetHeight || 0) + (desktop.matches ? 0 : slot.offsetHeight) + 24;
    }

    function writeHash(hash) {
        if (location.hash !== hash) {
            history.pushState(null, '', location.pathname + location.search + hash);
        }
    }

    function render(next) {
        view = {section: next.section, formalBio: next.formalBio};
        applyView(view);
        const index = sectionIds.indexOf(view.section);
        tabs.forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(i === index));
            tab.tabIndex = i === Math.max(0, index) ? 0 : -1;
            tab.href = formatViewHash(sectionIds[i], view.formalBio);
            panels[i].hidden = i !== index;
        });
        sections.dataset.section = view.section || 'collapsed';
        intro.hidden = view.formalBio;
        formalBio.hidden = !view.formalBio;
        bioToggle.setAttribute('aria-checked', String(view.formalBio));
        lastUpdated.hidden = view.section === null;
        yearLinks.forEach((link, i) => {
            link.href = '#' + years[i].id + (view.formalBio ? '+formal' : '');
        });
        scheduleSidebar();
    }

    function activateSection(index, collapseActive = false) {
        const section = index < 0 || (collapseActive && view.section === sectionIds[index])
            ? null : sectionIds[index];
        render({section, formalBio: view.formalBio});
        writeHash(formatViewHash(view.section, view.formalBio));
        if (section === null) {
            window.scrollTo({top: 0});
        } else if (panels[index].getBoundingClientRect().top < contentTop()) {
            panels[index].scrollIntoView({block: 'start'});
        }
    }

    function restoreLocation(scrollToAnchor) {
        const next = parseViewHash(location.hash);
        const target = next.anchor ? document.getElementById(next.anchor) : null;
        const panel = target?.closest('.home-section');
        if (panel) next.section = panel.id;
        render(next);
        const abstract = target?.closest('.abstract-box');
        if (abstract) {
            abstract.style.display = 'block';
            [...panel.querySelectorAll('button[aria-controls]')]
                .find(button => button.getAttribute('aria-controls') === abstract.id)
                ?.setAttribute('aria-expanded', 'true');
        }
        if (!scrollToAnchor || !panel) return;
        const scrollTarget = target === panel.firstElementChild ? panel : target;
        requestAnimationFrame(() => {
            if (years.includes(scrollTarget)) {
                const top = scrollTarget.getBoundingClientRect().top + window.scrollY;
                const padding = parseFloat(getComputedStyle(scrollTarget).paddingTop);
                window.scrollTo({top: top + padding - contentTop()});
            } else {
                scrollTarget.scrollIntoView({block: 'start'});
            }
        });
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            activateSection(index, true);
        });
        tab.addEventListener('keydown', event => {
            let next;
            const vertical = tablist.getAttribute('aria-orientation') === 'vertical';
            if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) next = (index + 1) % tabs.length;
            else if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) next = (index + tabs.length - 1) % tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else if (event.key === ' ') next = index;
            else return;
            event.preventDefault();
            activateSection(next, event.key === ' ');
            tabs[next].focus({preventScroll: true});
        });
    });
    bioToggle.addEventListener('click', () => {
        render({section: view.section, formalBio: !view.formalBio});
        writeHash(formatViewHash(view.section, view.formalBio));
    });

    function scheduleSidebar() {
        if (sidebarFrame) return;
        sidebarFrame = requestAnimationFrame(() => {
            sidebarFrame = 0;
            const position = slot.getBoundingClientRect();
            const sidebar = desktop.matches && position.bottom <= contentTop();
            sections.classList.toggle('is-sidebar', sidebar);
            tablist.setAttribute('aria-orientation', sidebar ? 'vertical' : 'horizontal');
            sections.style.setProperty('--home-sidebar-left', (position.left - 140) + 'px');
            tabs[0].style.marginBottom = sidebar && view.section === 'publications'
                ? (yearNav.offsetHeight + 8) + 'px' : '';
            if (sidebar && view.section === 'publications') {
                let currentYear = years[0];
                for (const heading of years) {
                    const textTop = heading.getBoundingClientRect().bottom - parseFloat(getComputedStyle(heading).lineHeight);
                    if (textTop <= contentTop() + 1) currentYear = heading;
                }
                const currentLink = yearLinks[years.indexOf(currentYear)];
                if (currentLink && !currentLink.hasAttribute('aria-current')) {
                    yearNav.querySelector('[aria-current]')?.removeAttribute('aria-current');
                    currentLink.setAttribute('aria-current', 'location');
                }
            }
        });
    }

    function updateNavbarHeight() {
        document.documentElement.style.setProperty('--home-navbar-height', (navbar?.offsetHeight || 0) + 'px');
        scheduleSidebar();
    }
    if (navbar) new ResizeObserver(updateNavbarHeight).observe(navbar);
    window.addEventListener('scroll', scheduleSidebar, {passive: true});
    window.addEventListener('resize', scheduleSidebar);
    let historyNavigation = false;
    window.addEventListener('popstate', () => {
        historyNavigation = true;
        restoreLocation(false);
    });
    window.addEventListener('hashchange', () => {
        restoreLocation(!historyNavigation);
        historyNavigation = false;
    });
    updateNavbarHeight();

    const renamedHash = location.hash.split('+')
        .map(part => part === '#bio' ? '#formal' : part === 'bio' ? 'formal' : part).join('+');
    if (renamedHash !== location.hash) {
        history.replaceState(null, '', location.pathname + location.search + renamedHash);
    }

    // Refresh and history navigation retain the browser's saved scroll position.
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    const scrollOnLoad = navigationType !== 'reload' && navigationType !== 'back_forward';
    restoreLocation(scrollOnLoad);
    const initialHash = location.hash;
    if (initialHash && scrollOnLoad) {
        const alignInitialHash = () => document.fonts.ready.then(() => {
            if (location.hash === initialHash) restoreLocation(true);
        });
        if (document.readyState === 'complete') alignInitialHash();
        else window.addEventListener('load', alignInitialHash, {once: true});
    }
}

if (typeof document !== 'undefined') initHomeTabs();

