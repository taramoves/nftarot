import Navbar from "./components/NavBar";
import styles from "./styles/ComingSoon.module.css";
import { FaWrench } from "react-icons/fa";

export default function Archive() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.textDescription}>
        <h1>We're excited to share this with you soon!</h1>
        <FaWrench style={{ fontSize: "1.5rem", marginLeft: "1rem" }} />
      </div>
    </div>
  );
}
