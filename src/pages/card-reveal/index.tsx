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
      try {
        const deckId = "d8a4f60f-f3bf-44df-9218-7a10e4dfdf46"; // Your deck ID
        console.log('Fetching card for deck:', deckId);
        const card = await getRandomCard(deckId);
        console.log('Fetched card:', card);
        if (card) {
          setCardData(card);
        } else {
          setError("Failed to fetch card data");
        }
      } catch (err) {
        console.error('Error in fetchCard:', err);
        setError("An error occurred while fetching the card");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  return (
    <Page variant={"main"}>
      <NavBar />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
      ) : error ? (
        <div
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          {error}
        </div>
      ) : cardData ? (
        <MintedCard
          src={cardData.file_name}
          alt={cardData.card_name}
          description={cardData.card_read_main}
          text={cardData.card_name}
        />
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          No card data available. Please try again.
        </div>
      )}
    </Page>
  );
};

export default CardReveal;