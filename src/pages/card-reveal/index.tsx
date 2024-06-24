import { useRouter } from "next/router";
import styles from "../../styles/CardReveal.module.css";
import NavBar from "@/components/NavBar";
import { Button, IconButton } from "@chakra-ui/react";
import Card from "@/components/Card/SingleCard";
import { FaShare } from "react-icons/fa";
import Page from "@/components/Page";
import TextContainer from "@/components/TextContainer";
import MintedCard from "@/components/Card/MintedCard";

const CardReveal = () => {
  const router = useRouter();
  const { fileName, cardName, cardReadMain } = router.query;

  if (!fileName || !cardName || !cardReadMain) {
    return (
      <div
        style={{
          color: "red",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        No card selected. Please go back and select a card.
      </div>
    );
  }

  return (
    <>
      <Page variant={"main"}>
        <NavBar />

        <MintedCard
          src={fileName.toString()}
          alt={cardName.toString()}
          description={cardReadMain.toString()}
          text={cardName.toString()}
        />
      </Page>
    </>
  );
};

export default CardReveal;
