import Navbar from "@/components/NavBar";
import Page from "@/components/Page";
import { useRouter } from "next/router";
import { Flex, Button } from "@chakra-ui/react";
import TextContainer from "@/components/TextContainer";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import PastReadings from "@/components/Card/PastReadings";
import { fetchPastReadings } from "@/utils/cardUtils";

export default function Profile() {
  const router = useRouter();
  const { user, authenticated, ready } = usePrivy();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [hasReadings, setHasReadings] = useState<boolean>(false);

  useEffect(() => {
    if (ready && authenticated && user?.wallet?.address) {
      setWalletAddress(user.wallet.address);
    }
  }, [ready, authenticated, user]);

  if (!ready || !authenticated) {
    return <div>Loading...</div>; // Or redirect to login page
  }

  async function checkIfHasReadings() {
    if (walletAddress !== null)
      try {
        const hasReadings = await fetchPastReadings(walletAddress);
        if (hasReadings !== null) setHasReadings(true);
      } catch (err) {
        console.log("No reading data found.");
        setHasReadings(false);
      }
  }
  checkIfHasReadings();

  return (
    <Page variant={"about"}>
      <Navbar />
      <Flex
        style={{
          fontSize: "2rem",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        margin={["1rem auto 0", "3rem auto 0"]}
      >
        <TextContainer variant={"page title"} size={["2rem", "xxl"]}>
          Past Readings
        </TextContainer>
        {hasReadings === true ? (
          <Flex
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "4rem",
            }}
          >
            <PastReadings walletAddress={walletAddress} />
            <Button
              variant={"primaryButton"}
              onClick={() => router.push("/card-select")}
              size="lg"
            >
              Select Again
            </Button>
          </Flex>
        ) : (
          <Flex style={{ flexDirection: "column", alignItems: "center" }}>
            <TextContainer variant={"description"}>
              You have not yet pulled a tarot card.
            </TextContainer>
            <Button
              variant={"primaryButton"}
              onClick={() => router.push("/card-select")}
              size="lg"
            >
              Begin your first reading
            </Button>
          </Flex>
        )}
      </Flex>
    </Page>
  );
}
