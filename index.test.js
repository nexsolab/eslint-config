const assert = require('assert');
const { ESLint } = require('eslint');

async function main() {
  const eslint = new ESLint({
    overrideConfigFile: 'index.js',
  });

  const results = await eslint.lintText('var a = 1');
  const errors = ESLint.getErrorResults(results);
  const ruleIds = errors[0].messages.map((error) => error.ruleId);

  assert(ruleIds.includes('no-var'));
  assert(ruleIds.includes('no-unused-vars'));
  assert(ruleIds.includes('eol-last'));
  assert(ruleIds.includes('semi'));
  console.log('Tests passed');
}

main();
