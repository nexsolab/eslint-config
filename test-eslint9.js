// Test file to validate ESLint 9 with AirBnB rules
const example = 'Hello World';

// Test AirBnB style rules
const testObject = {
  key: 'value',
  anotherKey: 'anotherValue', // Should require trailing comma
};

// Test import rules
import fs from 'fs';

// Test arrow functions
const arrowFunction = (param) => param * 2;

// Test destructuring
const { key } = testObject;

// Test template literals
const templateString = `Hello ${example}`;

export default function testFunction() {
  // Test no-var rule
  let variableTest = 'should use let/const';
  
  // Test prefer-const
  const shouldBeConst = 'this should be const';
  
  // Test object shorthand
  const shorthandObject = {
    key,
    arrowFunction,
    method() {
      return 'shorthand method';
    },
  };
  
  return {
    example,
    templateString,
    shorthandObject,
    variableTest,
    shouldBeConst,
  };
}

console.log(fs, testFunction());
