"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CalloutItem {
  id: string;
  step: string;
  badge: string;
  targetLabel: string;
  title: string;
  metric: string;
  desc: string;
  threshold: number; // scroll progress threshold to trigger (0 to 1)
  arrowDir: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const CALLOUTS: CalloutItem[] = [
  {
    id: "credibility",
    step: "01",
    badge: "Credibility",
    targetLabel: "3D Floating Card",
    title: "50ms First Impression",
    metric: "94% Visual Authority",
    desc: "Visitors judge credibility in 50ms. Dated websites silently lose high-ticket clients before they ever speak to you.",
    threshold: 0.12,
    arrowDir: "bottom-right",
  },
  {
    id: "conversion",
    step: "02",
    badge: "Architecture",
    targetLabel: "Action & Status Hub",
    title: "6x Conversion Gap",
    metric: "4%–8% Funnel Yield",
    desc: "Traffic without conversion is burning capital. Bespoke sales funnels turn passive traffic into qualified discovery calls.",
    threshold: 0.32,
    arrowDir: "bottom-left",
  },
  {
    id: "mobile",
    step: "03",
    badge: "Performance",
    targetLabel: "Mobile Screen Viewport",
    title: "Sub-0.8s Mobile Engine",
    metric: "70%+ Traffic on Mobile",
    desc: "Each second of load time costs 20% of conversions. We ship sub-0.8s lightweight Next.js architectures.",
    threshold: 0.52,
    arrowDir: "top-right",
  },
  {
    id: "pricing",
    step: "04",
    badge: "Positioning",
    targetLabel: "Surging Revenue Counter",
    title: "3x–5x Higher Retainers",
    metric: "3x–5x Pricing Power Lift",
    desc: "A $50 theme cannot sell a $25,000 package. World-class custom web design commands instant market authority.",
    threshold: 0.72,
    arrowDir: "top-left",
  },
];

// Map thresholds to discrete buckets for threshold-gated state updates
const THRESHOLDS = CALLOUTS.map((c) => c.threshold);

function getActiveBucket(progress: number): number {
  let bucket = -1;
  for (let i = 0; i < THRESHOLDS.length; i++) {
    if (progress >= THRESHOLDS[i]) bucket = i;
  }
  return bucket;
}

