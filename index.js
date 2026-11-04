import perfectionist from 'eslint-plugin-perfectionist';
import stylisticPlugin from '@stylistic/eslint-plugin';
import packageJson from 'eslint-plugin-package-json';
import securityPlugin from 'eslint-plugin-security';
import importPlugin from 'eslint-plugin-import-x';
import nodePlugin from 'eslint-plugin-n';
import nodeTest from 'eslint-node-test';
import js from '@eslint/js';

const javascriptFiles = ['**/*.js', '**/*.mjs', '**/*.cjs'];
const packageJsonFiles = ['**/package.json'];

export default [
  {
    ...js.configs.recommended,
    name: '@nexso/eslint-config/javascript-recommended',
    ignores: packageJsonFiles,
  },

  {
    ...nodePlugin.configs['flat/recommended-module'],
    name: '@nexso/eslint-config/node-recommended',
    files: javascriptFiles,
  },

  {
    ...importPlugin.flatConfigs.recommended,
    name: '@nexso/eslint-config/import-recommended',
    ignores: packageJsonFiles,
  },

  {
    name: '@nexso/eslint-config/javascript-language-options',
    files: javascriptFiles,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  {
    ...stylisticPlugin.configs.recommended,
    name: '@nexso/eslint-config/stylistic-recommended',
    ignores: packageJsonFiles,
  },

  {
    ...securityPlugin.configs.recommended,
    name: '@nexso/eslint-config/security-recommended',
    ignores: packageJsonFiles,
  },

  // Code ordering
  {
    name: '@nexso/eslint-config/perfectionist',
    ignores: packageJsonFiles,
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          groups: ['builtin', 'external', 'type', 'internal', 'unknown'],
          type: 'line-length',
          order: 'desc',
          fallbackSort: { type: 'alphabetical', order: 'asc' },
          newlinesBetween: 0,
          newlinesInside: 0,
        },
      ],
      'perfectionist/sort-classes': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 1,
          newlinesInside: 'ignore',
          ignoreCallbackDependenciesPatterns: [],
          groups: [
            'index-signature',
            ['protected-static-property', 'protected-static-accessor-property'],
            ['protected-property', 'protected-accessor-property'],
            ['private-static-property', 'private-static-accessor-property'],
            ['private-property', 'private-accessor-property'],
            ['static-property', 'static-accessor-property'],
            ['property', 'accessor-property'],
            'constructor',
            ['static-get-method', 'static-set-method'],
            ['static-method', 'static-function-property'],
            ['get-method', 'set-method'],
            'static-block',
            ['method', 'function-property'],
            ['protected-get-method', 'protected-set-method'],
            ['protected-static-get-method', 'protected-static-set-method'],
            ['protected-static-method', 'protected-static-function-property'],
            ['protected-method', 'protected-function-property'],
            ['private-static-get-method', 'private-static-set-method'],
            ['private-static-method', 'private-static-function-property'],
            ['private-get-method', 'private-set-method'],
            ['private-method', 'private-function-property'],
            'unknown',
          ],
          customGroups: [],
          useConfigurationIf: {},
          useExperimentalDependencyDetection: true,
        },
      ],
      'perfectionist/sort-named-exports': [
        'warn',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreAlias: false,
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByNewLine: false,
          partitionByComment: true,
          newlinesBetween: 1,
          newlinesInside: 0,
          groups: [],
          customGroups: [],
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreAlias: false,
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByNewLine: false,
          partitionByComment: false,
          newlinesBetween: 0,
          newlinesInside: 0,
          groups: [],
          customGroups: [],
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          sortBy: 'name',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 1,
          newlinesInside: 'ignore',
          useConfigurationIf: {},
          groups: [
            'member',
            'multiline-member',
            { group: 'method', newlinesInside: 1 },
            'unknown',
          ],
          customGroups: [],
        },
      ],
    },
  },

  {
    ...packageJson.configs.recommended,
    name: '@nexso/eslint-config/package-json',
    settings: {
      packageJson: { enforceForPrivate: true },
    },
    rules: {
      // Enable every valid-* rule supplied by the installed plugin.
      ...Object.fromEntries(Object.keys(packageJson.rules)
        .filter(rule => rule.startsWith('valid-'))
        .map(rule => [`package-json/${rule}`, 'error'])),
      'package-json/consistent-package-manager-declaration': 'error',
      'package-json/consistent-property-aliases': 'error',
      'package-json/exports-subpaths-style': 'error',
      'package-json/no-local-dependencies': 'error',
      'package-json/no-redundant-files': 'error',
      'package-json/no-redundant-publishConfig': 'error',
      'package-json/order-properties': ['error', { order: 'sort-package-json' }],
      'package-json/prefer-scoped-name': ['error', {
        preferred: '@nexsolab',
        allowed: ['@nexso'],
      }],
      'package-json/repository-shorthand': 'error',
      'package-json/require-attribution': 'error',
      'package-json/require-package-json-export': 'error',
      'package-json/restrict-private-properties': 'error',
      'package-json/scripts-name-casing': 'error',
      'package-json/sort-collections': 'error',
      'package-json/specify-peers-locally': 'error',
      'package-json/unique-dependencies': 'error',
      'package-json/require-author': 'error',
      'package-json/require-devEngines': 'error',
      'package-json/require-engines': 'error',
      'package-json/require-license': 'error',
      'package-json/require-name': 'error',
      'package-json/require-repository': 'error',
      'package-json/require-sideEffects': 'error',
      'package-json/require-type': 'error',
      'package-json/require-types': 'warn',
      'package-json/require-version': 'error',
    },
  },

  {
    ...nodeTest.configs.recommended,
    name: '@nexso/eslint-config/node-test',
    ignores: packageJsonFiles,
    rules: {
      ...nodeTest.configs.recommended.rules,
      'node-test/consistent-modifier-style': 'error',
      'node-test/consistent-test-filename': 'error',
      'node-test/consistent-test-it': 'error',
      'node-test/no-assert-in-hook': 'error',
      'node-test/no-conditional-in-test': 'error',
      'node-test/no-skip-without-reason': 'error',
      'node-test/no-sleep-in-test': 'error',
      'node-test/no-snapshot-in-loop': 'error',
      'node-test/no-unneeded-async-rejects-callback': 'error',
      'node-test/require-hook': 'error',
      'node-test/require-top-level-describe': 'error',
    },
  },

  // Nexso custom rules and security plugin
  {
    name: '@nexso/eslint-config/custom-rules',
    files: javascriptFiles,
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
      'no-var': 'error',

      // node.js 14+ type: module
      'import-x/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
        },
      ],
      'import-x/no-useless-path-segments': ['error', {
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
      'max-len': 'off',
      '@stylistic/max-len': [
        'error',
        {
          code: 100,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],

      // Let put arguments in a consistent order
      'function-paren-newline': 'off',
      'function-call-argument-newline': 'off',
      '@stylistic/function-paren-newline': [
        'error',
        'consistent',
      ],
      '@stylistic/function-call-argument-newline': [
        'error',
        'consistent',
      ],
      '@stylistic/semi': ['error', 'always'],

      // Allow _id for MongoDB compatibility
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id'],
        },
      ],

      // Custom rules
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      '@stylistic/object-curly-newline': [
        'error',
        {
          minProperties: 5,
          multiline: true,
          consistent: true,
        },
      ],
    },
  },

  {
    name: '@nexso/eslint-config/vue-recommended',
    files: ['**/*.vue'],
    rules: {
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below',
        },
      ],
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      '@stylistic/max-len': 'off',
      'vue/max-len': [
        'error',
        {
          code: 100,
          template: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreHTMLAttributeValues: true,
        },
      ],
    },
  },
];
