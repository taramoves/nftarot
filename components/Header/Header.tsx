import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.headerLink}>
        home
      </Link>
      <div>
        <Link href="/about" className={styles.headerLink}>
          about
        </Link>
        <Link href="/identity" className={styles.headerLink}>
          me
        </Link>
      </div>
    </header>
  );
}
