import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

const DESIRED_CHAIN_ID = 8453; // baseSepolia chain ID

const useNetworkCheck = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  useEffect(() => {
    const checkAndSwitchNetwork = async () => {
      if (!ready || !authenticated || wallets.length === 0) return;

      const wallet = wallets[0]; // Assuming we're using the first wallet
      const currentChainId = parseInt(wallet.chainId.split(':')[1]);

      if (currentChainId !== DESIRED_CHAIN_ID) {
        try {
          await wallet.switchChain(DESIRED_CHAIN_ID);
          setIsCorrectNetwork(true);
        } catch (error) {
          console.error("Failed to switch network:", error);
          setIsCorrectNetwork(false);
        }
      } else {
        setIsCorrectNetwork(true);
      }
    };

    checkAndSwitchNetwork();
  }, [ready, authenticated, wallets]);

  return { isCorrectNetwork };
};

export default useNetworkCheck;