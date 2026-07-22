"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";

type Tab = {
  label: string;
  href: string;
  icon: "home" | "compass" | "cap" | "grid" | "user";
  activeIcon: "home" | "compass" | "cap" | "grid" | "user";
};

const tabs: Tab[] = [
  { label: "Home", href: "/", icon: "home", activeIcon: "home" },
  { label: "Explore", href: "/#destinations", icon: "compass", activeIcon: "compass" },
  { label: "Prep", href: "/test-prep", icon: "cap", activeIcon: "cap" },
  { label: "Services", href: "/services", icon: "grid", activeIcon: "grid" },
  { label: "Book", href: "/book", icon: "user", activeIcon: "user" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname.startsWith(href);
}

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto max-w-lg bg-white/90 px-4 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl border-t border-slate-200">
        <ul className="flex items-center justify-between">
          {tabs.map((tab) => {
            const active = isActive(tab.href, pathname);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={`flex flex-col items-center gap-0.5 py-2 px-3 text-xs font-medium transition-colors ${
                    active
                      ? "text-ocean"
                      : "text-slate-400 active:text-slate-600"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    name={active ? tab.activeIcon : tab.icon}
                    className="h-6 w-6"
                  />
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
