# @nexso/eslint-config

Nexso's shared ESLint configuration for modern JavaScript and Node.js projects.
Version 3 is an ESLint 10-only Flat Config.

## Features

- ESLint's recommended JavaScript rules
- Node.js rules from `eslint-plugin-n`
- import validation through `eslint-plugin-import-x`
- security checks from `eslint-plugin-security`
- formatting rules from `@stylistic/eslint-plugin`
- deterministic ordering through `eslint-plugin-perfectionist`
- native parsing of current ECMAScript syntax, without Babel

The config keeps only the `@stylistic/*` implementation of migrated formatting
rules. For example, suppress a long line with:

```js
// eslint-disable-next-line @stylistic/max-len
const value = '...';
```

The core `max-len`, `function-paren-newline`, and
`function-call-argument-newline` rules are disabled, so duplicate diagnostics
and duplicate disable comments are no longer required.

## Requirements

- Node.js `^20.19.0 || ^22.13.0 || >=24`
- ESLint `^10.7.0`

## Installation

```bash
npm install --save-dev eslint @nexso/eslint-config
```

## Usage

Create `eslint.config.js` in the project root:

```js
import nexso from '@nexso/eslint-config';

export default [
  ...nexso,
  {
    rules: {
      // Project overrides
    },
  },
];
```

ESLint 10 no longer reads `.eslintrc.*` or `.eslintignore`. Put ignores in the
Flat Config instead:

```js
export default [
  { ignores: ['dist/**', 'coverage/**'] },
  ...nexso,
];
```

## Migrating from version 2

Version 3 removes `eslint-config-airbnb-extended` and
`@microsoft/eslint-plugin-sdl`, whose published peer dependency ranges do not
support ESLint 10. It also removes the Babel parser because ESLint parses the
modern JavaScript syntax covered by this package natively.

Review any project-specific reliance on rules supplied only by those packages
before upgrading. The security, import, Node.js, stylistic, and ordering rule
families remain enabled through ESLint 10-compatible plugins.

## License

Apache-2.0
