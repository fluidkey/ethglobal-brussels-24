"use client";
import { getSmartAccountClient } from "@/logic/permissionless";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useWalletClient } from "wagmi";

export default function Home() {
  const { data } = useWalletClient();

  useEffect(() => {
    if (data) {
      getSmartAccountClient(data);
    }
  }, [data]);
    
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton />
    </main>
  );
}
