import assert from 'assert';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';

const alchemyApiToken = process.env.ALCHEMY_API_TOKEN as string;
assert(!!alchemyApiToken, 'ALCHEMY_API_TOKEN env variable is required');

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify(event));
  const body = !!event.body ? JSON.parse(event.body) : {};
  console.log(body);

  await axios.patch(
    'https://dashboard.alchemy.com/api/update-webhook-addresses',
    {
      webhook_id: 'wh_ero2z8zkj0dj1d1y',
      addresses_to_add: [body.safeAddress as string],
      // addresses_to_add: [],
      addresses_to_remove: [],
    },
    {
      headers: {
        'X-Alchemy-Token': alchemyApiToken,
      },
    },
  );
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Safe added successfully',
      added: true,
    }),
  };
};
