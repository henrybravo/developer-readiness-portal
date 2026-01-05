import { test as dataTest, expect, type DataFixture } from './data.fixture';
import type { Page, Locator } from '@playwright/test';

/**
 * Page helper methods for common UI interactions
 */
export interface PageHelpers {
  /**
   * Wait for the page to be fully loaded (no skeletons, data visible)
   */
  waitForPageLoad: () => Promise<void>;
  
  /**
   * Get a team card by team ID
   */
  getTeamCard: (teamId: string) => Locator;
  
  /**
   * Get all team cards
   */
  getAllTeamCards: () => Locator;
  
  /**
   * Get a checklist section by category key
   */
  getChecklistSection: (categoryKey: string) => Locator;
  
  /**
   * Get a checkbox by category and index
   */
  getCheckbox: (categoryKey: string, index: number) => Locator;
  
  /**
   * Get the save button
   */
  getSaveButton: () => Locator;
  
  /**
   * Get the cancel button
   */
  getCancelButton: () => Locator;
  
  /**
   * Get the back link
   */
  getBackLink: () => Locator;
  
  /**
   * Get a toast notification
   */
  getToast: () => Locator;
  
  /**
   * Wait for and verify toast message
   */
  expectToast: (expectedText: string, type?: 'success' | 'error') => Promise<void>;
  
  /**
   * Check if unsaved changes bar is visible
   */
  hasUnsavedChanges: () => Promise<boolean>;
}

/**
 * Extended test with page helpers and data fixture
 */
export const test = dataTest.extend<{ 
  pageHelpers: PageHelpers;
  dataFixture: DataFixture;
}>({
  pageHelpers: async ({ page }, use) => {
    const helpers: PageHelpers = {
      waitForPageLoad: async () => {
        // Wait for skeleton loaders to disappear
        await page.waitForSelector('[data-testid="skeleton"]', { state: 'hidden', timeout: 10000 }).catch(() => {});
        // Wait for main content to be visible
        await page.waitForLoadState('networkidle');
      },
      
      getTeamCard: (teamId: string) => {
        return page.locator(`[data-testid="team-card-${teamId}"]`);
      },
      
      getAllTeamCards: () => {
        return page.locator('[data-testid^="team-card-"]');
      },
      
      getChecklistSection: (categoryKey: string) => {
        return page.locator(`[data-testid="checklist-${categoryKey}"]`);
      },
      
      getCheckbox: (categoryKey: string, index: number) => {
        return page.locator(`[data-testid="checkbox-${categoryKey}-${index}"]`);
      },
      
      getSaveButton: () => {
        return page.locator('[data-testid="save-btn"]');
      },
      
      getCancelButton: () => {
        return page.locator('[data-testid="cancel-btn"]');
      },
      
      getBackLink: () => {
        return page.locator('[data-testid="back-link"]');
      },
      
      getToast: () => {
        return page.locator('[data-testid="toast"]');
      },
      
      expectToast: async (expectedText: string, type?: 'success' | 'error') => {
        const toast = page.locator('[data-testid="toast"]');
        await expect(toast).toBeVisible({ timeout: 5000 });
        await expect(toast).toContainText(expectedText);
        if (type) {
          await expect(toast).toHaveAttribute('data-toast-type', type);
        }
      },
      
      hasUnsavedChanges: async () => {
        const unsavedBar = page.locator('[data-testid="unsaved-changes-bar"]');
        return unsavedBar.isVisible();
      },
    };

    await use(helpers);
  },
});

export { expect };
