import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./lib/theme";
import { fonts } from "./lib/fonts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-mermaid: ${fonts.mermaid.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider resetCSS theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
