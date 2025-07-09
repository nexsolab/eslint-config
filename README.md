# @nexso/eslint-config

A comprehensive ESLint configuration based on `eslint-config-airbnb-extended` with additional security rules and Nexso customizations.
Used in the _nexso_ development (an aPaaS).

> ✨ **Version 2.0+**: Now fully compatible with ESLint 9.x using Flat Config format!
>
> - ✅ ESLint 9.x support with Flat Config
> - ✅ Based on `eslint-config-airbnb-extended` (maintained AirBnB replacement)
> - ✅ Security rules included
> - ✅ Import/export validation
> - ✅ Node.js 18+ environments
> - ❌ No legacy ESLint 8.x support (use v1.x for legacy)

## Features

- **AirBnB Extended**: Built on top of `eslint-config-airbnb-extended` - a modern, maintained replacement for AirBnB configs
- **Security**: Built-in security linting with `eslint-plugin-security`
- **Import Management**: Proper import/export validation with `eslint-plugin-import-x`
- **Modern JavaScript**: ES2021+ features supported
- **ESLint 9 Only**: Full compatibility with ESLint 9.x Flat Config format

## Installation

Install the config and its peer dependencies:

```bash
npm i -D @nexso/eslint-config
```

## Usage

### ESLint 9.x (Flat Config) - Required

Create a `eslint.config.js` file with:

```js
import nexso from '@nexso/eslint-config';

export default [
  ...nexso,
  {
    rules: {
      // Override rules if needed
    },
  },
];
```

### Migration from v1.x

If you're upgrading from v1.x, you need to:

1. Update to ESLint 9.x
2. Convert your `.eslintrc.*` to `eslint.config.js`
3. Install the new peer dependencies
4. Update your configuration format

For legacy ESLint 8.x support, continue using `@nexso/eslint-config@1.x`.

## What's Included

This configuration includes:

### Base Rules

- All rules from `eslint-config-airbnb-extended`
- JavaScript recommended rules from `@eslint/js`

### Security Rules

- `eslint-plugin-security` for security-related linting

### Custom nexso Rules

- `import-x/extensions`: Enforces file extensions in imports (Node.js ES modules)
- `no-restricted-syntax`: Prevents `for...in` loops, labels, and `with` statements
- `max-len`: 100 characters with comment exception
- `function-paren-newline`: Consistent parameter formatting
- `no-underscore-dangle`: Allows `_id` for MongoDB compatibility

## Requirements

- Node.js 18.18.0+ or 20.9.0+ or 21.1.0+
- ESLint 9.30.1+
- eslint-plugin-import-x 4.16.1+

## Contributing

This package is used internally by nexso. Issues and pull requests are welcome.

## Version History

See [CHANGELOG](https://github.com/nexsolab/eslint-config/blob/main/CHANGELOG.md)

## License

Apache-2.0
