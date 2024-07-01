import { Flex, IconButton, Image } from "@chakra-ui/react";
import { colors } from "@/theme/foundations/colors";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

// need to finish adding/creating links

export default function AboutLinks(...props: any) {
  return (
    <Flex
      {...props}
      style={{
        border: "3px solid black",
        borderRadius: "5rem",
        backgroundColor: colors.yellow,
        padding: "0.5rem 2rem",
        gap: "1rem",
        margin: '2rem 0 3rem',
      }}
    >
      <IconButton
        icon={<Image src={"/icons/zora-logo.png"} alt="zora icon" />}
        aria-label="Zora"
      />
      <IconButton aria-label="Twitter" icon={<FaTwitter />} />
      <IconButton icon={<FaTiktok />} aria-label="Tiktok" />
      <IconButton
        icon={<Image src={"/icons/farcaster-logo.png"} alt="farcaster icon" />}
        aria-label="Farcaster"
      />
    </Flex>
  );
}
