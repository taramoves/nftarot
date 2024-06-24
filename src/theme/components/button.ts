import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { colors } from "@/theme/foundations/colors";

const primaryButton = defineStyle({
  background: colors.yellow,
});

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "1rem",
    cursor: "pointer",
    border: "3px solid",
    borderColor: "black",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
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
