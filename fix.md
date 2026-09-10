# Performance Fix Plan — Scroll/3D Jank & Input Lag

**Goal:** Fix all 6 bottlenecks without removing the 3D phone, shaders, glassmorphism, or any existing animation. Every fix below is a rewiring of *how* a visual is produced, not a removal of the visual itself.

**Important note on scope:** This plan is written from the audit you provided, not from a direct read of your source files. Code snippets below are *patterns to apply* — file names, variable names, and exact structure may differ slightly from your real code. Adapt accordingly. Where a claim in the original audit couldn't be independently verified (exact line counts, exact ms figures, exact FPS drop), treat it as a hypothesis to confirm in Step 0, not a settled fact.

---

## Step 0 — Measure Before You Touch Anything

Do this first, every time, before and after each fix below. Otherwise you're optimizing based on guesses.

1. Open Chrome DevTools → **Performance** tab.
2. Check "Screenshots" and enable CPU throttling (4x slowdown) to simulate a mid-range device.
3. Record ~5 seconds of scrolling through the 3D section, then a few clicks on the FAQ/carousel.
4. Stop recording. Look at:
   - **Main thread flame chart** — look for long yellow (Scripting) blocks during scroll. This is React re-rendering.
   - **Purple (Rendering) / Green (Painting) bands** — spikes here during scroll = backdrop-filter or filter repaints.
   - **"Compositing" entries** — confirms GPU layer promotion is/isn't happening.
5. Note the baseline: average FPS during scroll, and INP (use the **Interactions** track, or check real-user data in Chrome UX Report / `web-vitals` library) before a click registers.

Re-run this exact recording after each fix below and confirm the specific flame-chart region you targeted actually shrank. If it didn't, you fixed the wrong thing.

---

## Fix 1 — Eliminate React State on Scroll (highest priority, lowest risk)

**Target:** `WhyNowMobileCallouts.tsx`, or wherever `ScrollTrigger.onUpdate` calls `setState`.

**Problem pattern:**
```tsx
ScrollTrigger.create({
  // ...
  onUpdate: (self) => {
    setScrollProgress(self.progress); // fires 60-120x/sec, triggers React render
  }
});
```

**Fix — drive a ref + CSS variable / GSAP setter instead of React state:**
```tsx
const progressRef = useRef(0);
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const trigger = ScrollTrigger.create({
    trigger: containerRef.current,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      progressRef.current = self.progress;
      // Write directly to the DOM — no React re-render
      containerRef.current?.style.setProperty("--scroll-progress", String(self.progress));
    },
  });
  return () => trigger.kill();
}, []);
```

Then consume `--scroll-progress` in CSS for anything that needs to visually respond continuously:
```css
.callout-card {
  opacity: calc(var(--scroll-progress) * 1);
  transform: translateY(calc((1 - var(--scroll-progress)) * 40px));
}
```

**If a component genuinely needs to re-render at specific thresholds** (e.g. swap an icon or copy at 25%/50%/75%), don't remove state entirely — gate it so `setState` only fires on the *crossing*, not every tick:
```tsx
const lastBucket = useRef(-1);

onUpdate: (self) => {
  const bucket = Math.floor(self.progress * 4); // 0,1,2,3
  if (bucket !== lastBucket.current) {
    lastBucket.current = bucket;
    setActiveBucket(bucket); // fires ~4 times total, not 100x/sec
  }
}
```

**For numeric animations** (counters, progress bars), use `gsap.quickTo()` or `gsap.quickSetter()` — these bypass React and the GSAP timeline overhead entirely for per-frame writes:
```tsx
const setX = gsap.quickSetter(cardRef.current, "x", "px");
// inside onUpdate:
setX(self.progress * 100);
```

**Verification:** In Step 0's recording, the Scripting band during scroll should drop dramatically. React DevTools Profiler should show zero (or near-zero) renders of the callout components while scrolling.

---

## Fix 2 — Break Up the Monolithic `page.tsx`

**Target:** `page.tsx` (single `Home()` component holding `menuOpen`, `openFaq`, `aboutSlideIndex`, `portfolioIndex`, and the `CreditCardSurgeHero` interval).

**The actual fix is state colocation, not `React.memo` alone.** `React.memo` only helps if the props passed to a child have *stable identity* across renders. If `Home` re-creates an inline function or object on every render and passes it down, `memo` does nothing — the child still re-renders.

**Wrong (common mistake):**
```tsx
function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // ... 1400 more lines of other state and JSX ...
  return (
    <>
      <FaqSection
        openFaq={openFaq}
        onToggle={(i) => setOpenFaq(openFaq === i ? null : i)} // new function every render
      />
    </>
  );
}
const FaqSection = React.memo(FaqSectionImpl); // does nothing — prop identity changes anyway
```

**Right — the state lives inside the component that owns it:**
```tsx
// FaqSection.tsx — owns its own state, Home never re-renders when this changes
export function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div>
      {items.map((item, i) => (
        <FaqRow
          key={item.id}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
```

