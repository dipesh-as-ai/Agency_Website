"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScrollProvider — Fix 5
 *
 * Integrates Lenis virtual smooth scroll with GSAP ScrollTrigger.
 * Critical: Only ONE requestAnimationFrame loop (GSAP's ticker drives Lenis).
 * This eliminates the optical desynchronization between discrete mouse-wheel
 * notches (100px jumps on Windows) and the smooth camera lerp in WebGL.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      // Don't override touch — let native mobile touch scroll work
    });

    // Feed Lenis scroll events into GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Let GSAP's ticker drive Lenis — single unified RAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return <>{children}</>;
}
