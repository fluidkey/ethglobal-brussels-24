import { defineConfig } from '@wagmi/cli'
import { arbitrum } from 'viem/chains'
import { etherscan, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    react(),
    etherscan({
      apiKey: "",
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
