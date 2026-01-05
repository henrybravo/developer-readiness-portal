# UI Testing Skill

Comprehensive skill for testing the Developer Readiness Portal using Playwright and MCP servers.

## Overview

This skill enables testing the application through two complementary approaches:
1. **@playwright/mcp** - Browser automation for interactive testing and exploration
2. **Custom playwright-tests MCP server** - Automated test execution and reporting

## Capabilities

### Browser Automation (@playwright/mcp)
- Navigate to URLs and explore the application
- Interact with UI elements (click, type, hover, select)
- Take snapshots and screenshots for visual verification
- Extract page content and accessibility tree
- Simulate user workflows and edge cases

### Test Execution (playwright-tests)
- Run smoke tests for critical paths
- Execute regression test suites
- Reset test data between runs
- Generate and retrieve test reports
- Validate application state changes

## Test Suites

### Smoke Tests (4 tests)
- **SMOKE-001**: Homepage loads with teams grid
- **SMOKE-002**: Navigate to team details page
- **SMOKE-003**: Toggle checkbox shows unsaved changes bar
- **SMOKE-004**: Save changes shows success toast

### Regression Tests (8 tests)
- **REG-001**: Empty teams state renders correctly
- **REG-003**: Cancel reverts unsaved changes
- **REG-004**: Skeleton loader visible during loading
- **REG-005**: Progress bar accuracy
- **REG-006**: Status badge colors match readiness levels
- **REG-007**: Mobile layout adapts to viewport
- **REG-008**: Grid renders correct number of columns

## Common Tasks

### Interactive Testing
Use @playwright/mcp for exploratory testing:
```
Navigate to http://localhost:4173 and take a snapshot
Click on Team Alpha and describe the checklist
Toggle a checkbox and verify unsaved bar appears
```

### Automated Testing
Use playwright-tests for regression validation:
```
Run all smoke tests
Execute regression test suite
Reset test data and verify initial state
Get test report in summary format
```

### Visual Validation
Combine both servers:
```
Navigate to page with @playwright/mcp
Take screenshot for visual comparison
Run related regression tests to validate behavior
```

## Prerequisites

### Backend Service
```bash
cd backend && dotnet run
# Runs on localhost:5000
```

### Frontend Service
```bash
cd frontend && npm run preview
# Runs on localhost:4173
```

## MCP Servers

### @playwright/mcp
Browser automation server for interactive testing.

**Tools:**
- `browser_navigate(url)` - Navigate to URL
- `browser_click(selector)` - Click element
- `browser_type(text)` - Type into input
- `browser_snapshot()` - Get accessibility tree
- `browser_take_screenshot()` - Capture page image
- `browser_hover(selector)` - Hover over element
- `browser_select_option(selector, value)` - Select dropdown

### playwright-tests
Custom server for test orchestration and reporting.

**Tools:**
- `test:run-suite(type)` - Run smoke/regression/all tests
- `test:reset-data(teamId?)` - Reset test data
- `test:run-single(filePath)` - Run specific test file
- `test:get-report(format)` - Get report (html/json/summary)

## Test Data

Tests use isolated data with automatic reset:
- Seed data file: `tests/ui/seed-data.json`
- Test data location: `data/nefira-data.json`
- Data resets before each test for idempotency

## Selectors

UI elements use stable `data-testid` attributes:
- `[data-testid="teams-container"]` - Teams grid container
- `[data-testid="team-card-{id}"]` - Individual team card
- `[data-testid="checkbox-{category}-{index}"]` - Checklist items
- `[data-testid="save-btn"]` - Save button
- `[data-testid="cancel-btn"]` - Cancel button
- `[data-testid="unsaved-changes-bar"]` - Unsaved indicator
- `[data-testid="toast"]` - Notification toast

## Best Practices

1. **Isolation**: Always reset test data before new test session
2. **Verification**: Use snapshots to verify state before taking action
3. **Cleanup**: Cancel or save changes to return to clean state
4. **Reporting**: Get test reports after execution for documentation
5. **Exploration**: Use interactive testing to understand flows before automating

## Documentation

- **Agent**: `.github/agents/test-ui.agent.md`
- **Prompt**: `.github/prompts/test-ui.prompt.md`
- **Quick Ref**: `.github/prompts/test-ui.quick-ref.prompt.md`
- **Setup**: `docs/TEST-UI-SETUP.md`
- **Manual**: `docs/test-manual.md`
- **Framework**: `docs/testing-framework.md`
