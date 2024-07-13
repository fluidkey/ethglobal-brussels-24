import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as lambdaLocal from 'lambda-local';

var jsonPayload = {
  version: '2.0',
  routeKey: '$default',
  rawPath: '/%0A',
  rawQueryString: '',
  headers: {
    'content-length': '30',
    'x-amzn-tls-version': 'TLSv1.3',
    'x-forwarded-proto': 'https',
    'postman-token': '892187c5-6a96-4061-a8b9-270840fa9ba6',
    'x-forwarded-port': '443',
    'x-forwarded-for': '109.236.62.14',
    'accept': '*/*',
    'x-amzn-tls-cipher-suite': 'TLS_AES_128_GCM_SHA256',
    'x-amzn-trace-id': 'Root=1-66926cca-24253042248489254eda335b',
    'host': '3ebks672jrgcw36vt4hvnyurvm0oyfuv.lambda-url.eu-west-1.on.aws',
    'content-type': 'application/json',
    'cache-control': 'no-cache',
    'accept-encoding': 'gzip, deflate, br',
    'user-agent': 'PostmanRuntime/7.39.0',
  },
  requestContext: {
    accountId: 'anonymous',
    apiId: '3ebks672jrgcw36vt4hvnyurvm0oyfuv',
    domainName: '3ebks672jrgcw36vt4hvnyurvm0oyfuv.lambda-url.eu-west-1.on.aws',
    domainPrefix: '3ebks672jrgcw36vt4hvnyurvm0oyfuv',
    http: {
      method: 'POST',
      path: '/\n',
      protocol: 'HTTP/1.1',
      sourceIp: '109.236.62.14',
      userAgent: 'PostmanRuntime/7.39.0',
    },
    requestId: '14f3f8d4-6c05-42bc-bc6b-8a2588af9452',
    routeKey: '$default',
    stage: '$default',
    time: '13/Jul/2024:12:02:18 +0000',
    timeEpoch: 1720872138345,
  },
  body: JSON.stringify({
    userAddress: '0x12e59c59d282d2c00f3166915bed6dc2f5e2b5c7',
    offrampAddress: '0xE1934217f1adf611420576af84438e8F865078dd',
  }),
  isBase64Encoded: false,
};

void lambdaLocal.execute({
  event: jsonPayload,
  lambdaPath: path.join(__dirname, '../add-tracked-safe.lambda.ts'),
  profilePath: '~/.aws/credentials',
  profileName: 'fluidkey',
  region: 'eu-west-1',
  timeoutMs: 90000,
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
