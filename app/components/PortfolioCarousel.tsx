"use client";

import { useState } from "react";

/* ============================================================
   Geometric Icons (local to this component)
============================================================ */

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
   Portfolio Data
============================================================ */

const PORTFOLIO_PROJECTS = [
  {
    id: "colorado-rafting",
    slot: "01",
    client: "AVA Colorado",
    title: "Colorado Rafting",
    category: "Outdoor Recreation & Hospitality",
    desc: "AVA Colorado has grown into a significant force in outdoor recreation, maintaining a steadfast commitment to high-quality guest experiences and environmental stewardship.",
    liveUrl: "#book",
    tags: ["Web Design", "Next.js", "Booking Engine"],
    stats: [
      { label: "Guest Growth", value: "+320%" },
      { label: "Booking Conv.", value: "6.8%" },
      { label: "Load Speed", value: "0.7s" },
    ],
    mockupHeadline: "Adventures of a LIFETIME",
    mockupSubline: "Whitewater Rafting & Mountain Adventures",
    accentGradient: "bg-gradient-to-tr from-emerald-950 via-teal-900 to-stone-900",
    desktopImage: "",
    mobileImage: "",
  },
  {
    id: "apex-capital",
    slot: "02",
    client: "Apex Capital Partners",
    title: "Apex Capital Partners",
    category: "High-Ticket Advisory & PE",
    desc: "Built a conversion ecosystem and high-ticket client onboarding experience that generated high-conviction inbound discovery calls.",
    liveUrl: "#book",
    tags: ["Web Design", "Next.js 16", "Conversion System"],
    stats: [
      { label: "ROAS Lift", value: "4.8x" },
      { label: "Qualified Calls", value: "412" },
      { label: "Revenue Lift", value: "₹6.3 Cr" },
    ],
    mockupHeadline: "Precision Capital Systems",
    mockupSubline: "Institutional Investment Management & Advisory",
    accentGradient: "bg-gradient-to-tr from-slate-950 via-zinc-900 to-neutral-900",
    desktopImage: "",
    mobileImage: "",
  },
  {
    id: "vanguard-strategy",
    slot: "03",
    client: "Vanguard Strategy Group",
    title: "Vanguard Strategy Group",
    category: "Executive Business Consulting",
    desc: "Full-funnel buildout with custom offer positioning, interactive pricing calculator, and automated qualification systems.",
    liveUrl: "#book",
    tags: ["Custom UI/UX", "Full-Stack Dev", "SEO Engine"],
    stats: [
      { label: "Conversion Rate", value: "7.2%" },
      { label: "Lead Volume", value: "+540%" },
      { label: "Revenue Lift", value: "₹4.1 Cr" },
    ],
    mockupHeadline: "Strategic Growth Frameworks",
    mockupSubline: "Executive Consulting & Advisory Services",
    accentGradient: "bg-gradient-to-tr from-indigo-950 via-slate-900 to-zinc-950",
    desktopImage: "",
    mobileImage: "",
  },
  {
    id: "meridian-health",
    slot: "04",
    client: "Meridian Health Partners",
    title: "Meridian Health Partners",
    category: "Healthcare & Wellness",
    desc: "Enterprise healthcare platform with patient booking portal, physician dashboards, and HIPAA-compliant data architecture.",
    liveUrl: "#book",
    tags: ["Healthcare UX", "Next.js", "HIPAA Compliance"],
    stats: [
      { label: "Patient Bookings", value: "+280%" },
      { label: "Retention", value: "94%" },
      { label: "Load Speed", value: "0.6s" },
    ],
    mockupHeadline: "Modern Healthcare Experience",
    mockupSubline: "Patient-First Digital Health Platform",
    accentGradient: "bg-gradient-to-tr from-cyan-950 via-teal-900 to-emerald-950",
    desktopImage: "",
    mobileImage: "",
  },
  {
    id: "zenith-legal",
    slot: "05",
    client: "Zenith Legal Advisory",
    title: "Zenith Legal Advisory",
    category: "Corporate Law & Compliance",
    desc: "Authority-driven website with case study showcases, lead qualification forms, and automated consultation scheduling.",
    liveUrl: "#book",
    tags: ["Brand Design", "Lead Funnels", "CMS"],
    stats: [
      { label: "Inbound Leads", value: "+380%" },
      { label: "Avg Deal", value: "₹12 L" },
      { label: "Authority Score", value: "92" },
    ],
    mockupHeadline: "Excellence in Legal Advisory",
    mockupSubline: "Corporate Strategy & Regulatory Compliance",
    accentGradient: "bg-gradient-to-tr from-stone-950 via-neutral-900 to-zinc-950",
    desktopImage: "",
    mobileImage: "",
  },
  {
    id: "elysian-estates",
    slot: "06",
    client: "Elysian Architectural Estates",
    title: "Elysian Architectural Estates",
    category: "Luxury Architectural Real Estate",
    desc: "Ultra-luxury visual storytelling website with interactive floorplans and private VIP consultation booking workflows.",
    liveUrl: "#book",
    tags: ["Luxury Design", "Next.js", "Virtual Tours"],
    stats: [
      { label: "Private Tours", value: "140+" },
      { label: "Avg Deal Size", value: "₹8.5 Cr" },
      { label: "ROAS", value: "5.4x" },
    ],
    mockupHeadline: "Architectural Masterpieces",
    mockupSubline: "Private Residences & Modern Sanctuaries",
    accentGradient: "bg-gradient-to-tr from-amber-950/30 via-stone-900 to-neutral-950",
    desktopImage: "",
    mobileImage: "",
  },
];

