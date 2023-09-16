import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,scss}",
  ],
  theme: {
    extend: {
      colors: {
        "base-100": "rgb(var(--base-100) / <alpha-value>)",
        "base-200": "rgb(var(--base-200) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)"],
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui"), require("@headlessui/tailwindcss")],
  daisyui: {
    themes: [
      {
        light: {
          "--base-100": "255 255 255", // white
          "--base-200": "241 245 249", // slate-100
        },
        dark: {
          "--base-100": "15 23 42", // slate-900
          "--base-200": "2 6 23", // slate-950
        },
        cupcake: {},
      },
    ],
  },
};
export default config;
