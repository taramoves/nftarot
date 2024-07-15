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
      p={[2, 4, 6]}
      maxWidth="100%"
    >
      <Box mb={[4, 4, 0]} mr={[0, 0, 6]}>
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
        px={[2, 3, 4]}
      >
        <TextContainer variant={"card name"} size="xl" mb={1} fontSize={["md", "lg", "xl"]}>
          {date}
        </TextContainer>
        <TextContainer variant={"card name"} size="xl" mb={2} fontSize={["md", "lg", "xl"]}>
          {text}
        </TextContainer>
        <TextContainer variant={"description"} size="md" mb={4} fontSize={["xs", "sm", "md"]}>
          {description}
        </TextContainer>
        <ButtonGroup
          spacing={[1, 2]}
          flexWrap="wrap"
          justifyContent={["center", "flex-end"]}
        >
          <Button
            variant={"primaryButton"}
            onClick={() => router.push("/profile")}
            size="md"
            mb={2}
            px={[2, 3, 4]}
            fontSize={["xs", "sm", "md"]}
          >
            Past Readings
          </Button>
          <Button
            variant={"primaryButton"}
            onClick={() => router.push("/card-select")}
            size="md"
            mb={2}
            px={[2, 3, 4]}
            fontSize={["xs", "sm", "md"]}
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