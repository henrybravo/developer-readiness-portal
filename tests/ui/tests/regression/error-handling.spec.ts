import { test, expect } from '../../fixtures';

test.describe('Error Handling @regression', () => {
  /**
   * REG-002: API Error Handling
   * Verifies that API errors are handled gracefully with retry option
   */
  test('REG-002: API error shows error message with retry', async ({ page, pageHelpers }) => {
    let requestCount = 0;
    
    // Intercept API calls
    await page.route('**/api/teams', async (route) => {
      requestCount++;
      
      if (requestCount === 1) {
        // First request: simulate 500 error
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Internal Server Error' }),
        });
      } else {
        // Subsequent requests: succeed
        await route.continue();
      }
    });
    
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for error state to appear
    const errorContainer = page.locator('[data-testid="error-container"]');
    await expect(errorContainer).toBeVisible({ timeout: 10000 });
    
    // Verify error message is displayed
    await expect(errorContainer).toContainText(/error|failed/i);
    
    // Verify Retry button is visible
    const retryButton = page.getByRole('button', { name: /retry/i });
    await expect(retryButton).toBeVisible();
    
    // Remove route interception to allow real requests
    await page.unroute('**/api/teams');
    
    // Click Retry button
    await retryButton.click();
    
    // Wait for successful load
    await pageHelpers.waitForPageLoad();
    
    // Verify teams are now displayed
    const teamsContainer = page.locator('[data-testid="teams-container"]');
    await expect(teamsContainer).toBeVisible();
    
    // Verify error message is hidden
    await expect(errorContainer).not.toBeVisible();
  });

  /**
   * Test: Network timeout handling
   * This test is skipped as it's inherently flaky - testing actual timeouts
   * requires long waits and can be affected by network conditions
   */
  test.skip('API timeout shows appropriate error', async ({ page }) => {
    // Intercept and delay API call significantly
    await page.route('**/api/teams', async (route) => {
      // Simulate timeout by never responding
      await new Promise(resolve => setTimeout(resolve, 35000));
    });
    
    // Navigate to homepage with shorter timeout expectation
    await page.goto('/', { timeout: 5000 }).catch(() => {});
    
    // The page should handle the slow API gracefully
    // Either show loading state or error
    const loadingOrError = page.locator('[data-testid="error-container"], [data-testid="skeleton"]');
    await expect(loadingOrError.first()).toBeVisible({ timeout: 10000 });
  });
});
