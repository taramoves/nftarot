import Head from "next/head";
import Link from "next/link";
import styles from "./styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFTarot Homepage</title>
      </Head>
      <div className={styles.redBorder}>
        <div className={styles.yellowFill}>
          <div className={styles.archContainer}>
            <div className={styles.blueArch}></div>
            <Link href="/card_select">
              <span className={styles.pinkArch}></span>
            </Link>
          </div>
          <Link href="/card_select" style={{ textDecoration: "none" }}>
            <span className={styles.enter}>ENTER</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
