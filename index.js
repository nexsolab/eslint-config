import js from '@eslint/js';
import securityPlugin from 'eslint-plugin-security';
import microsoftSdlPlugin from '@microsoft/eslint-plugin-sdl';
import importPlugin from 'eslint-plugin-import';
import babelEslintParser from '@babel/eslint-parser';

// AirBnB-style rules manually extracted for ESLint 9+ flat config compatibility
function getAirbnbRules() {
  return {
    // Core AirBnB style rules manually extracted
    'array-bracket-spacing': ['error', 'never'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'linebreak-style': ['error', 'unix'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'semi-spacing': ['error', { before: false, after: true }],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'spaced-comment': ['error', 'always', {
      line: {
        exceptions: ['-', '+'],
        markers: ['=', '!', '/'],
      },
      block: {
        exceptions: ['-', '+'],
        markers: ['=', '!', ':', '::'],
        balanced: true,
      },
    }],
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
    'prefer-destructuring': ['error', {
      VariableDeclarator: { array: false, object: true },
      AssignmentExpression: { array: true, object: false },
    }, { enforceForRenamedProperties: false }],
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always', {
      ignoreConstructors: false,
      avoidQuotes: true,
    }],
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', 'accumulator', 'e', 'ctx', 'context', 'req', 'request', 'res', 'response', '$scope', 'staticContext',
      ],
    }],
    'no-duplicate-imports': 'error',
    'dot-notation': ['error', { allowKeywords: true }],
    'no-undef': 'error',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-case-declarations': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-mixed-operators': ['error', {
      groups: [
        ['%', '**'],
        ['%', '+'],
        ['%', '-'],
        ['%', '*'],
        ['%', '/'],
        ['/', '*'],
        ['&', '|', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!=='],
        ['&&', '||'],
      ],
      allowSamePrecedence: false,
    }],
    'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],
    'no-else-return': ['error', { allowElseIf: false }],
  };
}

export default [
  // Base configuration from @eslint/js
  js.configs.recommended,

  // Base configuration for all JS files with AirBnB rules
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      parser: babelEslintParser,
      parserOptions: {
        // Needed for VS Code
        babelOptions: {
          plugins: [
            '@babel/plugin-transform-class-properties',
            '@babel/plugin-transform-private-methods',
          ].filter((plugin) => {
            try {
              import(plugin);
              return true;
            } catch {
              return false;
            }
          }),
        },
        requireConfigFile: false,
      },
    },
    plugins: {
      import: importPlugin,
      security: securityPlugin,
      '@microsoft/sdl': microsoftSdlPlugin,
    },
    rules: {
      // AirBnB Base Rules (manually applied for flat config compatibility)
      ...getAirbnbRules(),

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

      // Import plugin rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-duplicates': 'warn',

      // Microsoft SDL plugin rules
      '@microsoft/sdl/no-unsafe-alloc': 'error',

      // Custom rules
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

      // Let put arguments in a consistent order
      'function-paren-newline': [
        'error',
        'consistent',
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

  // Configuration for CommonJS files
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
];
