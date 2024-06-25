import localFont from "next/font/local";

const mermaid = localFont({
  src: "./mermaid/Mermaid1001.ttf",
  variable: '--font-mermaid',
});

export const fonts = {
  mermaid,
};
