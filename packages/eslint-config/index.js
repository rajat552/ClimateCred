/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-duplicate-imports': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
  },
};
