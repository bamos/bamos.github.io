# Publication wrapping checks

This suite belongs to publication layout and runs without the pond.

- `node --test tests/publications/geometry.test.mjs`
- `bundle exec jekyll build`
- `node tests/publications/review.mjs`, then open `http://127.0.0.1:4003/`.

The browser review automatically measures 72 cases: six real publication
illustrations (wide, tall, transparent and opaque), short/full abstracts, and
320/390/767/768/1024/1440px viewports. It checks image position, viewport bounds,
side/bottom text clearance, short-box outlines and excessive blank space.
Inspect the affected case visually too, especially line breaks at the notch.
These measurements catch layout regressions; they cannot guarantee aesthetics.

When changing wrapping, repeat the two reported problem cases (model-based SVG
and Meta Flow Matching), both with and without the local pond proposal.
Check opening/closing the abstract and resizing. Keep screenshot evidence outside
Git; this local server generates pages in memory and never copies image assets.

Negative control: open `/fixture?variant=long&bad-gap=1` at desktop width.
It deliberately restores the oversized bottom gap; the checks must report it.
