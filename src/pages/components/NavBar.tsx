import React from 'react';
import { Flex, Link, Box, Button } from "@chakra-ui/react";
import { useMultiStyleConfig, createStylesContext } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';

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
  const currentPath = usePathname();
  const { logout, authenticated } = usePrivy();
  const router = useRouter();

  const handleExit = async () => {
    if (authenticated) {
      await logout();
      router.push('/');
    }
  };

  return (
    <Bar styles={{ width: "100%" }}>
      <Links
        href="/"
        style={{ textDecoration: currentPath === "/" ? "underline" : "none" }}
      >
        NFTarot
      </Links>
      <Box>
        <Links
          href="/profile"
          style={{
            textDecoration: currentPath === "/profile/" ? "underline" : "none",
          }}
        >
          profile
        </Links>
        <Links
          href="/about"
          style={{
            textDecoration: currentPath === "/about/" ? "underline" : "none",
          }}
        >
          about
        </Links>
        {authenticated && (
          <Button
            onClick={handleExit}
            variant="primaryButton"
            size="sm"
          >
            exit
          </Button>
        )}
      </Box>
    </Bar>
  );
}