export default function WhyNowMobileCallouts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const lastBucketRef = useRef(-1);

  // Threshold-gated state: only updates ~4 times during entire scroll, not 60-120x/sec
  const [activeBucket, setActiveBucket] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const parentSection = container.closest("section") || container;

    const trigger = ScrollTrigger.create({
      trigger: parentSection,
      start: "top 85%",
      end: "bottom 15%",
      onUpdate: (self) => {
        progressRef.current = self.progress;

        // Write directly to DOM — zero React re-renders
        container.style.setProperty(
          "--scroll-progress",
          String(self.progress)
        );

        // Threshold-gated state: only fires when crossing a callout boundary
        const bucket = getActiveBucket(self.progress);
        if (bucket !== lastBucketRef.current) {
          lastBucketRef.current = bucket;
          setActiveBucket(bucket);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ "--scroll-progress": "0" } as React.CSSProperties}>
      {/* -------------------------------------------------------------
          Desktop Spatial Layout (lg+): 4 Quadrant Callouts framing 3D phone
      ------------------------------------------------------------- */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center min-h-[640px] xl:min-h-[700px] pointer-events-none">
        
        {/* Left Column: Callout 1 (Top) & Callout 3 (Bottom) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full py-6 space-y-12 xl:space-y-16 pointer-events-auto">
          {/* Callout 1: Top-Left -> Points to 3D Card */}
          <CalloutCard
            item={CALLOUTS[0]}
            active={activeBucket >= 0}
            pointerArrow={
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1 text-emerald-500 pointer-events-none">
                <div className="w-12 h-px bg-gradient-to-r from-emerald-500/80 to-emerald-400" />
                <svg className="w-4 h-4 text-emerald-500 transform rotate-[-25deg]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            }
          />

          {/* Callout 3: Bottom-Left -> Points to Mobile Viewport */}
          <CalloutCard
            item={CALLOUTS[2]}
            active={activeBucket >= 2}
            pointerArrow={
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1 text-emerald-500 pointer-events-none">
                <div className="w-12 h-px bg-gradient-to-r from-emerald-500/80 to-emerald-400" />
                <svg className="w-4 h-4 text-emerald-500 transform rotate-[25deg]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            }
          />
        </div>

        {/* Center Zone: Completely Clear to Showcase 3D Model & Card Pop */}
        <div className="lg:col-span-4 min-h-[300px]" aria-hidden="true" />

        {/* Right Column: Callout 2 (Top) & Callout 4 (Bottom) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full py-6 space-y-12 xl:space-y-16 pointer-events-auto">
          {/* Callout 2: Top-Right -> Points to Action & Status */}
          <CalloutCard
            item={CALLOUTS[1]}
            active={activeBucket >= 1}
            pointerArrow={
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1 text-emerald-500 pointer-events-none">
                <svg className="w-4 h-4 text-emerald-500 transform rotate-[155deg]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <div className="w-12 h-px bg-gradient-to-l from-emerald-500/80 to-emerald-400" />
              </div>
            }
          />

          {/* Callout 4: Bottom-Right -> Points to Live Revenue */}
          <CalloutCard
            item={CALLOUTS[3]}
            active={activeBucket >= 3}
            pointerArrow={
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1 text-emerald-500 pointer-events-none">
                <svg className="w-4 h-4 text-emerald-500 transform rotate-[-155deg]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <div className="w-12 h-px bg-gradient-to-l from-emerald-500/80 to-emerald-400" />
              </div>
            }
          />
        </div>

      </div>

      {/* -------------------------------------------------------------
          Mobile & Tablet Sequential Grid (< lg)
      ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden mt-8">
        {CALLOUTS.map((item, idx) => (
          <CalloutCard
            key={item.id}
            item={item}
            active={activeBucket >= Math.max(0, Math.floor(idx * 0.7))}
          />
        ))}
      </div>
    </div>
  );
}

function CalloutCard({
  item,
  active,
  pointerArrow,
}: {
  item: CalloutItem;
  active: boolean;
  pointerArrow?: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-2xl border p-5 sm:p-6 ${
        active
          ? "opacity-100 translate-y-0 shadow-[0_16px_40px_rgba(0,0,0,0.08)] bg-white/96 border-neutral-300/80"
          : "opacity-20 translate-y-5 shadow-none bg-white/40 border-neutral-200/40"
      } hover:shadow-[0_22px_48px_rgba(0,0,0,0.12)] hover:border-ink hover:-translate-y-1`}
      style={{
        contain: "paint",
        isolation: "isolate",
        willChange: "opacity, transform",
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
      }}
    >
      {pointerArrow}

      {/* Top Meta Row */}
      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-neutral-900 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
            [{item.step}]
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
            {item.badge}
          </span>
        </div>

        {/* Fix 4: GPU-friendly pulse — box-shadow only, no layout/paint thrashing */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          <span
            className="inline-flex h-2 w-2 rounded-full bg-emerald-500"
            style={{
              animation: 'beacon-pulse 2s ease-in-out infinite',
              willChange: 'box-shadow',
            }}
          />
          <span>{item.targetLabel}</span>
        </div>
      </div>

      {/* Main Title & Metric */}
      <div className="mt-3.5">
        <h3 className="text-[17px] sm:text-[19px] font-black text-ink font-sans leading-snug tracking-tight">
          {item.title}
        </h3>
        <p className="mt-1 font-mono text-[12px] font-bold text-emerald-600">
          &rarr; {item.metric}
        </p>
      </div>

      {/* Concise Body Text */}
      <p className="mt-2.5 text-[13px] sm:text-[14px] text-ink-soft leading-relaxed font-sans">
        {item.desc}
      </p>
    </div>
  );
}
