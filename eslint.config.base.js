import eslintJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import stylisticPlugin from '@stylistic/eslint-plugin';

export default typescriptEslint.config(
  // eslint
  eslintJs.configs.recommended,

  // typescript-eslint
  ...typescriptEslint.configs.recommended,
  ...typescriptEslint.configs.stylistic,
  ...typescriptEslint.configs.strict,

  // @stylistic
  stylisticPlugin.configs.customize({
    semi: true,
    quotes: 'double'
  }),

  // custom-rules
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    }
  },
);
