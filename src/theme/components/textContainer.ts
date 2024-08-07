import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "@/theme/foundations/colors";

// need to add sizing for responsiveness
export const TextContainer = defineStyleConfig({
  baseStyle: {
    px: "2.2rem",
    py: ".25rem",
    marginTop: "1rem",
    background: colors.yellow,
    borderRadius: "1.75rem",
    border: "3px solid black",
    textAlign: "left",
  },
  sizes: {
    md: {
      fontSize: "1.5rem",
    },
    xl: {
      fontSize: "2rem",
    },
    xxl: {
      fontSize: "2.5rem",
      borderRadius: "2.5rem",
    },
  },
  variants: {
    title: {
      textTransform: "uppercase",
    },
    "page title": {
      textTransform: "uppercase",
      textAlign: "center",
    },
    "card name": {
      textTransform: "uppercase",
      textAlign: "center",
    },
    description: {
      lineHeight: "2rem",
      fontSize: "1.15rem",
      padding: "2rem",
      marginBottom: "1.2rem",
      borderRadius: "1.5rem",
    },
  },
  defaultProps: {
    size: "md",
  },
});
