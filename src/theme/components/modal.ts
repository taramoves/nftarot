import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colors } from "@/theme/foundations/colors";

const helpers = createMultiStyleConfigHelpers([
  "header",
  "overlay",
  "dialogContainer",
  "dialog",
  "closeButton",
  "body",
  "footer",
]);

export const Modal = helpers.defineMultiStyleConfig({
  baseStyle: {
    header: {},
    overlay: {
      //   using deepPurple theme color in rgb
      backgroundColor: "rgba(109, 42, 251, 0.25)",
    },
    dialogContainer: {},
    dialog: {
      backgroundColor: "transparent",
      boxShadow: "0 5px 15px rgba(0,0,0,0)",
    },
    closeButton: {
      color: colors.red,
    },
    body: {
      textAlign: "center",
      lineHeight: "2.5rem",
      px: "2.5rem",
      py: "1rem",
      marginBottom: "1rem",
      fontSize: "1.25rem",
      borderRadius: "1rem",
      backgroundColor: colors.yellow,
      border: "3px solid black",
    },
    footer: {},
  },
  sizes: {},
  variants: {
    privy: {
      dialog: {
        borderRadius: "1rem",
        backgroundColor: colors.yellow,
        border: "3px solid black",
        textAlign: 'center',
      },
      body: {
        backgroundColor: 'inherit',
        border: 'none',
      }
    }
  },
});
