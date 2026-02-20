import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { PrivyProvider } from "@privy-io/react-auth";
import { customTheme } from "@/theme";
import { fonts } from "@/lib/fonts";

// Use env vars when set; otherwise fall back to original values so the app works without .env
const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "clx70rx9j01ohqehtnicm2ku1";
const privyClientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID ?? "client-WY2n3UcPiJbQy18xpXTMQMgHmGpU4AaByapo5m2Bjo7mL";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/Logo.svg" type="image/svg+xml" />
      </Head>
      <style jsx global>
        {`
          :root {
            --font-mermaid: ${fonts.mermaid.style.fontFamily};
          }
        `}
      </style>
      <PrivyProvider
        appId={privyAppId}
        clientId={privyClientId}
        config={{
          loginMethods: ["wallet"],
          appearance: {
            walletList: [
              "coinbase_wallet",
              "metamask",
              "rainbow",
              "wallet_connect",
            ],
            theme: "light",
            accentColor: "#676FFF",
          },
          externalWallets: {
            coinbaseWallet: {
              connectionOptions: "all",
            },
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
