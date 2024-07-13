import assert from 'assert';
import * as cdk from 'aws-cdk-lib';
import { App, aws_lambda, aws_logs, Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EthGlobalBrussels2024Props } from './eth-global-brussels-2024-types';
import { AddTrackedSafeFunction } from './lambda-functions/add-tracked-safe/add-tracked-safe-function';
import { WebhookHandlerFunction } from './lambda-functions/webhook-handler/webhook-handler-function';
import 'dotenv/config';

export class EthGlobalBrussels2024 extends Stack {
  constructor(scope: Construct, id: string, props: EthGlobalBrussels2024Props) {
    super(scope, id, props);
    assert(!!props.alchemyApiToken, 'alchemyApiKey props is missing');
    const addTrackedSafeLambda = new AddTrackedSafeFunction(
      this,
      'AddTrackedSafeFunction',
      {
        functionName: 'eth-global-brussels-2024-add-tracked-safe',
        environment: {
          ALCHEMY_API_TOKEN: props.alchemyApiToken,
        },
        architecture: aws_lambda.Architecture.ARM_64,
        memorySize: 256,
        timeout: Duration.seconds(90),
        logRetention: aws_logs.RetentionDays.ONE_WEEK,
      },
    );
    const addTrackedSafeLambdaFunctionUrl = addTrackedSafeLambda.addFunctionUrl({
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: [aws_lambda.HttpMethod.ALL],
      },
      authType: aws_lambda.FunctionUrlAuthType.NONE,
      invokeMode: aws_lambda.InvokeMode.RESPONSE_STREAM,
    });
    const webhookHandlerLambda = new WebhookHandlerFunction(
      this,
      'WebhookHandlerFunction',
      {
        functionName: 'eth-global-brussels-2024-webhook-handler',
        environment: {
          ALCHEMY_API_KEY: 'alchemy-api-key',
        },
        architecture: aws_lambda.Architecture.ARM_64,
        memorySize: 256,
        timeout: Duration.seconds(90),
        logRetention: aws_logs.RetentionDays.ONE_WEEK,
      },
    );
    const webhookHandlerLambdaFunctionUrl = webhookHandlerLambda.addFunctionUrl({
      cors: {
        allowedOrigins: ['*'],
      },
      authType: aws_lambda.FunctionUrlAuthType.NONE,
      invokeMode: aws_lambda.InvokeMode.RESPONSE_STREAM,
    });
    new cdk.CfnOutput(
      this,
      'AddTrackedSafeLambdaFunctionUrl',
      {
        value: addTrackedSafeLambdaFunctionUrl.url as string,
        description: 'The endpoint to add a tracked safe',
        exportName: 'addTrackedSafeLambdaFunctionUrl',
      },
    );
    new cdk.CfnOutput(
      this,
      'WebhookHandleLambdaFunctionUrl',
      {
        value: webhookHandlerLambdaFunctionUrl.url as string,
        description: 'The endpoint to be called as handler from Alchemy Webhook',
        exportName: 'webhookHandlerLambdaFunctionUrl',
      },
    );
  };
}

// for development, use account/region from cdk cli
const devEnv = {
  account: '396049417643',
  region: 'eu-west-1',
};

const app = new App();

new EthGlobalBrussels2024(app, 'eth-global-brussels-2024', {
  env: devEnv,
  alchemyApiToken: process.env.ALCHEMY_API_TOKEN as string,
});

app.synth();
