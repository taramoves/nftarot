import { useEffect, useState } from "react"
import { WalletClient, createWalletClient, custom } from "viem"
import useConnectedWallet from "./useConnectedWallet"

const usePrivyWalletClient = (chain: any) => {
  const { connectedWallet, wallet } = useConnectedWallet()
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null)

  useEffect(() => {
    const init = async () => {
      const provider = await wallet?.getEthereumProvider()

        // Add this check
      if (!provider) {
        console.log("Provider is undefined")
        return
      }
      const response = createWalletClient({
        chain,
        account: connectedWallet as `0x${string}`,
        transport: custom(provider),
      })
      setWalletClient(response)
    }

    if (!connectedWallet || !chain) return
    init()
  }, [connectedWallet, chain])

  return { walletClient }
}

export default usePrivyWalletClient