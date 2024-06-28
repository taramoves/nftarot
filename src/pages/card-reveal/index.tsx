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
import { getCardByIndex, Card as CardType } from "@/utils/cardUtils";

export default function CardReveal(){
  const router = useRouter();
  const { cardId } = router.query;
  const [cardData, setCardData] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCard = async () => {
      if (typeof cardId !== 'string') {
        console.error('cardId is not a string:', cardId);
        setError("Invalid card ID");
        setLoading(false);
        return;
      }
      
      try {
        console.log('Fetching card with ID:', cardId);
        // Assuming cardId is now the index
        const index = parseInt(cardId, 10);
        if (isNaN(index)) {
          console.error('cardId is not a valid number:', cardId);
          setError("Invalid card index");
          return;
        }
        // You might need to adjust this if you need to specify a deck ID
        const deckId = 'd8a4f60f-f3bf-44df-9218-7a10e4dfdf46'; // Replace with actual deck ID if needed
        const card = await getCardByIndex(deckId, index);
        console.log('Fetched card:', card);
        if (card) {
          setCardData(card);
          console.log('Image URL:', card.image_url);
        } else {
          console.error('No card found for index:', index);
          setError("Failed to fetch card data");
        }
      } catch (err) {
        console.error('Error in fetchCard:', err);
        setError("An error occurred while fetching the card");
      } finally {
        setLoading(false);
      }
    };

    if (cardId) {
      fetchCard();
    }
  }, [cardId]);

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
          src={cardData.image_url}
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