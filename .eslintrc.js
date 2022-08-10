module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'eslint-plugin', 'jest'],
  parser: '@typescript-eslint/parser',
  rules: {
    // TODO: Will be Removed
    'import/no-cycle': 0,
    'mouse-events-have-key-events': 0,
    // Nestjs Error
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-duplicates': 0,
    'import/no-self-import': 0,
    'import/order': 0,
    'import/no-useless-path-segments': 0,
  },
  settings: {
    'prettier/prettier': 'error',
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
