import assert from 'assert';
import axios from 'axios';

/**
 * Adds an address to the list of addresses being tracked by a specific Alchemy webhook.
 * This function sends a PATCH request to the Alchemy dashboard API to add a new address
 * to the list of addresses associated with a given webhook ID. It requires an Alchemy API token
 * for authentication and the address to add. The address is converted to lowercase before being sent.
 * Both the Alchemy API token and the address are required and their absence will throw an AssertionError.
 * @param {string} alchemyApiToken - The API token for authenticating with the Alchemy API.
 * @param {string} address - The address to be added to the tracking list.
 * @returns {Promise<void>} A promise that resolves when the address has been successfully added.
 * @throws {AssertionError} If `alchemyApiToken` or `address` is falsy, indicating they are required but not provided.
 */
export const addAddressUnderTracking = async (
  alchemyApiToken: string, address: string,
): Promise<void> => {
  assert(!!alchemyApiToken, 'alchemyApiToken is required');
  assert(!!address, 'address is required');
  await axios.patch(
    'https://dashboard.alchemy.com/api/update-webhook-addresses',
    {
      webhook_id: 'wh_ero2z8zkj0dj1d1y',
      addresses_to_add: [address.toLowerCase()],
      addresses_to_remove: [],
    },
    {
      headers: {
        'X-Alchemy-Token': alchemyApiToken,
      },
    },
  );
};

/**
 * Retrieves a list of addresses currently being tracked by a specific Alchemy webhook.
 * This function makes a GET request to the Alchemy dashboard API to fetch the addresses
 * associated with a given webhook ID. It requires an Alchemy API token for authentication.
 * The addresses returned are converted to lowercase before being returned.
 * @param {string} alchemyApiToken - The API token for authenticating with the Alchemy API.
 * @returns {Promise<string[]>} A promise that resolves to an array of addresses (in lowercase) currently under tracking.
 * @throws {AssertionError} If `alchemyApiToken` is falsy, indicating it is required but not provided.
 */
export const getAddressesUnderTracking = async (alchemyApiToken: string): Promise<string[]> => {
  assert(!!alchemyApiToken, 'alchemyApiToken is required');
  const response = await axios.get(
    'https://dashboard.alchemy.com/api/webhook-addresses',
    {
      params: {
        webhook_id: 'wh_ero2z8zkj0dj1d1y',
      },
      headers: {
        'X-Alchemy-Token': alchemyApiToken,
      },
    },
  );
  return !!response.data.data ?
    response.data.data.map((address: string) => {
      return address.toLowerCase();
    }) :
    [];
};
