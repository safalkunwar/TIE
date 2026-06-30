import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Sky-blue surface palette
        sky: {
          50: "#F0F7FF",
          100: "#E1EFFE",
          200: "#CDE3FF",
          300: "#A8CCFF",
          400: "#7FB0FF",
        },
        // Primary blues
        ocean: {
          DEFAULT: "#1E5FB4",
          deep: "#0B3D82",
          light: "#2B8AF0",
        },
        azure: "#2B8AF0",
        ink: {
          DEFAULT: "#0B2A52",
          soft: "#12305C",
          line: "rgba(11,61,130,0.12)",
        },
        gold: {
          DEFAULT: "#D4AF37",
          bright: "#F4CF57",
        },
        mist: {
          DEFAULT: "#0B3D82",
          muted: "#46607F",
          dim: "#7A8CA3",
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
          "linear-gradient(to right, rgba(11,61,130,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,61,130,0.05) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(43,138,240,0.18), transparent 60%)",
        "sky-gradient":
          "linear-gradient(180deg, #EAF4FF 0%, #DCEBFF 40%, #C9E0FF 100%)",
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(43,138,240,0.45)",
        "glow-gold": "0 0 60px -16px rgba(212,175,55,0.5)",
        "blue-soft": "0 24px 60px -28px rgba(11,61,130,0.25)",
        card: "0 18px 50px -24px rgba(11,61,130,0.30)",
        "card-hover": "0 28px 70px -24px rgba(11,61,130,0.40)",
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
