import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/CardSelect.module.css";
import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";
import { Button, useTheme, Spinner, useToast, Box } from "@chakra-ui/react";
import Page from "@/components/Page";
import BeginModal from "@/components/Modal/BeginModal";
import { getCardByIndex, generateRandomIndex } from "@/utils/cardUtils";
import { createReading, createOrUpdateUser } from "@/utils/dbUtils";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyWalletClient from "@/hooks/usePrivyWalletClient";
import { base } from "viem/chains";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Address, encodeAbiParameters, parseAbiParameters } from "viem";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import useNetworkCheck from "@/hooks/useNetworkCheck"; // New import

interface CardState {
  fileName: string;
  position: string;
  cardName: string;
  cardReadMain: string;
}

export default function CardSelect() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedCard, setMintedCard] = useState<CardState | null>(null);
  const [positions, setPositions] = useState<any[]>([]);
  const [showBeginModal, setShowBeginModal] = useState(true);
  const { authenticated, login, user } = usePrivy();
  const { walletClient } = usePrivyWalletClient(base);
  const { connectedWallet } = useConnectedWallet();
  const { isCorrectNetwork } = useNetworkCheck(); // New hook usage

  const router = useRouter();
  const theme = useTheme();
  const toast = useToast();

  useEffect(() => {
    const numCards = 20;
    const calculateRadius = () => {
      const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.35; // Reduced from 0.4 to 0.35
      const maxRadius = 280; // Set a maximum radius (adjust as needed)
      return Math.min(baseRadius, maxRadius);
    };
    let radius = calculateRadius();

    const calculatePositions = () => {
      const angleStep = (2 * Math.PI) / numCards;
      return Array.from({ length: numCards }, (_, i) => {
        const angle = i * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return { x, y, angle };
      });
    };

    setPositions(calculatePositions());

    const handleResize = () => {
      radius = calculateRadius();
      setPositions(calculatePositions());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(cardIndex);
  };

  const resetSelection = () => {
    setSelectedCard(null);
    setMintedCard(null);
  };

  const handleMintClick = async () => {
    if (!authenticated) {
      login();
      return;
    }

    if (!isCorrectNetwork) {
      toast({
        title: "Wrong Network",
        description: "Please switch to the correct network before minting.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsMinting(true);

    const contractAddress = process.env.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS;
    const minterAddress = process.env.NEXT_PUBLIC_MINTER_ADDRESS;
    const rewards1 = process.env.NEXT_PUBLIC_REWARDS_RECIPIENT_1;
    const rewards2 = process.env.NEXT_PUBLIC_REWARDS_RECIPIENT_2;
    const mintValue = process.env.NEXT_PUBLIC_MINT_VALUE_WEI ?? "777000000000000";
    const deckId = process.env.NEXT_PUBLIC_DECK_ID ?? "d8a4f60f-f3bf-44df-9218-7a10e4dfdf46";

    if (!contractAddress || !minterAddress || !rewards1 || !rewards2) {
      toast({
        title: "Configuration Error",
        description: "Minting is not configured. Please set contract env variables.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsMinting(false);
      return;
    }

    try {
      const randomIndex = generateRandomIndex();
      const minter = minterAddress as Address;
      const tokenId = BigInt(randomIndex + 1);
      const quantity = BigInt(1);
      const rewardsRecipients = [rewards1 as Address, rewards2 as Address];
      const minterArguments = encodeAbiParameters(
        parseAbiParameters("address x, string y"),
        [connectedWallet as Address, "received a tarot reading onchain"]
      );

      const args = [
        minter,
        tokenId,
        quantity,
        rewardsRecipients,
        minterArguments,
      ];

      await (walletClient as any).writeContract({
        address: contractAddress as Address,
        abi: zoraCreator1155ImplABI,
        functionName: "mint",
        account: connectedWallet as Address,
        args: args as any,
        value: mintValue,
      } as any);

      const card = await getCardByIndex(deckId, randomIndex);

      if (!card) {
        throw new Error("Failed to get a card at the generated index");
      }

      if (user?.wallet?.address) {
        await createOrUpdateUser(user.wallet.address);

        // Create reading in the database (card already fetched above)
        const readingId = await createReading(
          user.wallet.address,
          card.card_id,
          deckId,
          card.image_url,
          randomIndex
        );
        // Navigate to the card-reveal page with card data

        router.push({
          pathname: "/card-reveal/[readingId]",
          query: { readingId: readingId },
        } as any);
      } else {
        throw new Error("Wallet address not available");
      }

      toast({
        title: "Minting Successful",
        description: "Your card has been minted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error in minting process:", error);
      }
      toast({
        title: "Minting Failed",
        description:
          "There was an error while minting your card. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Page variant={"main"}>
      <Head>
        <title>Card Select</title>
      </Head>
      <Navbar />
      <div className={styles.main}>
        <div
          className={
            selectedCard !== null || mintedCard
              ? styles.cardDeckDark
              : styles.cardDeck
          }
        >
          {positions.map((pos, index) => (
            <img
              alt={"cards"}
              key={index}
              src="/Card_Sample.svg"
              className={
                selectedCard === index ? styles.hiddenCard : styles.card
              }
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) rotate(${
                  pos.angle + Math.PI / 2
                }rad)`,
              }}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        {mintedCard ? (
          <div className={styles.selectedCardContainer}>
            <img
              src={mintedCard.fileName}
              className={styles.mintedCard}
              alt={mintedCard.cardName}
            />
            <div className={styles.descriptionBox}>
              <p>{mintedCard.cardName}</p>
              <p>{mintedCard.cardReadMain}</p>
            </div>
          </div>
        ) : selectedCard !== null ? (
          <div className={styles.selectedCardContainer}>
            <img
              alt={"card sample"}
              src="/Card_Sample.svg"
              className={styles.mintedCard}
            />
            <div className={styles.buttons}>
              {!isCorrectNetwork && (
                <Box color="red.500" mb={2}>
                  Please switch to the correct network to mint.
                </Box>
              )}
              <Button
                variant={"primaryButton"}
                onClick={handleMintClick}
                isLoading={isMinting}
                loadingText="Minting"
                isDisabled={!isCorrectNetwork}
              >
                {isMinting ? <Spinner /> : "Mint"}
              </Button>
              <Button variant={"primaryButton"} onClick={resetSelection}>
                X
              </Button>
            </div>
          </div>
        ) : (
          <BeginModal
            isOpen={showBeginModal}
            onClose={() => setShowBeginModal(false)}
            onClick={() => setShowBeginModal(false)}
          />
        )}
      </div>
    </Page>
  );
}
