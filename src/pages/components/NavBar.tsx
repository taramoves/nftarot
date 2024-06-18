// import styles from "./NavBar.module.css";
import { Flex, Link, Box } from "@chakra-ui/react";
import { useMultiStyleConfig, createStylesContext } from "@chakra-ui/react";

const [StylesProvider, useStyles] = createStylesContext("Bar");

function Bar(props: any) {
  const { children, ...rest } = props;

  const styles = useMultiStyleConfig("NavBar");

  return (
    <Flex __css={styles.navbar} {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </Flex>
  );
}

function Links(props: any) {
  const styles = useStyles();

  return <Link sx={styles.link} {...props} />;
}

export default function NavBar() {
  return (
    <Bar styles={{width: '100%'}}>
      <Links href="/">home</Links>
      <Box>
        <Links href="/about">about</Links>
        <Links href="/archive">archive</Links>
      </Box>
    </Bar>
  );
}
