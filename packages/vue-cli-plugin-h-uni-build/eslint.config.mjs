import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    rules: {
      "semi": "off",
    },
  },
);
