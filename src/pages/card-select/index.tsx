import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/CardSelect.module.css";
import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";
import { Button, useTheme, useDisclosure } from "@chakra-ui/react";
import Page from "@/components/Page";
import BeginModal from "@/components/Modal/BeginModal";
import PrivyModal from "@/components/Modal/PrivyModal";
import { getRandomCard } from "@/utils/cardUtils";
import usePrivyWalletClient from "@/hooks/usePrivyWalletClient";
import { baseSepolia } from "viem/chains";
import { usePrivy } from "@privy-io/react-auth";
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';
// import Card from "../components/Card/Card";


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
  const [cards, setCards] = useState<any>([]);
  const [showBeginModal, setShowBeginModal] = useState(true);
  const [showPrivyModal, setShowPrivyModal] = useState<any>(false);
  const { walletClient } = usePrivyWalletClient(baseSepolia.id);
  const { ready, authenticated, login } = usePrivy();

  const router = useRouter();
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardData = [] as any;
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

    setPositions(newPositions as any);
  }, []);

  const handleCardClick = (cardIndex: any) => {
    setSelectedCard(cardIndex);
  };

  const resetSelection = () => {
    setSelectedCard(null);
    setMintedCard(null);
  };

  const handleMintClick = async () => {
    console.log("clicked", walletClient);
    login();
    // await walletClient.writeContract({
    //   address: "0xB4a8b1B9183Fa50636a8578D81290e595A7Ed005",
    //   abi: zoraCreator1155ImplABI,
    //   functionName: "mintWithRewards",
    //   args: [minter:'', internalType: '', type: ''],
    //   account,
    // });
    try {
      // We'll implement the actual minting later
      console.log("Minting process started");
      const card = await getRandomCard('d8a4f60f-f3bf-44df-9218-7a10e4dfdf46');
      console.log(card);
      // For now, just navigate to the card-reveal page
      router.push("/card-reveal");
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
            isOpen={showBeginModal}
            onClose={() => setShowBeginModal(false)}
            onClick={() => setShowBeginModal(false)}          />
        )}
        {/* need to reconstruct these conditions */}
      </div>
    </Page>
  );
}
