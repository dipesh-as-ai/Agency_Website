"use client";

import { useState, useEffect } from "react";

/* ============================================================
   Geometric Icons (local to this component)
============================================================ */

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M6 14L14 6M14 6H7M14 6V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

/* ============================================================
   Navigation Data
============================================================ */

const NAV_LINKS = [
  { label: "Why Now", href: "#why-now" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Results", href: "#proof" },
  { label: "Portfolio", href: "#work" },
  { label: "About Us", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Testimonials", href: "#testimonials" },
];

/* ============================================================
   NavHeader Component — owns menuOpen state internally
============================================================ */

export default function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      {/* ---------------- Header & Navigation ---------------- */}
      <header
        className="sticky top-0 z-50 border-b border-line bg-paper/90 transition-all duration-300"
        style={{ contain: "layout", willChange: "transform", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
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
    </>
  );
}
