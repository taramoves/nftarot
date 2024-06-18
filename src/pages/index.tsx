import Head from "next/head";
import styles from "./styles/Home.module.css";
import Page from "./components/Page";
import { Box, Link } from "@chakra-ui/react";
import { colors } from "./theme/foundations/colors";
import Arch from "./components/Arch";

export default function Home() {
  return (
    <Page variant={"home"}>
      <Head>
        <title>NFTarot Homepage</title>
      </Head>
      {/* need to fully remove css modules */}
      <div className={styles.redBorder}>
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
              transition: "color 0.3s",
            }}
          >
            ENTER
          </Link>
        </Box>
      </div>
    </Page>
  );
}
