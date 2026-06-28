"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up for the social-proof counters.
 *
 * Uses requestAnimationFrame with an ease-out curve and respects reduced
 * motion (jumps straight to the target). Triggered when the element scrolls
 * into view via IntersectionObserver.
 */
export function useCountUp(target: number, duration = 2000, decimals = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const start = () => {
      if (started.current) return;
      started.current = true;

      if (reduced) {
        setValue(target);
        return;
      }

      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return { value, ref };
}
