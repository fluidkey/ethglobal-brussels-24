"use client";
import { getSmartAccountClient, SafeSmartAccountClient } from "@/logic/permissionless";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { use, useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import axios from "axios";
import { useReadAaveUiPoolDataProviderGetReservesData, useReadAaveUiPoolDataProviderGetUserReservesData } from "@/generated";
import { formatUnits } from "viem";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [smartAccountClient, setSmartAccountClient] = useState<SafeSmartAccountClient | undefined>();
  const { data: userReservesData } = useReadAaveUiPoolDataProviderGetUserReservesData({
    args: ["0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
      "0x2748BDB378aaE458f322D17e0a0851c921D466E3"]
  });
  const { data: reservesData } = useReadAaveUiPoolDataProviderGetReservesData({
    args: ["0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"]
  });
  const [ethCollateral, setEthCollateral] = useState<string>();
  const [usdcBorrowed, setUsdcBorrowed] = useState<string>();
  const [depositAddress, setDepositAddress] = useState<string>();

  const fetchSmartAccountClient = async () => {
    if (walletClient) {
      const smartAccountClient = await getSmartAccountClient(walletClient);
      setSmartAccountClient(smartAccountClient);
    }
  }

  useEffect(() => {
    const safeAddress = localStorage.getItem("safeAddress");
    if (safeAddress) {
      setDepositAddress(safeAddress);
    }
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });

  useEffect(() => {
    if (userReservesData && reservesData) {
      const unformattedEthCollateral = userReservesData[0].find(balance => balance.underlyingAsset === "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1")?.scaledATokenBalance ?? BigInt(0);
      const ethLiquidityIndex = reservesData[0].find(reserve => reserve.underlyingAsset === "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1")?.liquidityIndex ?? BigInt(0);
      const finalEthCollateral = unformattedEthCollateral * ethLiquidityIndex;
      const formattedEthCollateral = formatUnits(finalEthCollateral, 45);
      const finalFormattedEthCollateral = formatter.format(Number(formattedEthCollateral));
      setEthCollateral(finalFormattedEthCollateral);
      const unformattedUsdcBorrowed = userReservesData[0].find(balance => balance.underlyingAsset === "0xaf88d065e77c8cC2239327C5EDb3A432268e5831")?.scaledVariableDebt ?? BigInt(0);
      const usdcLiquidityIndex = reservesData[0].find(reserve => reserve.underlyingAsset === "0xaf88d065e77c8cC2239327C5EDb3A432268e5831")?.liquidityIndex ?? BigInt(0);
      const finalUsdcBorrowed = unformattedUsdcBorrowed * usdcLiquidityIndex;
      const formattedUsdcBorrowed = formatUnits(finalUsdcBorrowed ?? BigInt(0), 33);
      const finalFormattedUsdcBorrowed = formatter.format(Number(formattedUsdcBorrowed));
      setUsdcBorrowed(finalFormattedUsdcBorrowed);
    }
  }, [userReservesData, reservesData]);

  useEffect(() => {
    if (smartAccountClient) {
      axios.post("https://3ebks672jrgcw36vt4hvnyurvm0oyfuv.lambda-url.eu-west-1.on.aws/", {
        "safeAddress": smartAccountClient.account.address,
      }).then((response) => {
        localStorage.setItem("safeAddress", smartAccountClient.account.address);
        setDepositAddress(smartAccountClient.account.address);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [smartAccountClient]);
    
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-4 sm:px-16">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">fluid.loan</h1>
        <ConnectButton />
      </div>
      <div className="flex justify-center flex-wrap w-full mt-24 gap-64">
        <h2 className="text-4xl font-bold">Hold ETH</h2>
        <h2 className="text-4xl font-bold">Pay with USDC</h2>
      </div>
      {depositAddress && address ? <p>Deposit address: {depositAddress}</p> :
      <Button onClick={fetchSmartAccountClient}>Create deposit address</Button>}
      
      <p>ETH {ethCollateral} deposited</p>
      <p>USDC {usdcBorrowed} borrowed</p>
    </main>
  );
}
