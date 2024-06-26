import Head from "next/head";
import Page from "@/components/Page";
import { Box, Flex } from "@chakra-ui/react";
import { colors } from "@/theme/foundations/colors";
import Arch from "@/components/Arch";
import DeckList from '@/components/Decklist';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { login, authenticated, ready } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/card-select');
    }
  }, [ready, authenticated, router]);

  const handleEnter = async () => {
    if (!ready) {
      console.log('Privy is not ready yet');
      return;
    }
    if (!authenticated) {
      try {
        console.log('Initiating login...');
        await login();
        // The useEffect hook will handle redirection after successful login
      } catch (error) {
        console.error("Failed to login:", error);
      }
    } else {
      router.push('/card-select');
    }
  };

  // If authenticated, don't render the homepage content
  if (authenticated) {
    return null; // or you could return a loading indicator
  }

  return (
    <Page variant={"home"}>
      <Head>
        <title>NFTarot Homepage</title>
      </Head>
      <DeckList />
      <Flex
        style={{
          border: "3px solid black",
          boxSizing: "border-box",
          height: "90vh",
          width: "90vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          onClick={handleEnter}
          style={{
            backgroundColor: colors.yellow,
            height: "100%",
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: 'pointer',
          }}
        >
          <Arch />
          <Box
            style={{
              fontSize: "2rem",
            }}
          >
            ENTER
          </Box>
        </Box>
      </Flex>
    </Page>
  );
}