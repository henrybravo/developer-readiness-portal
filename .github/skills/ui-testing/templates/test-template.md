# UI Testing Template

Template for creating new test suites and extending the Developer Readiness Portal testing framework.

## Test File Template

Use this template to create new test files in `tests/ui/tests/`:

```typescript
import { test, expect } from '@playwright/test';
import { dataFixture } from '../fixtures/data.fixture';
import { pageFixture } from '../fixtures/page.fixture';

test.describe('Feature Name @category', () => {
  test.beforeEach(async ({ page }) => {
    // Reset test data before each test
    await dataFixture.resetTestData();
    // Navigate to starting page
    await page.goto('/');
  });

  test('TEST-001: Test description @smoke', async ({ page }) => {
    // Arrange: Set up initial state
    const teamCard = await pageFixture.getTeamCard(page, 'team-id');
    
    // Act: Perform user action
    await teamCard.click();
    
    // Assert: Verify expected outcome
    await expect(page).toHaveURL('/teams/team-id');
    const heading = page.locator('h1');
    await expect(heading).toContainText('Team Name');
  });

  test('TEST-002: Another test @regression', async ({ page }) => {
    // Test implementation
  });
});
```

## Key Components

### Test Structure
- **Describe block**: Group related tests
- **Before hook**: Set up state (reset data, navigate)
- **Test function**: Arrange → Act → Assert
- **Assertions**: Verify expected behavior

### Fixtures Usage

```typescript
// Data fixture - reset test data
await dataFixture.resetTestData();
await dataFixture.resetTestData('team-id');
const data = await dataFixture.getTestData();

// Page fixture - helper methods
const card = await pageFixture.getTeamCard(page, 'team-id');
const checkbox = await pageFixture.getCheckbox(page, 'codebase', 0);
const button = await pageFixture.getSaveButton(page);
const bar = await pageFixture.getUnsavedBar(page);
const toast = await pageFixture.getToast(page);
```

### Common Locators

```typescript
// By data-testid
page.locator('[data-testid="team-card-team-alpha"]');

// By role
page.locator('button', { hasText: 'Save' });

// By text
page.locator('text=Team Alpha');

// By CSS
page.locator('.teams-grid > .team-card');
```

## Test Categories

### Smoke Tests (@smoke)
Critical path tests - essential functionality.

```typescript
test('TEST-001: Feature works @smoke', async ({ page }) => {
  // Test critical user workflow
});
```

### Regression Tests (@regression)
Edge cases and error handling.

```typescript
test('TEST-002: Feature handles edge case @regression', async ({ page }) => {
  // Test error or boundary condition
});
```

## Assertion Examples

```typescript
// Navigation
await expect(page).toHaveURL('/teams/team-id');

// Element visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// Content
await expect(element).toContainText('Expected text');
await expect(element).toHaveAttribute('data-testid', 'team-card-alpha');

// State
await expect(checkbox).toBeChecked();
await expect(input).toHaveValue('typed text');

// Count
const elements = page.locator('[data-testid^="team-card"]');
await expect(elements).toHaveCount(4);
```

## Interactive Testing Template

For exploratory testing with @playwright/mcp:

```
/test-ui navigate [url]
/test-ui snapshot
/test-ui click "[data-testid='element-id']"
/test-ui type "text to enter"
/test-ui screenshot
```

## MCP-Based Testing

Use playwright-tests MCP server:

```
/test-ui run smoke
/test-ui run regression
/test-ui reset-data [team-id]
/test-ui report summary
```

## Test Data Management

### Seed Data Structure

```json
{
  "teams": [
    {
      "id": "team-alpha",
      "name": "Team Alpha",
      "status": "Red",
      "readinessScore": 23,
      "checklist": {
        "codebase": [true, false, false, false, false],
        "versioning": [true, true, false, false, false],
        "documentation": [true, false, false, false, false],
        "testing": [true, false, false, false, false],
        "copilot": [false, false, false, false, false],
        "modernization": [true, false, false, false, false]
      }
    }
  ]
}
```

### Reset Data in Tests

```typescript
test.beforeEach(async () => {
  // Full reset
  await dataFixture.resetTestData();
  
  // Specific team
  await dataFixture.resetTestData('team-beta');
  
  // Create new team
  await dataFixture.seedTeam({
    id: 'custom-team',
    name: 'Custom Team',
    status: 'Yellow'
  });
});
```

## Best Practices

1. **Isolation**: Always reset data before tests
2. **Descriptive Names**: Use clear test descriptions
3. **Single Assertion**: One behavior per test
4. **Page Objects**: Use fixtures for selectors
5. **Error Handling**: Test error scenarios
6. **Cleanup**: Reset state after tests if needed
7. **Performance**: Keep tests fast (< 10 seconds each)

## Debugging

### Run Single Test
```bash
npx playwright test test-file.spec.ts --grep "TEST-001"
```

### Debug Mode
```bash
npx playwright test --debug
npx playwright test --ui
```

### View Report
```bash
npx playwright show-report
```

## Performance Tips

- Reuse page navigation when possible
- Batch assertions
- Use focused selectors (data-testid preferred)
- Avoid arbitrary waits (use proper waits)
- Parallelize tests safely

## Examples

### Complete Test Example

```typescript
import { test, expect } from '@playwright/test';
import { dataFixture } from '../fixtures/data.fixture';
import { pageFixture } from '../fixtures/page.fixture';

test.describe('Team Checklist @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await dataFixture.resetTestData();
    await page.goto('/');
  });

  test('SMOKE-003: Toggle checkbox shows unsaved bar', async ({ page }) => {
    // Navigate to team
    const card = page.locator('[data-testid="team-card-team-alpha"]');
    await card.click();
    
    // Verify page loaded
    await expect(page).toHaveURL('/teams/team-alpha');
    
    // Toggle checkbox
    const checkbox = page.locator('[data-testid="checkbox-codebase-0"]');
    await checkbox.click();
    
    // Verify unsaved bar appears
    const unsavedBar = page.locator('[data-testid="unsaved-changes-bar"]');
    await expect(unsavedBar).toBeVisible();
    
    // Verify save button is enabled
    const saveBtn = page.locator('[data-testid="save-btn"]');
    await expect(saveBtn).toBeEnabled();
  });

  test('SMOKE-004: Save changes shows success toast', async ({ page }) => {
    // Navigate and toggle
    await page.goto('/teams/team-alpha');
    const checkbox = page.locator('[data-testid="checkbox-codebase-0"]');
    await checkbox.click();
    
    // Click save
    const saveBtn = page.locator('[data-testid="save-btn"]');
    await saveBtn.click();
    
    // Verify success toast
    const toast = page.locator('[data-testid="toast"]');
    await expect(toast).toContainText('Success');
    
    // Verify unsaved bar disappears
    const unsavedBar = page.locator('[data-testid="unsaved-changes-bar"]');
    await expect(unsavedBar).toBeHidden();
    
    // Reload and verify persistence
    await page.reload();
    await expect(checkbox).toBeChecked();
  });
});
```

## Integration

### With CI/CD
```yaml
# .github/workflows/playwright.yml
- name: Run tests
  run: npm test
- name: Upload report
  uses: actions/upload-artifact@v2
```

### With MCP
```
/test-ui run all
/test-ui report html
```

## Additional Resources

- Playwright Docs: https://playwright.dev
- Test Configuration: `tests/ui/playwright.config.ts`
- Fixtures: `tests/ui/fixtures/`
- Examples: `.github/skills/ui-testing/examples/`
- Setup Guide: `docs/TEST-UI-SETUP.md`
- Prompt Reference: `.github/prompts/test-ui.prompt.md`
