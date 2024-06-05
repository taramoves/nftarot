import type { AppProps } from "next/app";
import localFont from "next/font/local";
import "../styles/styles.css";

const myFont = localFont({ src: "./mermaid/Mermaid1001.ttf" });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
