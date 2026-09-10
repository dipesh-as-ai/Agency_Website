"use client";

import { useState } from "react";

/* ============================================================
   Geometric Icons (local to this component)
============================================================ */

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================
   FAQ Data
============================================================ */

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

/* ============================================================
   FaqSection Component — owns openFaq state internally
============================================================ */

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
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
  );
}
