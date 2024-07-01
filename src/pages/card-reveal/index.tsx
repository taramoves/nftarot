import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import NavBar from "@/components/NavBar";
import Page from "@/components/Page";
import MintedCard from "@/components/Card/MintedCard";
import { constructFullImageUrl } from "@/utils/imageUtils";

interface ReadingData {
  card_id: string;
  card_name: string;
  image_url: string;
  card_read_main: string;
  created_at: string;
}

export default function CardReveal() {
  const router = useRouter();
  const { readingId } = router.query;
  const [readingData, setReadingData] = useState<ReadingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadingData = async () => {
      if (typeof readingId !== "string") {
        setError("Invalid reading ID");
        setLoading(false);
        return;
      }

      try {
        const { data: readingData, error: readingError } = await supabase
          .from("readings")
          .select("*, cards:card_id(*)")
          .eq("reading_id", readingId)
          .single();

        if (readingError) throw readingError;

        if (readingData && readingData.cards) {
          setReadingData({
            card_id: readingData.card_id,
            card_name: readingData.cards.card_name,
            image_url: constructFullImageUrl(readingData.cards.image_url),
            card_read_main: readingData.cards.card_read_main,
            created_at: readingData.created_at,
          });
        } else {
          setError("No data found for this reading");
        }
      } catch (err) {
        console.error("Error fetching reading data:", err);
        setError("An error occurred while fetching the reading");
      } finally {
        setLoading(false);
      }
    };

    if (readingId) {
      fetchReadingData();
    }
  }, [readingId]);

  if (loading) return <div>Loading your tarot reading...</div>;
  if (error) return <div>Error: {error}</div>;

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
      ) : readingData ? (
        <MintedCard
          date={new Date(readingData.created_at).toLocaleDateString()}
          src={readingData.image_url}
          alt={readingData.card_name}
          description={readingData.card_read_main}
          text={readingData.card_name}
        />
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          No card data available. Please try again.
        </div>
      )}
    </Page>
  );
}
