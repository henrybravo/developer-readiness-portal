import { test, expect } from '../../fixtures';

test.describe('Responsive Design @regression', () => {
  /**
   * REG-007: Mobile Responsive Layout
   * Verifies layout adapts correctly on mobile viewports
   */
  test('REG-007: Grid changes from 2-column to 1-column on mobile @regression', async ({ page }) => {
    // Desktop: 2-column layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForSelector('[data-testid="teams-grid"]');

    const grid = page.locator('[data-testid="teams-grid"]');
    await expect(grid).toBeVisible();

    const cards = page.locator('[data-testid^="team-card-"]');
    const count = await cards.count();

    if (count >= 2) {
      const firstCard = cards.nth(0);
      const secondCard = cards.nth(1);
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();
      // In 2-column layout, cards are side by side (same Y, different X)
      expect(firstBox?.y).toBeCloseTo(secondBox?.y ?? 0, -1);
    }

    // Mobile: 1-column layout, cards stack vertically
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300); // Wait for CSS media query

    if (count >= 2) {
      const firstCard = cards.nth(0);
      const secondCard = cards.nth(1);
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();
      // In 1-column layout, cards stack (second card has larger Y)
      expect(secondBox?.y).toBeGreaterThan((firstBox?.y ?? 0) + 50);
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
