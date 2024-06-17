import Navbar from "./components/NavBar/NavBar";
import Page from "./components/Page/Page";
import { Flex, Text } from "@chakra-ui/react";
import { colors } from "./theme/foundations/colors";

const boxStyles = {
  flexDirection: "column",
  alignItems: "flex-start",
  width: "80%",
  margin: "0 auto",
};

const textSyles = {
  px: "2rem",
  py: "1rem",
  marginTop: "1rem",
  background: colors.yellow,
  borderRadius: ".75rem",
  border: "3px solid black",
};

export default function About() {
  return (
    <Page variant={"about"}>
      <Navbar />
      <Flex {...boxStyles}>
        <Text
          {...textSyles}
          style={{ fontSize: "1.5rem", textTransform: "uppercase" }}
        >
          Your Tarot Journey
        </Text>
        <Text {...textSyles}>
          Select the card(s) that feels right for you. Pixels are vibrant visual
          approximations of our senses so take your time.
          <br />
          Your personalized reading will be minted based on your selection and
          your unique wallet address.
          <br />
          Let the cards guide you in your meditations, journaling, or approach
          to your day. 
          <br />
          Come back daily, weekly, or as often as you need. 
        </Text>
      </Flex>
      <Flex {...boxStyles}>
        <Text
          {...textSyles}
          style={{ fontSize: "1.5rem", textTransform: "uppercase" }}
        >
          Based Tarot
        </Text>
        <Text {...textSyles}>
          The blockchain as a distributed network embodies a collective energy
          field that mirrors natural systems. Each transaction on Base is an
          exchange of energy. This energy is quantifiable, immutable, and
          transparent, echoing the interconnected energies we see in
          metaphysics. 
          <br />
          Tarot as an ancient practice interprets the flow of energy in one’s
          life. By putting tarot onchain, it allows us to tap into the
          decentralized energy field, channeling subconscious thoughts and
          cosmic forces into a coherent narrative.
          <br />
          In the digital age, the convergence of blockchain technology and
          traditional tarot readings reveals a profound intersection of modern
          and ancient systems of energy exchange. Our web application NFTarot
          built for the Base Buildathon 2024 explores this exchange.
        </Text>
      </Flex>
    </Page>
  );
}
