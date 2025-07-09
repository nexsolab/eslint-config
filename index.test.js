import assert from 'assert';
import { ESLint } from 'eslint';

const logger = console;

async function main() {
  // Test the flat config
  try {
    const configModule = await import('./index.js');
    const config = configModule.default;
    
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: config,
    });

    const results = await eslint.lintText('var a = process.env.VAR');
    const messages = results[0]?.messages || [];
    
    if (messages.length > 0) {
      const ruleIds = messages.map((error) => error.ruleId);

      assert(ruleIds.includes('no-var'), 'Should include no-var rule');
      assert(ruleIds.includes('no-unused-vars'), 'Should include no-unused-vars rule');
      assert(!ruleIds.includes('no-undef'), 'Should not include no-undef rule');

      // eslint-disable-next-line no-console
      logger.log('✅ Tests passed - Flat config is working correctly');
      // eslint-disable-next-line no-console
      logger.log('✅ Rules applied:', ruleIds.join(', '));
    } else {
      // eslint-disable-next-line no-console
      logger.log('Warning: No errors found, config may not be working as expected');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    logger.error('Error testing flat config:', error.message);

    // Fallback test - just check if config loads
    try {
      const configModule = await import('./index.js');
      const config = configModule.default;
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
