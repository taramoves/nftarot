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

    try {
      console.log("Starting minting process");
      console.log("Wallet client:", walletClient);

      const randomIndex = generateRandomIndex();
      console.log("Generated random index:", randomIndex);

      const minter = "0x04E2516A2c207E84a1839755675dfd8eF6302F0a" as Address; //'0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE' as Address;
      const tokenId = BigInt(randomIndex + 1);
      const quantity = BigInt(1);
      const rewardsRecipients = [
        "0xD246C16EC3b555234630Ab83883aAAcdfd946ceF" as Address,
        "0xD246C16EC3b555234630Ab83883aAAcdfd946ceF" as Address,
      ];
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

      console.log(args);
      await (walletClient as any).writeContract({
        address: "0x67D7e7BCc964De5BEf0951EB818E3A9A136312B5", //baseSepolia: '0x4B713bC4CEC525E59f5E6D1Cd3a372D0ee747E6d',
        abi: zoraCreator1155ImplABI,
        functionName: "mint",
        account: connectedWallet as Address,
        args: args as any,
        value: "777000000000000",
      } as any);

      console.log("Minting process completed");

      const deckId = "d8a4f60f-f3bf-44df-9218-7a10e4dfdf46";

      const card = await getCardByIndex(deckId, randomIndex);

      if (!card) {
        throw new Error("Failed to get a card at the generated index");
      }

      console.log("Fetched card:", card);

      if (user?.wallet?.address) {
        await createOrUpdateUser(user.wallet.address);

        const card = await getCardByIndex(deckId, randomIndex);

        if (!card) {
          throw new Error("Failed to get a card at the generated index");
        }

        // Create reading in the database
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
      console.error("Error in minting process:", error);
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
        {/* <div
  style={{
    position: "absolute",
    borderRadius: "50%",
    width: "90vw",
    height: "90vw",
    maxWidth: "50rem",
    maxHeight: "50rem",
    margin: "0px auto",
    border: "3px solid black",
    backgroundColor: theme.colors.seagreen,
  }}
></div> */}

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
