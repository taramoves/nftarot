import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/CardSelect.module.css";
import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";
import { Button, useTheme, useDisclosure } from "@chakra-ui/react";
import Page from "@/components/Page";
import BeginModal from "@/components/Modal/BeginModal";
import { getRandomCard } from "@/utils/cardUtils";
import { createReading, createOrUpdateUser } from "@/utils/dbUtils";
import { usePrivy } from "@privy-io/react-auth";

interface CardState {
  fileName: string;
  position: string;
  cardName: string;
  cardReadMain: string;
}

export default function CardSelect() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [mintedCard, setMintedCard] = useState<CardState | null>(null);
  const [positions, setPositions] = useState<any[]>([]);
  const [showBeginModal, setShowBeginModal] = useState(true);
  const { authenticated, login, user } = usePrivy();

  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const numCards = 20;
    const radius = 300;
    const angleStep = (2 * Math.PI) / numCards;
    const newPositions = [];

    for (let i = 0; i < numCards; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      newPositions.push({ x, y, angle });
    }

    setPositions(newPositions);
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
  
    try {
      console.log("Minting process started");
      const deckId = 'd8a4f60f-f3bf-44df-9218-7a10e4dfdf46';
      const card = await getRandomCard(deckId);
      
      if (!card) {
        console.error("Failed to get a random card");
        return;
      }
  
      console.log(card);
  
      // Create or update user in the database
      if (user?.wallet?.address) {
        await createOrUpdateUser(user.wallet.address);
        
        // Create reading in the database
        await createReading(user.wallet.address, card.card_id, deckId);
      } else {
        console.error("Wallet address not available");
        return;
      }
  
      // Navigate to the card-reveal page with card data
      router.push({
        pathname: "/card-reveal",
        query: { cardId: card.card_id }
      });
    } catch (error) {
      console.error("Error in minting process:", error);
      // Handle the error appropriately
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
          style={{
            position: "absolute",
            borderRadius: "50%",
            width: "50rem",
            height: "50rem",
            margin: "0px auto",
            border: "3px solid black",
            backgroundColor: theme.colors.seagreen,
          }}
        ></div>
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
              <Button variant={"primaryButton"} onClick={handleMintClick}>
                Mint
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