import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#070B14",
          soft: "#0E1422",
          card: "#11182B",
          line: "rgba(255,255,255,0.08)",
        },
        gold: {
          DEFAULT: "#D4AF37",
          bright: "#F4CF57",
          soft: "rgba(212,175,55,0.14)",
        },
        electric: "#5B8CFF",
        violet: "#9B6BFF",
        mint: "#4ADE80",
        mist: {
          DEFAULT: "#E8ECF5",
          muted: "#8A93A6",
          dim: "#5C6580",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(91,140,255,0.18), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(91,140,255,0.45)",
        "glow-gold": "0 0 60px -16px rgba(212,175,55,0.5)",
        card: "0 24px 60px -28px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
