import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "../foundations/colors";

export const FullPage = defineStyleConfig({
  baseStyle: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    border: "3px solid black",
  },
  variants: {
    home: {
      backgroundColor: colors.red,
      margin: 0,
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    main: {
      backgroundColor: colors.lavender,
      flexDirection: "column",
    },
    about: {
      backgroundColor: colors.lavender,
      flexDirection: "column",
      height: "100%",
    },
  },
});