```tsx
// page.tsx — Home no longer holds FAQ, portfolio, or nav state at all
export default function Home() {
  return (
    <>
      <Nav />              {/* owns menuOpen internally */}
      <Hero />
      <AboutSlider />      {/* owns aboutSlideIndex internally */}
      <PortfolioCarousel /> {/* owns portfolioIndex internally */}
      <FaqSection items={faqItems} />
      <FinalCta />
    </>
  );
}
```

Do this for each piece of state listed in the audit:
- `menuOpen` → moves into `<Nav />`
- `openFaq` → moves into `<FaqSection />`
- `aboutSlideIndex` → moves into `<AboutSlider />`
- `portfolioIndex` → moves into `<PortfolioCarousel />`
- The `CreditCardSurgeHero` 2.2s interval → stays local to that component; confirm the interval doesn't call `setState` on anything outside its own subtree.

**Verification:** React DevTools Profiler → click a FAQ row → only `FaqRow`/`FaqSection` should show a render, not `Home` or any sibling section.

---

## Fix 3 — Reduce Backdrop-Filter Cost (don't necessarily remove it)

**Target:** `.backdrop-blur-xl` cards in `WhyNowMobileCallouts.tsx`, sticky header in `page.tsx`.

Three options, in order of "keeps the look" vs. "cheapest":

**Option A — Isolate the layer (keep exact current look, cheap to try first):**
```css
.callout-card {
  backdrop-filter: blur(24px);
  contain: paint;       /* tells the browser this element's paint doesn't affect anything outside it */
  isolation: isolate;   /* forces its own stacking/compositing context */
  will-change: backdrop-filter;
}
```
This doesn't reduce the blur math, but it can stop the browser from re-considering unrelated page content when compositing that layer. Cheap, low-risk, test it first.

**Option B — Reduce blur radius:**
```css
/* before */
backdrop-filter: blur(24px);
/* after — visually similar, meaningfully cheaper */
backdrop-filter: blur(12px);
```
Blur cost roughly scales with radius; halving it is a real, measurable saving without changing the "glass" impression much.

**Option C — Full removal (the audit's suggestion, use if A/B aren't enough):**
```css
/* before */
.callout-card {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(24px);
}
/* after — zero-cost frosted glass */
.callout-card {
  background: rgba(255,255,255,0.96);
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08); /* hardware-accelerated, no live filter */
}
```

Apply the same options to the sticky header (`bg-paper/85 backdrop-blur-md`).

**Verification:** Step 0 recording — Painting/Compositing bands during scroll should shrink. Do a visual diff (screenshot before/after) to confirm the look is still acceptable before shipping Option C.

---

## Fix 4 — Stop Re-uploading the Full Canvas Texture Every Frame

**Target:** `ProductShaderBackground.tsx`, the `uiTexture.needsUpdate = true` line, 640×1360 canvas.

**Problem pattern:**
```tsx
// Redraws and re-uploads the ENTIRE 640x1360 canvas on every counter tick
function updateRevenueCounter(value: number) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  drawFullPhoneUI(ctx, value); // redraws everything, not just the number
  uiTexture.needsUpdate = true; // re-uploads all 3.5MB to GPU
}
```

**Fix step 1 — only update when the value actually changes, not on a fixed interval:**
```tsx
const lastValue = useRef<number | null>(null);

function updateRevenueCounter(value: number) {
  if (value === lastValue.current) return; // skip redundant uploads
  lastValue.current = value;
  drawCounterRegion(ctx, value);
  uiTexture.needsUpdate = true;
}
```

