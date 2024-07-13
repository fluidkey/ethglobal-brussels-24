import { getSmartAccountClient } from './utils/permissionless';

export const handler = async (): Promise<void> => {
  const smartAccountClient = await getSmartAccountClient();
  console.log(smartAccountClient.account.address);
};
