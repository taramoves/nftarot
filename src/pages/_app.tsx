import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from "./theme";
import { fonts } from './lib/fonts'
import { PrivyProvider } from '@privy-io/react-auth';

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
      <PrivyProvider
        appId="clx70rx9j01ohqehtnicm2ku1" // Replace with your actual Privy app ID
        config={{
          loginMethods: ['wallet', 'email'], // Adjust as needed
          appearance: {
            theme: 'light', // Or 'dark', depending on your preference
            accentColor: '#676FFF', // Adjust to match your theme
          },
        }}
      >
        <ChakraProvider resetCSS theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </PrivyProvider>
    </>
  );
}
