import baseConfig from '../../eslint.config.base.js';
import { rules } from '../../eslint.config.base.js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['src/**/*.ts'],
  extends: baseConfig,
  rules,
});
