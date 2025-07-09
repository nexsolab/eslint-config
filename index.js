import js from '@eslint/js';
import airbnbExtended from 'eslint-config-airbnb-extended';
import securityPlugin from 'eslint-plugin-security';
import importPlugin from 'eslint-plugin-import-x';
import stylisticPlugin from '@stylistic/eslint-plugin';
import nodePlugin from 'eslint-plugin-n';
import babelTransformClassProperties from '@babel/plugin-transform-class-properties';
import babelTransformPrivateMethods from '@babel/plugin-transform-private-methods';

export default [
  // JavaScript recommended rules
  js.configs.recommended,

  // node.js recommended rules
  nodePlugin.configs['flat/recommended-module'],

  // import recommended rules
  importPlugin.flatConfigs.recommended,
  
  // Base configuration from eslint-config-airbnb-extended with plugins defined
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      //'import-x': importPlugin,
      '@stylistic': stylisticPlugin,
      'n': nodePlugin,
      'security': securityPlugin,
      'babel': {
        plugins: [
          babelTransformClassProperties,
          babelTransformPrivateMethods,
        ],
      },
    },
    ...airbnbExtended.configs.base.recommended[0],
  },
  
  // Apply additional configs from airbnb-extended
  ...airbnbExtended.configs.base.recommended.slice(1),

  // Nexso custom rules and security plugin
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    plugins: {
      security: securityPlugin,
    },
    rules: {
      // Security plugin recommended rules
      'security/detect-buffer-noassert': 'warn',
      'security/detect-child-process': 'warn',
      'security/detect-disable-mustache-escape': 'warn',
      'security/detect-eval-with-expression': 'warn',
      'security/detect-new-buffer': 'warn',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-non-literal-require': 'warn',
      'security/detect-object-injection': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-pseudoRandomBytes': 'warn',
      'security/detect-unsafe-regex': 'warn',
      'security/detect-bidi-characters': 'warn',

      // Nexso custom rules
      // node.js 14+ type: module
      'import-x/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
        },
      ],
      "import-x/no-useless-path-segments": ["error", {
        noUselessIndex: false, // Allow index.js files
      }],
      'import-x/no-amd': 'error', // Use only ES Modules
      'import-x/no-commonjs': 'error', // Disallow CommonJS modules

      // for await...of
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message: 'for..in loops iterate over prototype chain. Use Object.{keys,values,entries}.',
        },
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of GOTO; using them makes code confusing.',
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode.',
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
      '@stylistic/max-len': [
        'error',
        {
          code: 100,
          ignoreComments: true,
        },
      ],

      // Let put arguments in a consistent order
      'function-paren-newline': [
        'error',
        'consistent',
      ],
      'function-call-argument-newline': [
        'error',
        'consistent'
      ],

      // Allow _id for MongoDB compatibility
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id'],
        },
      ],
    },
  },
];
