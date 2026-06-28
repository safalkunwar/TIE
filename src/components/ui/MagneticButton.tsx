"use client";

import {
  forwardRef,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type Variant = "primary" | "ghost";

type Props = {
  children: ReactNode;
  variant?: Variant;
  /** Strength of the magnetic pull in px (max displacement). */
  strength?: number;
  href?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

/**
 * A button (or anchor) that subtly follows the cursor — the signature
 * micro-interaction of premium sites. Falls back to a normal hover when the
 * user prefers reduced motion or is on a touch device.
 */
const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { children, variant = "primary", strength = 0.35, href, className = "", ...rest },
  forwardedRef,
) {
  const localRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * strength, y: y * strength });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const cls = `${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`;

  const style = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
  };

  if (href) {
    return (
      <a
        href={href}
        ref={localRef as React.RefObject<HTMLAnchorElement>}
        className={cls}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={cls}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </button>
  );
});

export default MagneticButton;
