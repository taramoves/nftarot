import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/CardSelect.module.css";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import Navbar from "../components/NavBar";
import { Button, useTheme, useDisclosure } from "@chakra-ui/react";
import Page from "../components/Page";
import BeginModal from "../components/BeginModal";
// import Card from "../components/Card/Card";

// Function to load CSV file
const loadCSV = async () => {
  const response = await fetch("/cardset.csv");

  console.log(response);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => reject(error),
    });
  });
};

interface CardState {
  fileName: string;
  position: string;
  cardName: string;
  cardReadMain: string;
}

export default function CardSelect() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [mintedCard, setMintedCard] = useState<CardState | null>(null);
  const [positions, setPositions] = useState([]);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const router = useRouter();
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardData = await loadCSV();
        setCards(cardData);
        console.log("Cards loaded:", cardData);
      } catch (error) {
        console.error("Error loading cards:", error);
      }
    };
    fetchCards();

    const numCards = 20; // Increase number of cards in the circle
    const radius = 300; // Adjust radius as needed
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

  const handleCardClick = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  const resetSelection = () => {
    setSelectedCard(null);
    setMintedCard(null);
  };

  const handleMintClick = () => {
    if (cards.length === 0) {
      console.error("No cards available");
      return;
    }
    const randomIndex = Math.floor(Math.random() * cards.length);
    const selectedImage = `/decks/riderwaithe/${cards[randomIndex].fileName}`;
    const selectedText = cards[randomIndex].cardName;
    const selectedCardDescription = cards[randomIndex].cardReadMain;
    console.log("Minted card:", {
      fileName: selectedImage,
      cardName: selectedText,
      cardReadMain: selectedCardDescription,
    });
    router.push({
      pathname: "/card-reveal",
      query: {
        fileName: selectedImage,
        cardName: selectedText,
        cardReadMain: selectedCardDescription,
      },
    });
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
          {positions.map((pos: any, index: number) => (
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
            isOpen={showModal}
            onClose={()=> setShowModal(false)}
            onClick={()=> {}}
          />
        )}
        {/* need to reconstruct these conditions */}
      </div>
    </Page>
  );
}
