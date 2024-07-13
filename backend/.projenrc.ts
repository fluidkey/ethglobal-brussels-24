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
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
