import { AbiItem, createPublicClient, createWalletClient, fallback, http, PrivateKeyAccount } from 'viem';
import { arbitrum } from 'viem/chains';

export const SAFE_MODULE_ABI = [{ inputs: [{ internalType: 'address', name: 'smartAccount', type: 'address' }], name: 'AlreadyInitialized', type: 'error' }, { inputs: [{ internalType: 'address', name: 'smartAccount', type: 'address' }], name: 'NotInitialized', type: 'error' }, { inputs: [], name: 'AAVE_ORACLE', outputs: [{ internalType: 'contract AaveOracle', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'AAVE_V3_POOL', outputs: [{ internalType: 'contract AaveV3Pool', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'USDC', outputs: [{ internalType: 'contract ERC20', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'WETH_GATEWAY', outputs: [{ internalType: 'contract WETHGateway', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'safe', type: 'address' }], name: 'borrow', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'smartAccount', type: 'address' }], name: 'isInitialized', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'typeID', type: 'uint256' }], name: 'isModuleType', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'pure', type: 'function' }, { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'pure', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'offRampAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }], name: 'onInstall', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }], name: 'onUninstall', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'safe', type: 'address' }], name: 'repay', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'version', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'pure', type: 'function' }] as AbiItem[];
export const SAFE_MODULE_ADDRESS = '0xF24227020A26e2a28D2ac829a5358F02af3FA7c7';
export const createViemPublicClient = () => {
  return createPublicClient({
    chain: {
      id: 42161,
      rpcUrls: {
        default: { http: ['https://arb-mainnet.g.alchemy.com/v2/PQko-Hx_nZBkPbyYkEg8blONRN15Q3WA'] },
      },
      name: 'arb',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
    },
    transport: fallback([
      http('https://arb-mainnet.g.alchemy.com/v2/PQko-Hx_nZBkPbyYkEg8blONRN15Q3WA'),
      http(), // finally fall back to the public one
    ]),
  });
};
export const createViemWalletClient = (account: PrivateKeyAccount) => {
  return createWalletClient({
    account: account,
    chain: arbitrum,
    transport: fallback([
      http('https://arb-mainnet.g.alchemy.com/v2/PQko-Hx_nZBkPbyYkEg8blONRN15Q3WA'),
      http(), // finally fall back to the public one
    ]),
  });
};
