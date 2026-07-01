"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up that animates as soon as it mounts (not on scroll). Used in the
 * hero so the "13+ Years" stat animates in alongside the headline reveal.
 * Respects prefers-reduced-motion (jumps straight to target).
 */
export function useCountUpOnMount(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setValue(target);
      return;
    }

    // Delay slightly so it syncs with the hero headline reveal.
    const startTime = performance.now() + 700;
    const tick = (now: number) => {
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return value;
}
