"use client";
import { getSmartAccountClient, SafeSmartAccountClient } from "@/logic/permissionless";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import axios from "axios";
import { useReadAaveUiPoolDataProviderGetReservesData, useReadAaveUiPoolDataProviderGetUserReservesData } from "@/generated";
import { formatUnits } from "viem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

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
      <div className="flex justify-between items-center w-full sm:px-32">
        <h1 className={`text-2xl font-semibold ${raleway.className}`}>fluid.loan</h1>
        <ConnectButton />
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="flex justify-center flex-wrap w-full mt-8 sm:mt-24 gap-4">
          <Card className="sm:min-w-[40%] sm:w-[40%] min-w-[70%] relative flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-4xl text-primary">💎 Hold ETH</CardTitle>
              <CardDescription>
                Keep the ETH upside and optimize taxable events.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col justify-center items-center mt-5">
              <p className="text-2xl sm:text-4xl text-primary">{ethCollateral} ETH</p>
              <p className="text-lg text-primary mb-8">deposited</p>
            </CardContent>
          </Card>
          <Card className="sm:min-w-[40%] sm:w-[40%] min-w-[70%] relative flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-4xl text-primary">💵 Spend Dollars</CardTitle>
              <CardDescription>
                Borrow USDC against your ETH to pay for your next
                vacation, car, or any other expense.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col justify-center items-center mt-5">
              <p className="text-2xl sm:text-4xl text-primary">{usdcBorrowed} USDC</p>
              <p className="text-lg text-primary mb-8">borrowed</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-wrap justify-center w-full max-w-4xl mt-8 sm:mt-24 gap-2 items-center">
          <Input type="text" placeholder="the address to send USDC to..." className="sm:max-w-[50%]" />
          <div>
            {depositAddress && address ? <p>Deposit address: {depositAddress}</p> :
            <Button onClick={fetchSmartAccountClient} className="bg-[#4D8A8F] hover:bg-[#84B9BD]">Create deposit address →</Button>}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center w-full mt-16 mb-4 sm:mt-24 gap-4 sm:gap-12 flex-wrap">
            <p className="text-2xl">✅ Zero clicks</p>
            <p className="text-2xl">✅ Self-custodial</p>
          </div>
          <p className="max-w-2xl mt-2 text-muted-foreground">The fluid.loan module automatically borrows USDC on your behalf when ETH is deposited and automatically repays your loan when USDC is sent. The deposit address is a self-custodial Safe smart account controlled by the account connected to this page.</p>
        </div>
      </div>
    </main>
  );
}
