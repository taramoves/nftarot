import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import { styles } from "./styles";
import { colors } from "./foundations/colors";

// Component style overrides
import { Button } from "./components/button";
import { NavBar } from "./components/navbar";
import { FullPage } from "./components/fullPage";
import { TextContainer } from "./components/textContainer";
import { Arch } from "./components/arch";
import { Modal } from "./components/modal";
import { Date } from "./components/date";

export const customTheme = extendTheme({
  styles,
  colors,
  components: {
    Button,
    NavBar,
    FullPage,
    TextContainer,
    Arch,
    Modal,
    Date,
  },
  fonts: {
    heading: "var(--font-mermaid)",
    body: "var(--font-mermaid)",
  },
});