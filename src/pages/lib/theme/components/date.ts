import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "../foundations/colors";

export const Date = defineStyleConfig({
    baseStyle: {
        px: "2.2rem",
        py: ".25rem",
        marginTop: "1rem",
        background: colors.yellow,
        borderRadius: "1.75rem",
        border: "3px solid black",
        textAlign: "left",
    }
})