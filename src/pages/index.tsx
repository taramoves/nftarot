import Head from "next/head";
import Link from "next/link";
import styles from "./styles/Home.module.css";
import Page from "./components/Page";

export default function Home() {
  return (
    <Page variant={"home"}>
      <Head>
        <title>NFTarot Homepage</title>
      </Head>
      <div className={styles.redBorder}>
        <div className={styles.yellowFill}>
          <div className={styles.archContainer}>
            <div className={styles.blueArch}></div>
            <Link href="/card-select">
              <span className={styles.pinkArch}></span>
            </Link>
          </div>
          <Link href="/card-select" style={{ textDecoration: "none" }}>
            <span className={styles.enter}>ENTER</span>
          </Link>
        </div>
      </div>
    </Page>
  );
}
