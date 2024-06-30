import { useState, useEffect } from "react";
import { fetchPastReadings, Reading, constructFullImageURL } from "../../utils/cardUtils";
import TextContainer from "../TextContainer";
import { Flex } from "@chakra-ui/react";
import SingleCard from "./SingleCard";

interface ReadingListProps {
  walletAddress: string | null;
}

const PastReadings: React.FC<ReadingListProps> = ({ walletAddress }) => {
  const [walletReadings, setWalletReadings] = useState<Reading[]>([]);
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
          <SingleCard
            src={reading.image_url}
            alt={`Card ${reading.id}`}
            style={{ boxSize: "100px" }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default PastReadings;
