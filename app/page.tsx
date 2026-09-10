"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductShaderBackground from "./components/ProductShaderBackground";
import WhyNowMobileCallouts from "./components/WhyNowMobileCallouts";
import NavHeader from "./components/NavHeader";
import PortfolioCarousel from "./components/PortfolioCarousel";
import AboutSlider from "./components/AboutSlider";
import FaqSection from "./components/FaqSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================
   Geometric High-Precision Icons
============================================================ */

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M6 14L14 6M14 6H7M14 6V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0l2.163 5.279L16 6.111l-4 3.847L12.944 16 8 12.98 3.056 16 4 9.958 0 6.111l5.837-.832L8 0z" />
    </svg>
  );
}

function QuoteMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 4.8C9.6 5.6 7.2 8 7.2 12h6.4V24H0zm18.4 0V14.4c0-8 4.8-13.2 12.8-14.4l1.6 4.8c-4.8.8-7.2 3.2-7.2 7.2h6.4V24H18.4z" />
    </svg>
  );
}

function TrendingUpIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M3 14.5L8.5 9L12.5 13L17 5.5M17 5.5H12M17 5.5V10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================
   Content Data (kept in page.tsx — these are static, no state)
============================================================ */

const RESULTS_METRICS = [
  { value: "200+%", label: "Sales Leads" },
  { value: "95+%", label: "Engagement Rates" },
  { value: "90+%", label: "Social Media Followers" },
  { value: "1,000+%", label: "Website Traffic" },
  { value: "22 M", label: "Google Ad Impressions" },
];

const CAPABILITIES = [
  {
    title: "Bespoke Web Design & UI/UX",
    desc: "Custom editorial layouts, intentional typography hierarchy, and interactive micro-animations tailored precisely to your brand positioning.",
  },
  {
    title: "High-Performance Web Development",
    desc: "Engineered with modern Next.js & React. Zero template bloat, sub-second load times, dynamic interactions, and bulletproof responsiveness.",
  },
  {
    title: "Conversion Landing Pages",
    desc: "Single-minded sales funnels and call booking architectures designed with one uncompromising objective: turning visitors into paying clients.",
  },
];

const TESTIMONIALS = [
  {
    quote: "First Click Agency built a system that completely transformed our agency. The quality of calls and inbound inquiries jumped from day one.",
    name: "Arun P.",
    role: "Agency Founder & Business Coach",
  },
  {
    quote: "From an outdated template to a world-class digital presence that generated multi-crore revenue in months. Their design and execution are world-class.",
    name: "CA Rahul Jain",
    role: "Strategic Business Consultant",
  },
  {
    quote: "We now have a predictable pipeline of high-ticket clients every single week. Working with their 3-person team was seamless and incredibly fast.",
    name: "Vikram S.",
    role: "Digital Agency Owner",
  },
];


/* ============================================================
   Hero Credit Card & Increasing Line Component
   (already self-contained — owns its own state locally)
============================================================ */

