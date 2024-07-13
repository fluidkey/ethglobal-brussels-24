import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as lambdaLocal from 'lambda-local';

void lambdaLocal.execute({
  event: {},
  lambdaPath: path.join(__dirname, '../deploy-erc7579-safe.lambda.ts'),
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
