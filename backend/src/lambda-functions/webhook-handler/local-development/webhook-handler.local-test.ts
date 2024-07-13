import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as lambdaLocal from 'lambda-local';

var jsonPayload = {
  version: '2.0',
  routeKey: '$default',
  rawPath: '/',
  rawQueryString: '',
  headers: {
    'content-length': '899',
    'x-amzn-tls-version': 'TLSv1.3',
    'x-forwarded-proto': 'https',
    'x-alchemy-signature': '5f99679ca9c227f8e0563e348f4dd83c4eaea1b213137b9452c8637abfbfb284',
    'x-forwarded-port': '443',
    'x-forwarded-for': '54.236.136.17',
    'x-amzn-tls-cipher-suite': 'TLS_AES_128_GCM_SHA256',
    'x-amzn-trace-id': 'Root=1-66928e77-6e65962947f8791e22df201f',
    'x-api-key': '2e8bb01291be0612f22b34c3b70491231442c98b1ef582ec5eb8c6202d3d3152',
    'traceparent': '00-125a142cf765d90f0b8738c4c1b3c988-944fbe77e210e775-01',
    'host': 'blceqxw2gnlkgodj2ygo5hh2iu0wkoun.lambda-url.eu-west-1.on.aws',
    'content-type': 'application/json; charset=utf-8',
    'accept-encoding': 'gzip,deflate',
    'user-agent': 'Apache-HttpClient/4.5.13 (Java/17.0.11)',
  },
  requestContext: {
    accountId: 'anonymous',
    apiId: 'blceqxw2gnlkgodj2ygo5hh2iu0wkoun',
    domainName: 'blceqxw2gnlkgodj2ygo5hh2iu0wkoun.lambda-url.eu-west-1.on.aws',
    domainPrefix: 'blceqxw2gnlkgodj2ygo5hh2iu0wkoun',
    http: {
      method: 'POST',
      path: '/',
      protocol: 'HTTP/1.1',
      sourceIp: '54.236.136.17',
      userAgent: 'Apache-HttpClient/4.5.13 (Java/17.0.11)',
    },
    requestId: '5b251279-e44c-4062-ae95-62633d3e251d',
    routeKey: '$default',
    stage: '$default',
    time: '13/Jul/2024:14:25:59 +0000',
    timeEpoch: 1720880759513,
  },
  body: '{"webhookId":"wh_ero2z8zkj0dj1d1y","id":"whevt_5z25kj4s4pupg0tt","createdAt":"2024-07-13T14:25:59.159Z","type":"ADDRESS_ACTIVITY","event":{"network":"ARB_MAINNET","activity":[{"fromAddress":"0x0f80066dfda9be1df40c7fd6ba2e04f7c548251f","toAddress":"0x47a365091a39b0597c054c5ee99e491b6b5aedd7","blockNum":"0xdd0fb0a","hash":"0x33185e3a846ce7b77032ee0081ee272b72585a69d7a486b8cd19a28ea2adb692","value":1.0E-7,"typeTraceAddress":"CALL_1_0_1","asset":"ETH","category":"internal","rawContract":{"rawValue":"0x174876e800","decimals":18}},{"fromAddress":"0x47a365091a39b0597c054c5ee99e491b6b5aedd7","toAddress":"0x41675c099f32341bf84bfc5382af534df5c7461a","blockNum":"0xdd0fb0a","hash":"0x33185e3a846ce7b77032ee0081ee272b72585a69d7a486b8cd19a28ea2adb692","value":1.0E-7,"typeTraceAddress":"DELEGATECALL_1_0_1_0","asset":"ETH","category":"internal","rawContract":{"rawValue":"0x174876e800","decimals":18}}]}}',
  isBase64Encoded: false,
};

void lambdaLocal.execute({
  event: jsonPayload,
  lambdaPath: path.join(__dirname, '../webhook-handler.lambda.ts'),
  profilePath: '~/.aws/credentials',
  profileName: 'fluidkey',
  region: 'eu-west-1',
  timeoutMs: 5000,
  callback: function (err: any, data: any) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  },
  environment: {
    ENVIRONMENT: 'dev',
  },
});
