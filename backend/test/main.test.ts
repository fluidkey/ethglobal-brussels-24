import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { EthGlobalBrussels2024 } from '../src/eth-global-brussels-2024';

test('Snapshot', () => {
  const app = new App();
  const stack = new EthGlobalBrussels2024(app, 'test', {
    alchemyApiToken: 'alchemyApiKey',
  });

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
