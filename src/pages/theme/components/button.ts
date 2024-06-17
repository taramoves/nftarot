import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { colors } from "../foundations/colors";

const primaryButton = defineStyle({
  background: colors.yellow,
});

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base",
    cursor: "pointer",
    border: "3px solid",
    borderColor: "black",
    bg: "blue",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
  },
  variants: { primaryButton },
  defaultProps: {
    size: "md",
  },
});
