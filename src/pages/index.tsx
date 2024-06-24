import Head from "next/head";
import Page from "./components/Page";
import { Box, Link, Flex } from "@chakra-ui/react";
import { colors } from "./lib/theme/foundations/colors";
import Arch from "./components/Arch";

export default function Home() {
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
          style={{
            backgroundColor: colors.yellow,
            height: "100%",
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Arch />
          <Link
            href="/card-select"
            style={{
              textDecoration: "none",
              fontSize: "2rem",
            }}
          >
            ENTER
          </Link>
        </Box>
      </Flex>
    </Page>
  );
}
