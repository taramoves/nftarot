import { Flex, Link, Box } from "@chakra-ui/react";
import { useMultiStyleConfig, createStylesContext } from "@chakra-ui/react";

const [StylesProvider, useStyles] = createStylesContext("ArchContainer");

function ArchContainer(props: any) {
  const { children, ...rest } = props;

  const styles = useMultiStyleConfig("Arch");

  return (
    <Flex __css={styles.container} {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </Flex>
  );
}

function Arch1(props: any) {
  const styles = useStyles();

  return <Link sx={styles.arch1} {...props} />;
}

function Arch2(props: any) {
  const styles = useStyles();

  return (
    <Link {...props} sx={styles.arch2}>
    </Link>
  );
}

export default function Arch() {
  return (
    <ArchContainer>
      <Arch1 />
      <Arch2 />
    </ArchContainer>
  );
}
