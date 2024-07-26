import NavBar from "@/components/NavBar";
import Page from "@/components/Page";
import { Box } from "@chakra-ui/react";
import CardCarousel from "@/components/Card/CardCarousel";

//temporary page for testing out the slider view
export default function SliderView() {
  return (
    <Page variant={"main"}>
      <NavBar />
      <Box
        style={{
          width: "100%",
          margin: "30% auto",
        }}
      >
        <CardCarousel />
      </Box>
    </Page>
  );
}
