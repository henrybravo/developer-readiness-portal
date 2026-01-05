import { test, expect } from '../../fixtures';

test.describe('Responsive Design @regression', () => {
  /**
   * REG-007: Mobile Responsive Layout
   * Verifies layout adapts correctly on mobile viewports
   */
  test('REG-007: Grid changes from 2-column to 1-column on mobile', async ({ page, pageHelpers, dataFixture }) => {
    await dataFixture.resetTestData();
    
    // Start with desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    // Get the teams grid
    const teamsGrid = page.locator('[data-testid="teams-grid"]');
    await expect(teamsGrid).toBeVisible();
    
    // On desktop, grid should have 2 columns (md:grid-cols-2)
    const desktopGridClass = await teamsGrid.getAttribute('class');
    expect(desktopGridClass).toContain('md:grid-cols-2');
    
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for layout to adjust
    await page.waitForTimeout(500);
    
    // Grid should still be visible
    await expect(teamsGrid).toBeVisible();
    
    // Verify team cards are stacked (1 column on mobile)
    // The grid-cols-1 class should apply at mobile width
    const teamCards = pageHelpers.getAllTeamCards();
    const cardCount = await teamCards.count();
    
    if (cardCount >= 2) {
      // Get bounding boxes of first two cards
      const firstCard = teamCards.first();
      const secondCard = teamCards.nth(1);
      
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();
      
      expect(firstBox).not.toBeNull();
      expect(secondBox).not.toBeNull();
      
      // In 1-column layout, cards should be stacked vertically
      // Second card's top should be below first card's bottom
      expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 10);
    }
  });

  /**
   * REG-008: Multiple Teams Render in Grid
   * Verifies all teams render correctly in the grid layout
   */
  test('REG-008: All teams render in grid', async ({ page, pageHelpers, dataFixture }) => {
    await dataFixture.resetTestData();
    const teams = await dataFixture.getTestData();
    
    await page.goto('/');
    await pageHelpers.waitForPageLoad();
    
    // Get all team cards
    const teamCards = pageHelpers.getAllTeamCards();
    const cardCount = await teamCards.count();
    
    // Should match the number of teams in data
    expect(cardCount).toBe(teams.length);
    
    // Verify each team has a card
    for (const team of teams) {
      const teamCard = pageHelpers.getTeamCard(team.id);
      await expect(teamCard).toBeVisible();
    }
    
    // Verify team count text is displayed
    const countText = page.getByText(new RegExp(`Showing ${teams.length} team`));
    await expect(countText).toBeVisible();
  });
});
