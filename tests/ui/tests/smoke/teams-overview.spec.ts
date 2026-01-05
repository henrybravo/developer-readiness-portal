import { test, expect } from '../../fixtures';

test.describe('Teams Overview Page @smoke', () => {
  test.beforeEach(async ({ page, dataFixture }) => {
    // Reset test data to ensure consistent state
    await dataFixture.resetTestData();
  });

  /**
   * SMOKE-001: Homepage Loads
   * Verifies that the homepage loads correctly with teams grid visible
   */
  test('SMOKE-001: Homepage loads with teams grid', async ({ page, pageHelpers }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to fully load
    await pageHelpers.waitForPageLoad();
    
    // Verify page title contains expected text
    await expect(page).toHaveTitle(/Developer Readiness|Readiness Portal/i);
    
    // Verify teams container is visible (wait for it)
    const teamsContainer = page.locator('[data-testid="teams-container"]');
    await expect(teamsContainer).toBeVisible({ timeout: 10000 });
    
    // Verify teams grid is visible
    const teamsGrid = page.locator('[data-testid="teams-grid"]');
    await expect(teamsGrid).toBeVisible();
    
    // Verify at least 1 team card is displayed
    const teamCards = pageHelpers.getAllTeamCards();
    await expect(teamCards.first()).toBeVisible({ timeout: 10000 });
    const count = await teamCards.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify no error messages visible
    const errorContainer = page.locator('[data-testid="error-container"]');
    await expect(errorContainer).not.toBeVisible();
  });

  /**
   * SMOKE-002: Navigate to Team Details
   * Verifies clicking on a team card navigates to the team details page
   */
  test('SMOKE-002: Navigate to team details page', async ({ page, pageHelpers }) => {
    // Navigate to homepage
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    // Get the first team card
    const firstTeamCard = page.locator('[data-testid^="team-card-"]').first();
    await expect(firstTeamCard).toBeVisible();
    
    // Get the team ID from the data-testid
    const testId = await firstTeamCard.getAttribute('data-testid');
    const teamId = testId?.replace('team-card-', '');
    
    // Click on the team card
    await firstTeamCard.click();
    
    // Verify URL changed to team details page
    await expect(page).toHaveURL(new RegExp(`/teams/${teamId}`));
    
    // Wait for page to load
    await pageHelpers.waitForPageLoad();
    
    // Verify team name heading is visible (the main content h1, not the header)
    const heading = page.locator('h1').filter({ hasText: /Team/ });
    await expect(heading).toBeVisible();
    
    // Verify tech stack section is displayed
    const techStackSection = page.getByText('Technology Stack');
    await expect(techStackSection).toBeVisible();
    
    // Verify at least one checklist section is visible
    const checklistSection = page.locator('[data-testid^="checklist-"]').first();
    await expect(checklistSection).toBeVisible();
    
    // Verify back link is present
    const backLink = pageHelpers.getBackLink();
    await expect(backLink).toBeVisible();
  });
});
