import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "mont-normal": ["Mont-Normal", "sans-serif"],
        "mont-semibold": ["Mont-SemiBold", "sans-serif"],
        "mont-bold": ["Mont-Bold", "sans-serif"],
        "mont-extrabold": ["Mont-ExtraBold", "sans-serif"],
        "mont-black": ["Mont-Black", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
