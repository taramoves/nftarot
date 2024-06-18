import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "../foundations/colors";

// need to add sizing for responsiveness
export const TextContainer = defineStyleConfig({
  baseStyle: {
    px: "2rem",
    py: ".5rem",
    marginTop: "1rem",
    background: colors.yellow,
    borderRadius: ".75rem",
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
  },
  variants: {
    title: {
      textTransform: "uppercase",
    },
    'card name': {
      textTransform: "uppercase",
      textAlign: 'center',
    },
    description: {
      lineHeight: "2rem",
      fontSize: "1.15rem",
      padding: '2rem',
      marginBottom: '1.5rem'
    },
  },
  defaultProps: {
    size: "md",
  },
});
