# GitHub Copilot Testing Framework

Testing infrastructure for Developer Readiness Portal using Playwright and MCP servers.

## Quick Start

### Enable the Test UI Agent
1. The agent is defined in `.github/agents/test-ui.agent.md`
2. The prompt is available as `/test-ui`
3. Skills are documented in `.github/skills/ui-testing/SKILL.md`

### Use the Prompt
```
/test-ui [action] [options]
```

### Example Interactions
```
/test-ui navigate http://localhost:4173
/test-ui run smoke
/test-ui report summary
```

## Directory Structure

```
.github/
├── mcp/                          # MCP server configurations
│   └── playwright.json           # Playwright servers config
├── agents/                       # Agent definitions
│   └── test-ui.agent.md         # Test UI agent
├── prompts/                      # Prompt definitions
│   ├── test-ui.prompt.md        # /test-ui prompt
│   └── test-ui.quick-ref.prompt.md # Quick reference
├── skills/                       # Skill definitions
│   └── ui-testing/              # UI testing skill
│       ├── SKILL.md
│       ├── examples/
│       └── templates/
└── README.md                     # This file
```

## MCP Servers

### @playwright/mcp
Official Playwright MCP server for browser automation.
- Browser control: navigate, click, type, hover
- Content extraction: snapshot, screenshot
- Element selection: by selector, by text, by role

### playwright-tests
Custom MCP server for test execution.
- Test execution: run-suite, run-single
- Data management: reset-data
- Reporting: get-report

## Test Infrastructure

### Location
```
tests/ui/
├── playwright.config.ts          # Playwright configuration
├── fixtures/
│   ├── data.fixture.ts          # Data reset/seeding
│   └── page.fixture.ts          # Page helpers
├── tests/
│   ├── smoke/                   # Critical path tests
│   │   ├── teams-overview.spec.ts
│   │   └── team-details.spec.ts
│   └── regression/              # Edge case tests
│       ├── edge-cases.spec.ts
│       ├── error-handling.spec.ts
│       ├── loading-states.spec.ts
│       ├── visual-validation.spec.ts
│       └── responsive.spec.ts
├── seed-data.json               # Initial test data
└── mcp-server/                  # Custom MCP server
    └── index.ts
```

### Test Suites

**Smoke Tests** (4 tests)
- Homepage loads
- Navigation works
- Checkbox toggle
- Save changes

**Regression Tests** (8 tests)
- Empty state
- Cancel operation
- Loading indicators
- Progress accuracy
- Status colors
- Mobile layout
- Grid rendering

## Configuration

### Prerequisites

#### Backend Service
```bash
cd backend
dotnet run
# Listens on localhost:5000
```

#### Frontend Service
```bash
cd frontend
npm run preview
# Runs on localhost:4173
```

### MCP Configuration
File: `.github/mcp/playwright.json`

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "playwright-tests": {
      "command": "node",
      "args": ["tests/ui/mcp-server/dist/index.js"]
    }
  }
}
```

## Usage Patterns

### Interactive Exploration (Scenario 0)
Use @playwright/mcp for exploratory testing:

```
/test-ui navigate http://localhost:4173
/test-ui snapshot
/test-ui click "Team Alpha"
/test-ui screenshot
```

### Automated Validation (Scenarios 1-4)
Use playwright-tests for regression testing:

```
/test-ui run smoke
/test-ui run regression
/test-ui report summary
```

### Combined Workflow
Mix both servers:

```
/test-ui reset-data
/test-ui navigate http://localhost:4173
/test-ui snapshot
/test-ui run smoke
/test-ui report html
```

## Test Data

### Seed Data
Located at: `tests/ui/seed-data.json`

Contains 4 teams with varying readiness levels:
- Team Alpha: Red (23%)
- Team Beta: Yellow (47%)
- Team Gamma: Green (87%)
- Team Delta: Yellow (53%)

### Runtime Data
Located at: `data/nefira-data.json`

Automatically reset before each test for isolation.

## Fixtures

### Data Fixture
File: `tests/ui/fixtures/data.fixture.ts`

Provides:
- `resetTestData()` - Reset to seed state
- `getTestData()` - Retrieve current data
- `seedTeam()` - Create new team

### Page Fixture
File: `tests/ui/fixtures/page.fixture.ts`

Provides helper methods:
- `getTeamCard(id)` - Find team card by ID
- `getCheckbox(category, index)` - Find checklist item
- `getSaveButton()` - Find save button
- `getUnsavedBar()` - Find unsaved changes indicator
- `getToast()` - Find notification toast

## Documentation

| Document | Purpose |
|----------|---------|
| `.github/agents/test-ui.agent.md` | Agent definition and capabilities |
| `.github/prompts/test-ui.prompt.md` | Prompt reference and examples |
| `.github/prompts/test-ui.quick-ref.prompt.md` | Quick reference |
| `.github/skills/ui-testing/SKILL.md` | Skill details and best practices |
| `docs/TEST-UI-SETUP.md` | Setup and configuration guide |
| `docs/test-manual.md` | Complete testing guide with scenarios |

## Common Commands

### Run Tests
```bash
cd tests/ui
npx playwright test --grep @smoke          # Run smoke tests
npx playwright test --grep @regression     # Run regression tests
npx playwright test --headed               # Run with visible browser
npx playwright test --debug                # Step-through debugger
```

### View Reports
```bash
npx playwright show-report                 # Open HTML report
```

### Reset Data
```bash
cp tests/ui/seed-data.json data/nefira-data.json
```

## Test Results

Current status:
- **Smoke Tests**: 4/4 passed ✅
- **Regression Tests**: 8/8 passed ✅
- **Total**: 12/12 passing
- **Execution Time**: ~25 seconds

## Troubleshooting

### Services Not Running
```bash
# Check backend
curl http://localhost:5000/api/teams

# Check frontend
curl http://localhost:4173
```

### Test Data Corrupted
```bash
# Reset to seed data
cp tests/ui/seed-data.json data/nefira-data.json
```

### Browser Issues
```bash
# Install browsers
cd tests/ui && npx playwright install
```

### MCP Server Issues
Check `.github/mcp/playwright.json` configuration and verify Chromium installation.

## Integration with CI/CD

GitHub Actions workflow: `.github/workflows/playwright.yml`

- Runs tests on schedule and PR
- Publishes test reports
- Uploads artifacts
- Runs on multiple platforms

## Next Steps

1. Start backend and frontend services
2. Try `/test-ui navigate http://localhost:4173`
3. Run `/test-ui run smoke`
4. Explore `/test-ui` prompt capabilities
5. Read `docs/test-manual.md` for advanced scenarios

## Support

For issues or questions:
1. Check `docs/test-manual.md` for detailed scenarios
2. Review test code in `tests/ui/tests/`
3. Examine MCP configuration in `.github/mcp/`
4. Run tests with `--debug` flag for detailed output
