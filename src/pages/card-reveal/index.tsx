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
import { getCardById, Card as CardType } from "@/utils/cardUtils";

export default function CardReveal(){
  const router = useRouter();
  const { cardId } = router.query;
  const [cardData, setCardData] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCard = async () => {
      if (typeof cardId !== 'string') return;
      
      try {
        console.log('Fetching card with ID:', cardId);
        const card = await getCardById(cardId);
        console.log('Fetched card:', card);
        console.log('Image URL:', card?.image_url);  // Add this line
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