# 0005 Testing and CI/CD Strategy

**Date**: 2025-12-30  
**Status**: Accepted

## Context

The Nefira Developer Readiness Portal must support automated UI testing to validate functionality and demonstrate testing workflows. Per PRD requirements:
- Automated UI tests must run via Playwright
- Tests must execute in CI/CD pipeline via GitHub Actions
- Tests must validate all critical user flows
- Test results must include pass/fail status, logs, and screenshots
- Tests must be runnable against containerized application
- Tests must complete within 30 seconds

The application also includes MCP integration that triggers Playwright tests from the portal UI.

## Decision Drivers

- **Mandate**: Playwright for UI tests, GitHub Actions for CI/CD (per PRD)
- **Demo Focus**: Tests demonstrate GitHub Copilot value and automation
- **Reliability**: Tests must be stable and pass consistently
- **Speed**: Test execution under 30 seconds
- **Container Integration**: Tests must run against docker-compose services
- **Screenshot Capture**: Visual verification for test results
- **Simplicity**: Minimal test infrastructure complexity
- **Developer Experience**: Easy to write and debug tests

## Considered Options

### Option 1: Playwright with GitHub Actions
**Description**: Use Playwright for end-to-end tests, run in GitHub Actions workflow on push/PR, execute against containerized services.

**Pros**:
- **Explicit requirement** - PRD mandates this approach
- **Modern framework** - Playwright is current industry best practice
- **Multi-browser** - Can test Chromium, Firefox, WebKit
- **Auto-wait** - Intelligent waiting reduces flaky tests
- **Screenshot/video** - Built-in visual debugging
- **Codegen** - Can generate tests from interactions
- **TypeScript support** - Type-safe test code
- **GitHub integration** - Native GitHub Actions support
- **Parallel execution** - Fast test runs
- **Developer-friendly** - Great debugging experience

**Cons**:
- **Browser dependencies** - Need to install browser binaries
- **CI setup complexity** - Must start containers, wait for health
- **Learning curve** - Developers unfamiliar with Playwright need training

### Option 2: Selenium with Jenkins
**Description**: Traditional Selenium WebDriver tests running in Jenkins CI server.

**Pros**:
- **Mature** - Long-established testing framework
- **Wide browser support** - Supports all major browsers
- **Large community** - Extensive documentation and examples

**Cons**:
- **NOT ALIGNED** - PRD explicitly requires Playwright + GitHub Actions
- **Flaky tests** - Manual waits lead to unreliable tests
- **Slow** - Selenium is slower than Playwright
- **Jenkins overhead** - Need to run and maintain Jenkins server
- **Complex setup** - WebDriver configuration is cumbersome
- **Poor DX** - Debugging is painful compared to Playwright
- **Against simplicity** - Jenkins adds unnecessary complexity

### Option 3: Cypress with GitHub Actions
**Description**: Use Cypress for component and E2E tests with GitHub Actions.

**Pros**:
- **Developer-friendly** - Great test runner UI
- **Fast feedback** - Time-travel debugging
- **Component testing** - Can test React components in isolation
- **Good documentation** - Excellent learning resources

**Cons**:
- **NOT ALIGNED** - PRD requires Playwright specifically
- **Chromium only** - Limited browser coverage (no Firefox/WebKit)
- **Framework coupling** - Best for React but adds dependency
- **MCP integration unclear** - Would need custom integration
- **Switching cost** - Why change when Playwright is specified?

## Decision Outcome

**Chosen Option**: Playwright with GitHub Actions

**Rationale**:
1. **Explicit requirement** - PRD mandates Playwright + GitHub Actions
2. **Best-in-class** - Playwright is the modern standard for reliable E2E tests
3. **MCP alignment** - Playwright MCP integration is specified for test runner feature
4. **Auto-wait intelligence** - Reduces flaky tests, improves demo reliability
5. **Screenshot capability** - Native support for visual test results
6. **GitHub integration** - First-class GitHub Actions support
7. **Developer experience** - Excellent debugging and codegen tools
8. **Multi-browser** - Can validate cross-browser compatibility
9. **Speed** - Parallel execution meets < 30 second requirement

This is the obvious choice given PRD requirements and modern testing best practices.

## Consequences

### Positive
- **Reliable tests** - Auto-wait reduces flakiness
- **Fast execution** - Parallel tests complete quickly
- **Visual debugging** - Screenshots help diagnose failures
- **Easy authoring** - Codegen can generate initial tests
- **TypeScript tests** - Type safety in test code
- **GitHub integration** - Automatic PR checks
- **Good DX** - UI mode for interactive debugging
- **MCP compatible** - Direct alignment with MCP Playwright server

### Negative
- **Browser binaries** - Need to download ~400MB of browsers
- **CI setup** - Workflow must start containers and wait for health
- **New to some** - Developers may need to learn Playwright API

### Neutral
- Tests can run locally or in CI identically
- Can add visual regression testing later if needed
- Component testing possible but not required for demo app

## Implementation Notes

### Test Structure

