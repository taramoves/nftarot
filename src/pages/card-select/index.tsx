import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/CardSelect.module.css";
import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/NavBar";
import { Button, useTheme, Spinner, useToast, useDisclosure, Toast } from "@chakra-ui/react";
import Page from "@/components/Page";
import BeginModal from "@/components/Modal/BeginModal";
import { getCardByIndex, generateRandomIndex } from "@/utils/cardUtils";
import { createReading, createOrUpdateUser } from "@/utils/dbUtils";
import { useConnectWallet, useLinkAccount, usePrivy } from "@privy-io/react-auth";
import usePrivyWalletClient from "@/hooks/usePrivyWalletClient";
import {baseSepolia} from "viem/chains";
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';
import { Address, encodeAbiParameters, parseAbiParameters, parseEther } from "viem";
import useConnectedWallet from "@/hooks/useConnectedWallet";


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
  const {walletClient} = usePrivyWalletClient(baseSepolia); // Add this line
  const {connectedWallet} = useConnectedWallet();

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
  
    setIsMinting(true);
  
    try {
      console.log("Starting minting process");
      console.log("Wallet client:", walletClient);
  
      const minter = '0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE' as Address;
      const tokenId = BigInt(3);
      const quantity = BigInt(1);
      const minterArguments = encodeAbiParameters(parseAbiParameters('address x, string y'), [
        connectedWallet as Address,
        'Based in Colombia 🇨🇴',
      ]);    
      const mintReferral = '0xD246C16EC3b555234630Ab83883aAAcdfd946ceF' as Address;
      const args = [minter, tokenId, quantity, minterArguments, mintReferral];
    
      await (walletClient as any).writeContract({
        address: '0xfA29427dA5A14D81933B0E32BE2aD10dC679FA88',
        abi: zoraCreator1155ImplABI,
        functionName: 'mintWithRewards',
        account: connectedWallet as Address,
        args: args as any,
        value: '777000000000000'
      } as any);
  
      console.log("Minting process completed");
      
      // Fetch card data from Supabase
      const deckId = 'd8a4f60f-f3bf-44df-9218-7a10e4dfdf46';
      
      // Generate a random index between 0 and 155
      const randomIndex = generateRandomIndex();
      console.log("Generated random index:", randomIndex);
  
      // Get the card at the generated index
      const card = await getCardByIndex(deckId, randomIndex);
      
      if (!card) {
        throw new Error("Failed to get a card at the generated index");
      }
  
      console.log("Fetched card:", card);
  
      // Create or update user in the database
      if (user?.wallet?.address) {
        await createOrUpdateUser(user.wallet.address);
        
        // Create reading in the database
        await createReading(
          user.wallet.address,
          card.card_id,
          deckId,
          card.image_url,
          randomIndex
        );  
        // Navigate to the card-reveal page with card data
        router.push({
          pathname: "/card-reveal",
          query: { cardId: randomIndex.toString() }
        });
      } else {
        throw new Error("Wallet address not available");
      }
  
      Toast({
        title: "Minting Successful",
        description: "Your card has been minted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error in minting process:", error);
      Toast({
        title: "Minting Failed",
        description: "There was an error while minting your card. Please try again.",
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
    <Button 
      variant={"primaryButton"} 
      onClick={handleMintClick}
      // Add these props
      isLoading={isMinting}
      loadingText="Minting"
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