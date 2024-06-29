import { useState, useEffect } from "react";
import { fetchPastReadings, Reading } from "../../utils/cardUtils";
import TextContainer from "../TextContainer";
import { Flex } from "@chakra-ui/react";
import SingleCard from "./SingleCard";
import { fetchCardData } from "@/utils/cardReavealUtils";
import { Card as CardType } from "@/utils/cardUtils";

interface ReadingListProps {
  walletAddress: string | null;
}

const PastReadings: React.FC<ReadingListProps> = ({ walletAddress }) => {
  const [walletReadings, setWalletReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardData, setCardData] = useState<CardType | null>(null);

  useEffect(() => {
    async function getReadingGroup() {
      if (walletAddress !== null)
        try {
          const fetchedReadings = await fetchPastReadings(walletAddress);
          setWalletReadings(fetchedReadings);
        } catch (err) {
          setError("Failed to fetch past readings");
          console.error(err);
        } finally {
          setLoading(false);
        }
    }

    getReadingGroup();
  }, [walletAddress]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  //need to get card image data, was going to use ID from fetchedReadings to plug into extracted fn for fetchCardData, to then pull/construct the image URL
  const readingId = walletReadings.map((reading) => reading.id);
  console.log(readingId); //right now this returns an array of card ids, need to return a single one to then plug into the past reading card image fn

  const getPastReadingCardImage = async () => {
    try {
      const { cardData: fetchedCard, error: fetchError } = await fetchCardData(
        readingId.toString()
      );
      if (fetchError) {
        setError(fetchError);
      } else if (fetchedCard) {
        setCardData(fetchedCard);
      }
    } catch (err) {
      setError("Failed to fetch card");
      console.log(err);
    }

    if (readingId){
        getPastReadingCardImage();
    }
  };

  return (
    <Flex
      style={{
        flexDirection: "row",
        maxWidth: "100vw",
        flexWrap: "wrap",
        margin: "1em 2em",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {walletReadings.map((reading) => (
        <Flex key={reading.id} style={{ flexDirection: "column" }}>
          <TextContainer>
            {new Date(reading.created_at).toLocaleDateString()}
          </TextContainer>
          <SingleCard src={cardData?.image_url}
          alt={cardData?.card_name} />
        </Flex>
      ))}
    </Flex>
  );
};

export default PastReadings;
