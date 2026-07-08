import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:     "#F5EFE6",
        ink:       "#0E3D45",
        "ink-2":   "#163A44",
        coral:     "#D4573A",
        "coral-lt":"#E8795A",
        sage:      "#7A9E8A",
        teal:      "#1A7A8A",
        mist:      "#D8E6E3",
        ocean:     "#062028",
      },
      fontFamily: {
        serif: ["'Palatino Linotype'", "Book Antiqua", "Palatino", "Georgia", "serif"],
        sans:  ["'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};
export default config;
