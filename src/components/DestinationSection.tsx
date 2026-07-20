"use client";

import Icon from "@/components/ui/Icon";
import { useReveal } from "@/hooks/useReveal";

type IconName = "compass" | "doc" | "cap" | "trophy" | "globe" | "shield" | "plane" | "star";

type Props = {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
  icon?: IconName;
};

export default function DestinationSection({
  title,
  children,
  wide = false,
  icon = "doc",
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8 ${
        wide ? "lg:col-span-3" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ocean/10 text-ocean">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="mt-5 text-slate-600 text-lg leading-relaxed">{children}</div>
    </div>
  );
}
