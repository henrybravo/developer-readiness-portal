import { test, expect } from '../../fixtures';

test.describe('Edge Cases @regression', () => {
  /**
   * REG-001: Empty State Display
   * Uses route interception to simulate empty data - no file manipulation needed
   */
  test('REG-001: Empty state displays correctly', async ({ page, pageHelpers }) => {
    // Mock empty state via route interception (no data file changes)
    await page.route('**/api/teams', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });
    
    // Navigate to homepage
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    // Verify empty state is displayed
    const emptyState = page.locator('[data-testid="empty-state"]');
    await expect(emptyState).toBeVisible();
    
    // Verify "No teams yet" message
    await expect(page.getByText('No teams yet')).toBeVisible();
    
    // Verify "Add Team" button is visible
    await expect(page.getByRole('button', { name: /add team/i })).toBeVisible();
    
    // Verify no error messages
    const errorContainer = page.locator('[data-testid="error-container"]');
    await expect(errorContainer).not.toBeVisible();
  });

  /**
   * REG-003: Cancel Unsaved Changes
   * Verifies that canceling reverts changes to original state
   */
  test('REG-003: Cancel reverts unsaved changes', async ({ page, pageHelpers, dataFixture }) => {
    await dataFixture.resetTestData();
    
    // Navigate to first team's details
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    const firstTeamCard = page.locator('[data-testid^="team-card-"]').first();
    await firstTeamCard.click();
    await pageHelpers.waitForPageLoad();
    
    // Get initial checkbox state
    const checkbox = pageHelpers.getCheckbox('codebase', 0);
    const initialState = await checkbox.isChecked();
    
    // Toggle the checkbox
    await checkbox.click();
    
    // Verify state changed
    expect(await checkbox.isChecked()).toBe(!initialState);
    
    // Verify unsaved changes bar appears
    const unsavedChangesBar = page.locator('[data-testid="unsaved-changes-bar"]');
    await expect(unsavedChangesBar).toBeVisible();
    
    // Click Cancel button
    const cancelButton = pageHelpers.getCancelButton();
    await cancelButton.click();
    
    // Wait for page to reload and data to be restored
    await pageHelpers.waitForPageLoad();
    
    // Re-locate checkbox after reload
    const checkboxAfterCancel = pageHelpers.getCheckbox('codebase', 0);
    
    // Verify checkbox reverted to original state
    expect(await checkboxAfterCancel.isChecked()).toBe(initialState);
    
    // Verify unsaved changes bar disappeared
    await expect(unsavedChangesBar).not.toBeVisible();
  });
});
