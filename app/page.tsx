"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================
   Navigation & Content Data
============================================================ */

const NAV_LINKS = [
  { label: "Why Now", href: "#why-now" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Benefits", href: "#benefits" },
  { label: "Proof & Glory", href: "#proof" },
  { label: "Portfolio", href: "#work" },
  { label: "Methodology", href: "#methodology" },
  { label: "About Us", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Testimonials", href: "#testimonials" },
];

const STATS = [
  { value: "₹47 Cr+", label: "Client Revenue Generated", desc: "Across custom websites & funnels built by our team" },
  { value: "120+", label: "Websites & Funnels Shipped", desc: "Crafted for high-ticket service brands & agencies" },
  { value: "4.8x", label: "Average Conversion Surge", desc: "Measured across optimized client landing pages" },
  { value: "8,400+", label: "Qualified Calls & Leads", desc: "Real prospects, predictable pipeline growth" },
];

const WHY_NOW_BENTO: Array<{
  colSpan: string;
  title: React.ReactNode;
  desc: string;
  highlight: string;
}> = [
  {
    colSpan: "sm:col-span-2 lg:col-span-2",
    title: "Visitors Judge Your Credibility in 50 Milliseconds",
    desc: "Studies prove 94% of first impressions are purely design-related. If your website looks dated or amateur, high-ticket clients click back and hire your competitor within seconds.",
    highlight: "94% First Impressions Decided by Visual Design",
  },
  {
    colSpan: "sm:col-span-1 lg:col-span-1",
    title: "Traffic Without Conversion is Burning Capital",
    desc: "Driving paid ads or social attention to a generic template yields 0.5% conversion. Bespoke funnels convert 4%–8% on autopilot.",
    highlight: "6x Conversion Gap",
  },
  {
    colSpan: "sm:col-span-1 lg:col-span-1",
    title: (
      <>
        <span className="text-emerald-700 dark:text-emerald-500 font-extrabold [text-shadow:0_0_16px_rgba(4,120,87,0.45)]">70%+</span> of Inbound Traffic is Mobile
      </>
    ),
    desc: "Every additional second of load time reduces conversions by 20%. Our bespoke Next.js architecture loads in under 0.8s.",
    highlight: "<0.8s Sub-Second Load Time",
  },
  {
    colSpan: "sm:col-span-2 lg:col-span-2",
    title: (
      <>
        <span className="text-red-500 font-extrabold [text-shadow:0_0_16px_rgba(239,68,68,0.5)]">World Class</span> Web Design Commands 3x–5x Higher Retainers
      </>
    ),
    desc: "You cannot sell a $5,000–$25,000 package with a generic $50 WordPress theme. Architectural digital design immediately establishes undeniable authority and pricing power.",
    highlight: "Immediate 3x–5x Pricing Authority Lift",
  },
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

const GALLERY_SLOTS = [
  {
    slot: "01",
    type: "Single-Page Conversion Funnel",
    tags: ["Web Design", "Next.js 16", "Lead Qualification", "A/B Optimized"],
    title: "High-Ticket Conversion Landing System",
    headline: "Transforming Traffic into Qualified Booked Calendar Slots",
    description: "Designed with an editorial minimalist layout, live calendar booking embed, and conversion checkpoints.",
    metrics: ["4.8x Conversion Lift", "<0.7s Load Speed", "Mobile First"],
  },
  {
    slot: "02",
    type: "Multi-Page Corporate & SaaS Platform",
    tags: ["Custom UI/UX", "Web Development", "TypeScript", "Micro-Interactions"],
    title: "Full-Stack Brand & Web Experience",
    headline: "Architectural Digital Identity for Modern Market Leaders",
    description: "Equipped with interactive service visualizers, real-time ROI calculator, and dynamic content architecture.",
    metrics: ["+310% Inbound Inquiries", "100/100 Lighthouse", "Bespoke CMS"],
  },
];

const BENEFITS_LIST = [
  {
    title: "Explosive Market Reach",
    desc: "Gain organic SEO authority, ultra-fast mobile indexing, and viral brand shareability that attracts your ideal clients 24/7.",
  },
  {
    title: "Multiplied Sales & Booked Calls",
    desc: "Eliminate friction. Direct prospects through an irresistible visual narrative that guides them straight to booking a call.",
  },
  {
    title: "Instant Brand Stature & Popularity",
    desc: "Stand leagues above competitors with a breathtaking web presence that earns client trust, press mentions, and high-ticket deals.",
  },
];

const WHY_US_SLOTS = [
  {
    metric: "₹47 Cr+",
    title: "Tracked Revenue Impact",
    desc: "Proven track record generating tens of crores across 120+ client funnels and web builds.",
    tag: "Track Record",
  },
  {
    metric: "<0.8s",
    title: "Next.js 16 Performance",
    desc: "Zero bloated WordPress plugins. Handcrafted, lightweight, lightning-fast rendering.",
    tag: "Speed Engineering",
  },
  {
    metric: "4.8x",
    title: "Conversion Surge",
    desc: "Average conversion increase across redesigned landing pages and lead systems.",
    tag: "Optimization",
  },
  {
    metric: "100%",
    title: "Bespoke Craftsmanship",
    desc: "Editorial typography, custom visual grids, and distinctive aesthetic identity for every client.",
    tag: "Design Standard",
  },
  {
    metric: "8,400+",
    title: "Calls & Pipeline Shipped",
    desc: "Conversion architectures designed exclusively for booked discovery calls and sales inquiries.",
    tag: "Pipeline Results",
  },
  {
    metric: "3 Minds",
    title: "Direct Builder Access",
    desc: "No middlemen or junior account handlers. You collaborate directly with our 3-person team.",
    tag: "Boutique Focus",
  },
  {
    metric: "100/100",
    title: "Core Web Vitals",
    desc: "Flawless technical SEO, accessibility compliance, and mobile responsive execution.",
    tag: "SEO Dominance",
  },
  {
    metric: "14 Days",
    title: "Rapid Sprint Delivery",
    desc: "From initial design sprint to live deployed production site in two focused weeks.",
    tag: "Velocity",
  },
  {
    metric: "60 FPS",
    title: "Tactile Micro-Interactions",
    desc: "Fluid interactive animations and responsive states that make browsing feel alive.",
    tag: "User Experience",
  },
  {
    metric: "3x–5x",
    title: "Client Pricing Power",
    desc: "World-class visual positioning that allows founders to comfortably raise their rates.",
    tag: "Authority",
  },
];

const FAQ_ITEMS = [
  {
    q: "How long does a complete custom website build take?",
    a: "Our standard sprint takes between 10 to 14 business days from kickoff to deployment. Because we are a dedicated 3-person boutique studio, there are no bureaucratic handoffs or lengthy delays — we design, code, and ship rapidly.",
  },
  {
    q: "Why do you build with custom Next.js instead of WordPress or templates?",
    a: "Generic website builders come loaded with bloated plugins, slow loading speeds (3s–5s), and security vulnerabilities. We build with Next.js 16, React 19, and Tailwind CSS to guarantee sub-second load times (<0.8s), superior SEO rankings, and tailored conversion mechanics that templates simply cannot replicate.",
  },
  {
    q: "What do you need from our team to get started?",
    a: "All we need is a 30-minute discovery session to understand your business offer, target audience, and current bottlenecks. We handle the rest — including conversion copywriting structure, visual UI/UX design, Next.js engineering, and live launch optimization.",
  },
];

const METHODOLOGY_STEPS = [
  { step: "01", title: "Strategy & Offer Architecture", desc: "We deconstruct your core offer, buyer psychology, and competitors to map an airtight conversion journey." },
  { step: "02", title: "Visual Design & UI/UX", desc: "We design a breathtaking, editorial digital interface that commands authority and captivates high-ticket clients." },
  { step: "03", title: "Modern Web Engineering", desc: "We code your site in Next.js with sub-second speeds, smooth micro-interactions, and flawless responsiveness." },
  { step: "04", title: "Conversion Optimization", desc: "We fine-tune headlines, call-to-action hooks, and lead qualification mechanisms to maximize booked calls." },
  { step: "05", title: "Launch & Growth Surge", desc: "Your new conversion machine goes live — attracting qualified prospects and scaling your sales pipeline." },
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

const TRUST_BADGES = ["30-Minute Strategy Call", "No Obligation", "3-Person Dedicated Team", "Next.js Performance Guarantee"];

const FOUNDER_MEMBER = {
  name: "Kuldeep Gehlot",
  role: "Founder & Lead Architect",
  badge: "Leadership & Architecture",
  initials: "KG",
  bio: "Leads technical architecture, conversion strategy, and systems engineering. Obsessed with high-ticket sales psychology and sub-second web performance.",
  skills: ["System Architecture", "Conversion Funnels", "Next.js 16", "Offer Strategy"],
};

const INTERN_MEMBERS = [
  {
    name: "Dipesh Kumar Verma",
    role: "Frontend Engineering Intern",
    badge: "Engineering & Motion",
    initials: "DV",
    bio: "Focuses on modern React component engineering, smooth micro-interactions, responsive layouts, and bulletproof web animations.",
    skills: ["React 19 & TypeScript", "Tailwind CSS", "Micro-Animations", "Performance Optimization"],
  },
  {
    name: "Chirag Shrimali",
    role: "Web Design & UI Intern",
    badge: "Visual Design & UI/UX",
    initials: "CS",
    bio: "Specializes in editorial typography, wireframing, high-contrast aesthetics, and crafting intuitive user experiences.",
    skills: ["UI/UX Systems", "Typography Design", "Wireframing", "Brand Aesthetics"],
  },
];

const TEAM_MEMBERS = [FOUNDER_MEMBER, ...INTERN_MEMBERS];

const OUR_WORK_SLOTS = [
  {
    slot: "01",
    category: "High-Ticket Advisory",
    client: "Apex Capital Partners",
    title: "Financial Advisory & Private Equity Funnel",
    desc: "Built a conversion ecosystem and high-ticket client onboarding experience that generated high-conviction inbound discovery calls.",
    tags: ["Web Design", "Next.js", "Conversion System"],
    stats: [
      { label: "ROAS Lift", value: "4.8x" },
      { label: "Qualified Calls", value: "412" },
      { label: "Revenue Generated", value: "₹6.3 Cr" },
    ],
  },
  {
    slot: "02",
    category: "Consulting & Growth",
    client: "Vanguard Strategy Group",
    title: "Executive Business Consulting Website",
    desc: "Full-funnel buildout with custom offer positioning, interactive pricing calculator, and automated qualification systems.",
    tags: ["Custom UI/UX", "Full-Stack Dev", "SEO Engine"],
    stats: [
      { label: "Conversion Rate", value: "7.2%" },
      { label: "Monthly Leads", value: "295" },
      { label: "Revenue Generated", value: "₹3.9 Cr" },
    ],
  },
  {
    slot: "03",
    category: "Creative Agency",
    client: "Kroma Creative Studio",
    title: "Digital Agency Portfolio & Acquisition Hub",
    desc: "High-end editorial web application featuring interactive case studies, dark-mode styling, and frictionless contact mechanics.",
    tags: ["Web Design", "TypeScript", "Micro-Animations"],
    stats: [
      { label: "Lighthouse Speed", value: "99/100" },
      { label: "Monthly Calls", value: "50+" },
      { label: "Revenue Generated", value: "₹2.1 Cr+" },
    ],
  },
  {
    slot: "04",
    category: "Enterprise Logistics",
    client: "Nova Global Logistics",
    title: "B2B Supply Chain & Lead Generation Portal",
    desc: "Engineered a high-performance web platform with instant quote estimation tools and enterprise lead routing.",
    tags: ["Web Development", "B2B Portal", "Tailwind CSS"],
    stats: [
      { label: "Lead Growth", value: "+340%" },
      { label: "Pipeline Value", value: "₹4.5 Cr" },
      { label: "Load Time", value: "0.6s" },
    ],
  },
  {
    slot: "05",
    category: "Luxury Real Estate",
    client: "Elysian Architectural Estates",
    title: "Private Property Showcase & Booking Engine",
    desc: "Ultra-luxury visual storytelling website with interactive floorplans and private VIP consultation booking workflows.",
    tags: ["Luxury Design", "Next.js", "Virtual Tours"],
    stats: [
      { label: "Private Tours", value: "140+" },
      { label: "Avg Deal Size", value: "₹8.5 Cr" },
      { label: "ROAS", value: "5.4x" },
    ],
  },
  {
    slot: "06",
    category: "AI & Tech SaaS",
    client: "Synthetix Intelligence",
    title: "Next-Gen AI Platform & Interactive Landing Page",
    desc: "Modern product launch website with live interactive demo sandbox, dark/paper styling, and automated customer onboarding.",
    tags: ["Web Application", "React 19", "Product Design"],
    stats: [
      { label: "Trial Signups", value: "+420%" },
      { label: "Retention Rate", value: "98.4%" },
      { label: "ARR Growth", value: "₹5.1 Cr" },
    ],
  },
];

/* ============================================================
   Hero Credit Card & Increasing Line Component
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
      <div className="animate-float-badge-1 absolute -top-3 right-0 z-30 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-neutral-950/90 px-3.5 py-1.5 shadow-xl backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 radar-ping" />
        <TrendingUpIcon className="h-3.5 w-3.5 text-emerald-400" />
        <span className="font-mono text-[11px] font-semibold text-emerald-300">
          +340% Limit Surge
        </span>
      </div>

      {/* Floating Badge Bottom-Left: Live Settlement */}
      <div className="animate-float-badge-2 absolute -bottom-4 -left-2 z-30 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-neutral-950/95 px-3.5 py-2 shadow-2xl backdrop-blur-md">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <CheckIcon className="h-3.5 w-3.5" />
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400">Instant Approved</p>
          <p className="text-[11px] font-bold text-white leading-tight">High-Ticket Limit</p>
        </div>
      </div>

      {/* 3D Physical Card Wrapper with Curvature / Bend Effect */}
      <div
        style={{
          transformStyle: "preserve-3d",
        }}
        className="animate-card-3d-pitch relative aspect-[1.586/1] w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900/95 via-neutral-950/90 to-neutral-900/95 p-5 sm:p-6 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.6),0_0_35px_rgba(16,185,129,0.18)] backdrop-blur-2xl overflow-hidden flex flex-col justify-between"
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

        {/* 3. The Green Increasing Curve Chart Overlay */}
        <div className="relative z-10 -mx-3 -my-2 h-14 sm:h-16">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 340 90" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="emeraldGradFill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <filter id="emeraldGlow2" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
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

            {/* The Glowing Neon Green Increasing Line */}
            <path
              d="M 0 78 C 50 75, 90 70, 130 55 C 170 42, 210 35, 250 20 C 290 8, 320 5, 340 2"
              stroke="#10b981"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#emeraldGlow2)"
              className="animate-green-line"
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
              <div className="h-5 w-5 rounded-full bg-emerald-500/80 backdrop-blur-xs" />
              <div className="h-5 w-5 rounded-full bg-teal-400/80 backdrop-blur-xs" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ============================================================
   Page Component
============================================================ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWorkFilter, setSelectedWorkFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // GSAP ScrollTrigger Animations
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

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleBenchmarkMouseDown = (e: React.MouseEvent) => {
    if (!horizontalScrollRef.current) return;
    isDraggingRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - horizontalScrollRef.current.offsetLeft;
    scrollLeftRef.current = horizontalScrollRef.current.scrollLeft;
  };

  const handleBenchmarkMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !horizontalScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - horizontalScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.15;
    horizontalScrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleBenchmarkMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
  };

  const scrollWhyUs = (direction: "left" | "right") => {
    if (horizontalScrollRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      horizontalScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filteredWork = selectedWorkFilter === "All"
    ? OUR_WORK_SLOTS
    : OUR_WORK_SLOTS.filter((s) => s.tags.includes(selectedWorkFilter));

  return (
    <div id="top" className="min-h-[100dvh] bg-paper text-ink selection:bg-ink selection:text-paper">
      
      {/* ---------------- Header & Navigation ---------------- */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
          <a href="#top" className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
            <span className="inline-block h-3 w-3 bg-ink transition-transform duration-300 group-hover:scale-125 rounded-xs" />
            <span>First Click Agency<span className="align-super text-[10px]">&trade;</span></span>
          </a>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary Desktop">
            {NAV_LINKS.slice(0, 6).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#book"
              className="group hidden items-center gap-2 rounded-full bg-ink pl-4 pr-1.5 py-1.5 text-[13px] font-medium text-paper transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-[0.98] sm:inline-flex"
            >
              <span>Book a Call</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/20 text-paper transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-4 py-2 text-[13px] font-medium text-ink transition-all duration-200 hover:bg-paper-soft active:scale-[0.97]"
              aria-label={menuOpen ? "Close vertical menu" : "Open vertical menu"}
              aria-expanded={menuOpen}
            >
              <span className="hidden text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-soft sm:inline">
                {menuOpen ? "Close" : "Menu"}
              </span>
              <div className="relative h-4 w-4 flex items-center justify-center">
                <span
                  className={`absolute h-0.5 w-4 bg-ink transition-all duration-300 ${
                    menuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-4 bg-ink transition-all duration-200 ${
                    menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-4 bg-ink transition-all duration-300 ${
                    menuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Fullscreen Vertical Hamburger Drawer ---------------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/50 backdrop-blur-md transition-all duration-300">
          <div
            className="relative flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto border-l border-line bg-paper p-8 shadow-2xl sm:p-12 animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between border-b border-line pb-6">
              <div>
                <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-ink-faint">
                  Boutique Studio
                </p>
                <p className="text-[14px] font-semibold text-ink">Kuldeep &bull; Dipesh &bull; Chirag</p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper-soft text-ink transition-all duration-200 hover:bg-ink hover:text-paper"
                aria-label="Close menu"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <nav className="my-6 flex flex-col gap-3" aria-label="Vertical Navigation">
              {NAV_LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="group flex items-baseline justify-between border-b border-line-soft pb-2.5 text-left transition-colors hover:border-ink"
                >
                  <span className="text-[20px] font-bold tracking-tight text-ink transition-transform duration-200 group-hover:translate-x-2 sm:text-[24px]">
                    {l.label}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-ink-faint group-hover:text-ink">
                    [0{i + 1}]
                  </span>
                </a>
              ))}
            </nav>

            <div className="space-y-4 border-t border-line pt-5">
              <div className="rounded-2xl border border-line bg-paper-soft p-5 shadow-xs">
                <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-soft">
                  Work Directly with the 3 Founders
                </p>
                <p className="mt-1 text-[13px] text-ink-soft leading-snug">
                  Bespoke web design, full-stack Next.js development, and conversion systems.
                </p>
                <a
                  href="#book"
                  onClick={() => setMenuOpen(false)}
                  className="group mt-4 inline-flex w-full items-center justify-between rounded-full bg-ink pl-5 pr-2 py-2 text-[13px] font-medium text-paper transition-opacity hover:opacity-90"
                >
                  <span>Book a Discovery Call</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/20 text-paper transition-transform group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
              <div className="flex items-center justify-between text-[11px] text-ink-faint">
                <p>&copy; {new Date().getFullYear()} First Click Agency™</p>
                <p>3-Person Focused Studio</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main ref={mainRef} className="w-full max-w-full overflow-x-hidden">
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 sm:pt-14 sm:pb-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Left-aligned Text, Badge, Founder Avatars */}
            <div className="flex flex-col items-start text-left lg:col-span-7">
              <h1 className="text-[clamp(2.5rem,4.8vw,4.4rem)] font-bold leading-[1.08] tracking-tight text-ink text-left">
                Your business deserves a website that{" "}
                <span className="inline-flex items-center align-middle mx-1 px-3 py-0.5 rounded-full bg-ink text-paper text-[0.45em] font-mono uppercase tracking-wider font-semibold shadow-xs">
                  Revenue Engine
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
            </div>

            {/* Right Column: 3D Bent Blurred Credit Card with Green Increasing Line Animation */}
            <div className="w-full lg:col-span-5 lg:pl-2">
              <CreditCardSurgeHero />
            </div>
          </div>

          {/* Centered CTA Buttons in the middle */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
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
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper-soft active:scale-[0.98]"
            >
              Explore Selected Work
            </a>
          </div>
        </section>

        <section id="results" className="border-y border-line bg-paper py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="group relative flex flex-col justify-between rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-[#f0fdf4] to-emerald-100/40 p-6 sm:p-7 shadow-[0_2px_12px_rgba(16,185,129,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_12px_28px_rgba(16,185,129,0.14)]"
                >
                  {/* Subtle top light green ambient sheen */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-300/40 via-emerald-400 to-teal-400/40 opacity-80" />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                        [0{i + 1}]
                      </span>
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    </div>

                    <p className="mt-4 text-[34px] font-bold tracking-tight text-neutral-950 sm:text-[40px]">
                      {s.value}
                    </p>

                    <p className="mt-2 text-[12px] font-mono font-bold uppercase tracking-[0.06em] text-emerald-900">
                      {s.label}
                    </p>
                  </div>

                  <p className="mt-4 border-t border-emerald-200/60 pt-3 text-[13px] leading-snug text-emerald-950/70">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-now" className="gsap-reveal-section mx-auto max-w-7xl px-6 py-28 sm:py-36 sm:px-8">
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

          <div className="mt-14 grid grid-flow-dense gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_NOW_BENTO.map((card, i) => (
              <div
                key={i}
                className={`gsap-card double-bezel-paper group flex flex-col justify-between rounded-2xl p-8 transition-all duration-500 hover:border-ink hover:shadow-xl ${card.colSpan}`}
              >
                <div>
                  <h3 className="text-[22px] font-bold leading-snug tracking-tight text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-8 border-t border-line-soft pt-5">
                  <p className="font-mono text-[12px] font-semibold text-ink">
                    &rarr; {card.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="capabilities" className="gsap-reveal-section border-y border-oled-border bg-oled py-28 text-paper sm:py-36">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h2 className="text-[32px] font-bold tracking-tight text-paper sm:text-[44px]">
                  Engineered Capabilities &bull; Custom Web Presence
                </h2>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-paper/70">
                  We are 3 dedicated specialists creating bespoke web design, full-stack web development, and high-ticket landing pages that command market authority.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-8 border-b border-oled-border pb-16 sm:grid-cols-3">
              {CAPABILITIES.map((s, idx) => (
                <div key={s.title} className="gsap-card relative">
                  <p className="font-mono text-[13px] font-semibold text-paper/50">[0{idx + 1}]</p>
                  <h3 className="mt-3 text-[20px] font-bold text-amber-300 [text-shadow:0_0_20px_rgba(252,211,77,0.55)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-paper/70">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-[22px] font-bold text-paper sm:text-[26px]">
                    Featured Build Gallery
                  </h3>
                </div>
                <span className="rounded-full border border-oled-border-light bg-oled-surface px-3.5 py-1 font-mono text-[11px] text-paper/80">
                  Dedicated Slots: 02
                </span>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {GALLERY_SLOTS.map((slot) => (
                  <div
                    key={slot.slot}
                    className="gsap-card double-bezel-oled group flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:border-oled-border-light sm:p-9"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-oled-border pb-4">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-red-500/60" />
                          <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                          <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                        </div>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-paper/60">
                          {slot.slot} &bull; {slot.type}
                        </span>
                      </div>
                      <div className="my-6">
                        <div className="flex flex-wrap gap-2">
                          {slot.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-oled-border bg-oled-surface px-2.5 py-0.5 font-mono text-[10px] text-paper/90"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <h4 className="mt-5 text-[22px] font-bold leading-snug text-paper">
                          {slot.title}
                        </h4>
                        <p className="mt-2 text-[14px] italic text-paper/80 font-serif">
                          &ldquo;{slot.headline}&rdquo;
                        </p>
                        <p className="mt-3 text-[13px] leading-relaxed text-paper/60">
                          {slot.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-oled-border pt-5">
                      <div className="flex flex-wrap gap-3">
                        {slot.metrics.map((m) => (
                          <span
                            key={m}
                            className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-400"
                          >
                            <CheckIcon className="h-3 w-3" />
                            {m}
                          </span>
                        ))}
                      </div>
                      <a
                        href="#book"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider text-paper transition-colors hover:text-emerald-400"
                      >
                        Request Similar Build &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="gsap-reveal-section mx-auto max-w-7xl px-6 py-28 sm:py-36 sm:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-[32px] font-bold tracking-tight sm:text-[44px]">
                What Your Business Gains:{" "}
                <span className="font-serif italic font-normal pb-1 inline-block">Reach, Sales &amp; Stature</span>
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                A bespoke website isn&rsquo;t an expense — it is your most profitable 24/7 client generation engine.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {BENEFITS_LIST.map((b, i) => (
              <div key={b.title} className="gsap-card double-bezel-paper rounded-2xl p-8">
                <span className="font-mono text-[13px] font-bold text-ink-faint">[0{i + 1}]</span>
                <h3 className="mt-4 text-[20px] font-bold tracking-tight text-ink">{b.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-950/80 bg-[#050806] p-6 text-paper shadow-2xl sm:p-10">
              <div className="flex flex-col justify-between gap-4 border-b border-emerald-900/40 pb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 shadow-inner">
                    <TrendingUpIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
                        Live Sales Velocity Surge
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Upward Trajectory
                      </span>
                    </div>
                    <h4 className="text-[20px] font-bold text-paper sm:text-[24px]">
                      The Conversion Lift: From Stagnation to Scaled Pipeline
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-3 font-mono text-[12px] text-paper/70">
                  <span className="rounded-xl bg-emerald-950/90 border border-emerald-800/40 px-3.5 py-1.5 text-emerald-300 font-semibold shadow-xs">
                    +340% Sales Velocity Lift
                  </span>
                </div>
              </div>

              <div className="relative my-8 h-64 w-full overflow-hidden sm:h-72">
                <svg
                  viewBox="0 0 800 300"
                  className="h-full w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="greenAreaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#10b981" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="lineGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="60" x2="800" y2="60" stroke="#064e3b" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                  <line x1="0" y1="140" x2="800" y2="140" stroke="#064e3b" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                  <line x1="0" y1="220" x2="800" y2="220" stroke="#064e3b" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                  <path
                    d="M 0,260 Q 200,240 380,180 T 600,80 T 800,25 L 800,300 L 0,300 Z"
                    fill="url(#greenAreaGlow)"
                  />
                  <path
                    d="M 0,260 Q 200,240 380,180 T 600,80 T 800,25"
                    fill="none"
                    stroke="url(#lineGreenGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="chart-line-glow"
                  />
                  <path
                    d="M 0,260 Q 200,240 380,180 T 600,80 T 800,25"
                    fill="none"
                    stroke="#6ee7b7"
                    strokeWidth="1.5"
                    className="chart-dash-flow"
                  />
                  <circle cx="50" cy="255" r="5" fill="#050806" stroke="#059669" strokeWidth="2.5" />
                  <circle cx="380" cy="180" r="6" fill="#050806" stroke="#10b981" strokeWidth="3" />
                  <circle cx="760" cy="35" r="7" fill="#10b981" stroke="#a7f3d0" strokeWidth="3" className="animate-pulse" />
                </svg>
                <div className="absolute left-6 bottom-4 rounded-xl bg-black/85 border border-emerald-900/60 p-3 text-[11px] text-paper/80 backdrop-blur shadow-md">
                  <p className="font-mono font-semibold text-paper/60">Month 0: Old Website</p>
                  <p className="text-red-400 font-bold">High Bounce &bull; 0.5% Conv</p>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/90 border border-emerald-800/80 p-3 text-[11px] text-paper backdrop-blur shadow-md">
                  <p className="font-mono font-semibold text-emerald-400">Month 2: New Build Live</p>
                  <p className="font-bold text-paper">+180% Engagement Surge</p>
                </div>
                <div className="absolute right-4 top-2 rounded-xl bg-black/90 border border-emerald-500 p-3.5 text-[12px] text-paper shadow-xl shadow-emerald-950/80 backdrop-blur">
                  <p className="font-mono font-bold uppercase tracking-wider text-emerald-400">Month 6+: Scale</p>
                  <p className="text-[15px] font-extrabold text-white">+340% Sales &amp; Booked Calls</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-emerald-900/40 pt-6 sm:grid-cols-4">
                <div className="rounded-2xl border border-emerald-950 bg-black/60 p-4 shadow-xs">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400/80">Sales Velocity</p>
                  <p className="mt-1 text-[26px] font-bold text-emerald-400">+340%</p>
                  <p className="text-[11px] text-paper/60">Faster deal closing speed</p>
                </div>
                <div className="rounded-2xl border border-emerald-950 bg-black/60 p-4 shadow-xs">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400/80">Audience Reach</p>
                  <p className="mt-1 text-[26px] font-bold text-emerald-400">+280%</p>
                  <p className="text-[11px] text-paper/60">Organic &amp; referral traffic</p>
                </div>
                <div className="rounded-2xl border border-emerald-950 bg-black/60 p-4 shadow-xs">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400/80">Conversion Lift</p>
                  <p className="mt-1 text-[26px] font-bold text-emerald-400">4.8x</p>
                  <p className="text-[11px] text-paper/60">Average landing page surge</p>
                </div>
                <div className="rounded-2xl border border-emerald-950 bg-black/60 p-4 shadow-xs">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400/80">Automated Pipeline</p>
                  <p className="mt-1 text-[26px] font-bold text-emerald-400">24 / 7</p>
                  <p className="text-[11px] text-paper/60">Direct into your calendar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="border-y border-oled-border bg-oled py-28 text-paper sm:py-36">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-[32px] font-bold tracking-tight text-paper sm:text-[44px]">
                  Proof &amp; Past Glory &bull; 10 Engineering Benchmarks
                </h2>
                <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-paper/70">
                  Scroll horizontally through 10 proof points, past achievements, and technical milestones that define our boutique studio.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollWhyUs("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-oled-border-light bg-oled-surface text-paper transition-all duration-200 hover:bg-paper hover:text-ink active:scale-[0.95]"
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={() => scrollWhyUs("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-oled-border-light bg-oled-surface text-paper transition-all duration-200 hover:bg-paper hover:text-ink active:scale-[0.95]"
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

            <div
              ref={horizontalScrollRef}
              onMouseDown={handleBenchmarkMouseDown}
              onMouseMove={handleBenchmarkMouseMove}
              onMouseUp={handleBenchmarkMouseUpOrLeave}
              onMouseLeave={handleBenchmarkMouseUpOrLeave}
              className={`mt-12 flex gap-6 overflow-x-auto pb-6 pt-2 select-none touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
                isGrabbing ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {WHY_US_SLOTS.map((slot, idx) => (
                <div
                  key={slot.title}
                  className="double-bezel-oled group flex w-[310px] flex-none flex-col justify-between rounded-2xl p-8 transition-all duration-500 hover:border-oled-border-light sm:w-[350px]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold text-paper/50">
                        [0{idx + 1}]
                      </span>
                      <span className="rounded-full border border-oled-border bg-oled-surface px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-paper/80">
                        {slot.tag}
                      </span>
                    </div>
                    <p className="mt-8 text-[36px] font-bold tracking-tight text-paper sm:text-[42px]">
                      {slot.metric}
                    </p>
                    <h3 className="mt-2 text-[18px] font-bold text-paper">
                      {slot.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-paper/70">
                      {slot.desc}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 border-t border-oled-border pt-4 text-[11px] font-mono text-emerald-400">
                    <CheckIcon className="h-3 w-3" />
                    Verified Benchmark
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="gsap-reveal-section mx-auto max-w-7xl px-6 py-28 sm:py-36 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-[32px] font-bold tracking-tight sm:text-[44px]">
                Portfolio section
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                Explore 6 showcase slots demonstrating high-impact web design, full-stack engineering, and revenue conversion systems.
              </p>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-line pb-4">
            {["All", "Web Design", "Next.js", "Web Development", "Conversion System"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedWorkFilter(f)}
                className={`rounded-full px-4 py-1.5 text-[12px] font-medium transition-all duration-200 ${
                  selectedWorkFilter === f
                    ? "bg-ink text-paper shadow-xs"
                    : "bg-paper-soft text-ink-soft hover:text-ink hover:bg-paper"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredWork.map((slot) => (
              <div
                key={slot.slot}
                className="gsap-card double-bezel-paper group flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-500 hover:border-ink hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line-soft pb-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
                      Slot {slot.slot}
                    </span>
                    <span className="rounded-full bg-paper-soft px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                      {slot.category}
                    </span>
                  </div>
                  <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink p-5 text-paper transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between opacity-80">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-paper/70">
                          {slot.client}
                        </p>
                        <ArrowUpRight className="h-4 w-4 text-paper/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <div>
                        <p className="text-[16px] font-bold leading-snug text-paper">
                          {slot.title}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {slot.tags.slice(0, 2).map((t) => (
                            <span key={t} className="rounded bg-paper/15 px-1.5 py-0.5 text-[9px] font-mono text-paper">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-[13px] leading-relaxed text-ink-soft">
                    {slot.desc}
                  </p>
                </div>
                <div className="mt-6 border-t border-line-soft pt-4">
                  <div className="grid grid-cols-3 gap-2">
                    {slot.stats.map((st) => (
                      <div key={st.label}>
                        <p className="text-[14px] font-bold tracking-tight text-ink">{st.value}</p>
                        <p className="text-[9px] font-mono font-semibold uppercase tracking-wider text-ink-faint">
                          {st.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="methodology" className="gsap-reveal-section border-t border-line bg-paper-soft py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h2 className="text-[32px] font-bold tracking-tight sm:text-[44px]">
                  A Proven 5-Step Methodology
                </h2>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-soft">
                  We follow a rigorous conversion engineering framework that attracts, qualifies, and converts ideal clients on autopilot.
                </p>
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {METHODOLOGY_STEPS.map((p, i) => (
                <div key={p.step} className="gsap-card relative">
                  {i < METHODOLOGY_STEPS.length - 1 && (
                    <span
                      className="absolute right-[-1.5rem] top-3 hidden h-px w-6 border-t border-dashed border-line-soft lg:block"
                      aria-hidden="true"
                    />
                  )}
                  <p className="font-mono text-[13px] font-bold text-ink-faint">[{p.step}]</p>
                  <h3 className="mt-3 text-[16px] font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="gsap-reveal-section mx-auto max-w-7xl px-6 py-28 sm:py-36 sm:px-8 border-t border-line">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-[32px] font-bold tracking-tight sm:text-[44px]">
                About us
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                We are a tight-knit boutique studio of 1 founder and 2 specialized interns providing high-end web design, web development, and revenue-generating landing pages.
              </p>
            </div>

            <div className="relative flex shrink-0 justify-end items-center">
              <div 
                className="absolute inset-0 -m-6 rounded-full bg-gradient-to-tr from-emerald-100/50 via-amber-100/30 to-paper-soft/80 blur-2xl pointer-events-none -z-10"
                aria-hidden="true"
              />
              <img
                src="/img/assist.png"
                alt="About us mascot"
                className="relative z-10 h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Founder Group */}
          <div className="mt-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-1.5 font-mono text-[13px] font-bold uppercase tracking-wider text-paper shadow-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Founder
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="gsap-card double-bezel-paper flex h-full flex-col justify-between rounded-2xl p-8 transition-all duration-500 hover:border-ink hover:shadow-xl sm:col-span-2 lg:col-span-2">
                <div>
                  <div className="flex items-center justify-between border-b border-line-soft pb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink font-mono text-[14px] font-bold text-paper shadow-sm">
                      {FOUNDER_MEMBER.initials}
                    </div>
                  </div>
                  <h3 className="mt-6 text-[24px] font-bold text-ink">
                    {FOUNDER_MEMBER.name}
                  </h3>
                  <p className="text-[13px] font-medium text-emerald-700 font-mono">
                    {FOUNDER_MEMBER.role}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
                    {FOUNDER_MEMBER.bio}
                  </p>
                </div>
                <div className="mt-8 border-t border-line-soft pt-5">
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-faint">
                    Core Domain:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {FOUNDER_MEMBER.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-paper-soft px-3 py-1 font-mono text-[11px] text-ink-soft border border-line"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intern Group */}
          <div className="mt-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[12px] font-medium uppercase tracking-widest text-ink-faint">
                Intern
              </span>
              <div className="h-px flex-1 bg-line-soft" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {INTERN_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="gsap-card double-bezel-paper flex h-full flex-col justify-between rounded-2xl p-8 transition-all duration-500 hover:border-ink hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-line-soft pb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-soft border border-line font-mono text-[14px] font-bold text-ink shadow-sm">
                        {member.initials}
                      </div>
                    </div>
                    <h3 className="mt-6 text-[22px] font-bold text-ink">
                      {member.name}
                    </h3>
                    <p className="text-[13px] font-medium text-ink-soft font-mono">
                      {member.role}
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">
                      {member.bio}
                    </p>
                  </div>
                  <div className="mt-8 border-t border-line-soft pt-5">
                    <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-faint">
                      Core Domain:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-paper-soft px-2.5 py-0.5 font-mono text-[10px] text-ink-soft"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="gsap-reveal-section border-t border-line bg-paper-soft py-28 sm:py-36">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <div className="text-center">
              <h2 className="text-[32px] font-bold tracking-tight sm:text-[44px]">
                Clear Answers Before We Build
              </h2>
              <p className="mt-3 text-[15px] text-ink-soft">
                Common questions about our process, technology, and delivery guarantees.
              </p>
            </div>
            <div className="mt-12 space-y-4">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={item.q}
                    className="gsap-card double-bezel-paper overflow-hidden rounded-2xl transition-colors hover:border-ink"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-6 text-left font-semibold text-ink sm:p-7"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[16px] sm:text-[18px]">{item.q}</span>
                      <span className={`ml-4 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line bg-paper-soft text-ink transition-transform duration-200 ${isOpen ? "rotate-180 bg-ink text-paper" : ""}`}>
                        <ChevronDownIcon />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-line-soft px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
                        <p className="text-[14px] leading-relaxed text-ink-soft">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-paper/15 pt-8">
              {TRUST_BADGES.map((b) => (
                <div key={b} className="flex items-center gap-2 text-[12px] font-medium text-paper/80">
                  <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
                  {b}
                </div>
              ))}
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
            <a href="#benefits" className="transition-colors hover:text-ink">
              Benefits
            </a>
            <a href="#proof" className="transition-colors hover:text-ink">
              Proof
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
