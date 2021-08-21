# @nexso/eslint-config

A extension of `eslint-config-airbnb-base` style but for newer javascript (ES2021).
Used in the _nexso_ development (a SaaS ERP).

> This is intended to work in Node.js 14+ environments.

## module imports

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
  ...
}
```

### Import extensions

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

## Private fields/methods

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

## for await...of

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

## max-len in JSDoc comments

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
