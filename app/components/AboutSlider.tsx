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

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M6 14L14 6M14 6H7M14 6V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================
   About Slides Data
============================================================ */

const ABOUT_SLIDES = [
  {
    id: "full-service",
    title: "Full Service Experience",
    subtitle: "Web Design, Development & Conversion Systems",
    question: "Why choose First Click Agency Web Design and Development services?",
    description:
      "Because we serve a potent mix of Web Design & Development, Brand Strategy, and Digital Marketing engineered to turn traffic into qualified, high-ticket clients.",
    badge: "Full-Stack Agency",
    initials: "FC",
  },
  {
    id: "founder",
    title: "Founder-Led Architecture",
    subtitle: "Kuldeep Gehlot — Founder & Lead Architect",
    question: "Direct collaboration with leadership on every engagement.",
    description:
      "Over 4 years of hands-on experience designing high-ticket conversion funnels, brand systems, and custom web applications that scale.",
    badge: "Leadership & Strategy",
    initials: "KG",
  },
  {
    id: "frontend-intern",
    title: "High-Speed Frontend Engineering",
    subtitle: "Dipesh Kumar Verma — Frontend Engineering Intern",
    question: "Engineered for sub-second performance and fluid interaction.",
    description:
      "Specializing in responsive UI systems, React component architecture, micro-interactions, and performance tuning that keeps load times under 0.8 seconds.",
    badge: "Frontend & Motion",
    initials: "DV",
  },
  {
    id: "design-intern",
    title: "Editorial Visual & UI/UX Design",
    subtitle: "Chirag Shrimali — Web Design & UI Intern",
    question: "Crafted to command credibility and high-ticket authority.",
    description:
      "Editorial typography, high-contrast wireframing, bespoke component design, and brand aesthetics that give your business an unfair advantage.",
    badge: "Visual Design & UI",
    initials: "CS",
  },
  {
    id: "nimble-team",
    title: "Dedicated 3-Person Team",
    subtitle: "Zero Fluff • 100% Direct Execution",
    question: "Why high-ticket businesses love our boutique studio model?",
    description:
      "No bloated account managers or bureaucratic delays. Just 1 founder and 2 specialized interns shipping elite digital products with razor-sharp execution.",
    badge: "Boutique Speed",
    initials: "3X",
  },
];

/* ============================================================
   AboutSlider Component — owns aboutSlideIndex state internally
============================================================ */

export default function AboutSlider() {
  const [aboutSlideIndex, setAboutSlideIndex] = useState(0);

  const nextAboutSlide = () => {
    setAboutSlideIndex((prev) => (prev + 1) % ABOUT_SLIDES.length);
  };

  const prevAboutSlide = () => {
    setAboutSlideIndex((prev) => (prev - 1 + ABOUT_SLIDES.length) % ABOUT_SLIDES.length);
  };

  return (
    <section id="team" className="gsap-reveal-section relative overflow-hidden bg-[#FF5743] py-20 sm:py-24 lg:py-28 text-white">
      {/* Subtle Ambient Radial Glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-black/15 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Big Bold Typography matching reference */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white w-fit border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              About Us
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black uppercase tracking-tight text-white leading-[0.92] drop-shadow-sm font-sans">
              WHY<br />
              CHOOSE US
            </h2>

            <p className="mt-4 max-w-lg text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-[#141517] leading-tight font-sans">
              as Your Web Design and Marketing Company
            </p>

            {/* Team member micro-pills */}
            <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FF5743] bg-[#141517] text-[12px] font-bold text-white shadow-md cursor-pointer transition-transform hover:scale-110"
                  title="Kuldeep Gehlot - Founder & Lead Architect"
                  onClick={() => setAboutSlideIndex(1)}
                >
                  KG
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FF5743] bg-[#141517] text-[12px] font-bold text-white shadow-md cursor-pointer transition-transform hover:scale-110"
                  title="Dipesh Kumar Verma - Frontend Engineering Intern"
                  onClick={() => setAboutSlideIndex(2)}
                >
                  DV
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FF5743] bg-[#141517] text-[12px] font-bold text-white shadow-md cursor-pointer transition-transform hover:scale-110"
                  title="Chirag Shrimali - Web Design & UI Intern"
                  onClick={() => setAboutSlideIndex(3)}
                >
                  CS
                </div>
              </div>
              <div className="text-xs font-semibold text-[#141517] leading-tight">
                <span>1 Founder + 2 Specialized Interns</span>
                <span className="block text-[11px] font-medium text-white/85">Dedicated Boutique Performance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Content Slider matching reference */}
          <div className="lg:col-span-6 relative flex flex-col justify-between">
            {/* Arrow-bordered slider row */}
            <div className="relative flex items-center gap-2 sm:gap-5">
              {/* Left Chevron */}
              <button
                type="button"
                onClick={prevAboutSlide}
                className="flex h-11 w-11 sm:h-13 sm:w-13 flex-none items-center justify-center rounded-full text-white/80 transition-all hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8 stroke-[2.5]" />
              </button>

              {/* Slide Content Box */}
              <div className="flex-1 min-h-[220px] flex flex-col justify-center py-2">
                <div className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white w-fit">
                  {ABOUT_SLIDES[aboutSlideIndex].badge}
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-white leading-tight font-sans tracking-tight">
                  {ABOUT_SLIDES[aboutSlideIndex].title}
                </h3>

                <p className="mt-4 text-[15px] sm:text-[17px] leading-relaxed text-white/95 font-sans font-normal">
                  <span className="font-semibold text-white">{ABOUT_SLIDES[aboutSlideIndex].question}</span>{" "}
                  {ABOUT_SLIDES[aboutSlideIndex].description}
                </p>
              </div>

              {/* Right Chevron */}
              <button
                type="button"
                onClick={nextAboutSlide}
                className="flex h-11 w-11 sm:h-13 sm:w-13 flex-none items-center justify-center rounded-full text-white/80 transition-all hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8 stroke-[2.5]" />
              </button>
            </div>

            {/* Bottom Row: Dots Pagination & Get My Custom Quote CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pl-13 sm:pl-16 pr-13 sm:pr-16">
              {/* Dot Indicators */}
              <div className="flex items-center gap-2" role="tablist" aria-label="About Us Slides">
                {ABOUT_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === aboutSlideIndex}
                    aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    onClick={() => setAboutSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === aboutSlideIndex
                        ? "w-7 bg-white"
                        : "w-2.5 bg-white/40 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>

              {/* Dark Pill CTA Button */}
              <a
                href="#book"
                className="inline-flex items-center justify-center rounded-full bg-[#141517] px-8 py-3.5 text-[14px] sm:text-[15px] font-bold text-white shadow-xl transition-all duration-200 hover:bg-black hover:scale-105 active:scale-95 text-center whitespace-nowrap"
              >
                Get My Custom Quote
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
