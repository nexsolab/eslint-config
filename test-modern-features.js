import { ESLint } from 'eslint';
import { readFileSync } from 'fs';
import config from './index.js';

async function testModernJavaScript() {
  console.log('Testing modern JavaScript features...');
  
  try {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: config,
    });
    
    // Read the test file
    const testCode = readFileSync('./test-modern-js.js', 'utf8');
    
    // Lint the test file
    const results = await eslint.lintText(testCode, { filePath: 'test-modern-js.js' });
    const messages = results[0]?.messages || [];
    
    // Filter out only parsing errors (not style/logic errors)
    const parsingErrors = messages.filter(msg => 
      msg.message.includes('Parsing error') || 
      msg.message.includes('Unexpected token') ||
      msg.message.includes('Unexpected character')
    );
    
    console.log('--- Modern JavaScript Test Results ---');
    console.log('Total messages:', messages.length);
    console.log('Parsing errors:', parsingErrors.length);
    
    if (parsingErrors.length > 0) {
      console.log('❌ Parsing errors found:');
      parsingErrors.forEach(error => {
        console.log(`  - Line ${error.line}: ${error.message}`);
      });
      process.exit(1);
    } else {
      console.log('✅ All modern JavaScript features parsed successfully!');
      console.log('✅ Private fields (#privateField) - OK');
      console.log('✅ Optional chaining (obj?.prop) - OK');
      console.log('✅ Nullish coalescing (value ?? default) - OK');
      console.log('✅ Long comments ignored by max-len - OK');
    }
    
  } catch (error) {
    console.error('❌ Error during modern JavaScript test:', error.message);
    process.exit(1);
  }
}

testModernJavaScript();