function CreditCardSurgeHero() {
  const [creditAmount, setCreditAmount] = useState(79317);

  useEffect(() => {
    // Dynamic surge increment
    const interval = setInterval(() => {
      setCreditAmount((prev) => {
        if (prev >= 285000) return 68500;
        return prev + Math.floor(Math.random() * 4800) + 2200;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Format currency
  const formattedCredit = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(creditAmount);

  return (
    <div
      className="relative mx-auto w-full max-w-[460px] py-4 select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient background glowing blur orbs */}
      <div className="absolute -top-8 -right-8 h-56 w-56 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      {/* Floating Badge Top-Right: Credit Limit Increase */}
      <div className="animate-float-badge-1 absolute -top-3 right-0 z-30 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-neutral-950/90 px-3.5 py-1.5 shadow-xl">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 radar-ping" />
        <TrendingUpIcon className="h-3.5 w-3.5 text-emerald-400" />
        <span className="font-mono text-[11px] font-semibold text-emerald-300">
          +340% Limit Surge
        </span>
      </div>

      {/* Floating Badge Bottom-Left: Live Settlement */}
      <div className="animate-float-badge-2 absolute -bottom-4 -left-2 z-30 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-neutral-950/95 px-3.5 py-2 shadow-2xl">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <CheckIcon className="h-3.5 w-3.5" />
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400">Instant Approved</p>
          <p className="text-[11px] font-bold text-white leading-tight">High-Ticket Limit</p>
        </div>
      </div>

      {/* 3D Physical Card Wrapper — Fix 3: removed backdrop-blur-2xl, Fix 6: separated shadow from animated element */}
      <div
        style={{
          transformStyle: "preserve-3d",
        }}
        className="animate-card-3d-pitch relative aspect-[1.586/1] w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900/98 via-neutral-950/95 to-neutral-900/98 p-5 sm:p-6 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.6),0_0_35px_rgba(16,185,129,0.18)] overflow-hidden flex flex-col justify-between"
      >
        {/* Subtle curved lighting gradient simulating 3D cylindrical bend */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/8 to-white/0 opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />

        {/* 1. Card Top Row: Brand & Contactless Icon */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/25 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold font-mono">
              FC
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-300 uppercase">
              First Click Platinum
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 hidden sm:inline">
              Infinite Scale
            </span>
            <svg className="h-4 w-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M8.5 16.5a5 5 0 0 1 0-9" strokeLinecap="round" />
              <path d="M12 19a8.5 8.5 0 0 0 0-14" strokeLinecap="round" />
              <path d="M15.5 21.5a12 12 0 0 0 0-19" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 2. Middle Row: EMV Chip + Sales Increment Display & Surging Badge */}
        <div className="relative z-10 my-auto flex items-center justify-between gap-3">
          {/* Gold EMV Chip */}
          <div className="relative h-7 w-10 sm:h-8 sm:w-11 shrink-0 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-0.5 shadow-md">
            <div className="h-full w-full rounded-[2px] border border-amber-800/40 grid grid-cols-2 grid-rows-3 gap-[1px] p-[1.5px] opacity-85">
              <div className="border border-amber-900/30 rounded-[0.5px]" />
              <div className="border border-amber-900/30 rounded-[0.5px]" />
              <div className="border border-amber-900/30 rounded-[0.5px]" />
              <div className="border border-amber-900/30 rounded-[0.5px]" />
              <div className="border border-amber-900/30 rounded-[0.5px]" />
              <div className="border border-amber-900/30 rounded-[0.5px]" />
            </div>
          </div>

          {/* Sales Increment Display */}
          <div className="text-right sm:text-left flex-1 pl-2">
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-400">
              Sales Increment
            </p>
            <div className="flex items-baseline justify-end sm:justify-start gap-2">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono drop-shadow-sm">
                {formattedCredit}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
                <TrendingUpIcon className="h-2.5 w-2.5" />
                Surging
              </span>
            </div>
          </div>
        </div>

        {/* 3. The Green Increasing Curve Chart Overlay — Fix 6: replaced feGaussianBlur with CSS shadow */}
        <div className="relative z-10 -mx-3 -my-2 h-14 sm:h-16">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 340 90" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="emeraldGradFill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient area under line */}
            <path
              d="M 0 78 C 50 75, 90 70, 130 55 C 170 42, 210 35, 250 20 C 290 8, 320 5, 340 2 L 340 90 L 0 90 Z"
              fill="url(#emeraldGradFill2)"
            />

            {/* Subtle dashed guide line */}
            <path
              d="M 0 78 C 50 75, 90 70, 130 55 C 170 42, 210 35, 250 20 C 290 8, 320 5, 340 2"
              stroke="#064e3b"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />

            {/* The Glowing Neon Green Increasing Line — replaced filter with CSS drop-shadow on parent */}
            <path
              d="M 0 78 C 50 75, 90 70, 130 55 C 170 42, 210 35, 250 20 C 290 8, 320 5, 340 2"
              stroke="#10b981"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="animate-green-line"
              style={{ filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))" }}
            />

            {/* Glowing Beacon at Tip */}
            <g transform="translate(338, 2)">
              <circle r="7" fill="#10b981" opacity="0.35" className="animate-ping" />
              <circle r="3.5" fill="#34d399" />
              <circle r="1.5" fill="#ffffff" />
            </g>
          </svg>
        </div>

        {/* 4. Bottom Row: Cardholder, Expiry, Number, Emblem */}
        <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-2">
          <div>
            <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.2em] text-neutral-300">
              •••• •••• •••• <span className="font-semibold text-white">8892</span>
            </div>
            <p className="mt-0.5 font-mono text-[9px] sm:text-[10px] font-medium text-neutral-400 uppercase">
              Sales / Reach / Engagements
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">Expires</p>
              <p className="font-mono text-[10px] font-semibold text-neutral-200">08/29</p>
            </div>
            <div className="flex -space-x-1.5">
              <div className="h-5 w-5 rounded-full bg-emerald-500/80" />
              <div className="h-5 w-5 rounded-full bg-teal-400/80" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ============================================================
   Page Component — ZERO state hooks, all state colocated in sub-components
============================================================ */

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger Animations (global section reveals — stays here)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Staggered reveal for cards across all sections
      const sections = document.querySelectorAll(".gsap-reveal-section");
      sections.forEach((sec) => {
        const items = sec.querySelectorAll(".gsap-card");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="top" className="min-h-[100dvh] bg-paper text-ink selection:bg-ink selection:text-paper">
      
      {/* ---------------- Header & Navigation (owns menuOpen internally) ---------------- */}
      <NavHeader />

      <main ref={mainRef} className="w-full max-w-full overflow-x-hidden">
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 sm:pt-14 sm:pb-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Left-aligned Text, Badge, Founder Avatars & Left-aligned CTA Buttons */}
            <div className="flex flex-col items-start text-left lg:col-span-7">
              <h1 className="text-[clamp(2.5rem,4.8vw,4.4rem)] font-bold leading-[1.08] tracking-tight text-ink text-left">
                Your business deserves a website that{" "}
                <span className="relative inline-flex items-center align-middle mx-1.5 px-4 py-1 sm:px-5 sm:py-1.5 rounded-full bg-gradient-to-b from-[#242830] via-[#101216] to-[#040507] text-white text-[0.54em] sm:text-[0.58em] font-mono uppercase tracking-wider font-bold border border-white/30 ring-1 ring-black/60 shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(0,0,0,0.8),0_6px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105">
                  <span className="absolute inset-x-0 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
                  <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Revenue Engine</span>
                </span>{" "}
                <span className="font-serif italic font-normal text-ink pb-1 inline-block">
                  actually prints revenue
                </span>.
              </h1>

              <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-ink-soft sm:text-[18px] text-left">
                We are a tight-knit boutique studio of three designers and engineers — Kuldeep, Dipesh, and Chirag. We design, code, and optimize bespoke high-converting websites that scale your reach, authority, and pipeline.
              </p>

              <div className="mt-8 inline-flex items-center gap-4 border-t border-line-soft pt-6 text-left">
                <div className="flex -space-x-2">
                  {["KG", "DV", "CS"].map((id) => (
                    <div
                      key={id}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper bg-ink text-[10px] font-mono font-semibold text-paper shadow-xs"
                    >
                      {id}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink">
                    Kuldeep &bull; Dipesh &bull; Chirag
                  </p>
                  <p className="text-[11px] text-ink-faint font-mono">
                    Bespoke UI/UX &bull; Full-Stack Next.js 16 &bull; Conversion Funnels
                  </p>
                </div>
              </div>

              {/* Left-Aligned CTA Buttons */}
              <div className="mt-9 flex flex-wrap items-center justify-start gap-4">
                <a
                  href="#book"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink pl-7 pr-2.5 py-3.5 text-sm font-semibold text-paper shadow-md transition-all duration-300 hover:opacity-90 hover:shadow-xl active:scale-[0.98]"
                >
                  <span>Book a Discovery Call</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/20 text-paper transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
                <a
                  href="#work"
                  className="relative overflow-hidden group/btn inline-flex items-center gap-2 rounded-full border border-neutral-300/90 bg-gradient-to-b from-white via-[#fafaf8] to-[#ededeb] px-7 py-3.5 text-sm font-semibold text-ink shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.05),0_4px_14px_rgba(0,0,0,0.06),0_0_0_1px_rgba(200,205,215,0.5)] transition-all duration-300 hover:border-neutral-400 hover:shadow-[inset_0_2px_2px_rgba(255,255,255,1),0_6px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(160,165,175,0.7)] active:scale-[0.98]"
                >
                  <span className="absolute inset-x-0 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
                  <span className="relative z-10">Explore Selected Work</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Bent Credit Card with Green Increasing Line Animation */}
            <div className="w-full lg:col-span-5 lg:pl-2">
              <CreditCardSurgeHero />
            </div>
          </div>
        </section>

        <section id="why-now" className="gsap-reveal-section relative overflow-hidden border-t border-line py-28 sm:py-36">
          {/* 3D WebGL Product Shader Scene Background (Scroll-Driven Linear Keyframe Animation) */}
          <ProductShaderBackground />

          {/* Foreground Content Container (Preserving Exact Layout & Format) */}
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-[32px] font-bold tracking-tight sm:text-[44px]">
                  Why Your{" "}
                  <span className="text-emerald-500 [text-shadow:0_0_16px_rgba(16,185,129,0.5)]">
                    Business
                  </span>{" "}
                  Needs a Website Now
                </h2>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                  In today&rsquo;s hyper-competitive digital landscape, an outdated or generic template silently kills high-ticket deals before prospects ever speak to you.
                </p>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <WhyNowMobileCallouts />
            </div>
          </div>
        </section>

        {/* ============================================================
           Engineered Capabilities — Cream White Section with Shining Black Boxes & Deep Shadow
        ============================================================ */}
        <section id="capabilities" className="gsap-reveal-section border-y border-[#E8E4DC] bg-[#FAF8F5] py-24 sm:py-32 text-ink">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h2 className="text-[32px] font-black tracking-tight text-[#0A0A0A] sm:text-[44px] font-sans">
                  Engineered Capabilities &bull;{" "}
                  <span className="relative inline-block text-emerald-600 drop-shadow-[0_16px_28px_rgba(0,0,0,0.32)] [text-shadow:0_12px_24px_rgba(0,0,0,0.2),0_0_24px_rgba(16,185,129,0.35)]">
                    Custom Web Presence
                  </span>
                </h2>
                <p className="mt-3 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-[#4B5058] font-sans font-medium">
                  We are 3 dedicated specialists creating bespoke web design, full-stack web development, and high-ticket landing pages that command market authority.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {CAPABILITIES.map((s, idx) => (
                <div
                  key={s.title}
                  className="gsap-card group relative flex flex-col justify-between rounded-[24px] border border-white/[0.14] bg-gradient-to-b from-[#24272D] via-[#16181C] to-[#0D0E11] p-8 sm:p-9 shadow-[0_24px_48px_-10px_rgba(0,0,0,0.42),0_12px_24px_-6px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_36px_72px_-14px_rgba(0,0,0,0.55),0_16px_32px_-6px_rgba(0,0,0,0.38)] hover:border-white/25 overflow-hidden"
                >
                  {/* Top Gloss Specular Highlight Reflection */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-[24px] bg-gradient-to-b from-white/[0.09] to-transparent" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.8)]" aria-hidden="true" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] font-bold text-amber-300 border border-white/10">
                        [0{idx + 1}]
                      </span>
                      <span className="h-2 w-2 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    </div>

                    <h3 className="mt-6 text-[20px] sm:text-[22px] font-bold text-amber-300 [text-shadow:0_0_24px_rgba(252,211,77,0.5)] font-sans tracking-tight leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-3.5 text-[14px] sm:text-[15px] leading-relaxed text-neutral-300 font-sans">
                      {s.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 border-t border-white/10 pt-5 flex items-center justify-between text-xs font-mono text-white/50 group-hover:text-amber-300 transition-colors">
                    <span>Performance Stack</span>
                    <span className="text-sm font-bold transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>



        {/* ============================================================
           Results / Key Metrics — Editorial Split Layout
        ============================================================ */}
        <section id="proof" className="gsap-reveal-section border-t border-line bg-paper py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
              
              {/* Left Column: Heading, Description & CTA */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.14] tracking-tight text-ink font-sans">
                  Our Web Design and<br className="hidden sm:inline" />{" "}
                  Marketing Agency<br className="hidden sm:inline" />{" "}
                  Brings In The<br className="hidden sm:inline" />{" "}
                  Numbers
                </h2>

                <p className="mt-6 max-w-md text-[15px] sm:text-[16px] leading-relaxed text-ink-soft font-sans font-normal">
                  As a top-tier web design and development agency, we deliver results. See the impact our bespoke websites and high-converting funnels have made for clients.
                </p>

                <a
                  href="#work"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FF5743] px-8 py-3.5 text-[15px] font-bold text-white shadow-md transition-all duration-200 hover:bg-[#E54836] hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  View Case Studies
                </a>
              </div>

              {/* Right Column: 3-Column Metrics Grid */}
              <div className="lg:col-span-7 pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-14 gap-y-12 sm:gap-y-16">
                  {RESULTS_METRICS.map((metric) => (
                    <div key={metric.label} className="gsap-card flex flex-col">
                      <span className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-none text-ink font-sans">
                        {metric.value}
                      </span>
                      <span className="mt-3 text-[14px] sm:text-[15px] font-medium text-ink-soft font-sans">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================================
           Portfolio / Featured Work (owns portfolioIndex internally)
        ============================================================ */}
        <PortfolioCarousel />

        {/* ============================================================
           About Us / Why Choose Us (owns aboutSlideIndex internally)
        ============================================================ */}
        <AboutSlider />

        {/* ============================================================
           FAQ (owns openFaq internally)
        ============================================================ */}
        <FaqSection />

        <section id="testimonials" className="gsap-reveal-section mx-auto max-w-7xl px-6 py-28 sm:py-36 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-[30px] font-bold tracking-tight sm:text-[38px]">
                Trusted by High-Ticket Founders
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-ink-soft">
              Verified reviews on
              <span className="inline-flex items-center gap-1 font-semibold text-ink">
                Clutch <StarIcon className="h-3 w-3" />
              </span>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="gsap-card double-bezel-paper flex h-full flex-col justify-between rounded-2xl p-7 transition-all duration-500 hover:border-ink hover:shadow-lg"
              >
                <div>
                  <QuoteMark className="h-6 w-8 text-line" />
                  <p className="mt-4 text-[15px] leading-relaxed text-ink font-normal">{t.quote}</p>
                </div>
                <div className="mt-8 flex items-center gap-3 border-t border-line-soft pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[12px] font-semibold text-paper">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{t.name}</p>
                    <p className="text-[12px] text-ink-faint">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="book" className="mx-auto max-w-7xl px-6 pb-28 sm:pb-36 sm:px-8">
          <div className="rounded-3xl bg-ink px-8 py-16 text-paper shadow-2xl sm:px-14">
            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-paper/60">
                  Ready for measurable growth?
                </p>
                <h2 className="mt-3 text-[32px] font-bold leading-tight tracking-tight text-paper sm:text-[42px]">
                  Let&rsquo;s build your revenue machine.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
                  Book a 30-minute discovery call directly with Kuldeep, Dipesh, and Chirag. We&rsquo;ll audit your current website, identify conversion leaks, and map out a winning digital presence.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 sm:items-end">
                <a
                  href="#top"
                  className="group inline-flex items-center gap-3 rounded-full bg-paper pl-7 pr-2 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:opacity-95 hover:shadow-xl active:scale-[0.98]"
                >
                  <span>Book Your Discovery Call</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["KG", "DV", "CS"].map((id) => (
                      <div
                        key={id}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-ink bg-paper/20 font-mono text-[9px] font-bold text-paper"
                      >
                        {id}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-paper/60">
                    Direct access to the 3 team members &bull; No middle managers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="about" className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-[13px] text-ink-faint sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-ink rounded-xs" />
            <p className="font-semibold text-ink">
              First Click Agency<span className="align-super text-[9px]">&trade;</span>
            </p>
            <span className="text-ink-faint">&mdash; Kuldeep &bull; Dipesh &bull; Chirag</span>
          </div>
          <p>&copy; {new Date().getFullYear()} First Click Agency. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#why-now" className="transition-colors hover:text-ink">
              Why Now
            </a>
            <a href="#capabilities" className="transition-colors hover:text-ink">
              Capabilities
            </a>
            <a href="#proof" className="transition-colors hover:text-ink">
              Results
            </a>
            <a href="#work" className="transition-colors hover:text-ink">
              Selected Work
            </a>
            <a href="#team" className="transition-colors hover:text-ink">
              Team
            </a>
            <a href="#faq" className="transition-colors hover:text-ink">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
