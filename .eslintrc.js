'use strict';

const eslintRules = [
  './eslint/best-practices',
  './eslint/errors',
  './eslint/es6',
  './eslint/imports',
  './eslint/node',
  './eslint/strict',
  './eslint/style',
  './eslint/variables',
].map(require.resolve);

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'prettier',
    ...eslintRules,
  ],
  env: {
    browser: true,
  },
  rules: {},
};
