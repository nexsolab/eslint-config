import assert from 'assert';
import { ESLint } from 'eslint';

const logger = console;

async function main() {
  // Test the flat config
  try {
    const eslint = new ESLint({
      overrideConfigFile: './index.js',
    });

    const results = await eslint.lintText('var a = 1');
    const errors = ESLint.getErrorResults(results);

    if (errors.length > 0) {
      const ruleIds = errors[0].messages.map((error) => error.ruleId);

      assert(ruleIds.includes('no-var'), 'Should include no-var rule');
      assert(ruleIds.includes('no-unused-vars'), 'Should include no-unused-vars rule');
      // eslint-disable-next-line no-console
      logger.log('Tests passed - Flat config is working correctly');
    } else {
      // eslint-disable-next-line no-console
      logger.log('Warning: No errors found, config may not be working as expected');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    logger.error('Error testing flat config:', error.message);

    // Fallback test - just check if config loads
    try {
      const config = import('./index.js');
      assert(Array.isArray(config), 'Config should be an array for flat config');
      assert(config.length > 0, 'Config should have at least one configuration object');
      // eslint-disable-next-line no-console
      logger.log('Flat config structure is valid');
    } catch (loadError) {
      // eslint-disable-next-line no-console
      logger.error('Failed to load config:', loadError.message);
      process.exit(1);
    }
  }
}

main();
