import { Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SingleCard from "./SingleCard";
import TextContainer from "@/components/TextContainer";
import styles from "../../styles/CardReveal.module.css";
import ShareButton from "@/components/Modal/ShareButton"; // Import the new ShareButton
import React from "react";

interface Props {
  className?: string;
  alt: string;
  src: string;
  date: string;
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
  date,
  description,
}: Props) {
  const cardId = React.useId();
  console.log("MintedCard rendering", {
    cardId,
    alt,
    src,
    text,
    date,
    description,
  });

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
          {date}
        </TextContainer>
        <TextContainer variant={"card name"} size={"xl"}>
          {text}
        </TextContainer>
        <TextContainer variant={"description"}>{description}</TextContainer>
        <ButtonGroup
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".5rem",
            justifyContent: "flex-end",
            minWidth: "100%",
          }}
        >
          <Button
            variant={"primaryButton"}
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
            title="My Reading"
            text={`I just minted a reading on NFTarot, I pulled ${text}!`}
            url={window.location.href}
          />
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}
