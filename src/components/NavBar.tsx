import { Flex, Link as ChakraLink, Button, Box, Spinner } from "@chakra-ui/react";
import { useMultiStyleConfig, createStylesContext } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const [StylesProvider, useStyles] = createStylesContext("Bar");

function Bar(props: any) {
  const { children, ...rest } = props;
  const styles = useMultiStyleConfig("NavBar");

  return (
    <Flex
      __css={styles.navbar}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      px={[2, 4, 6]}
      py={[2, 3]}
      flexWrap="wrap"
      {...rest}
    >
      <StylesProvider value={styles}>{children}</StylesProvider>
    </Flex>
  );
}

function NavItem({
  href,
  onClick,
  children,
  isLogo = false
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  isLogo?: boolean;
}) {
  const styles = useStyles();
  const currentPath = usePathname();
  const isActive = href && currentPath === href;

  const commonStyles = {
    ...styles.link,
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isLogo ? "bold" : "normal",
    fontSize: isLogo ? ["md", "lg", "xl"] : ["sm", "md", "lg"],
    padding: ["0.5rem", "0.75rem"],
    color: "inherit",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    whiteSpace: "nowrap",
  };

  const Content = () => (
    <Box as="span" display="inline-flex" alignItems="center" height="100%">
      {children}
    </Box>
  );

  if (onClick) {
    return (
      <Button onClick={onClick} sx={commonStyles} variant="unstyled">
        <Content />
      </Button>
    );
  }

  return (
    <NextLink href={(href as any) || "#"} passHref legacyBehavior>
      <ChakraLink as="a" sx={commonStyles}>
        <Content />
      </ChakraLink>
    </NextLink>
  );
}

export default function NavBar() {
  const { logout, authenticated, ready } = usePrivy();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ready) {
      setIsLoading(false);
    }
  }, [ready]);

  const handleExit = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <Bar>
      <Flex alignItems="center" height="100%">
        <NavItem href="/" isLogo>
          NFTarot
        </NavItem>
      </Flex>
      <Flex flexWrap="wrap" justifyContent={["center", "flex-end"]} alignItems="center" height="100%">
        <NavItem href="/profile">profile</NavItem>
        <NavItem href="/about">about</NavItem>
        {isLoading ? (
          <Box padding="0.5rem">
            <Spinner size="sm" />
          </Box>
        ) : (
          authenticated && <NavItem onClick={handleExit}>exit</NavItem>
        )}
      </Flex>
    </Bar>
  );
}