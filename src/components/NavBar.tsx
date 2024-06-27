import { Flex, Link as ChakraLink, Box, Button } from "@chakra-ui/react";
import { useMultiStyleConfig, createStylesContext } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const [StylesProvider, useStyles] = createStylesContext("Bar");

function Bar(props: any) {
  const { children, ...rest } = props;
  const styles = useMultiStyleConfig("NavBar");

  return (
    <Flex __css={styles.navbar} alignItems="center" justifyContent="space-between" {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </Flex>
  );
}

function NavItem({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  const styles = useStyles();
  const currentPath = usePathname();
  const isActive = href && currentPath === href;

  const commonStyles = {
    ...styles.link,
    textDecoration: isActive ? "underline" : "none",
    fontWeight: "normal",
    fontSize: "inherit",
    padding: "0.5rem",
    color: "inherit",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "inline-block",
  };

  if (onClick) {
    return (
      <Button onClick={onClick} sx={commonStyles} variant="unstyled">
        {children}
      </Button>
    );
  }

  return (
    <NextLink href={href as any || '#'} passHref legacyBehavior>
      <ChakraLink as="a" sx={commonStyles}>
        {children}
      </ChakraLink>
    </NextLink>
  );
}

export default function NavBar() {
  const { logout, authenticated } = usePrivy();
  const router = useRouter();

  const handleExit = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <Bar styles={{ width: "100%" }}>
      <NavItem href="/">NFTarot</NavItem>
      <Flex>
        <NavItem href="/profile">profile</NavItem>
        <NavItem href="/about">about</NavItem>
        {authenticated && (
          <NavItem onClick={handleExit}>exit</NavItem>
        )}
      </Flex>
    </Bar>
  );
}