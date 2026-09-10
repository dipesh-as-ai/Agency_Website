ROLE
You are performing a content audit and content-only refactor on a Next.js/React/Tailwind marketing website ("First Click Agency"). You are NOT a designer here — you are an editor. Your job is ruthless content reduction, not redesign.

HARD CONSTRAINTS — DO NOT VIOLATE
1. Do not modify any visual/design system code: no changes to Tailwind classes, CSS custom properties, color tokens, typography scale, spacing, animation/motion code, component structure, layout grids, or the custom cursor / scroll-reveal / interaction systems.
2. Do not touch functional code: forms, WhatsApp button, Calendly embed, routing, SEO metadata, analytics.
3. You may delete a content BLOCK (a section, a paragraph, a card, an entire page) but if you do, remove it cleanly — don't leave broken layout, empty wrapper divs, orphaned grid slots, or dead imports.
4. Every change must be content-only: what text exists, how much of it there is, what things are named, and whether a page/section exists at all.

STEP 1 — INVENTORY (do this first, output before touching any code)
Crawl the entire site: every route/page, every section within app/page.tsx (or wherever content lives), every reusable content component. For each page/section produce:
- Location (file + section name)
- Purpose in one line (what job is this content doing for the visitor)
- Approx word count
- Nav/label name as currently written

STEP 2 — DIAGNOSE
For every item in the inventory, flag it against these failure modes:
- REDUNDANT: says something another section already said
- OVER-EXPLAINED: makes its point in 3+ sentences when 1 would do
- JARGON-NAMED: a nav label, section heading, or CTA that a first-time visitor wouldn't understand in 2 seconds (be specific — quote the actual word/phrase)
- OFF-STRATEGY: doesn't serve the core positioning (conversion systems/funnels for high-ticket coaches, consultants, agencies) — it's legacy content from an earlier version of the site or a tangent
- LOW-SIGNAL: generic filler that could appear on any agency site, adds no proof or specificity

STEP 3 — DECIDE
For every inventoried item, assign one of:
- KEEP AS-IS
- TRIM (cut to essential — specify target: e.g. "3 sentences → 1 line, max 12 words")
- RENAME (give the new label — must be plain-language, no internal jargon, no cleverness that obscures meaning)
- DELETE (entire section or page — state why, and confirm no other page depends on it: internal links, nav references, footer links)

Bias rule: this site's primary conversion mechanism is visual — the motion, the interaction design, the portfolio work itself. Copy's only job is to get out of the way fast enough that the visuals and CTA carry the page. If a sentence isn't doing load-bearing work (naming the problem, naming the outcome, or driving to the CTA), cut it.

Non-negotiable keeps regardless of length: contact/WhatsApp CTA, Calendly booking, core hero value proposition, portfolio/work section, primary CTA copy.

STEP 4 — OUTPUT THE PLAN (stop here, do not execute yet)
Present the full Step 3 decision table to me before making any file changes. Format: Page/Section | Current | Decision | New content (if trim/rename) | Reasoning (one line).

STEP 5 — EXECUTE (only after I approve the plan)
Apply exactly the approved decisions. For deletions, remove the block/page and any now-dead references (nav links, footer links, internal anchors, unused imports). Do not introduce new sections, new copy patterns, or new design elements not already in the plan.

STEP 6 — REPORT
After execution, give me: pages/sections deleted, total word count before vs after (site-wide), and a list of any nav/route changes so I can update anything external (e.g. shared links).