module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
    'prettier'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    "no-new": 1,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "jsx-a11y/label-has-associated-control": "off",
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        node: true,
        browser: true,
        jest: true,
      },
    },
  ],
};
