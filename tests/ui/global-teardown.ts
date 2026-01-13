/**
 * Global teardown for Playwright tests
 * Cleanup after test suite completion
 */
async function globalTeardown() {
  console.log('\n🧹 Running global teardown...');
  // Add any cleanup logic here (e.g., clear test data, close connections)
  console.log('✅ Global teardown complete');
}

export default globalTeardown;
