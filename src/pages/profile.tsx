import Navbar from "@/components/NavBar";
import Page from "@/components/Page";
import { useRouter } from "next/router";
import { Flex, Button } from "@chakra-ui/react";
import TextContainer from "@/components/TextContainer";

export default function Profile() {
  const router = useRouter();

  return (
    <Page variant={"main"}>
      <Navbar />
      <Flex
        style={{
          margin: "3rem auto 0",
          fontSize: "2rem",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: 'flex-start',
        }}
      >
        <TextContainer variant={"title"} size="xxl">Past Readings</TextContainer>
        <TextContainer variant={"description"}>You have not yet pulled a tarot card.</TextContainer>
        <Button variant={"primaryButton"} onClick={() => router.push("/card-select")} size="lg">Begin your first reading</Button>
      </Flex>
    </Page>
  );
}
