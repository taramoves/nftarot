import { Text, useStyleConfig, TextProps } from "@chakra-ui/react";

interface TextContainerProps extends TextProps {
  variant?: string;
  size?: string;
}

export default function TextContainer({ variant, size, ...rest }: TextContainerProps) {
  const styles = useStyleConfig("TextContainer", { variant, size });
  return <Text sx={styles} variant={variant} fontSize={size} lineHeight="normal" {...rest} />;
}