import { useRouter } from "next/router";
import styles from "../styles/CardReveal.module.css";
import Header from "../components/Header/Header";

const CardReveal = () => {
  const router = useRouter();
  const { image, text } = router.query;

  if (!image || !text) {
    return (
      <div className={styles.error}>
        No card selected. Please go back and select a card.
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <img src={image} className={styles.card} alt={text} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "-1.5rem",
          }}
        >
          <div
            className={styles.descriptionBox}
            style={{ textTransform: "uppercase", fontSize: "2rem" }}
          >
            {text}
          </div>
          <div className={styles.descriptionBox}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div style={{ display: "flex" }}>
            <button
              className={styles.button}
              style={{ flexGrow: 2, marginLeft: "2.5rem" }}
              onClick={() => router.push("/card_select")}
            >
              Back to Card Selection
            </button>
            <button className={styles.button} style={{ marginLeft: "1rem" }}>
              X
            </button>
            <button className={styles.button} style={{ marginLeft: "1rem" }}>
              X
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardReveal;
