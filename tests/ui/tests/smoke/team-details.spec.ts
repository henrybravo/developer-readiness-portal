import { test, expect } from '../../fixtures';

test.describe('Team Details Page @smoke', () => {
  test.beforeEach(async ({ page, dataFixture }) => {
    // Reset test data to ensure consistent state
    await dataFixture.resetTestData();
  });

  /**
   * SMOKE-003: Toggle Checklist Item
   * Verifies toggling a checkbox shows unsaved changes bar
   */
  test('SMOKE-003: Toggle checkbox shows unsaved changes bar', async ({ page, pageHelpers }) => {
    // Navigate to first team's details page
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    // Click on first team card
    const firstTeamCard = page.locator('[data-testid^="team-card-"]').first();
    await firstTeamCard.click();
    await pageHelpers.waitForPageLoad();
    
    // Find the first checkbox (codebase category, first item)
    const checkbox = pageHelpers.getCheckbox('codebase', 0);
    await expect(checkbox).toBeVisible();
    
    // Get initial checked state
    const isInitiallyChecked = await checkbox.isChecked();
    
    // Click on the checkbox to toggle it
    await checkbox.click();
    
    // Verify checkbox state changed
    const isNowChecked = await checkbox.isChecked();
    expect(isNowChecked).toBe(!isInitiallyChecked);
    
    // Verify unsaved changes bar appears
    const unsavedChangesBar = page.locator('[data-testid="unsaved-changes-bar"]');
    await expect(unsavedChangesBar).toBeVisible();
    
    // Verify "You have unsaved changes" text is visible
    await expect(unsavedChangesBar).toContainText('unsaved changes');
    
    // Verify Save Changes button is visible
    const saveButton = pageHelpers.getSaveButton();
    await expect(saveButton).toBeVisible();
    
    // Verify Cancel button is visible
    const cancelButton = pageHelpers.getCancelButton();
    await expect(cancelButton).toBeVisible();
  });

  /**
   * SMOKE-004: Save Changes
   * Verifies saving changes shows success toast and persists the change
   */
  test('SMOKE-004: Save changes shows success toast', async ({ page, pageHelpers }) => {
    // Navigate to first team's details page
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    // Click on first team card
    const firstTeamCard = page.locator('[data-testid^="team-card-"]').first();
    await firstTeamCard.click();
    await pageHelpers.waitForPageLoad();
    
    // Find and toggle a checkbox
    const checkbox = pageHelpers.getCheckbox('codebase', 0);
    const isInitiallyChecked = await checkbox.isChecked();
    await checkbox.click();
    
    // Wait for unsaved changes bar to appear
    const unsavedChangesBar = page.locator('[data-testid="unsaved-changes-bar"]');
    await expect(unsavedChangesBar).toBeVisible();
    
    // Click Save Changes button
    const saveButton = pageHelpers.getSaveButton();
    await saveButton.click();
    
    // Verify success toast appears
    const toast = pageHelpers.getToast();
    await expect(toast).toBeVisible({ timeout: 5000 });
    await expect(toast).toContainText(/saved successfully/i);
    
    // Verify toast has success type
    await expect(toast).toHaveAttribute('data-toast-type', 'success');
    
    // Verify unsaved changes bar disappears
    await expect(unsavedChangesBar).not.toBeVisible({ timeout: 3000 });
    
    // Verify checkbox state persists after page reload
    const currentUrl = page.url();
    await page.reload();
    await pageHelpers.waitForPageLoad();
    
    // Re-locate the checkbox after reload
    const checkboxAfterReload = pageHelpers.getCheckbox('codebase', 0);
    const isCheckedAfterReload = await checkboxAfterReload.isChecked();
    
    // The checkbox should have the toggled state (opposite of initial)
    expect(isCheckedAfterReload).toBe(!isInitiallyChecked);
  });
});
