import { createSmartAccountClient, ENTRYPOINT_ADDRESS_V07, SmartAccountClient } from 'permissionless';
import { SafeSmartAccount, signerToSafeSmartAccount } from 'permissionless/accounts';
import { erc7579Actions, Erc7579Actions } from 'permissionless/actions/erc7579';
import { createPimlicoBundlerClient, createPimlicoPaymasterClient } from 'permissionless/clients/pimlico';
import { EntryPoint } from 'permissionless/types';
import { Chain, createPublicClient, Hex, http, Transport } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { arbitrum } from 'viem/chains';

export type SafeSmartAccountClient = SmartAccountClient<
EntryPoint,
Transport,
Chain,
SafeSmartAccount<EntryPoint>
> &
Erc7579Actions<EntryPoint, SafeSmartAccount<EntryPoint>>

const pimlicoUrl = `https://api.pimlico.io/v2/42161/rpc?apikey=${process.env.PIMLICO_API_KEY}`;
const safe4337ModuleAddress = '0x3Fdb5BC686e861480ef99A6E3FaAe03c0b9F32e2';
const erc7569LaunchpadAddress = '0xEBe001b3D534B9B6E2500FB78E67a1A137f561CE';

const privateKey =
  (process.env.NEXT_PUBLIC_PRIVATE_KEY as Hex) ??
  (() => {
    const pk = generatePrivateKey();
    console.log('Private key to add to .env.local:', `PRIVATE_KEY=${pk}`);
    return pk;
  })();

const signer = privateKeyToAccount(privateKey);

const publicClient = createPublicClient({
  transport: http('https://arb-mainnet.g.alchemy.com/v2/PQko-Hx_nZBkPbyYkEg8blONRN15Q3WA'),
});

const paymasterClient = createPimlicoPaymasterClient({
  transport: http(pimlicoUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V07,
});

const bundlerClient = createPimlicoBundlerClient({
  transport: http(pimlicoUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V07,
});

export const getSmartAccountClient = async () => {
  const account = await signerToSafeSmartAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    // signer: '0x56aEd5EB340D661993d1aa4907f5E7A293eA1082' as unknown as SmartAccountSigner,
    signer: signer,
    safeVersion: '1.4.1',
    saltNonce: BigInt(120),
    safe4337ModuleAddress,
    erc7569LaunchpadAddress,
  });

  const smartAccountClient = createSmartAccountClient({
    chain: arbitrum,
    account,
    bundlerTransport: http(pimlicoUrl),
    middleware: {
      gasPrice: async () =>
        (await bundlerClient.getUserOperationGasPrice()).fast,
      sponsorUserOperation: paymasterClient.sponsorUserOperation,
    },
  }).extend(erc7579Actions({ entryPoint: ENTRYPOINT_ADDRESS_V07 }));

  return smartAccountClient as SafeSmartAccountClient;
};
