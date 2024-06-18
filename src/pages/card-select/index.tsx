import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/CardSelect.module.css";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import Navbar from "../components/NavBar";
import { Button, useTheme, Flex } from "@chakra-ui/react";
import Page from "../components/Page";
// import Card from "../components/Card/Card";

// Function to load CSV file
const loadCSV = async () => {
  const response = await fetch("/cards.csv");
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
  image: string;
  text: string;
}

export default function CardSelect() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [mintedCard, setMintedCard] = useState<CardState | null>(null);
  const [positions, setPositions] = useState([]);
  const [cards, setCards] = useState([]);
  const router = useRouter();
  const theme = useTheme();

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
    const selectedImage = `/decks/riderwaithe/${cards[randomIndex].image}`;
    const selectedText = cards[randomIndex].text;
    console.log("Minted card:", { image: selectedImage, text: selectedText });
    router.push({
      pathname: "/card-reveal",
      query: { image: selectedImage, text: selectedText },
    });
  };

  return (
    <Page variant={"card select"}>
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
              src={mintedCard.image}
              className={styles.mintedCard}
              alt={mintedCard.text}
            />
            <div className={styles.descriptionBox}>
              <p>{mintedCard.text}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
          <div className={styles.centerText}>
            <p>BREATHE DEEPLY</p>
            <p>FOCUS ON YOUR INTENTION</p>
            <p>WHEN YOU'RE READY SELECT YOUR CARD(S)</p>
          </div>
        )}
      </div>
    </Page>
  );
}
