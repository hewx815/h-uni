/**
 * 启用最严格模式
 * 根据项目实际情况，逐步添加 rules 放宽规则
*/
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.strict,
  ],
});

export const rules = {
  "no-extra-semi": ["error"],
  "no-console": ["error", { allow: ["warn", "error"] }],
  "func-style": ["error", "declaration", { allowArrowFunctions: true }],
};