```
tests/
├── ui/
│   ├── tests/
│   │   ├── teams-overview.spec.ts
│   │   ├── team-details.spec.ts
│   │   ├── checklist-updates.spec.ts
│   │   ├── upgrade-planner.spec.ts
│   │   └── test-runner.spec.ts
│   ├── playwright.config.ts
│   ├── package.json
│   └── .gitignore
```

### Playwright Configuration

```typescript
// tests/ui/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'cd ../.. && docker-compose up',
    url: 'http://localhost:3000',
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
```

### Sample Test

```typescript
// tests/ui/tests/teams-overview.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Teams Overview', () => {
  test('should display team dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Verify Nefira branding
    await expect(page.locator('h1')).toContainText('Nefira');
    
    // Verify teams are displayed
    const teamCards = page.locator('[data-testid="team-card"]');
    await expect(teamCards).toHaveCountGreaterThan(0);
    
    // Verify status indicators
    const statusIndicator = page.locator('[data-testid="status-indicator"]').first();
    await expect(statusIndicator).toBeVisible();
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'screenshots/teams-overview.png' });
  });

  test('should navigate to team details', async ({ page }) => {
    await page.goto('/');
    
    // Click first team
    const firstTeam = page.locator('[data-testid="team-card"]').first();
    const teamName = await firstTeam.textContent();
    await firstTeam.click();
    
    // Verify navigation
    await expect(page).toHaveURL(/\/teams\/.+/);
    
    // Verify checklist visible
    await expect(page.locator('[data-testid="checklist"]')).toBeVisible();
  });
});
```

### GitHub Actions Workflow

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Start application
        run: docker-compose up -d
      
      - name: Wait for application health
        run: |
          timeout 60 bash -c 'until curl -f http://localhost:3000; do sleep 2; done'
          timeout 60 bash -c 'until curl -f http://localhost:5000/health; do sleep 2; done'
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: tests/ui/package-lock.json
      
      - name: Install dependencies
        run: |
          cd tests/ui
          npm ci
      
      - name: Install Playwright browsers
        run: |
          cd tests/ui
          npx playwright install --with-deps chromium
      
      - name: Run Playwright tests
        run: |
          cd tests/ui
          npx playwright test
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: tests/ui/playwright-report/
          retention-days: 30
      
      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: screenshots
          path: tests/ui/screenshots/
          retention-days: 7
      
      - name: Shutdown application
        if: always()
        run: docker-compose down
```

### Test Data Attributes

Frontend components should include test IDs:

```tsx
// React component example
<div data-testid="team-card" onClick={handleClick}>
  <h3 data-testid="team-name">{team.name}</h3>
  <span data-testid="status-indicator" className={statusClass}>
    {team.readiness}
  </span>
</div>
```

### MCP Integration Test

```typescript
// tests/ui/tests/test-runner.spec.ts
test('should run Playwright test via MCP', async ({ page }) => {
  await page.goto('/teams/team-001');
  
  // Click test runner button
  await page.locator('[data-testid="run-test-button"]').click();
  
  // Wait for test execution
  await expect(page.locator('[data-testid="test-status"]'))
    .toContainText('Running', { timeout: 2000 });
  
  // Wait for results
  await expect(page.locator('[data-testid="test-status"]'))
    .toContainText(/Passed|Failed/, { timeout: 30000 });
  
  // Verify logs displayed
  await expect(page.locator('[data-testid="test-logs"]')).toBeVisible();
  
  // Verify screenshot displayed (if test passed)
  const screenshot = page.locator('[data-testid="test-screenshot"]');
  if (await screenshot.isVisible()) {
    await expect(screenshot.locator('img')).toHaveAttribute('src', /.+/);
  }
});
```

### Local Test Execution

```bash
# Start application
docker-compose up -d

# Run tests in UI mode (interactive)
cd tests/ui
npx playwright test --ui

# Run tests in headed mode (watch browser)
npx playwright test --headed

# Run specific test file
npx playwright test teams-overview.spec.ts

# Generate test code
npx playwright codegen http://localhost:3000

# View last test report
npx playwright show-report
```

### Test Coverage Strategy

**Critical Paths (Must Test)**:
1. View teams dashboard
2. Navigate to team details
3. Toggle checklist items
4. View upgrade plan
5. Run test via MCP integration

**Nice to Have**:
- Status indicator color changes
- Error message display
- Loading states
- Mobile responsiveness

**Out of Scope**:
- Component unit tests (React Testing Library)
- API unit tests (separate backend tests)
- Performance testing
- Visual regression testing

## References

- [PRD Section 6: Technical Stack Constraints](../prd.md#technical-stack-constraints)
- [PRD Section 9: Deployment - GitHub Actions](../prd.md#deployment)
- [PRD REQ-4: Automated Test Execution](../prd.md#req-4-automated-test-execution)
- [PRD REQ-8: Automated Testing Pipeline](../prd.md#req-8-automated-testing-pipeline)
- [PRD Story 4: Run Automated UI Tests](../prd.md#story-4-run-automated-ui-tests)
- [Technical Stack: Testing Strategy](../../docs/technical-stack.md#testing-strategy)
- [Playwright Documentation](https://playwright.dev/)
- [Playwright GitHub Actions](https://playwright.dev/docs/ci-intro)
