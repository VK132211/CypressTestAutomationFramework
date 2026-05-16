import tseslint from 'typescript-eslint';
import pluginCypress from 'eslint-plugin-cypress';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // ...tseslint.configs.recommended,
  pluginCypress.configs.recommended,
  prettierPlugin, // Integrates Prettier as an ESLint rule
  {
    rules: {
      "cypress/no-unnecessary-waiting": "error", // Example strict Cypress rule
      "prettier/prettier": "error"                // Treat formatting issues as errors
    }
  }
);
