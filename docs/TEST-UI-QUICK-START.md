# Test-UI Quick Start

Fast reference for the consolidated test-ui portfolio.

## What Changed?

✅ **Consolidated** - All MCP configs now in `.vscode/mcp.json`  
✅ **Unified** - Single source of truth for test configuration  
✅ **Enhanced** - Added service health checks before tests  
✅ **Documented** - See [TEST-UI-PORTFOLIO.md](TEST-UI-PORTFOLIO.md) for full details

## Configuration Map

| What | Where | Purpose |
|------|-------|---------|
| MCP Servers | `.vscode/mcp.json` | Defines playwright & playwright-tests servers |
| Test Config | `tests/ui/playwright.config.ts` | Test runner settings, browsers, timeouts |
| Service Check | `tests/ui/global-setup.ts` | Verifies backend/frontend ready before tests |
| Cleanup | `tests/ui/global-teardown.ts` | Cleanup after test completion |
| Environment | `.devcontainer/devcontainer.json` | Install dependencies |
| Editor | `.vscode/settings.json` | VS Code settings & MCP enablement |

## Service Checklist

Before running tests, ensure:
```bash
# Terminal 1: Backend
cd backend && dotnet run
# Verify: curl http://localhost:5000/api/teams

# Terminal 2: Frontend  
cd frontend && npm run preview
# Verify: curl http://localhost:4173
```

## Common Commands

```bash
cd tests/ui

# Run smoke tests (critical path)
npx playwright test --grep @smoke

# Run regression tests (edge cases)
npx playwright test --grep @regression

# Run all tests
npx playwright test

# Run specific test
npx playwright test team-details.spec.ts

# View HTML report
npx playwright show-report

# Run in headed mode (see browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug
```

## Test-UI Agent Usage

With MCP enabled in Copilot Chat:

```
/test-ui run smoke
/test-ui run regression  
/test-ui run all
/test-ui reset-data
/test-ui report html
/test-ui navigate http://localhost:4173
/test-ui snapshot
```

## Report Types

- **HTML** (`playwright-report/`) - Interactive with screenshots, videos, traces
- **JSON** (`test-results/results.json`) - Machine-readable test data
- **JUnit** (`junit-report.xml`) - CI/CD integration

## Timeouts

- Action: 15s
- Navigation: 45s
- Total test: 60s
- Expect assertions: 10s
- Service health check: 30s

## Browsers Tested

- Desktop: Chromium, Firefox, WebKit (1920x1080)
- Mobile: Chrome (iPhone 14), Safari (iPhone 14)

## Troubleshooting

**MCP tools not available?**
- Reload VS Code (`Ctrl+Shift+P` → "Reload Window")
- Check MCP server built: `ls tests/ui/mcp-server/dist/index.js`

**Tests failing?**
- Check services running: `curl http://localhost:5000/api/teams`
- View reports: `npx playwright show-report`
- Reset data: `cp tests/ui/seed-data.json data/nefira-data.json`

**Service health check fails?**
- Global setup will retry 30 times (30 seconds)
- Check console output for service details
- Ensure services started before running tests

## Documentation

- [Full Portfolio Guide](TEST-UI-PORTFOLIO.md)
- [Test Manual](test-manual.md)
- [Setup Guide](TEST-UI-SETUP.md)
- [Testing Framework](testing-framework.md)

## Key Locations

```
tests/ui/
├── playwright.config.ts        Test runner configuration
├── global-setup.ts             Service health checks
├── global-teardown.ts          Cleanup
├── mcp-server/dist/index.js    MCP server (compiled)
├── tests/
│   ├── smoke/                  4 critical path tests
│   └── regression/             8+ edge case tests
├── seed-data.json              Test data template
├── playwright-report/          HTML test reports
└── test-results/
    ├── results.json            JSON test results
    └── junit-report.xml        JUnit format for CI
```

## Next Steps

1. ✅ **Verify Services**: `curl http://localhost:5000/api/teams`
2. ✅ **Run Smoke Tests**: `npx playwright test --grep @smoke`
3. ✅ **View Reports**: `npx playwright show-report`
4. ✅ **Use test-ui Agent**: `/test-ui run smoke` in Copilot Chat

---

For detailed information, see [TEST-UI-PORTFOLIO.md](TEST-UI-PORTFOLIO.md)
