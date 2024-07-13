import { defineConfig } from '@wagmi/cli'
import { arbitrum } from 'viem/chains'
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from 'viem';

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20Abi,
    },
  ],
  plugins: [
    react(),
    etherscan({
      apiKey: "BIMA483JJPZ43MWYPK9Y95HSTICGFJP73R",
      chainId: arbitrum.id,
      contracts: [
        {
          name: "aavePool",
          address: {
            [arbitrum.id]: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
          },
        },
        {
          name: "aaveUiPoolDataProvider",
          address: {
            [arbitrum.id]: "0x145dE30c929a065582da84Cf96F88460dB9745A7",
          },
        },
      ],
    }),
  ],
})
