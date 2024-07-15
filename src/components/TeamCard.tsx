import { Box, Flex, Image } from "@chakra-ui/react";
import TextContainer from "./TextContainer";
import { colors } from "@/theme/foundations/colors";

interface TeamCardProps {
  name: string;
  src: string;
  alt: string;
}

export default function TeamCard({ name, src, alt }: TeamCardProps) {
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Box
        style={{
          width: "200px",
          height: "auto",
        }}
      >
        <Image
          src={src}
          alt={alt}
          objectFit={"cover"}
          style={{
            height: "250px",
            width: "100%",
            border: "3px solid black",
            borderRadius: "2.2rem",
          }}
        />
      </Box>
      <TextContainer variant="card name">{name}</TextContainer>
    </Flex>
  );
}
