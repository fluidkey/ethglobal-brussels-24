import { awscdk } from 'projen';
import { NodePackageManager, YarnNodeLinker } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkTypeScriptApp({
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
    'permissionless',
    'viem',
    '@rhinestone/module-sdk',
    'tslib',
  ],
  devDeps: [
    'lambda-local',
  ],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

// add Task to execute locally the safeDeployedListener Lambda
project.addTask('test:deployErc7579Safe', {
  exec: 'npx ts-node src/lambda-functions/deploy-erc7579-safe/local-development/deploy-erc7579-safe.local-test.ts',
  env: {
    ENVIRONMENT: 'dev',
  },
});

project.synth();
