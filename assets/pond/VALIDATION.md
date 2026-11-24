# Pond: architecture and validation

This feature is a local proposal. The homepage stays interactive. The supporting
post `_posts/2026-11-07-pond.md` uses the normal blog layout at `/pond/`; it shows
still ripple studies plus interactive pieces, Currents, Lorenz, and a shared
scene with passing fish. Do not publish or commit
the proposal without a request. Keep generated visual evidence outside Git.

## Modules

| Responsibility | Source |
| --- | --- |
| Homepage wiring and lifecycle | `src/index.js`, `src/scene.js` |
| Canonical section links | `src/navigation.js` |
| Shared SVG artwork/background | `_includes/pond/symbols.html`, `objects.html`, `fields.html`, `background.html` |
| Sparse layout and scroll parallax | `src/layout.js` |
| Alpha boundaries and distance transforms | `src/silhouettes.js`, `distance-field.js` |
| Click shapes, drop/wake painting | `src/ripple-geometry.js`, `waves.js` |
| Held-pointer silk wake, smoothing and ten-second fade | `src/drawing.js`, `trails.js`, `path-smoothing.js`, `stroke-waves.js` |
| Image links, direct drag, link preservation | `src/images.js`, `dragging.js` |
| Publication wrapping (separate site feature) | `js/publication-abstracts.js`, `tests/publications/` |
| Fish articulation, swimming and collisions | `src/fish-articulation.js`, `swimmer-motion.js`, `swimmers.js`, `collisions.js` |
| Currents geometry and SVG renderer | `src/current-flow.js`, `currents.js` |
| Stationary Lorenz/Möbius geometry and complete colored circuits | `src/lorenz.js`, `mobius.js`, `attractors.js`, `attractor-renderer.js`, `field-bending.js`, `curves.js` |
| Gentle flow-driven leaf/twig rotation | `src/current-drift.js` |
| Shared field objects, tracks, particles and drop feedback | `src/field-obstacles.js`, `field-contact.js`, `field-marks.js`, `flow-color.js`, `obstacle-shape.js` |
| Visible-only clock, reduced motion and page lifecycle | `src/visible-loop.js` |
| Shared snapshots and interactive gallery surfaces | `src/snapshots.js`, `previews.js`, `gallery.js` |
| Image-study selection and exterior-only Beam ripples | `src/gallery-images.js`, `image-ripples.js` |
| Private adjustable studies | `review/` (excluded from Jekyll output) |

There is no animation dependency or feature namespace on `window`. Geometry is
pure and testable independently of the DOM. The gallery imports the actual
renderers; never create a separate visual imitation for testing. Its publication
fixtures come from the homepage, with alpha detection selecting transparent
images. It shares drag handlers and field/swimmer mounting with the homepage,
but must not load the homepage entry point or navigation handlers.

## Commands

1. `npm --prefix assets/pond test` — pure geometry, production SVG renderers,
   real drag handlers with controlled events, and the visibility clock.
2. `bundle exec jekyll build` — build the actual site.
3. `npm --prefix assets/pond run test:site` — resolve every module/stylesheet and
   publication image fixture in the built site; check section IDs and exclusions.
4. Open `http://127.0.0.1:4000/pond/` for the blog gallery.
5. `npm --prefix assets/pond run review` for private seed/time studies at 4001.
   Optional `POND_REVIEW_DIR=/absolute/path/outside/repo` controls generated HTML.

Only runtime/style assets and the requested blog post ship. Tests, private
review tools, package metadata, and maintenance docs are excluded in `_config.yml`.

## Decisions to preserve

- Preserve the original blue site header and white background, including the gallery.
  The sidebar retains its earlier muted colors; it stays left on desktop and is hidden on phones. No initial flash.
- No hover labels, click captions/popups, row fills, decorative hover effects, or drag icons. Keyboard
  focus uses increased object opacity; no rectangular focus box for pond
  pieces, whether clicked, dragged, or reached by keyboard.
- No click-stones. Open-water clicks make a subtly perturbed circle, even during rapid
  repeated clicks at the same position. One release produces one wavefront.
- Pointer hover is quiet. Only click-and-drag in open water creates the selected
  **Silk ribbon**: one soft tapered crest, never a closed double bubble.
  It spreads gently and fades completely after ten seconds. Trails
  do not deform either field. Drawings and moved objects do not survive reload.
- Currents has a fixed river route and entrance. Moving its sphere or another
  pond object changes nearby flow. It must not translate the entire field.
  Every streamline must exit past the side edge, not stop at a fixed y.
  Leaves and twigs turn gradually into nearby flow and stop turning while held.
- All fields remain stationary; particles travel at a fixed distance per
  second, independent of path length. Both Lorenz colors follow complete closed
  circuits through both lobes, including after deformation. The visible ink
  and particle must use the same sampled curve; no jump at the loop seam.
