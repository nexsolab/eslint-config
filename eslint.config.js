// Repository configuration for ESLint 10.
import config from './index.js';

export default [
  ...config,
  {
    name: '@nexso/eslint-config/repository-files',
    files: ['index.js', 'index.test.js', 'eslint.config.js'],
    rules: {
      'import-x/no-named-as-default-member': 'off',
      'perfectionist/sort-arrays': 'off',
      'security/detect-object-injection': 'off',
    },
  },
];
