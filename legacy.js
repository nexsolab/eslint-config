// Legacy ESLint configuration format for backwards compatibility
module.exports = {
  // AirBnB
  extends: [
    'airbnb-base',
    'plugin:security/recommended',
    'plugin:@microsoft/sdl/node',
    'plugin:import/recommended',
  ],

  // Plugins
  plugins: [
    'import',
    // Security
    'security',
    '@microsoft/sdl',
  ],

  // ES2021
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    // Needed for VS Code
    babelOptions: {
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
      ],
    },
    requireConfigFile: false,
  },

  // Rules
  rules: {
    // node.js 14+ type: module
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
      },
    ],

    // for await...of
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // max-len comments
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
      },
    ],
  },
};
