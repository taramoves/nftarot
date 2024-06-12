import { useRouter } from "next/router";
import styles from "./styles/CardReveal.module.css";
import NavBar from "@/pages/components/NavBar/NavBar";
import Button from "@/pages/components/Button/Button";
import Card from "../pages/components/Card/Card";

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
  // need to add border around this page/all pages   border: 3px solid black;

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Card src={image} className={styles.card} alt={text} />
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
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button
              text={"Archive"}
              style={{ flexGrow: 2, marginLeft: "2.5rem" }}
              onClick={() => router.push("/identity")}
            />
            <Button
              text={"Restart"}
              onClick={() => router.push("/card_select")}
            />
            <Button onClick={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardReveal;
