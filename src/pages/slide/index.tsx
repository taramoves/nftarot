import NavBar from "@/components/NavBar";
import Page from "@/components/Page";
import { Flex } from "@chakra-ui/react";
import CardCarousel from "@/components/Card/CardCarousel";

//temporary page for testing out the slider view
export default function SliderView() {
  return (
    <Page variant={"main"}>
      <NavBar />
      <Flex
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          margin: "30% auto",
        }}
      >
        <CardCarousel />
      </Flex>
    </Page>
  );
}
