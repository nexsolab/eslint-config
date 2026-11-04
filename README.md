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
- `node:test` checks through [`eslint-node-test`](https://github.com/sindresorhus/eslint-node-test), using its recommended preset and additional rules
- validation and automatic fixes for `**/package.json` through [`eslint-plugin-package-json`](https://eslint-plugin-package-json.dev/).

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

- Node.js `^22.22.2 || >=24.15.0`
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

## Package manifests

The plugin is included as a direct dependency; consumers do not need to install it.
Run `npx eslint .` to check source files and all `package.json` files, including
workspace packages, or `npx eslint . --fix` to apply supported automatic fixes.
Scripts that list only JavaScript or TypeScript files must also include
`"**/package.json"` to check manifests.

Manifest rules apply to private packages too (`enforceForPrivate: true`). All
`valid-*` rules are errors, along with the selected consistency and required-field
rules. `require-types` is a warning. Properties follow `sort-package-json` order;
package names prefer `@nexsolab`, with `@nexso` also allowed. Missing metadata
without an automatic fix must be supplied by the project.

## Node.js tests

`eslint-node-test` is included as a direct dependency. Its `node-test/recommended`
preset is complemented by `consistent-modifier-style`, `consistent-test-filename`,
`consistent-test-it`, `no-assert-in-hook`, `no-conditional-in-test`,
`no-skip-without-reason`, `no-sleep-in-test`, `no-snapshot-in-loop`,
`no-unneeded-async-rejects-callback`, `require-hook`, and
`require-top-level-describe`, all as errors.

The plugin detects imports from `node:test`; assertion rules also recognize
Node.js's built-in assert module. Test files use the default `*.test.js` naming
pattern (including `.mjs`, `.cjs`, and TypeScript equivalents). Tests belong in a
top-level `describe` and use `it` inside suites. Modifiers use the chained style
where applicable; skip/todo options with a reason remain supported. The recommended
preset also forbids skipped tests, even with a reason.

Run `npx eslint . --fix` to apply the plugin's supported automatic fixes.
The TypeScript config inherits these rules and supplies the TypeScript parser.

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
