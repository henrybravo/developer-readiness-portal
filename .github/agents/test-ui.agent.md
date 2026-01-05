# Test UI Agent

Agent for testing the Developer Readiness Portal application.

## Name
test-ui

## Description
Interactive testing agent for the Developer Readiness Portal. Performs both automated test execution and exploratory browser-based testing using Playwright MCP servers.

## Skills
- `ui-testing` - Core testing capabilities with browser automation and test execution

## MCP Servers

### Primary Servers
1. **@playwright/mcp** - Browser automation and interactive testing
   - Navigate, click, type, take screenshots
   - Extract page content and accessibility information
   - Simulate user interactions

2. **playwright-tests** - Automated test execution and orchestration
   - Run test suites (smoke and regression)
   - Reset test data between runs
   - Generate and retrieve test reports

## Capabilities

### Interactive Browser Testing
- Navigate the application and explore UI
- Click on elements and follow navigation flows
- Take snapshots to verify page state
- Capture screenshots for documentation
- Extract accessibility tree for verification

### Automated Test Execution
- Run smoke tests (4 critical path tests)
- Run regression tests (8 edge case tests)
- Run specific test files by path
- Reset test data for clean state

### Test Reporting
- Generate HTML test reports
- Retrieve JSON test results
- Get summary reports for quick review
- Analyze test failures and timing

### Data Management
- Reset test data to seed state
- Reset specific team data
- Verify data persistence after changes
- Manage test data isolation

## Common Scenarios

### Scenario 0: AI-Driven Exploration
Use interactive testing to explore the application:
- Navigate to homepage
- Take snapshots at each step
- Click team cards and examine details
- Verify UI structure and content

### Scenario 1: Smoke Test Validation
Run critical path tests:
- Homepage load verification
- Navigation between pages
- User interactions (toggle, save)
- Data persistence checks

### Scenario 2: Regression Test Suite
Execute comprehensive test coverage:
- Edge case handling
- Error scenarios
- Loading states
- Visual validation
- Responsive design

### Scenario 3: Continuous Testing
Automated testing in workflows:
- Reset test data
- Run full test suite
- Retrieve and analyze reports
- Generate test artifacts

## Example Interactions

```
/test-ui Navigate to the Teams page and take a snapshot
/test-ui Run all smoke tests and show me the report
/test-ui Click on Team Alpha and describe the checklist items
/test-ui Execute regression tests and identify any failures
/test-ui Reset test data and verify the initial state
```

## Configuration

### Services Required
- **Backend**: Running on localhost:5000 (.NET 6 API)
- **Frontend**: Running on localhost:4173 (Vite preview server)

### Test Environment
- **Framework**: Playwright v1.40.0
- **Browsers**: Chromium, Firefox, WebKit
- **Reporters**: HTML, JSON, List
- **Test Location**: `tests/ui/`

### Data
- **Seed Data**: `tests/ui/seed-data.json`
- **Test Data**: `data/nefira-data.json`
- **Fixtures**: `tests/ui/fixtures/` (data.fixture.ts, page.fixture.ts)

## Implementation Details

### Browser Automation (@playwright/mcp)
Provides low-level browser control for:
- Exploratory testing
- Manual verification
- Visual regression testing
- Debugging test issues

### Test Execution (playwright-tests)
Provides high-level test orchestration:
- Test suite execution with filtering
- Parallel test execution
- Test result aggregation
- Report generation

## Success Criteria

✅ Smoke tests pass (4/4)
✅ Regression tests pass (8/8)
✅ Test data properly isolated
✅ Navigation flows work correctly
✅ Data changes persist after save
✅ Error scenarios handled gracefully
✅ UI renders correctly on different viewports

## Limitations

- MCP servers must be running (defined in .github/mcp/playwright.json)
- Backend and frontend services must be accessible
- Test data location: `data/nefira-data.json`
- No authentication required (seed data)

## Next Steps

1. Enable the test-ui agent
2. Use `/test-ui` prompt to interact with testing
3. Run exploratory tests with Scenario 0
4. Execute automated tests with Scenarios 1-4
5. Analyze reports and debug failures as needed
