# Pond maintenance

Keep the feature isolated in this directory: `src/` for runtime/geometry,
`styles/` for styling, `tests/` for checks, `review/` for private studies.
Shared markup/artwork lives in `_includes/pond/`. The homepage uses `index.js`;
the pond blog post uses `gallery.js`. Do not mix pond behavior into CV generation,
publication data, or global site scripts.

Read `VALIDATION.md` before edits. It records module responsibilities, accepted
interactions, visual cases and tested limitations. Use the same production
renderers in the post and private studies; retain deterministic seed/time inputs.
Run the relevant tests, build smoke checks, and inspect affected visuals.

`_posts/2026-11-07-pond.md` is the requested blog gallery at `/pond/`: still
ripple examples plus interactive creatures, Currents/Lorenz/Möbius, and a shared
passing-fish scene. It supplements the interactive homepage.
Private review tooling remains excluded from Jekyll output.

Keep generated HTML, screenshots, recordings and comparisons OUTSIDE Git.
Never add generated raster artwork; use the existing publication images as
fixtures without copying them. Do not publish/commit the pond proposal without
an explicit request. User instructions override these defaults.

No external animation libraries, no always-running idle canvas, no hidden or
offscreen animation loops. Respect reduced motion. No hover wake, hover labels/effects, click captions,
drag icons, click-stones, field arrows, Game of Life pieces, frogs, lizards, or restored references the user removed. Drawing
ripples use the selected Silk ribbon, expire after ten seconds and do not disturb
the fields. Drops into a field bend its flow without an extra splash. Sphere
placement must be shared geometry, with tests for homepage/gallery offsets.
Publication wrapping is maintained separately under `js/` and `tests/publications/`.

Mobile homepage: only Möbius beside the portrait; no fish or section navbar.
Keep dragging in the introduction, with ordinary publication links/scroll below.
