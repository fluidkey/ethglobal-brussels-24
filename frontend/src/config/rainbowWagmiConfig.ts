import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT as string;

export const config = getDefaultConfig({
  appName: "EthGlobal Brussels",
  chains: [arbitrum],
  ssr: true,
  projectId,
});
