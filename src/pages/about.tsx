import Navbar from "./components/NavBar";
import Page from "./components/Page";
import { Flex, Text } from "@chakra-ui/react";
import { colors } from "./theme/foundations/colors";
import TextContainer from "./components/TextContainer";

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
      <Flex
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          width: "90%",
          margin: "2rem auto",
        }}
      >
        <TextContainer variant={"title"}>Your Tarot Journey</TextContainer>
        <TextContainer variant={"description"}>
          Select the card(s) that feels right for you. Pixels are vibrant visual
          approximations of our senses so take your time.
          <br />
          <br />
          {/* temporary solution for spacing */}
          Your personalized reading will be minted based on your selection and
          your unique wallet address.
          <br />
          <br />
          Let the cards guide you in your meditations, journaling, or approach
          to your day. 
          <br />
          <br />
          Come back daily, weekly, or as often as you need. 
        </TextContainer>

        <TextContainer variant={"title"}>Based Tarot</TextContainer>
        <TextContainer variant={"description"}>
          The blockchain as a distributed network embodies a collective energy
          field that mirrors natural systems. Each transaction on Base is an
          exchange of energy. This energy is quantifiable, immutable, and
          transparent, echoing the interconnected energies we see in
          metaphysics. 
          <br />
          <br />
          Tarot as an ancient practice interprets the flow of energy in one’s
          life. By putting tarot onchain, it allows us to tap into the
          decentralized energy field, channeling subconscious thoughts and
          cosmic forces into a coherent narrative.
          <br />
          <br />
          In the digital age, the convergence of blockchain technology and
          traditional tarot readings reveals a profound intersection of modern
          and ancient systems of energy exchange. Our web application NFTarot
          built for the Base Buildathon 2024 explores this exchange.
        </TextContainer>
      </Flex>
    </Page>
  );
}
