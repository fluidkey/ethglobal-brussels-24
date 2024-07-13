"use client";
import { getSmartAccountClient, SafeSmartAccountClient } from "@/logic/permissionless";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import axios from "axios";
import { useReadAaveUiPoolDataProvider, useReadAaveUiPoolDataProviderGetUserReservesData } from "@/generated";

export default function Home() {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [smartAccountClient, setSmartAccountClient] = useState<SafeSmartAccountClient | undefined>();
  const { data: readAaveBalances } = useReadAaveUiPoolDataProviderGetUserReservesData({
    args: ["0x794a61358D6845594F94dc1DB02A252b5b4814aD",
      "0x2748BDB378aaE458f322D17e0a0851c921D466E3"]
  });

  const fetchSmartAccountClient = async () => {
    if (walletClient) {
      const smartAccountClient = await getSmartAccountClient(walletClient);
      setSmartAccountClient(smartAccountClient);
    }
  }
  useEffect(() => {
    fetchSmartAccountClient();
  }, [walletClient]);

  useEffect(() => {
    console.log(readAaveBalances);
  }, [readAaveBalances, address]);

  useEffect(() => {
    if (smartAccountClient) {
      axios.post("https://3ebks672jrgcw36vt4hvnyurvm0oyfuv.lambda-url.eu-west-1.on.aws/", {
        body: {
          "safeAddress": smartAccountClient.account.address,
        }
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [smartAccountClient]);
    
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton />
      <p>ETH deposited:</p>
      <p>USDC borrowed:</p>
    </main>
  );
}
