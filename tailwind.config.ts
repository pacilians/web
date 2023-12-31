import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,scss}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "base-50": "rgb(var(--base-50) / <alpha-value>)",
        "base-100": "rgb(var(--base-100) / <alpha-value>)",
        "base-200": "rgb(var(--base-200) / <alpha-value>)",
        "base-300": "rgb(var(--base-300) / <alpha-value>)",
        "base-400": "rgb(var(--base-400) / <alpha-value>)",
        "base-500": "rgb(var(--base-500) / <alpha-value>)",
        "base-content-100": "rgb(var(--base-content-100) / <alpha-value>)",
        "base-content-200": "rgb(var(--base-content-200) / <alpha-value>)",
        "base-content-300": "rgb(var(--base-content-300) / <alpha-value>)",
        "base-content-400": "rgb(var(--base-content-400) / <alpha-value>)",
        "base-content-500": "rgb(var(--base-content-500) / <alpha-value>)",
        "base-backdrop-100": "rgb(var(--base-backdrop-100) / <alpha-value>)",
        "base-backdrop-200": "rgb(var(--base-backdrop-200) / <alpha-value>)",
        "logo-pictogram": "rgb(var(--logo-pictogram) / <alpha-value>)",
        "logo-wordmark": "rgb(var(--logo-wordmark) / <alpha-value>)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/forms"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "--base-50": "255 255 255", // slate-50
          "--base-100": "241 245 249", // slate-100
          "--base-200": "226 232 240", // slate-200
          "--base-300": "203 213 225", // slate-300
          "--base-400": "148 163 184", // slate-400
          "--base-500": "100 116 139", // slate-500
          "--base-content-100": "2 6 23", // slate-950
          "--base-content-200": "15 23 42", // slate-900
          "--base-content-300": "30 41 59", // slate-800
          "--base-content-400": "51 65 85", // slate-700
          "--base-content-500": "71 85 105", // slate-600
          "--base-backdrop-100": "226 232 240", // slate-200
          "--base-backdrop-200": "255 255 255", // white
          "--logo-pictogram": "241 90 35", // #F15A23
          "--logo-wordmark": "0 94 106", // #005E6A
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "--base-50": "2 6 23", // slate-950
          "--base-100": "15 23 42", // slate-900
          "--base-200": "30 41 59", // slate-800
          "--base-300": "51 65 85", // slate-700
          "--base-400": "71 85 105", // slate-600
          "--base-500": "100 116 139", // slate-500
          "--base-content-100": "255 255 255", // white
          "--base-content-200": "241 245 249", // slate-100
          "--base-content-300": "226 232 240", // slate-200
          "--base-content-400": "203 213 225", // slate-300
          "--base-content-500": "148 163 184", // slate-400
          "--base-backdrop-100": "2 6 23", // slate-950
          "--base-backdrop-200": "15 23 42", // slate-900
          "--logo-pictogram": "241 90 35", // #F15A23
          "--logo-wordmark": "255 255 255", // #FFFFFF
        },
        bni: {
          "--base-50": "255 247 237", // orange-50
          "--base-100": "255 247 237", // orange-50
          "--base-200": "253 186 116", // orange-300
          "--base-300": "254 215 170", // orange-200
          "--base-400": "71 85 105", // slate-600
          "--base-content-100": "255 255 255", // white
          "--base-content-200": "241 245 249", // slate-100
          "--base-content-300": "154 52 18", // orange-800
          "--base-content-400": "203 213 225", // slate-300
          "--base-content-500": "148 163 184", // slate-400
          "--base-backdrop-100": "71 85 105", // slate-600
          "--logo-pictogram": "241 90 35", // #F15A23
          "--logo-wordmark": "255 255 255", // #FFFFFF
        },
      },
    ],
  },
};
export default config;
