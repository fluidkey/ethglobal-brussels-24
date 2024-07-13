import assert from 'assert';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { getAddressesUnderTracking } from '../utils/alchemy/alchemy-utils';

const alchemyApiToken = process.env.ALCHEMY_API_TOKEN as string;
assert(!!alchemyApiToken, 'ALCHEMY_API_TOKEN env variable is required');


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
  for ( const activity of alchemyNetwork.activity ) {
    if ( activity.value === 0 ) continue;
    if ( activity.asset === 'ETH' ) {

    } else if ( activity.asset === 'USDC' ) {
      addressesMovedUSDC.push(activity.fromAddress);
      addressesMovedUSDC.push(activity.toAddress);
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Webhook handled successfully',
    }),
  };
};
