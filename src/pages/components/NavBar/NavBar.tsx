import styles from "./NavBar.module.css";
import Link from "next/link";

export default function NavBar() {
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
          my readings
        </Link>
      </div>
    </header>
  );
}
