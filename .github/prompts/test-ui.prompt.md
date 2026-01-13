# /test-ui - Developer Readiness Portal Testing

Execute interactive or automated tests against the Developer Readiness Portal.

## Usage

```
/test-ui [action] [options]
```

## Actions

### Interactive Browser Testing
Use @playwright/mcp to explore and test interactively.

```
/test-ui navigate [url]
Navigate to a URL and take a snapshot of the page.

/test-ui click [selector/description]
Click an element and show the updated page state.

/test-ui screenshot [description]
Take a screenshot of the current page.

/test-ui snapshot
Get the accessibility tree of the current page.

/test-ui type [text]
Type text into the active input element.
```

### Automated Test Execution
Use playwright-tests MCP server to run tests.

```
/test-ui run smoke
Run all smoke tests (4 critical path tests).

/test-ui run regression
Run all regression tests (8 edge case tests).

/test-ui run all
Run complete test suite (smoke + regression).

/test-ui run [test-name]
Run a specific test by name (e.g., SMOKE-001, REG-002).
```

### Test Data Management
Use playwright-tests MCP server for data operations.

```
/test-ui reset-data
Reset all test data to seed state.

/test-ui reset-data [team-id]
Reset specific team data (e.g., team-alpha, team-beta).
```

### Test Reporting
Retrieve and analyze test results.

```
/test-ui report [format]
Get test report in format: summary (default), html, json.

/test-ui report summary
Show quick summary of last test run.

/test-ui report html
Generate HTML test report.

/test-ui report json
Get raw JSON test results.
```

## Examples

### Explore the Application
```
/test-ui navigate http://localhost:4173
/test-ui snapshot
/test-ui click "Team Alpha"
/test-ui screenshot
```

### Run Smoke Tests
```
/test-ui run smoke
/test-ui report summary
```

### Run Full Regression Suite
```
/test-ui reset-data
/test-ui run all
/test-ui report html
```

### Test Specific Scenario
```
/test-ui run SMOKE-004
/test-ui report json
```

### Verify Data Persistence
```
/test-ui navigate http://localhost:4173/teams/team-alpha
/test-ui click "checkbox-codebase-0"
/test-ui screenshot
/test-ui click "save-btn"
/test-ui navigate http://localhost:4173/teams/team-alpha
/test-ui screenshot
```

## MCP Servers

This prompt uses two Playwright MCP servers:

### 1. @playwright/mcp
Browser automation for interactive testing.

**Tools:**
- `browser_navigate` - Navigate to URL
- `browser_click` - Click elements
- `browser_type` - Type text
- `browser_snapshot` - Get accessibility tree
- `browser_take_screenshot` - Capture page
- `browser_hover` - Hover over elements
- `browser_select_option` - Select dropdown

**Use Cases:**
- Exploratory testing
- Visual verification
- Manual workflow testing
- Debugging issues
- Screenshot documentation

### 2. playwright-tests
Test execution and orchestration.

**Tools:**
- `test:run-suite` - Execute test suite
- `test:run-single` - Run specific test
- `test:reset-data` - Reset test data
- `test:get-report` - Retrieve test report

**Use Cases:**
- Automated test execution
- Regression validation
- Test result analysis
- Data isolation
- CI/CD integration

## Test Suites

### Smoke Tests (Critical Paths)
- **SMOKE-001**: Homepage loads with teams grid
- **SMOKE-002**: Navigate to team details page
- **SMOKE-003**: Toggle checkbox shows unsaved changes bar
- **SMOKE-004**: Save changes shows success toast

**Use:** Verify essential application functionality

### Regression Tests (Edge Cases)
- **REG-001**: Empty state handling
- **REG-003**: Cancel operation reverts changes
- **REG-004**: Loading states and skeletons
- **REG-005**: Progress bar accuracy
- **REG-006**: Status badge colors
- **REG-007**: Responsive layout (mobile/desktop)
- **REG-008**: Grid column rendering

**Use:** Validate behavior under various conditions

## Prerequisites

### Running Services
```bash
# Terminal 1: Start backend
cd backend && dotnet run
# Listens on localhost:5000

# Terminal 2: Start frontend
cd frontend && npm run preview
# Runs on localhost:4173
```

### Available Resources
- Test data: `tests/ui/seed-data.json`
- Test infrastructure: `tests/ui/`
- MCP configuration: `.vscode/mcp.json`
- Test manual: `docs/test-manual.md`

## Selectors Reference

Use these `data-testid` values for clicking/selecting:

| Element | Selector |
|---------|----------|
| Teams container | `teams-container` |
| Team card | `team-card-{id}` (e.g., `team-card-team-alpha`) |
| Checklist item | `checkbox-{category}-{index}` (e.g., `checkbox-codebase-0`) |
| Save button | `save-btn` |
| Cancel button | `cancel-btn` |
| Unsaved bar | `unsaved-changes-bar` |
| Toast | `toast` |
| Status badge | `status-badge` |
| Back link | `back-link` |

## Output Formats

### Summary Report
Quick overview of test results with pass/fail counts and timing.

### HTML Report
Interactive report with screenshots, videos, and detailed traces.

### JSON Report
Raw test results for programmatic analysis.

## Troubleshooting

### Services Not Running
Ensure both backend and frontend are running:
```bash
ps aux | grep "dotnet\|npm"
```

### Test Failures
1. Check the report for error details
2. Review screenshots/videos in HTML report
3. Use interactive mode to explore the issue
4. Reset test data and retry

### Stale Data
Reset test data to seed state:
```
/test-ui reset-data
```

### Browser Issues
If @playwright/mcp has issues:
1. Verify Chromium is installed
2. Check MCP configuration in `.vscode/mcp.json`
3. Review error messages in agent output

## Documentation

- **Full Guide**: `docs/test-manual.md`
- **Agent Configuration**: `.github/agents/test-ui.agent.md`
- **Skill Details**: `.github/skills/ui-testing/SKILL.md`
- **Setup Guide**: `docs/TEST-UI-SETUP.md`
- **Framework Overview**: `docs/testing-framework.md`
- **MCP Configuration**: `.vscode/mcp.json`
- **Test Code**: `tests/ui/`

## Related Resources

- Playwright Documentation: https://playwright.dev
- MCP Protocol: https://modelcontextprotocol.io
- GitHub Copilot: https://github.com/copilot
