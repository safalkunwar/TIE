"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/ui/Icon";

type Tab = {
  label: string;
  href: string;
  icon: "home" | "compass" | "cap" | "grid" | "user";
};

const tabs: Tab[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Explore", href: "/#destinations", icon: "compass" },
  { label: "Prep", href: "/test-prep", icon: "cap" },
  { label: "Services", href: "/services", icon: "grid" },
  { label: "Book", href: "/book", icon: "user" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname.startsWith(href);
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [swipeOffset] = useState(0);

  const bind = useSwipeable({
    onSwipeEnd: () => {
      // Dismiss any open menus or close drawer
    },
  });

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto max-w-lg bg-white/95 px-4 pt-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl border-t border-slate-200 shadow-lg">
        <ul className="flex items-center justify-between" {...bind()}>
          {tabs.map((tab) => {
            const active = isActive(tab.href, pathname);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={`flex flex-col items-center gap-1 py-2.5 px-3 text-xs font-medium transition-all duration-300 ${
                    active
                      ? "text-ocean"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                      active
                        ? "bg-ocean/10 shadow-md"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    <Icon
                      name={tab.icon}
                      className={`h-5 w-5 ${active ? "text-ocean" : "text-slate-500"}`}
                    />
                  </div>
                  <span>{tab.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}