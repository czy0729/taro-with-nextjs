/*
 * @Author: czy0729
 * @Date: 2019-03-13 05:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 16:35:23
 */
module.exports = {
  root: true,
  globals: {
    window: true,
    navigator: true,
    document: true,
    localStorage: true,
    fetch: true
  },
  env: {
    commonjs: true,
    es6: true
  },
  parser: 'babel-eslint',
  plugins: ['babel'],
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },

  // 0: off, 1: warn, 2: error
  rules: {
    // https://eslint.org/docs/rules/
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'func-names': 0,
    'function-paren-newline': 0,
    'global-require': 0,
    'implicit-arrow-linebreak': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'jsx-quotes': 0,
    'lines-between-class-members': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-restricted-globals': 0,
    'no-restricted-syntax': 0,
    'no-return-assign': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'no-use-before-define': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'prefer-destructuring': 0,
    'prefer-rest-params': 0,
    camelcase: 0,
    eqeqeq: 0,
    radix: 0,
    semi: 0,

    // https://github.com/yannickcr/eslint-plugin-react
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'react/sort-comp': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/no-deprecated': 0,
    'react/jsx-one-expression-per-line': 0,

    // https://github.com/evcohen/eslint-plugin-jsx-a11y
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0
  }
}
