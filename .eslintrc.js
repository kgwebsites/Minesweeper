module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    ecmascript: 6,
    jsx: true,
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  extends: ['airbnb', 'prettier'],
  overrides: [
    {
      files: ['**/stores/**', '**/flags/**'],
      rules: {'no-param-reassign': 'off'},
    },
  ],
  rules: {
    'class-methods-use-this': 0,
    'function-paren-newline': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'max-len': 1,
    'no-underscore-dangle': 0,
    'no-continue': 0,
    'no-plusplus': 0,
    'prettier/prettier': ['error', 'fb'],
    'prefer-destructuring': ['error', {object: true, array: false}],
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-indent-props': 0,
    'react/no-unescaped-entities': 0,
    'react/require-default-props': 0,
    'react/no-did-mount-set-state': 0,
    'react/no-unused-prop-types': [1, {skipShapeProps: true}],
  },
};