/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended", "@vue/eslint-config-typescript", "@vue/eslint-config-prettier/skip-formatting", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-prototype-builtins': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'arrow-parens': ['error', 'always'],
    'no-irregular-whitespace': 'off',
    'prettier/prettier': ['error', {
      endOfLine: 'auto'
    }]
  },
  overrides: [{
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    env: {
      jest: true
    }
  }]
};