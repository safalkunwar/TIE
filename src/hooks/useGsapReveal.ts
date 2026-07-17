"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Options = {
  /** CSS selector (scoped to the container) for the items to stagger in. */
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/**
 * Reusable GSAP scroll-in animation. Returns a ref to attach to a container;
 * children matching `selector` fade/slide up in a stagger. Respects reduced
 * motion (shows content immediately). Keeps GSAP usage consistent with the
 * rest of the site (Hero, DreamJourney) while staying easy to reuse.
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>({
  selector = "[data-reveal]",
  y = 28,
  stagger = 0.08,
  duration = 0.7,
  start = "top 82%",
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = node.querySelectorAll<HTMLElement>(selector);
    if (!items.length) return;

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start },
      });
    }, node);

    return () => ctx.revert();
  }, [selector, y, stagger, duration, start]);

  return ref;
}
