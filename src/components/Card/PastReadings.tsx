import { useState, useEffect } from "react";
import { fetchPastReadings, Reading } from "../../utils/cardUtils";
import TextContainer from "../TextContainer";
import { Flex, Link } from "@chakra-ui/react";
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
          const sortedReadings = fetchedReadings.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setWalletReadings(sortedReadings);
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
        flexWrap: "wrap",
        margin: "1em 2em",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: '70vw'
      }}
    >
      {walletReadings.map((reading) => (
        <Flex key={reading.id} style={{ flexDirection: "column", width: 'auto' }}>
          <Link href={`/card-reveal/${reading.id}`}>
          <SingleCard
            src={reading.image_url}
            alt={`Card ${reading.id}`}
            pastReading={true}
          />
          <TextContainer style={{textAlign: 'center'}}>
            {new Date(reading.created_at).toLocaleDateString()}
          </TextContainer>
          </Link>
        </Flex>
      ))}
    </Flex>
  );
};

export default PastReadings;
