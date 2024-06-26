import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { PrivyProvider } from '@privy-io/react-auth';
import { customTheme } from "@/theme";
import { fonts } from "@/lib/fonts";
import {PrivyProvider} from '@privy-io/react-auth';


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
      appId="clx70rx9j01ohqehtnicm2ku1"
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
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