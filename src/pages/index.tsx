import Head from "next/head";
import Page from "@/components/Page";
import { Box, Flex } from "@chakra-ui/react";
import { colors } from "@/theme/foundations/colors";
import Arch from "@/components/Arch";
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => ({ props: {} });

export default function Home() {
  const { login, authenticated, ready } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/card-select');
    }
  }, [ready, authenticated, router]);

  const handleEnter = async () => {
    if (!ready) return;
    if (!authenticated) {
      try {
        await login();
      } catch (error) {
        console.error("Failed to login:", error);
      }
    } else {
      router.push('/card-select');
    }
  };

  if (authenticated) {
    return null;
  }

  return (
    <Page variant={"home"}>
      <Head>
        <title>NFTarot Homepage</title>
      </Head>
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
          <Box style={{ fontSize: "2rem" }}>
            ENTER
          </Box>
        </Box>
      </Flex>
    </Page>
  );
}