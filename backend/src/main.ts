import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class EthGlobalBrussels2024 extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new EthGlobalBrussels2024(app, 'eth-global-brussels-2024', { env: devEnv });
// new MyStack(app, 'backend-prod', { env: prodEnv });

app.synth();
