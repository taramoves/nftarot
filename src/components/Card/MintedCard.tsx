import { Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SingleCard from "./SingleCard";
import TextContainer from "@/components/TextContainer";
import styles from "../../styles/CardReveal.module.css";
import { StaticImageData } from "next/image";
import ShareButton from "@/components/Modal/ShareButton"; // Import the new ShareButton
import React from 'react';

interface Props {
  className?: string;
  alt: string;
  src: string | StaticImageData;
  width?: number;
  height?: number;
  style?: any;
  text?: string;
  description: string;
}

export default function MintedCard({
  alt,
  src,
  style,
  text,
  description,
  ...props
}: Props) {
  const cardId = React.useId();
  console.log('MintedCard rendering', { cardId, alt, src, text, description });

  const router = useRouter();

  return (
    <Flex
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        margin: "auto",
      }}
    >
      <SingleCard
        src={src}
        className={styles.card}
        alt={alt}
        width={300}
        height={500}
        style={{ position: "relative" }}
      />
      <Flex
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "-1.5rem",
          marginTop: "3rem",
          maxWidth: "35%",
        }}
      >
        <TextContainer variant={"card name"} size={"xl"}>
          {text}
        </TextContainer>
        <TextContainer variant={"description"}>{description}</TextContainer>
        <Flex
          style={{
            display: "flex",
            gap: "1rem",
            marginRight: "1.5rem",
            justifyContent: "flex-end",
            minWidth: "100%",
          }}
        >
          <Button
            variant={"primaryButton"}
            style={{ marginLeft: "3rem" }}
            onClick={() => router.push("/profile")}
          >
            Past Readings
          </Button>
          <Button
            variant={"primaryButton"}
            onClick={() => router.push("/card-select")}
          >
            Restart
          </Button>
          <ShareButton
            title="My NFTarot Card"
            text={`Check out my NFTarot card: ${text}`}
            url={window.location.href}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}