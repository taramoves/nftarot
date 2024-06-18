import { useRouter } from "next/router";
import styles from "../styles/CardReveal.module.css";
import NavBar from "@/pages/components/NavBar";
import { Button, IconButton } from "@chakra-ui/react";
import Card from "../components/Card/SingleCard";
import { FaShare } from "react-icons/fa";
import Page from "../components/Page";
import TextContainer from "../components/TextContainer";
import MintedCard from "../components/Card/MintedCard";

const CardReveal = () => {
  const router = useRouter();
  const { image, text } = router.query;

  if (!image || !text) {
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
      <Page variant={"card reveal"}>
        <NavBar />

        <MintedCard
          src={image.toString()}
          alt={text.toString()}
          description="Lorem ipsum dolor sit"
          text={text.toString()}
        />
      </Page>
    </>
  );
};

export default CardReveal;