- Homepage field order is **Currents right, Lorenz left, Möbius right**. Lorenz's
  visible ink fills its margin (do not restore empty viewBox padding or clip it
  at the left edge). Keep default spheres out of the reading column. Anchor
  desktop Möbius within Publications, independent of decorative-object slots;
  removing a creature must never send it to the end of Talks.
- Möbius is an actual half-twisted band, not a Rössler trajectory. It has ONE
  warm-colored centerline. Use `mobiusSpherePlacement` in both views: its sphere
  starts on that centerline, accounting for the preview's inset and size.
- Drops touching a field change its flow without a separate expanding pond
  ripple. Use rendered paths for detection, not the field's bounding rectangle.
  Open pond water still splashes. Clean up field registrations when destroyed.
- Chrome spheres are editable SVG: broad soft highlight, small second glint,
  dark edge and fine grain. No purple stripe painted inside the ball. The warm
  flow line transitions from rose/red through coral to orange.
- Fish have gentle tail beats, body sway, fin movement and stroke/glide propulsion.
  Articulation and travel share the same visible-only clock; both freeze while
  held, hidden, offscreen or under reduced motion, then resume without catch-up.
  No Game of Life pieces, gallery cards or evolution code. No field arrows.
- Fields use a tight convex envelope of visible alpha contours, including current
  rotation, rather than a circular SVG box. Inner flow clearance is one CSS pixel.
  Nearby streamlines contract monotonically to the envelope and remain ordered.
  The twig aligns to the underlying river, never its own displaced boundary.
- Lotus is small and muted. No frogs or lizards. Fish appear only above the mobile breakpoint.
- On mobile the homepage shows only Möbius beside the portrait. Pond interactions
  end at the introduction; publication images keep normal link/scroll behavior.
  No fish, margin currents/Lorenz, or floating section navigation.
  The broader band fills the available width and portrait height, with a small
  edge inset. Share narrow layouts with a responsive portrait; turn the band
  horizontally for wide spaces. Geometry and sphere placement use the same
  projection, and breakpoint changes replace the old renderer cleanly.
- Nearby fish and sphere cannot create dangling curls: do not integrate the fish
  bounding circle as a physical obstacle. Use its silhouette after the base river.
- No removed art references or decorations should reappear during refactors.
- All default pieces fit the content length; scrolling never swaps creatures.
- `/pond/` supplements the homepage; it does not replace the interactive pond.
- Image studies remain compact without enlarging low-resolution sources. Beam
  emits only from its exterior, not inside its eye. Omit semi-discrete, RCPM,
  CombOptNet, NSTPP, Neural Potts, and LML from the gallery only.

## Repeatable visual generations

Use seeds **7, 8, 23**, and times **0.12, 0.6, 1.4, 2.4 seconds** in the private
review. Drawn strokes additionally need **1, 5, 9, 10 seconds**. Save evidence
outside the repository as `<date>-<case>-<width>-seed<seed>-t<time>.png`.

| Study | Cases | Acceptance |
| --- | --- | --- |
| Clicks | Perturbed circles at seeds 7/8/23; repeated fast clicks | Minor shape variation only, one brightness peak, no debounce, bounded allocation |
| Wakes | Hover without press; held straight sweep, broad curve, turn/lift, image dragging | Hover creates nothing; one silk crest; real object footprint; no ring spam |
| Drawings | Short stroke, long curve, crossing scribble, scroll during fade | Distance-based outward propagation; no pulsing; gone at 10s; fields unchanged |
| Objects | Every leaf, twig, petal, lotus, fish, sphere | Ripple starts at actual visible boundary, no bounding-box wave |
| Images | Headshot and selected transparent publication images; opaque/GIF drag too | Rounded headshot; islands and holes initially preserved except Beam; no spikes as fronts merge |
| Currents | Thin twig and fish at multiple angles/scales, one-pixel envelope; centered sphere; upstream/downstream; near edge; far outside; passing fish; two objects | No square gap, tangles, line through sphere, or downstream truncation; route fixed; test short/mobile surfaces too |
| Lorenz | Default/moved sphere; two particles; pause/return; different widths | Stable dense geometry; smooth arcs; both colors visit both lobes and close seamlessly; consistent travel speed |
| Swimmers | Multiple seeds; wall/text/object bounce; grab/drop/cancel | Arbitrary angles; no speed gain; held fish and tail phase frozen |
| Möbius | Margin/gallery; narrow/offset preview; 320/390/767px portrait region; rotate/resize; sphere on band; move/drop | True half twist, one centerline, initial sphere centered on band; full mobile area without clipping; desktop field before Code; no drop ripple within field |
| Abstracts | Run separate 72-case publication matrix; short/full abstracts, wide/tall/small images, 320–1440px | Stable image position; bounded clearance above/below notch; no empty shelf on short abstract |
| Blog gallery | All studies; seven selected transparent images; drag ball/fish; fields visible/offscreen | No missing assets; animation stops offscreen; idle ripple canvas stops; objects remain inside their surface |

