import assert from 'assert';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { privateKeyToAccount } from 'viem/accounts';
import { getAddressesUnderTracking } from '../utils/alchemy/alchemy-utils';
import { createViemWalletClient, SAFE_MODULE_ABI, SAFE_MODULE_ADDRESS } from '../utils/viem/viem-utils';

const alchemyApiToken = process.env.ALCHEMY_API_TOKEN as string;
const relayerPrivateKey = process.env.RELAYER_PRIVATE_KEY as string;
assert(!!alchemyApiToken, 'ALCHEMY_API_TOKEN env variable is required');
assert(!!relayerPrivateKey, 'RELAYER_PRIVATE_KEY env variable is required');


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify(event));
  const body = !!event.body ? JSON.parse(event.body) : {};
  if ( body.event === undefined || body.event === null ) {
    console.error('Event is missing');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Webhook handled successfully',
      }),
    };
  }
  // get all the addresses we are tracking
  const addressesUnderTracking = await getAddressesUnderTracking(alchemyApiToken);
  console.log(addressesUnderTracking);
  // add all the addresses found in the event - only if the value is not 0
  // do it for ETH and USDC
  const alchemyNetwork: { network: string; activity: any } = body.event;
  if ( alchemyNetwork.network === undefined ||
    alchemyNetwork.network === null ||
    alchemyNetwork.network !== 'ARB_MAINNET') {
    console.warn('Network is not ARB_MAINNET');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Webhook handled successfully',
      }),
    };
  }
  const addressesMovedUSDC: string[] = [];
  const addressesMovedETH: string[] = [];
  for ( const activity of alchemyNetwork.activity ) {
    if ( activity.value === 0 ) continue;
    if ( activity.asset === 'ETH' ) {
      addressesMovedETH.push(activity.fromAddress);
      addressesMovedETH.push(activity.toAddress);
    } else if ( activity.asset === 'USDC' ) {
      addressesMovedUSDC.push(activity.fromAddress);
      addressesMovedUSDC.push(activity.toAddress);
    }
  }
  const relayerAccount = privateKeyToAccount(relayerPrivateKey as `0x${string}`);
  const viemWalletClient = createViemWalletClient(relayerAccount);
  for ( const address of Array.from(new Set(addressesMovedETH)) ) {
    if ( !addressesUnderTracking.includes(address) ) continue;
    console.log('Execute borrow module for address: ', address);
    // borrow with safeAddress as parameter
    const writeContract = await viemWalletClient.writeContract({
      functionName: 'borrow',
      abi: SAFE_MODULE_ABI,
      address: SAFE_MODULE_ADDRESS,
      args: [address],
    });
    console.log(writeContract);
  }
  for ( const address of Array.from(new Set(addressesMovedUSDC)) ) {
    if ( !addressesUnderTracking.includes(address) ) continue;
    console.log('Execute repay module for address: ', address);
    // repay with safeAddress as parameter
    /*
    const writeContract = await viemWalletClient.writeContract({
      functionName: 'repay',
      abi: SAFE_MODULE_ABI,
      address: SAFE_MODULE_ADDRESS,
      args: [address],
    });
    console.log(writeContract);
     */
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Webhook handled successfully',
    }),
  };
};
