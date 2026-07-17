import { useReveal } from "@/hooks/useReveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level for the title. Defaults to h2. */
  as?: "h1" | "h2";
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
  as: Heading = "h2",
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
      <Heading className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-ocean-deep sm:text-5xl md:text-6xl">
        {title}
      </Heading>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-mist-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
