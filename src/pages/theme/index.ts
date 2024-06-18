import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import { styles } from "./styles";
import { colors } from "./foundations/colors";

// Component style overrides
import { Button } from "./components/button";
import { NavBar } from "./components/navbar";
import { FullPage } from "./components/fullPage";
import { TextContainer } from "./components/textContainer";

export const customTheme = extendTheme({
  styles,
  colors,
  components: {
    Button,
    NavBar,
    FullPage,
    TextContainer,
  },
  fonts: {
    heading: "var(--font-mermaid)",
    body: "var(--font-mermaid)",
  },
});

console.log(FullPage);
