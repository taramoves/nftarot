import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { PrivyProvider } from "@privy-io/react-auth";
import { customTheme } from "@/theme";
import { fonts } from "@/lib/fonts";

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "";
const privyClientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID ?? "";
const privyEnabled = Boolean(privyAppId && privyClientId);

export default function MyApp({ Component, pageProps }: AppProps) {
  const content = (
    <ChakraProvider resetCSS theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-mermaid: ${fonts.mermaid.style.fontFamily};
          }
        `}
      </style>
      {privyEnabled ? (
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
          {content}
        </PrivyProvider>
      ) : (
        content
      )}
    </>
  );
}
