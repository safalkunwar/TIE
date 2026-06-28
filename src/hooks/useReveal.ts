"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll-reveal using IntersectionObserver + a CSS class. We keep
 * heavy GSAP scrubbing for the few sections that really need it (hero, journey)
 * and use this for the bulk of on-reveal fades so the page stays GPU-cheap.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; once?: boolean },
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      node.classList.add("reveal-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            if (options?.once !== false) observer.unobserve(entry.target);
          } else if (options?.once === false) {
            entry.target.classList.remove("reveal-in");
          }
        });
      },
      { threshold: options?.threshold ?? 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once]);

  return ref;
}
