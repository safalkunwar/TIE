"use client";

import { useReveal } from "@/hooks/useReveal";
import Icon from "@/components/ui/Icon";

type Props = {
  credential: {
    title: string;
    desc: string;
    icon: "shield" | "star" | "cap" | "check";
  };
  index: number;
};

export default function CredentialCard({ credential, index }: Props) {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.1 + index * 0.05 });

  return (
    <div
      ref={ref}
      className="reveal card flex flex-col items-start gap-4 transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ocean/10 text-ocean">
        <Icon name={credential.icon} className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-display text-lg font-bold text-ocean-deep">
          {credential.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-mist-muted">
          {credential.desc}
        </p>
      </div>
    </div>
  );
}