import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { PrivyProvider } from '@privy-io/react-auth';
import { customTheme } from "@/theme";
import { fonts } from "@/lib/fonts";

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
          loginMethods: ['wallet'],
          appearance: {
            walletList: ['coinbase_wallet', 'metamask', 'rainbow', 'wallet_connect'],
            theme: 'light',
            accentColor: '#676FFF',
          }, 
          externalWallets: { 
             coinbaseWallet: { 
            connectionOptions: 'all', 
            } 
          }
        }}
      >
        <ChakraProvider resetCSS theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </PrivyProvider>
    </>
  );
}