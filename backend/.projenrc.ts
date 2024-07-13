import { awscdk } from 'projen';
import { NodePackageManager, YarnNodeLinker } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkTypeScriptApp({
  entrypoint: 'eth-global-brussels-2024.ts',
  cdkVersion: '2.149.0',
  defaultReleaseBranch: 'main',
  github: false,
  name: 'backend',
  projenrcTs: true,
  packageManager: NodePackageManager.YARN_BERRY,
  eslint: true,
  gitignore: [
    '.env.test',
  ],
  yarnBerryOptions: {
    version: '4.3.1',
    yarnRcOptions: {
      nodeLinker: YarnNodeLinker.NODE_MODULES,
      supportedArchitectures: {
        cpu: ['x64', 'arm64'],
        os: ['linux', 'darwin'],
        libc: ['glibc', 'musl'],
      },
    },
  },
  deps: [
    'dotenv',
    'axios',
    'aws-lambda@1.0.7',
    'permissionless',
    'viem',
    '@rhinestone/module-sdk',
    'tslib',
    '@safe-global/safe-deployments',
    '@safe-global/protocol-kit',
  ],
  devDeps: [
    'lambda-local',
    '@types/aws-lambda@8.10.134',
  ],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

// add Task to execute locally the safeDeployedListener Lambda
project.addTask('test:addTrackedSafe', {
  exec: 'npx ts-node src/lambda-functions/add-tracked-safe/local-development/add-tracked-safe.local-test.ts',
  env: {
    ENVIRONMENT: 'dev',
  },
});

// add Task to execute locally the safeDeployedListener Lambda
project.addTask('test:webhookHandler', {
  exec: 'npx ts-node src/lambda-functions/webhook-handler/local-development/webhook-handler.local-test.ts',
  env: {
    ENVIRONMENT: 'dev',
  },
});


project.synth();