**Fix step 2 — bake the static phone UI once, keep only the counter dynamic:**
```tsx
// On mount: draw the static phone chrome ONCE
useEffect(() => {
  drawStaticPhoneUI(staticCtx); // logo, chart background, labels — never redrawn
  staticTexture.needsUpdate = true; // uploaded once
}, []);

// On every counter change: draw ONLY the small counter region into its own small canvas
const COUNTER_W = 200, COUNTER_H = 60;
function updateCounter(value: number) {
  counterCtx.clearRect(0, 0, COUNTER_W, COUNTER_H);
  counterCtx.fillText(formatCurrency(value), 10, 40);
  counterTexture.needsUpdate = true; // ~48KB instead of 3.5MB
}
```
Composite the small `counterTexture` as a second mesh/plane positioned over the static phone texture in Three.js (or, if the phone face stays roughly perpendicular to camera, as an HTML overlay positioned with a matching 3D CSS transform — cheaper still, but only looks right if the phone doesn't rotate much).

**Verification:** Step 0 recording — look for GPU "Texture Upload" or long tasks correlated with the counter's update interval; they should shrink from ~3.5MB events to ~KB-scale events.

---

## Fix 5 — Lenis Virtual Smooth Scroll (do this last — highest integration risk)

**Target:** Native scroll behavior, `ProductShaderBackground.tsx` camera lerp, `globals.css`.

**Install:**
```bash
npm install lenis
```

**The gotcha the original audit didn't flag: Lenis and GSAP ScrollTrigger both want to own the animation loop.** If you let both run their own `requestAnimationFrame`, you get two competing loops and new desync bugs — not fewer. Wire them together explicitly:

```tsx
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  });

  // Feed Lenis's scroll events into ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Let GSAP's ticker drive Lenis's RAF — do NOT also call lenis.raf() yourself
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  };
}, []);
```

Once Lenis is driving scroll, the camera lerp in `ProductShaderBackground.tsx` can likely be *reduced or removed* — smoothing was previously compensating for jumpy native scroll, and now scroll itself is smooth. Test with the lerp factor lowered (faster response) rather than removed outright, and compare.

**Required regression tests before shipping this (commonly broken by smooth-scroll libraries):**
- Keyboard scrolling (Page Down, arrow keys, Space) still works
- Screen reader / VoiceOver scroll navigation still works
- Browser zoom (Ctrl/Cmd +/-) doesn't break scroll math
- Anchor links (`#section`) and `scrollIntoView()` calls elsewhere on the site still land correctly
- Mobile touch scroll (Lenis has separate touch config — don't assume desktop config covers it)

**Verification:** Scroll on Windows with a physical mouse wheel — the 3D phone and the surrounding HTML content should now move in visual lock-step instead of the phone gliding while text jumps.

---

## Fix 6 — Replace Live Filters With Pre-baked Assets

**Target:** `.animate-glitter-text` (`drop-shadow` stack), Hero chart `feGaussianBlur`, `.animate-card-3d-pitch` (shadow + backdrop-blur combined with continuous rotation).

**Problem:** a filter on an element that's also continuously transforming can't be cached as a static GPU layer — the browser recomputes the filter every single frame, even when nothing about the filter itself changed, because the element's transform invalidates it.

**Fix — separate the "expensive but static" part from the "cheap but animated" part:**
```css
/* Before: shadow blur recomputed every frame because the element rotates */
.pitch-card {
  animation: pitch 4s ease-in-out infinite;
  box-shadow: 0 25px 60px rgba(0,0,0,0.3);
  backdrop-filter: blur(24px);
}

/* After: glow is a separate, non-rotating layer positioned behind the card;
   only transform/opacity animate on the rotating element itself */
.pitch-card-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(0,0,0,0.25), transparent 70%);
  /* static — computed once, cached as a GPU layer, never recomputed */
}
.pitch-card {
  animation: pitch 4s ease-in-out infinite; /* transform-only, cheap */
  background: rgba(255,255,255,0.96); /* replaces backdrop-blur, see Fix 3 */
}
@keyframes pitch {
  0%, 100% { transform: rotateX(0deg); }
  50% { transform: rotateX(8deg); }
}
```

For the SVG `feGaussianBlur` in the Hero chart, if the chart itself isn't animating, pre-render it once as a static image/PNG with the blur already baked in, and only animate the container's `transform`/`opacity`:
```html
<!-- Before: SVG recomputes blur every frame if any ancestor animates -->
<svg><feGaussianBlur stdDeviation="3" /></svg>

<!-- After: blur pre-baked into a static image, filter removed entirely -->
<img src="/chart-with-glow.png" alt="" class="animate-fade-in" />
```

**Verification:** Step 0 recording with the mouse *not moving* — CPU usage should drop to near-zero when nothing is being scrolled/clicked, since these filters were previously repainting on every rAF tick regardless of user input.

---

## Suggested Implementation Order

| Order | Fix | Risk | Payoff |
|---|---|---|---|
| 1 | Fix 1 — state off the scroll loop | Low | High |
| 2 | Fix 2 — state colocation / component split | Low | High (fixes INP directly) |
| 3 | Fix 3 — backdrop-filter reduction | Low | Medium-High |
| 4 | Fix 6 — pre-baked filters | Low | Medium |
| 5 | Fix 4 — texture upload throttling | Medium | Medium |
| 6 | Fix 5 — Lenis integration | Medium-High | Medium (mostly a *feel* fix, not raw FPS) |

Do 1–4 first, re-measure with Step 0, and only move to Lenis once the underlying render cost is already fixed — adding smooth scroll on top of a janky render pipeline just makes the jank feel smoother, it doesn't remove it.

---

## Final Checklist Before Calling This Done

- [ ] Step 0 performance recording taken before any changes (baseline saved)
- [ ] Fix 1: React DevTools Profiler shows zero renders on scroll for the callout components
- [ ] Fix 2: clicking one FAQ row only re-renders that row, confirmed in Profiler
- [ ] Fix 3: visual diff of cards/header approved after blur reduction
- [ ] Fix 4: texture upload size/frequency reduced, confirmed in Performance tab
- [ ] Fix 5: keyboard scroll, screen reader scroll, and anchor links tested after Lenis
- [ ] Fix 6: CPU usage near-zero when idle (no scroll, no click), confirmed in Performance tab
- [ ] Final Step 0 recording taken after all fixes, compared against baseline
- [ ] Tested on an actual mid-range Windows laptop with a physical mouse, not just the dev machine