## Browser matrix

Check **320×720, 390×844, 768×1024, 1440×900** and portrait-to-landscape.
A narrow desktop viewport is not proof of touch hardware behavior.

- Cold load at top and a deep link: no navbar/decorative flash. Navbar appears
  after scrolling; labels are Publications, Code, Talks. No About/year/collapse.
- `#publications`, `#code`, `#talks` work; old `#-...` links normalize.
- Background scroll parallax is slow and reversible. Object/drop coordinates
  remain attached to their document location; page ends at actual content.
- Drag image/object, cancel, switch tabs, resize, return with browser history.
  Image click/Enter still follows its link; actual drag must suppress navigation.
- Clicking pieces never opens description popups. Accessible labels remain.
- Hover rows, pills, links, awards and scenery. No fill/scale/tooltip change.
  Check keyboard focus separately from pointer focus.
- Move a ball across the current and away, and move a fish/image into it.
  No rectangular focus outline; no river translation; no drawing interference.
- Reduced motion, hidden tab, offscreen, print and no JavaScript: content remains
  usable. No continuously running idle canvas or hidden/offscreen field loop.
- Check browser errors and no horizontal overflow. Verify the pond does not
  create extra page length. Do not claim real HoverZoom-extension compatibility
  without running that extension; direct dragging and link preservation are
  the behaviors tested here.

## Latest verified observations — 2026-11-13

- Enlarged mobile Möbius visually checked at CSS widths 320, 390 and 766px;
  normal 491px preview restored. The portrait and strip share small screens,
  and the band fills the full region in both orientations without overflow.
  After mobile-to-desktop resizing at 1440px, its bounds are x=1204..1428,
  outside the reading column ending at x=1193. It sits within Publications,
  before Code, rather than in the last decoration slot. No browser errors.

- Verified mobile at 320 and 390px: only Möbius beside the portrait, no overflow,
  no fish or section bar. Below the intro, the pond surface has zero height and
  no fields remain in view. Default viewport restored after checking.
- Desktop gallery: fish tail/position advance, drag freezes and release resumes;
  adjacent fish/sphere has continuous flow and no rectangular focus outline.
  Touching silhouettes use a shared outer boundary instead of conflicting obstacles.

- 54 pond tests pass: renderer continuity, current exits, full Lorenz circuits,
  Möbius topology and default sphere placement, field drop detection, close-fitting rotated and adjacent obstacle
  envelopes, fish articulation and pause/resume, real drag/release handlers, quiet hover and held
  drawing, ten-second fade, leaf contour smoothing, and visibility lifecycle.
  New placement cases cover full-area mobile projections and sphere alignment
  at six region sizes, plus the desktop Publications anchor at four page lengths.
- Built-site smoke checks resolve 39 shared modules and 18 publication fixtures.
  Tests/private studies are excluded from output. No raster assets were added.
- Private Trail options compare Soft wake, Silk ribbon and Quiet line with
  straight, shaky and curved gestures. **Silk ribbon was selected by the user.**
  Chrome studies inspect the shared editable sphere artwork at larger size.
- Checked the white homepage and original blue header; restored sidebar colors.
  Main field positions at 1280: Lorenz x=12..148, Möbius x=1117..1253, reading
  column x=160..1105. Both are inside their respective margins. Wider Lorenz
  uses its full drawing width; no negative left offset.
- Checked the Möbius sphere on its band and dragged it in the gallery. Its
  default placement is now derived from the geometry rather than percentages.
  Drops in fields use flow deformation without an additional ripple.
- The separate publication suite has two geometry tests and 72 browser layout
  cases (six actual images × six widths × short/full abstracts). All pass.
  Restoring the old 32px bottom gap deliberately fails the checks, including
  the two user-reported examples. Opening abstracts keeps image positions
  stable. The number column has a consistent minimum width.
- Gallery SVG definitions must remain renderable: hiding their offscreen
  ancestor with `visibility:hidden` suppresses filtered sphere `<use>` elements.
  Keep the fixture container offscreen and inert instead.
- Prior viewport checks include 320, 390, 768, 1024, 1280 and 1440 widths.
  Repeat affected cases when layout changes; a narrow viewport is not real
  touch hardware. Actual HoverZoom extension, OS reduced-motion toggle,
  slow-network first-paint recordings and bfcache remain manual checks.
- All screenshots/studies stay in the chat's external visualization directory.
  The publication wrapping fixes are committed separately; pond work stays
  unstaged until the user explicitly approves publishing it.
