"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import MagneticButton from "@/components/ui/MagneticButton";

export default function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-20 z-40 flex justify-center px-4 transition-all duration-300 lg:hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <MagneticButton
        href="/book"
        className="w-full max-w-md rounded-full py-3.5 text-center shadow-lg"
      >
        <Icon name="arrow" className="h-4 w-4" />
        Book Free Consultation
      </MagneticButton>
    </div>
  );
}
