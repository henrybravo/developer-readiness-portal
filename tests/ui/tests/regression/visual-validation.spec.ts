import { test, expect } from '../../fixtures';

test.describe('Visual Validation @regression', () => {
  /**
   * REG-005: Progress Bar Accuracy
   * Verifies progress bar correctly reflects completion percentage
   */
  test('REG-005: Progress bar shows accurate completion percentage', async ({ page, pageHelpers, dataFixture }) => {
    await dataFixture.resetTestData();
    
    // Navigate to first team's details
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    const firstTeamCard = page.locator('[data-testid^="team-card-"]').first();
    await firstTeamCard.click();
    await pageHelpers.waitForPageLoad();
    
    // Find a checklist section
    const codebaseSection = pageHelpers.getChecklistSection('codebase');
    await expect(codebaseSection).toBeVisible();
    
    // Click to expand if needed (verify it's visible)
    const toggleButton = page.locator('[data-testid="toggle-codebase"]');
    await toggleButton.click();
    
    // Get the completion count text (e.g., "2/5")
    const countText = await codebaseSection.locator('span:has-text("/")').first().textContent();
    
    // Parse the count
    const match = countText?.match(/(\d+)\/(\d+)/);
    expect(match).not.toBeNull();
    
    const [, completed, total] = match!;
    const expectedPercentage = Math.round((parseInt(completed) / parseInt(total)) * 100);
    
    // Verify percentage text is displayed
    const percentageText = await codebaseSection.locator(`text=${expectedPercentage}%`).first();
    await expect(percentageText).toBeVisible();
  });

  /**
   * REG-006: Status Badge Colors
   * Verifies status badges display correct colors based on readiness
   */
  test('REG-006: Status badges show correct colors', async ({ page, pageHelpers, dataFixture }) => {
    await dataFixture.resetTestData();
    
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    // Find status badges on the page
    const statusBadges = page.locator('[data-testid="status-badge"]');
    const badgeCount = await statusBadges.count();
    
    expect(badgeCount).toBeGreaterThan(0);
    
    // Check each badge has a valid status
    for (let i = 0; i < badgeCount; i++) {
      const badge = statusBadges.nth(i);
      const status = await badge.getAttribute('data-status');
      
      // Status should be one of: green, yellow, red
      expect(['green', 'yellow', 'red', 'unknown']).toContain(status);
      
      // Verify badge text matches status
      const text = await badge.textContent();
      if (status !== 'unknown') {
        expect(text?.toLowerCase()).toContain(status);
      }
    }
  });
});
