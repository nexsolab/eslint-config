// Test modern JavaScript features - Official test for @nexso/eslint-config
class TestClass {
  // Private field
  #privateField = 'private';

  // Public field
  publicField = 'public';

  // Private method
  #privateMethod() {
    return this.#privateField;
  }

  // Public method using optional chaining
  testOptionalChaining(obj) {
    // This method uses 'this' to access private field
    return obj?.property?.nestedProperty || this.#privateMethod();
  }

  // Method using nullish coalescing
  testNullishCoalescing(value) {
    // This method uses 'this' to access public field
    return value ?? this.publicField;
  }
}

// Test optional chaining with arrays
const arr = [1, 2, 3];
const firstElement = arr?.[0];

// Test with very long comment that should be ignored by max-len rule: this is a very long comment that exceeds 100 characters but should be ignored by the linter
const testInstance = new TestClass();
const result = testInstance.testOptionalChaining({ property: { nestedProperty: 'works' } });

// Export for potential use in other tests
export { TestClass, firstElement, result };
