import { useRouter } from "next/router";
import styles from "../../styles/CardReveal.module.css";
import NavBar from "@/components/NavBar";
import { Button, IconButton } from "@chakra-ui/react";
import Card from "@/components/Card/SingleCard";
import { FaShare } from "react-icons/fa";
import Page from "@/components/Page";
import TextContainer from "@/components/TextContainer";
import MintedCard from "@/components/Card/MintedCard";
import { useEffect, useState } from "react";
import { getRandomCard, Card as CardType } from "@/utils/cardUtils";

const CardReveal = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      try {
        const deckId = "d8a4f60f-f3bf-44df-9218-7a10e4dfdf46"; // Your deck ID
        const card = await getRandomCard(deckId);
        console.log(card);
        if (card) {
          setCardData(card);
        } else {
          setError("Failed to fetch card data");
        }
      } catch (err) {
        setError("An error occurred while fetching the card");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  if (loading) {
    return (
      <Page variant={"main"}>
        <NavBar />
        <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
      </Page>
    );
  }

  if (error || !cardData) {
    return (
      <Page variant={"main"}>
        <NavBar />
        <div
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          {error || "No card data available. Please try again."}
        </div>
      </Page>
    );
  }

  return (
    <>
      <Page variant={"main"}>
        <NavBar />

        <MintedCard
          src={cardData.image_url}
          alt={cardData.card_name}
          description={cardData.card_read_main}
          text={cardData.card_name}
        />
      </Page>
    </>
  );
};

export default CardReveal;