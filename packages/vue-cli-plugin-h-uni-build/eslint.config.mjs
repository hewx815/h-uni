import baseConfig from '../../eslint.config.base.js';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config({
  files: ['src/**/*.ts', "rollup.config.ts"],
  extends: baseConfig,
});
