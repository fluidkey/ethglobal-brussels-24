import assert from 'assert';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { addAddressUnderTracking } from '../utils/alchemy/alchemy-utils';

const alchemyApiToken = process.env.ALCHEMY_API_TOKEN as string;
assert(!!alchemyApiToken, 'ALCHEMY_API_TOKEN env variable is required');

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify(event));
  const body = !!event.body ? JSON.parse(event.body) : {};
  console.log(body);
  assert(!!body.safeAddress, 'safeAddress is required');
  await addAddressUnderTracking(alchemyApiToken, body.safeAddress);
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Safe added successfully',
      added: true,
    }),
  };
};
