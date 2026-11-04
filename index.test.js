import assert from 'node:assert/strict';
import packageJson from 'eslint-plugin-package-json';
import { ESLint } from 'eslint';
import config from './index.js';

assert.ok(Array.isArray(config), 'The exported Flat Config must be an array');
assert.ok(config.every(({ name }) => typeof name === 'string'), 'Every config must have a name');

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

assert.ok(ruleIds.includes('no-var'), 'The no-var rule must be enabled');
assert.ok(ruleIds.includes('no-unused-vars'), 'The no-unused-vars rule must be enabled');
assert.ok(!ruleIds.includes('no-undef'), 'Node.js globals must be recognized');

const manifestConfig = await eslint.calculateConfigForFile('packages/example/package.json');

assert.equal(manifestConfig.settings.packageJson.enforceForPrivate, true);
assert.equal(manifestConfig.rules['package-json/require-types'][0], 1);
assert.equal(manifestConfig.rules['no-unused-vars'], undefined);
assert.equal(manifestConfig.rules['@stylistic/quotes'], undefined);
assert.equal(calculatedConfig.rules['package-json/require-name'], undefined);

for (const rule of Object.keys(packageJson.rules).filter(rule => rule.startsWith('valid-'))) {
  assert.equal(manifestConfig.rules[`package-json/${rule}`][0], 2);
}

const [privateManifest] = await eslint.lintText('{"private":true}', {
  filePath: 'packages/example/package.json',
});
const manifestRuleIds = privateManifest.messages.map(({ ruleId }) => ruleId);

assert.ok(!privateManifest.messages.some(({ fatal }) => fatal));
assert.ok(manifestRuleIds.includes('package-json/require-name'));
assert.ok(manifestRuleIds.includes('package-json/require-version'));
assert.ok(manifestRuleIds.includes('package-json/require-devEngines'));
assert.ok(manifestRuleIds.includes('package-json/require-types'));

const fixEslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: config,
  fix: true,
});
const [fixedManifest] = await fixEslint.lintText(JSON.stringify({
  version: '1.0.0',
  name: 'example',
  private: true,
  dependencies: { zebra: '^1.0.0', alpha: '^1.0.0' },
}), { filePath: 'packages/example/package.json' });
const fixedPackage = JSON.parse(fixedManifest.output);

assert.equal(fixedPackage.name, '@nexsolab/example');
assert.equal(Object.keys(fixedPackage)[0], 'name');
assert.deepEqual(Object.keys(fixedPackage.dependencies), ['alpha', 'zebra']);

const [allowedScope] = await eslint.lintText('{"name":"@nexso/example","version":42}', {
  filePath: 'package.json',
});

assert.ok(!allowedScope.messages.some(({ ruleId }) => ruleId === 'package-json/prefer-scoped-name'));
assert.ok(allowedScope.messages.some(({ ruleId }) => ruleId === 'package-json/valid-version'));

assert.equal(manifestConfig.rules['node-test/no-only-test'], undefined);

const invalidNodeTest = `
import { before, it } from 'node:test';

before(t => { t.assert.equal(1, 1); });
it.only('rejects conditionals', t => {
  if (process.env.VALUE) t.assert.ok(process.env.VALUE);
});
`;
const [nodeTestResult] = await eslint.lintText(invalidNodeTest, { filePath: 'example.js' });
const nodeTestRuleIds = nodeTestResult.messages.map(({ ruleId }) => ruleId);

assert.ok(!nodeTestResult.messages.some(({ fatal }) => fatal));
for (const rule of [
  'no-only-test',
  'consistent-test-filename',
  'consistent-test-it',
  'no-assert-in-hook',
  'no-conditional-in-test',
  'require-top-level-describe',
]) {
  assert.ok(nodeTestRuleIds.includes(`node-test/${rule}`), `${rule} must report a violation`);
}

const validNodeTest = `
import { describe, it } from 'node:test';

describe('example', () => {
  it('checks the result', t => { t.assert.strictEqual(typeof process.version, 'string'); });
});
`;
const [validNodeTestResult] = await eslint.lintText(validNodeTest, { filePath: 'example.test.js' });

assert.ok(!validNodeTestResult.messages.some(({ fatal }) => fatal));
assert.ok(!validNodeTestResult.messages.some(({ ruleId }) => ruleId?.startsWith('node-test/')));

const [fixedAssertion] = await fixEslint.lintText(`
import assert from 'node:assert/strict';
assert.deepEqual(1 + 1, 2);
`, { filePath: 'assertions.js' });

assert.ok(fixedAssertion.output.includes('assert.equal(1 + 1, 2)'));

console.log('ESLint 10 Flat Config, package.json, and node:test integration tests passed.');
