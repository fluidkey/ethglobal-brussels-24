// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

/**
 * Props for AddTrackedSafeFunction
 */
export interface AddTrackedSafeFunctionProps extends lambda.FunctionOptions {
}

/**
 * An AWS Lambda function which executes src/lambda-functions/add-tracked-safe/add-tracked-safe.
 */
export class AddTrackedSafeFunction extends lambda.Function {
  constructor(scope: Construct, id: string, props?: AddTrackedSafeFunctionProps) {
    super(scope, id, {
      description: 'src/lambda-functions/add-tracked-safe/add-tracked-safe.lambda.ts',
      ...props,
      runtime: new lambda.Runtime('nodejs18.x', lambda.RuntimeFamily.NODEJS),
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../assets/lambda-functions/add-tracked-safe/add-tracked-safe.lambda')),
    });
    this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', { removeInEdge: true });
  }
}