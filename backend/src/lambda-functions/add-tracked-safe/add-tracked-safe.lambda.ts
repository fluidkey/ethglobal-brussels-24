import assert from 'assert';
import { SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AbiItem, createPublicClient, createWalletClient, encodeAbiParameters, encodeFunctionData, fallback, http, toHex, encodePacked, toBytes } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrum } from 'viem/chains';
import { addAddressUnderTracking } from '../utils/alchemy/alchemy-utils';

const alchemyApiToken = process.env.ALCHEMY_API_TOKEN as string;
const relayerPrivateKey = process.env.RELAYER_PRIVATE_KEY as string;
assert(!!alchemyApiToken, 'ALCHEMY_API_TOKEN env variable is required');
assert(!!relayerPrivateKey, 'RELAYER_PRIVATE_KEY env variable is required');

export interface CallMultisendInput {
  operation?: number;
  to: `0x${string}`;
  value: bigint;
  data: `0x${string}`;
}

/**
 * Encode a single operation that needs to be performed by the multisend
 * @param operation
 * @param to
 * @param value
 * @param data
 */
const encodeTransaction = ({ operation = 0, to, value, data }: CallMultisendInput) => {
  const dataLength = BigInt(toBytes(data).length);
  const encoded = encodePacked(
    ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
    [operation, to, value, dataLength, data],
  ).slice(2);
  return encoded;
};

/**
 * Transform a list of transactions into a hex value, that's the input parameter for the Safe Multisend
 * @param callMultisendInputs
 */
export const encodeMultisend = (callMultisendInputs: CallMultisendInput[]): string => {
  const encoded = '0x' + callMultisendInputs.map(tx => encodeTransaction(tx)).join('');
  return encoded;
};

/**
 * Function that receives in input the list of outgoing transactions and prepares the data to be sent to the multicall.
 * The response is a 0x txData string field, ready to be passed as calldata in the relayer call, along with the
 * address of the multicall contract
 * @param params
 */
