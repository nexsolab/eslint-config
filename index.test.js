import assert from 'node:assert/strict';

import { ESLint } from 'eslint';

import config from './index.js';

assert(Array.isArray(config), 'The exported Flat Config must be an array');
assert(config.every(({ name }) => typeof name === 'string'), 'Every config must have a name');

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: config,
});

const calculatedConfig = await eslint.calculateConfigForFile('example.js');

assert.equal(calculatedConfig.rules['max-len'][0], 0);
assert.equal(calculatedConfig.rules['@stylistic/max-len'][0], 2);
assert.equal(calculatedConfig.rules['function-paren-newline'][0], 0);
assert.equal(calculatedConfig.rules['@stylistic/function-paren-newline'][0], 2);

for (const ruleId of Object.keys(calculatedConfig.rules)) {
  if (!ruleId.startsWith('@stylistic/')) continue;

  const coreRuleId = ruleId.replace('@stylistic/', '');
  const coreRule = calculatedConfig.rules[coreRuleId];

  if (coreRule) {
    assert.equal(coreRule[0], 0, `${coreRuleId} must be disabled in favor of ${ruleId}`);
  }
}

const [result] = await eslint.lintText('var unused = process.env.VALUE;', {
  filePath: 'example.js',
});
const ruleIds = result.messages.map(({ ruleId }) => ruleId);

assert(ruleIds.includes('no-var'), 'The no-var rule must be enabled');
assert(ruleIds.includes('no-unused-vars'), 'The no-unused-vars rule must be enabled');
assert(!ruleIds.includes('no-undef'), 'Node.js globals must be recognized');

console.log('ESLint 10 Flat Config and rule de-duplication tests passed.');
