import React from 'react';
import { Flex, Link, Box } from "@chakra-ui/react";
import { useMultiStyleConfig, createStylesContext } from "@chakra-ui/react";
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';

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
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();

  React.useEffect(() => {
    if (authenticated) {
      router.push('/card-select');
    }
  }, [authenticated, router]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!authenticated) {
      await login();
    }
    // Navigation is handled by the useEffect hook
  };

  if (!ready) return null;

  return (
    <Link 
      {...props} 
      sx={styles.arch2} 
      onClick={handleClick}
      href="#"
      aria-label={authenticated ? 'Enter' : 'Connect Wallet'}
    />
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