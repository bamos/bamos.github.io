// Run synchronously in the head so the first paint already matches the URL.
(() => {
    const sectionIds = ['publications', 'code', 'talks'];

    function parseViewHash(hash) {
        let value = hash.replace(/^#/, '');
        try { value = decodeURIComponent(value); } catch { /* Ignore malformed escapes. */ }
        const parts = value.split('+').filter(Boolean);
        const section = parts.map(part => part.replace(/^-/, ''))
            .find(part => sectionIds.includes(part));
        return {
            section: parts.includes('collapsed') ? null : section || 'publications',
            formalBio: parts.includes('formal') || parts.includes('bio'),
            anchor: parts.find(part => part !== 'formal' && part !== 'bio') || '',
        };
    }

    function formatViewHash(section, formalBio) {
        return '#' + (section || 'collapsed') + (formalBio ? '+formal' : '');
    }

    function applyView(view) {
        document.documentElement.dataset.homeSection = view.section || 'collapsed';
        document.documentElement.dataset.homeFormal = String(view.formalBio);
    }

    globalThis.homeView = {sectionIds, parseViewHash, formatViewHash, applyView};
    if (typeof document !== 'undefined') applyView(parseViewHash(location.hash));
})();
