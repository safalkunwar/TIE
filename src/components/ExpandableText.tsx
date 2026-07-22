"use client";

import { useState } from "react";

type Props = {
  text: string;
  maxLines?: number;
  className?: string;
  moreLabel?: string;
  lessLabel?: string;
};

export default function ExpandableText({
  text,
  maxLines = 3,
  className = "",
  moreLabel = "See More",
  lessLabel = "See Less",
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  return (
    <div className={className}>
      <p
        className="text-slate-600 leading-relaxed"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: expanded ? undefined : maxLines,
          WebkitBoxOrient: "vertical",
          overflow: expanded ? undefined : "hidden",
        }}
        ref={(el) => {
          if (el && !clamped && el.scrollHeight > el.clientHeight) {
            setClamped(true);
          }
        }}
      >
        {text}
      </p>
      {clamped && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ocean transition-colors hover:text-ocean-deep"
          aria-expanded={expanded}
        >
          {expanded ? lessLabel : moreLabel}
          <span
            className={`transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ▾
          </span>
        </button>
      )}
    </div>
  );
}
