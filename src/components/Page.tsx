import { Flex, useStyleConfig } from "@chakra-ui/react";

export default function Page(props: any) {
  const { variant, ...rest } = props;

  const styles = useStyleConfig("FullPage", { variant });

  return <Flex __css={styles} {...rest} />;
}
