import { useRouter } from "next/router";
import styles from "../styles/CardReveal.module.css";
import NavBar from "@/pages/components/NavBar/NavBar";
import { Button, IconButton } from "@chakra-ui/react";
import Card from "../components/Card/Card";
import { FaShare } from "react-icons/fa";
import Page from "../components/Page/Page";

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
      <NavBar />
      <Page variant={"card reveal"}>
        <Card
          src={image.toString()}
          className={styles.card}
          alt={text.toString()}
          width={300}
          height={500}
          style={{ position: "relative" }}
        />
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
              variant={"primaryButton"}
              onClick={() => router.push("/archive")}
            >
              Archive
            </Button>
            <Button
              variant={"primaryButton"}
              onClick={() => router.push("/card-select")}
            >
              Restart
            </Button>
            <IconButton
              variant={"primaryButton"}
              aria-label="share reading"
              onClick={() => {}}
              icon={<FaShare />}
            />
          </div>
        </div>
      </Page>
    </>
  );
};

export default CardReveal;
