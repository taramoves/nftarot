import { Flex, Text, useStyleConfig } from "@chakra-ui/react";

export default function TextContainer(props: any) {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig("TextContainer", { variant, size });
  return (
    <Flex __css={styles}>
      <Text variant={variant} size={size} {...rest} />
    </Flex>
  );
}
