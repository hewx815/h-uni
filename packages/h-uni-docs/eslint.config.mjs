import baseConfig from '../../eslint.config.base.js';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config({
  files: ['./**/*.ts'],
  extends: baseConfig,
});
