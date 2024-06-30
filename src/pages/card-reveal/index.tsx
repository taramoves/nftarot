import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import Page from "@/components/Page";
import MintedCard from "@/components/Card/MintedCard";
import { useEffect, useState } from "react";
import { Card as CardType } from "@/utils/cardUtils";
import { fetchCardData } from "@/utils/cardReavealUtils";

export default function CardReveal() {
  const router = useRouter();
  const { cardId } = router.query;
  const [cardData, setCardData] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getCard = async () => {
      if (typeof cardId !== 'string') {
        setError("Invalid card ID");
        setLoading(false);
        return;
      }

      const { cardData: fetchedCard, error: fetchError } = await fetchCardData(cardId);
      
      if (fetchError) {
        setError(fetchError);
      } else if (fetchedCard) {
        setCardData(fetchedCard);
      }

      setLoading(false);
    };

    if (cardId) {
      getCard();
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
}