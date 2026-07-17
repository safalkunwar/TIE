import { useReveal } from "@/hooks/useReveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
};

/**
 * Consistent section header: small ocean eyebrow, large display title with
 * optional gradient, supporting copy. Reveals on scroll.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: Props) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal flex max-w-3xl flex-col gap-5 ${
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left"
      }`}
    >
      <span className="eyebrow">
        <span className="h-px w-6 bg-ocean/50" />
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-ocean-deep sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-mist-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
