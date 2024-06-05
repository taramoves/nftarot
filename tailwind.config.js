/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        skin: {
          "fill-home": "var(--color-fill-home)",
          "fill-card-select": "var(--color-fill-card-select)",
          "fill-card-reveal": "var(--color-fill-card-reveal)",
        },
      },
      colors: {
        neonMagenta: "#FF005C",
        deepRed: "#B60041",
        lavender: "#8952FF",
        deepPurple: "#6D2AFB",
        yellow: "#FFC700",
        seaGreen: "#1D9898",
      },
      fontFamily: {
        serif: ["var(--font-inter)"],
      },
      container: {
        default: { display: "flex", height: "100vh", width: "100vw" },
        home: { backgroundColor: "fill-card-home" },
        "card-select": { backgroundColor: "fill-card-select" },
        "card-reveal": { backgroundColor: "fill-card-reveal" },
      },
    },
  },
  plugins: [],
};
