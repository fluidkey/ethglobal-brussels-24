"use client";
import { config } from "@/config/rainbowWagmiConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, cookieToInitialState } from "wagmi";

const queryClient = new QueryClient();

export function RainbowWagmiProvider({
  children,
  cookie,
}: {
  children: React.ReactNode;
  cookie?: string;
}) {
  const initialState = cookieToInitialState(config, cookie);
  return (
    <WagmiProvider config={config} {...(initialState ? { initialState } : {})}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}