import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "@/theme/foundations/colors";

export const FullPage = defineStyleConfig({
  baseStyle: {
    display: "flex",
    minHeight: "100vh",
    minWidth: "100vw",
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
      height: '100%'
    },
  },
});
