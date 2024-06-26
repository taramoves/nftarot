import Navbar from "@/components/NavBar";
import Page from "@/components/Page";
import { useRouter } from "next/router";
import { Flex, Button } from "@chakra-ui/react";
import TextContainer from "@/components/TextContainer";
import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const { user, authenticated, ready } = usePrivy();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (ready && authenticated && user?.wallet?.address) {
      setWalletAddress(user.wallet.address);
    }
  }, [ready, authenticated, user]);

  if (!ready || !authenticated) {
    return <div>Loading...</div>; // Or redirect to login page
  }

  return (
    <Page variant={"main"}>
      <Navbar />
      <Flex
        style={{
          margin: "3rem auto 0",
          fontSize: "2rem",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: 'flex-start',
        }}
      >
        <TextContainer variant={"title"} size="xxl">Profile</TextContainer>
        {walletAddress && (
          <TextContainer variant={"description"}>
            Wallet Address: {walletAddress}
          </TextContainer>
        )}
        <TextContainer variant={"title"} size="xxl">Past Readings</TextContainer>
        <TextContainer variant={"description"}>You have not yet pulled a tarot card.</TextContainer>
        <Button variant={"primaryButton"} onClick={() => router.push("/card-select")} size="lg">Begin your first reading</Button>
      </Flex>
    </Page>
  );
}