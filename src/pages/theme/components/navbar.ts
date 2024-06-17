import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colors } from "../foundations/colors";

const helpers = createMultiStyleConfigHelpers(["navbar", "link"]);

export const NavBar = helpers.defineMultiStyleConfig({
  baseStyle: {
    navbar: {
      backgroundColor: colors.yellow,
      padding: "10px",
      borderBottom: "3px solid black",
      textTransform: "uppercase",
      display: "flex",
      justifyContent: "space-between",
    },
    link: {
      fontWeight: "bold",
      textDecoration: "none",
      marginLeft: "1rem",
      _hover: {
        textDecoration: "none",
        fontWeight: 700,
      },
    },
  },
  sizes: {},
  variants: {},
});
