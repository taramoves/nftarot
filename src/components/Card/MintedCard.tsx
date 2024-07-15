import { Flex, Button, ButtonGroup, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SingleCard from "./SingleCard";
import TextContainer from "@/components/TextContainer";
import styles from "../../styles/CardReveal.module.css";
import ShareButton from "@/components/Modal/ShareButton";
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
      direction={["column", "column", "row"]}
      align={["center", "center", "flex-start"]}
      justify="center"
      margin="auto"
      p={[4, 6, 8]}
      maxWidth="100%"
    >
      <Box mb={[6, 6, 0]} mr={[0, 0, 8]}>
        <SingleCard
          src={src}
          className={styles.card}
          alt={alt}
          style={{ position: "relative", maxWidth: "100%", height: "auto" }}
        />
      </Box>
      <Flex
        direction="column"
        maxWidth={["100%", "100%", "35%"]}
      >
        <TextContainer variant={"card name"} size={["lg", "xl"]} mb={2}>
          {date}
        </TextContainer>
        <TextContainer variant={"card name"} size={["lg", "xl"]} mb={4}>
          {text}
        </TextContainer>
        <TextContainer variant={"description"} fontSize={["sm", "md"]} mb={6}>
          {description}
        </TextContainer>
        <ButtonGroup
          spacing={2}
          flexWrap="wrap"
          justifyContent={["center", "flex-end"]}
        >
          <Button
            variant={"primaryButton"}
            onClick={() => router.push("/profile")}
            size={["sm", "md"]}
            mb={2}
          >
            Past Readings
          </Button>
          <Button
            variant={"primaryButton"}
            onClick={() => router.push("/card-select")}
            size={["sm", "md"]}
            mb={2}
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