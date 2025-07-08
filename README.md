# @nexso/eslint-config

A comprehensive ESLint configuration with AirBnB-style rules optimized for modern JavaScript (ES2021+).
Used in the _nexso_ development (an aPaaS).

> ✨ **Version 2.0+**: Now fully compatible with ESLint 9.x using Flat Config format!
>
> - ✅ ESLint 9.x support with Flat Config
> - ✅ AirBnB-style rules (manually implemented for full compatibility)
> - ✅ Security rules included
> - ✅ Import/export validation
> - ✅ Node.js 18+ environments

## Features

- **AirBnB Style Rules**: All core AirBnB coding standards
- **Security**: Built-in security linting with `eslint-plugin-security` and `@microsoft/eslint-plugin-sdl`
- **Import Management**: Proper import/export validation
- **Modern JavaScript**: ES2021+ features supported
- **No Dependencies Issues**: AirBnB rules manually implemented for full ESLint 9 compatibility

## How to use

Install the config as development dependency:

```bash
npm i -D eslint @nexso/eslint-config eslint-plugin-import
```

### ESLint 9.x (Flat Config) - Recommended

Create a `eslint.config.js` file with:

```js
import nexso from '@nexso/eslint-config';

export default [
  ...nexso,
  {
    // Your custom rules here
    rules: {
      // Override rules if needed
    }
  }
];
```

### Legacy ESLint Configuration (.eslintrc)

If you're still using ESLint with the legacy configuration format (for backwards compatibility), you can use the legacy export:

```js
// .eslintrc.js
module.exports = {
  extends: ['@nexso/eslint-config/legacy'],
};
```

Add type `module` to your `package.json` file:

```json
{
  "type": "module",
  "name": "your-app-or-lib-name",
  "version": "1.0.0",
}
```

### Using with eslint wizard (optional)

If you want to use with `eslint --init` command, simple change the file:

- Windows (Global installation):
  `%APPDATA%\npm\node_modules\eslint\lib\init\config-initializer.js`

- Linux:
  `/usr/local/lib/node_modules/eslint/lib/init/config-initializer.js`

And find the question: `name: "styleguide"` (~ line 540) and add nexso option:

```javascript
{
    type: "select",
    name: "styleguide",
    message: "Which style guide do you want to follow?",
    choices: [
        { message: "nexso: https://github.com/nexsodev/eslint-config", name: "@nexso/eslint-config" }, // This
        { message: "Airbnb: https://github.com/airbnb/javascript", name: "airbnb" },
        { message: "Standard: https://github.com/standard/standard", name: "standard" },
        { message: "Google: https://github.com/google/eslint-config-google", name: "google" },
        { message: "XO: https://github.com/xojs/eslint-config-xo", name: "xo" }
    ],
```

You can also use the file from this repo: [config-initializer.js](https://github.com/nexsolab/eslint-config/blob/main/config-initializer.js).

## Secure by default

This config also includes security plugins:

- [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security)
- [@microsoft/eslint-plugin-sdl](https://github.com/microsoft/eslint-plugin-sdl)

## Differences from AirBnb Base

Some configs from [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) was changed:

### module imports

Use ES6 syntax to import modules, natively in node.js 14+.

```javascript
// import npm or node built-in modules (old: `require()`)
import { createPrivateKey, createPublicKey } from 'crypto';

// Whatever ...
function getKeyPair(pem) {
  return {
    public: createPublicKey(pem),
    private: createPrivateKey(pem),
  }
}

// export class, function, module, lib... (old `module.exports`)
export default getKeyPair;
```

Note that you must add `type: module` to your `package.json` file:

```json
{
  "type": "module",
  "name": "your-application",
  "version": "1.0.0",
  "main": "index.js"
}
```

So the source type is set to `module`:

```json
"parserOptions": {
    "sourceType": "module"
}
```

#### Import extensions

Node.js type module requires that you specify the extension when importing a local file:

```javascript
// src/controller/foo.js
import { Bar } from '../svc/index.js'; // index must be declared too
```

So the rule **import/extensions** is set as:

```json
"import/extensions": ["error", "always", {
    "ignorePackages": true
}]
```

### Private fields/methods

Enable private fields and private methods:

For this work in VS Code, Babel parser should be used and two plugins are used:

```json
"parser": "@babel/eslint-parser",
"parserOptions": {
    "ecmaVersion": 12,
    "babelOptions": {
        "plugins": [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-private-methods"
        ]
    }
},
```

### for await...of

AirBnB config doesn't support this statement and thrown an error:

> iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.

You can read the discussion at [Issue #1271](https://github.com/airbnb/javascript/issues/1271).

This config enables this with the rules:

```json
"no-restricted-syntax": [
    "error",
    {
        "selector": "ForInStatement",
        "message": "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
    },
    {
        "selector": "LabeledStatement",
        "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
    },
    {
        "selector": "WithStatement",
        "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
    }
]
```

> Note the absence of `ForOfStatement` selector. (Since we don't have specific AST for `for await...of`).

### max-len in JSDoc comments

Ignore `max-len` in comments to not warn about long JS Docs lines in pure JavaScript.

```javascript
  /**
   * To something that requires a long type param
   *
   * @param {import('@google-cloud/secret-manager').protos.google.cloud.secretmanager.v1.SecretVersion} secret The secret payload
   */
```

So the rule **import/extensions** is set as:

```json
"max-len": [
    "error",
    { 
        "code": 100,
        "ignoreComments": true 
    }
]
```

### function-paren-newline to consistent arguments

```javascript
async function sample(arg1, arg2, arg3) {
  const result = await someAsyncFunctionWithLotsOfArguments(
    argumentLongName1,
    argumentLongName2,
    argumentLongName3,
  );

  // or:

  const result = await someAsyncFunctionWithLotsOfArguments(
    argumentLongName1, argumentLongName2, argumentLongName3, argumentLongName4,
    argumentLongName5, argumentLongName6,
  );
}
```

## Version history

See [CHANGELOG](https://github.com/nexsolab/eslint-config/blob/main/CHANGELOG.md)
