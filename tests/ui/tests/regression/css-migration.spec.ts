import { test, expect } from '../../fixtures';

test.describe('CSS Migration - Font Awesome Icons', () => {

  test('CSSM-001: Font Awesome CSS is loaded from CDN @regression', async ({ page }) => {
    await page.goto('/');
    // Verify the FA stylesheet is in the document head
    const faLink = page.locator('link[href*="font-awesome"]');
    await expect(faLink).toHaveCount(1);
  });

  test('CSSM-002: Status badges render with data-status attribute @regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="teams-grid"]');

    const badges = page.locator('[data-testid="status-badge"]');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const badge = badges.nth(i);
      const status = await badge.getAttribute('data-status');
      expect(['green', 'yellow', 'red', 'unknown']).toContain(status);
      // FA circle icon should be inside the badge
      const icon = badge.locator('i.fa-solid.fa-circle');
      await expect(icon).toHaveCount(1);
    }
  });

  test('CSSM-003: Checklist section renders FA category icons @regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid^="team-card-"]');
    await page.locator('[data-testid^="team-card-"]').first().click();
    await page.waitForSelector('[data-testid="checklist-codebase"]');

    // The codebase checklist header should contain a FA icon (fa-code)
    const checklistHeader = page.locator('[data-testid="checklist-codebase"] button');
    const icon = checklistHeader.locator('i.fa-solid');
    await expect(icon).toHaveCount(1);
  });

  test('CSSM-004: Teams grid uses semantic CSS class @regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="teams-grid"]');

    const grid = page.locator('[data-testid="teams-grid"]');
    await expect(grid).toHaveClass(/teams-grid/);
  });

  test('CSSM-005: Back button in team details uses FA icon @regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid^="team-card-"]');
    await page.locator('[data-testid^="team-card-"]').first().click();
    await page.waitForSelector('[data-testid="back-link"]');

    const backLink = page.locator('[data-testid="back-link"]');
    const icon = backLink.locator('i.fa-solid.fa-chevron-left');
    await expect(icon).toHaveCount(1);
  });

});
