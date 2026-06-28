"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  items: string[];
  className?: string;
};

/**
 * Infinite horizontal marquee for the credibility / destination ribbon.
 * Pauses on hover, falls back to a static row when reduced motion is set.
 */
export default function Marquee({ items, className = "" }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-4 ${className}`}
      >
        {items.map((item) => (
          <span
            key={item}
            className="text-sm font-medium uppercase tracking-[0.18em] text-mist-muted"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="mask-x flex w-max">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center gap-12 pr-12 [animation:marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]"
            aria-hidden={dup === 1}
          >
            {items.map((item) => (
              <li
                key={`${dup}-${item}`}
                className="text-sm font-medium uppercase tracking-[0.18em] text-mist-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
