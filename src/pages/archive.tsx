import Navbar from "./components/NavBar";
import Page from "./components/Page";
import { Flex } from "@chakra-ui/react";
import { FaWrench } from "react-icons/fa";

export default function Archive() {
  return (
    <Page variant={"archive"}>
      <Navbar />
      <Flex
        style={{
          margin: "auto",
          fontSize: "2rem",
          alignItems: "center",
        }}
      >
        <h1>We're excited to share this with you soon!</h1>
        <FaWrench style={{ fontSize: "1.5rem", marginLeft: "1rem" }} />
      </Flex>
    </Page>
  );
}