export const prepareTxDataForMulticall = (params: {
  txs: string[];
  safeAddress: string;
}): {
  txData: `0x${string}`;
  multicallAddress: `0x${string}`;
} => {
  const encodedTxs = encodeMultisend(params.txs.map(t => {
    return {
      operation: 0,
      to: params.safeAddress as `0x${string}`,
      value: BigInt(0),
      data: t as `0x${string}`,
    };
  }));
  const txData = encodeFunctionData({
    abi: [{ inputs: [{ internalType: 'bytes', name: 'transactions', type: 'bytes' }], name: 'multiSend', outputs: [], stateMutability: 'payable', type: 'function' }] as AbiItem[],
    functionName: 'multiSend',
    args: [
      encodedTxs,
    ],
  });
  return {
    txData: txData,
    multicallAddress: '0x9641d764fc13c8B624c04430C7356C1C7C8102e2' as `0x${string}`,
  };
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify(event));
  const body = !!event.body ? JSON.parse(event.body) : {};
  console.log(body);
  assert(!!body.userAddress, 'userAddress is required');
  assert(!!body.offrampAddress, 'offrampAddress is required');
  const { userAddress, offrampAddress } = body;
  const relayerAccount = privateKeyToAccount(relayerPrivateKey as `0x${string}`);
  // let's predict and generate the new safe address
  const safeAccountConfig: SafeAccountConfig = {
    owners: [relayerAccount.address],
    threshold: 1,
  };
  const saltNonce = Math.floor(Math.random() * Math.pow(2, 32));
  const safeFactory = await SafeFactory.init({
    safeVersion: '1.4.1',
    isL1SafeSingleton: false,
    provider: 'https://arb-mainnet.g.alchemy.com/v2/PQko-Hx_nZBkPbyYkEg8blONRN15Q3WA',
    signer: relayerPrivateKey,
  });
  const protocolKit = await safeFactory.deploySafe({
    safeAccountConfig,
    saltNonce: toHex(saltNonce),
  });
  const safeAddress = await protocolKit.getAddress();
  let nonce = 0;
  console.log('Generated safe', safeAddress);
  const moduleAddress = '0xd6bb87212B5398AEA83bCf5c33787789c0923471';
  // prepare call to enable module
  const enableModuleTx = await protocolKit.createEnableModuleTx(
    moduleAddress,
    {
      nonce: nonce,
    },
  );
  const enableModuleTxSignature = await protocolKit.signTransaction(enableModuleTx);
  const enableModuleTxData = await protocolKit.getEncodedTransaction(enableModuleTxSignature);
  nonce++;
  // await protocolKit.executeTransaction(enableModuleTx);
  const abiItem = {
    inputs: [{ name: 'data', type: 'bytes' }],
    name: 'onInstall',
    outputs: [],
    type: 'function',
  };

  const data = encodeFunctionData({
    abi: [abiItem],
    functionName: 'onInstall',
    args: [
      encodeAbiParameters([{ name: 'data', type: 'address' }], [offrampAddress]),
    ],
  });
  const onInstallModuleTx = await protocolKit.createTransaction({
    transactions: [
      {
        data: data,
        value: '0x0',
        to: moduleAddress,
      },
    ],
    options: {
      nonce: nonce,
    },
  });
  const onInstallModuleTxSignature = await protocolKit.signTransaction(onInstallModuleTx);
  const onInstallModuleTxData = await protocolKit.getEncodedTransaction(onInstallModuleTxSignature);
  nonce++;
  const addOwnerTx = await protocolKit.createAddOwnerTx(
    {
      ownerAddress: userAddress,
      threshold: 1,
    },
    {
      nonce: nonce,
    },
  );
  const addOwnerTxSignature = await protocolKit.signTransaction(addOwnerTx);
  const addOwnerTxData = await protocolKit.getEncodedTransaction(addOwnerTxSignature);
  const txData = prepareTxDataForMulticall({
    txs: [
      enableModuleTxData,
      onInstallModuleTxData,
      addOwnerTxData,
    ],
    safeAddress: safeAddress,
  });
  const viemWalletClient = createWalletClient({
    account: relayerAccount,
    chain: arbitrum,
    transport: fallback([
      http('https://arb-mainnet.g.alchemy.com/v2/PQko-Hx_nZBkPbyYkEg8blONRN15Q3WA'),
      http(), // finally fall back to the public one
    ]),
  });
  const publicClient = createPublicClient({
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
  const feesPerGas = await publicClient.estimateFeesPerGas();
  // estimate the gas so that we can then set a 20% more
  const gas = await publicClient.estimateGas({
    account: relayerAccount,
    to: txData.multicallAddress,
    value: BigInt(0),
    data: txData.txData as `0x${string}`,
    type: 'eip1559',
    maxPriorityFeePerGas: feesPerGas.maxPriorityFeePerGas, // we don't want to adjust the priority fee
  });
  assert(!!feesPerGas.maxFeePerGas, 'maxFeePerGas not set inside feesPerGas');
  // 4x the maxFeePerGas so we're sure the tx is not stuck in case of gas spikes - 2x on Mainnet
  const gasIncreaseMultiplier = BigInt(4);
  const request = await viemWalletClient.prepareTransactionRequest({
    account: relayerAccount,
    to: txData.multicallAddress,
    value: BigInt(0),
    data: txData.txData as `0x${string}`,
    type: 'eip1559',
    maxFeePerGas: feesPerGas.maxFeePerGas * gasIncreaseMultiplier,
    maxPriorityFeePerGas: feesPerGas.maxPriorityFeePerGas, // we don't want to adjust the priority fee
    gas: gas * BigInt(12) / BigInt(10), // 20% more gas than estimated
  });
  const signature = await viemWalletClient.signTransaction(request);
  const hash = await viemWalletClient.sendRawTransaction({ serializedTransaction: signature });
  console.log(hash);
  await addAddressUnderTracking(alchemyApiToken, safeAddress);
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Safe created successfully',
      safeAddress: safeAddress,
    }),
  };
};
