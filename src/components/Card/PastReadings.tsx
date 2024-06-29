import { useState, useEffect } from "react";
import { fetchPastReadings, WalletReadings } from "../../utils/cardUtils";
import TextContainer from "../TextContainer";
import { Flex } from "@chakra-ui/react";
import SingleCard from "./SingleCard";
import { fetchCardData } from "@/utils/cardReavealUtils";

interface ReadingListProps {
  walletAddress: string | null;
}

const PastReadings: React.FC<ReadingListProps> = ({ walletAddress }) => {
  const [walletReadings, setWalletReadings] = useState<WalletReadings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  console.log(walletReadings);

  //need to get card image data, was going to use ID from fetchedReadings to plug into extracted fn for fetchCardData, to then pull/construct the image URL

  //   const getPastReadingCardImage = async () => {
  //    try {
  //     const cardData = await fetchCardData(walletReadings.readings)
  //    }
  //   }

  return (
    <Flex
      style={{
        flexDirection: "row",
        maxWidth: "100vw",
        flexWrap: "wrap",
        margin: "1em 2em",
        gap: '1rem',
        alignItems: 'center', 
        justifyContent: 'flex-start'
      }}
    >
      {walletReadings.readings.map((reading) => (
        <Flex style={{ flexDirection: "column" }}>
          <TextContainer key={reading.id}>
            {new Date(reading.created_at).toLocaleString()}
          </TextContainer>
          <SingleCard alt="card image" src={""} />
        </Flex>
      ))}
    </Flex>
  );
};

export default PastReadings;
