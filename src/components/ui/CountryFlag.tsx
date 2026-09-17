import Image from "next/image";

const codes: Record<string, string> = {
  australia: "au", canada: "ca", uk: "gb", usa: "us", japan: "jp",
  "new-zealand": "nz", ireland: "ie", denmark: "dk", nepal: "np",
};

/** Local SVG flags render consistently on devices without flag emoji support. */
export default function CountryFlag({ slug, name, flag = "🌍", className = "" }: {
  slug: string; name: string; flag?: string; className?: string;
}) {
  const code = codes[slug];
  return code ? <Image src={`/flags/${code}.svg`} width={36} height={26} alt={`${name} flag`} className={`country-flag ${className}`} />
    : <span role="img" aria-label={`${name} flag`} className={className}>{flag}</span>;
}
