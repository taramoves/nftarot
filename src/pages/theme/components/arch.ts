import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colors } from "../foundations/colors";

const helpers = createMultiStyleConfigHelpers(["container", "arch1", "arch2"]);

export const Arch = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      position: "relative",
      height: "200px",
      width: "100px",
      marginBottom: "20px",
    },
    arch1: {
      position: "absolute",
      width: "100px",
      height: "200px",
      backgroundColor: colors.deepPurple,
      borderTopLeftRadius: "50px",
      borderTopRightRadius: "50px",
      border: "2px solid black",
    },
    arch2: {
      position: "absolute",
      width: "100px",
      height: "200px",
      backgroundColor: colors.lavender,
      borderTopLeftRadius: "50px",
      borderTopRightRadius: "50px",
      border: "2px solid black",
      left: "10px",
      top: 0,
      _hover: {
        backgroundColor: colors.yellow,
      },
    },
  },
  sizes: {},
  variants: {},
});