/* ============================================================
   PortfolioCarousel Component — owns portfolioIndex state internally
============================================================ */

export default function PortfolioCarousel() {
  const [portfolioIndex, setPortfolioIndex] = useState(0);

  const nextPortfolio = () => {
    setPortfolioIndex((prev) => (prev + 1) % PORTFOLIO_PROJECTS.length);
  };

  const prevPortfolio = () => {
    setPortfolioIndex((prev) => (prev - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length);
  };

  const project = PORTFOLIO_PROJECTS[portfolioIndex];

  return (
    <section id="work" className="gsap-reveal-section relative overflow-hidden bg-[#18191B] py-20 sm:py-26 lg:py-32 text-white">
      {/* Subtle Ambient Radial Glow */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-[500px] w-[500px] rounded-full bg-[#FF5743]/10 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Project Narrative & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="mb-4 inline-block font-sans text-[16px] sm:text-[19px] md:text-[22px] font-extrabold uppercase tracking-[0.2em] text-white/60">
              Featured Work
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white leading-[1.05] tracking-tight font-sans">
              {project.title}
            </h2>

            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-white/75 font-sans font-normal max-w-md">
              {project.desc}
            </p>

            {/* CTA Button: View Website */}
            <div className="mt-7">
              <a
                href={project.liveUrl || "#book"}
                className="inline-flex items-center justify-center rounded-full bg-[#FF5743] px-8 py-3.5 text-[14px] sm:text-[15px] font-bold text-white shadow-xl transition-all duration-200 hover:bg-[#ff6e5c] hover:scale-105 active:scale-95 text-center"
              >
                View Website
              </a>
            </div>

            {/* Dot Pagination */}
            <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Portfolio Projects">
              {PORTFOLIO_PROJECTS.map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === portfolioIndex}
                  aria-label={`Go to project ${idx + 1}: ${proj.title}`}
                  onClick={() => setPortfolioIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === portfolioIndex
                      ? "w-6 bg-[#FF5743]"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Dual-Device Desktop + Overlapping Mobile Showcase */}
          <div className="lg:col-span-7 relative flex items-center">
            {/* Navigation Chevrons on sides */}
            <button
              type="button"
              onClick={prevPortfolio}
              className="absolute -left-3 sm:-left-6 lg:-left-7 z-20 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/85 text-white/80 transition-all hover:bg-black/90 hover:text-white active:scale-95 cursor-pointer border border-white/15 shadow-2xl"
              aria-label="Previous project"
            >
              <ChevronLeftIcon className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.5]" />
            </button>

            {/* Mockup Showcase Wrapper */}
            <div className="relative w-full overflow-visible py-4">
              {/* Primary Desktop Mockup Card */}
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-br from-[#1c1f24] to-[#0c0d0f] shadow-2xl overflow-hidden transition-all duration-500">
                {/* Browser Chrome Header */}
                <div className="flex h-9 items-center justify-between border-b border-white/10 bg-black/50 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-0.5 text-[10px] font-mono text-white/50">
                    <span>https://{project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</span>
                  </div>
                  <div className="w-10" />
                </div>

                {/* Desktop Content Area */}
                {project.desktopImage ? (
                  <img
                    src={project.desktopImage}
                    alt={`${project.title} Desktop View`}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className={`relative h-full w-full p-6 sm:p-10 flex flex-col justify-between ${project.accentGradient}`}>
                    {/* Background Overlay Texture */}
                    <div className="absolute inset-0 bg-radial-at-t from-white/15 via-transparent to-black/70 pointer-events-none" />
                    
                    {/* Mockup Top Navigation */}
                    <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
                      <span className="font-bold text-xs sm:text-sm uppercase tracking-widest text-white">
                        {project.client}
                      </span>
                      <div className="hidden sm:flex items-center gap-4 text-[11px] text-white/70">
                        <span>Services</span>
                        <span>Case Studies</span>
                        <span>About</span>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-white font-medium">Book</span>
                      </div>
                    </div>

                    {/* Mockup Hero Headline */}
                    <div className="relative z-10 max-w-lg my-auto pt-4">
                      <p className="font-serif text-sm sm:text-lg italic text-white/80">
                        {project.category}
                      </p>
                      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none mt-1">
                        {project.mockupHeadline}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((t) => (
                          <span key={t} className="rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-mono text-white/90 border border-white/10">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mockup Footer / Bottom Banner */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] text-white/60 pt-2 border-t border-white/10">
                      <span>First Click Agency Custom Build</span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        {project.stats[0]?.value} {project.stats[0]?.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Overlapping Mobile Mockup in Bottom-Right Foreground */}
              <div className="absolute -bottom-5 -right-2 sm:-bottom-8 sm:right-2 z-10 w-[130px] sm:w-[170px] md:w-[195px] aspect-[9/18] rounded-[2rem] sm:rounded-[2.4rem] border-4 border-black/85 bg-neutral-950 p-1.5 shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-105">
                {/* Phone Screen Outer Bezel */}
                <div className="relative h-full w-full rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/10 flex flex-col justify-between">
                  {/* Dynamic Island / Speaker */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-3.5 w-14 rounded-full bg-black z-20 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-800 ml-auto mr-1.5" />
                  </div>

                  {/* Mobile Content */}
                  {project.mobileImage ? (
                    <img
                      src={project.mobileImage}
                      alt={`${project.title} Mobile View`}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="relative h-full w-full flex flex-col justify-between p-3 pt-6 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white">
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-8 rounded-full bg-white/30" />
                        <p className="text-[9px] font-bold tracking-tight text-white leading-tight">
                          {project.client}
                        </p>
                        <div className="h-12 w-full rounded-lg bg-white/10 border border-white/10 mt-2 p-1.5 flex flex-col justify-end">
                          <span className="text-[7px] font-bold text-white uppercase">{project.category}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        <div className="rounded bg-[#FF5743] py-1 text-center text-[8px] font-bold text-white shadow-sm">
                          Explore
                        </div>
                        <div className="h-1 w-10 mx-auto rounded-full bg-white/20 mt-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Chevron Button */}
            <button
              type="button"
              onClick={nextPortfolio}
              className="absolute -right-3 sm:-right-6 lg:-right-7 z-20 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/85 text-white/80 transition-all hover:bg-black/90 hover:text-white active:scale-95 cursor-pointer border border-white/15 shadow-2xl"
              aria-label="Next project"
            >
              <ChevronRightIcon className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
