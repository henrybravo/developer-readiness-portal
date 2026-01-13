# Test-UI Portfolio - Consolidated Configuration

**Last Updated:** January 7, 2026

This document consolidates all test-ui configurations across the repository into a single, unified portfolio for consistent test execution.

## Overview

The test-ui portfolio provides:
- 🎭 **Interactive browser testing** via @playwright/mcp
- 🤖 **Automated test execution** via playwright-tests MCP server
- 📊 **Multi-browser coverage** (Chromium, Firefox, WebKit, Mobile)
- 🔄 **Service health checks** before test execution
- 📈 **Comprehensive reporting** (HTML, JSON, JUnit)

## Configuration Locations (Single Source of Truth)

### 1. MCP Servers Configuration
**Location:** [`.vscode/mcp.json`](.vscode/mcp.json)

Defines all MCP servers available to test-ui agent:
- `playwright` - Interactive browser automation (npx @playwright/mcp)
- `playwright-tests` - Test execution & reporting (local Node.js MCP server)

**Why this location:**
- VS Code native MCP configuration
- Available to GitHub Copilot Chat automatically
- Single source of truth for all MCP servers

### 2. Playwright Test Configuration
**Location:** [`tests/ui/playwright.config.ts`](tests/ui/playwright.config.ts)

Defines test runner behavior:
- Browser projects (Desktop + Mobile)
- Timeouts and retry strategies
- Reporters (HTML, JSON, JUnit, List)
- Global setup/teardown hooks

**Related files:**
- [`tests/ui/global-setup.ts`](tests/ui/global-setup.ts) - Service health checks
- [`tests/ui/global-teardown.ts`](tests/ui/global-teardown.ts) - Cleanup

### 3. Environment & Dependencies
**Location:** [`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json)

Installs all test dependencies during container creation:
```bash
cd tests/ui && npm install && npx playwright install-deps && npx playwright install && cd mcp-server && npm install && npm run build
```

### 4. VS Code Settings
**Location:** [`.vscode/settings.json`](.vscode/settings.json)

Enables MCP in GitHub Copilot Chat and configures editor behavior.

## Execution Flow

### For test-ui Agent

```
User: "/test-ui run smoke"
    ↓
Copilot loads MCP config from .vscode/mcp.json
    ↓
Invokes playwright-tests MCP server (tests/ui/mcp-server/dist/index.js)
    ↓
MCP server reads playwright.config.ts
    ↓
global-setup.ts checks service health
    ↓
Playwright executes smoke tests
    ↓
global-teardown.ts cleanup
    ↓
Reports generated (HTML/JSON/JUnit)
```

### For Local Execution

```bash
cd tests/ui

# Check services are running
curl http://localhost:5000/api/teams
curl http://localhost:4173

# Run tests
npx playwright test --grep @smoke

# View report
npx playwright show-report
```

## File Structure

```
developer-readiness-portal/
├── .vscode/
│   ├── mcp.json                    ← MCP Server Definitions (UNIFIED)
│   ├── settings.json               ← VS Code Settings
│   └── extensions.json
├── .github/
│   └── mcp/
│       └── playwright.json         ← DEPRECATED (use .vscode/mcp.json)
├── .devcontainer/
│   └── devcontainer.json           ← Environment Setup
├── tests/ui/
│   ├── playwright.config.ts        ← Test Runner Config
│   ├── global-setup.ts             ← Service Health Checks
│   ├── global-teardown.ts          ← Cleanup
│   ├── mcp-server/                 ← MCP Server Implementation
│   │   ├── package.json
│   │   ├── index.ts
│   │   ├── tools/
│   │   │   ├── run-tests.ts
│   │   │   ├── reset-data.ts
│   │   │   └── get-report.ts
│   │   └── dist/
│   │       └── index.js            ← Compiled MCP Server
│   ├── tests/                      ← Test Suites
│   │   ├── smoke/
│   │   └── regression/
│   ├── seed-data.json              ← Test Data
│   └── package.json
└── docs/
    └── test-manual.md              ← Full Testing Guide
```

## MCP Server Tools

### test:reset-data
Reset test data to seed state for consistent test execution.

```
Input:
  teamId (optional) - Reset specific team (e.g., team-alpha)

Usage:
  /test-ui reset-data
  /test-ui reset-data team-alpha
```

### test:run-suite
Execute Playwright test suite (smoke, regression, or all).

```
Input:
  suite (required) - smoke | regression | all
  browser (optional) - chromium | firefox | webkit (default: chromium)
  headed (optional) - Run in headed mode (default: false)

Usage:
  /test-ui run smoke
  /test-ui run all
  /test-ui run regression --browser=firefox --headed
```

### test:run-single
Execute a single test file or specific test.

```
Input:
  file (required) - Test file path (relative to tests/ui/tests/)
  testName (optional) - Specific test name within file
  headed (optional) - Run in headed mode (default: false)

Usage:
  /test-ui run smoke/teams-overview.spec.ts
  /test-ui run smoke/teams-overview.spec.ts SMOKE-001
```

### test:get-report
Retrieve latest test report in various formats.

```
Input:
  format (required) - html | json | summary

Usage:
  /test-ui report html
  /test-ui report json
  /test-ui report summary
```

## Service Requirements

Tests require both services running:

**Backend** (listens on localhost:5000)
```bash
cd backend && dotnet run
```

**Frontend** (runs on localhost:4173)
```bash
cd frontend && npm run preview
```

The global setup automatically waits up to 30 seconds for services to be ready.

## Browser Coverage

| Browser | Desktop | Mobile | Viewport |
|---------|---------|--------|----------|
| Chromium | ✅ | ✅ (mobile-chrome) | 1920x1080 / iPhone 14 |
| Firefox | ✅ | — | 1920x1080 |
| WebKit | ✅ | ✅ (mobile-safari) | 1920x1080 / iPhone 14 |

## Timeouts

- **Action timeout:** 15s (click, type, etc.)
- **Navigation timeout:** 45s (page.goto)
- **Global test timeout:** 60s
- **Expect timeout:** 10s
- **Service health check timeout:** 30s (with 1s intervals)

## Test Suites

### Smoke Tests
Critical path validation (4 tests):
- SMOKE-001: Homepage loads with teams grid
- SMOKE-002: Navigate to team details page
- SMOKE-003: Toggle checkbox shows unsaved changes bar
- SMOKE-004: Save changes shows success toast

### Regression Tests
Edge case validation (8+ tests):
- REG-001: Empty state handling
- REG-002: API error handling with retry
- REG-003: Cancel operation reverts changes
- REG-004: Loading states and skeletons
- REG-005: Progress bar accuracy
- REG-006: Status badge colors
- REG-007: Responsive layout (mobile/desktop)
- REG-008: Grid column rendering

## Reports

All reports generated in `tests/ui/`:

| Format | Location | Usage |
|--------|----------|-------|
| HTML | `playwright-report/index.html` | Interactive view with screenshots/videos |
| JSON | `test-results/results.json` | Programmatic analysis |
| JUnit | `junit-report.xml` | CI/CD integration (GitHub Actions, Jenkins) |
| List | Console output | Quick terminal summary |

## Troubleshooting

### MCP Tools Not Available
1. Check `.vscode/mcp.json` exists and is valid
2. Verify MCP server is built: `ls tests/ui/mcp-server/dist/index.js`
3. Reload VS Code window

### Services Not Ready
1. Verify backend: `curl http://localhost:5000/api/teams`
2. Verify frontend: `curl http://localhost:4173`
3. Check global-setup.ts logs in test output

### Test Failures
1. Check test reports: `npx playwright show-report`
2. Review screenshots/videos in HTML report
3. Reset test data: `/test-ui reset-data`
4. Check browser compatibility in playwright.config.ts

### Build MCP Server
```bash
cd tests/ui/mcp-server
rm -rf node_modules dist
npm install
npm run build
```

## Deprecations

**Removed:**
- `.github/mcp/playwright.json` (use `.vscode/mcp.json` instead)
- `github.copilot.chat.mcp.configFile` setting (VS Code uses `.vscode/mcp.json` natively)

## Related Documentation

- [Test Manual](../docs/test-manual.md) - Comprehensive testing guide
- [Test-UI Setup](../docs/TEST-UI-SETUP.md) - Initial setup instructions
- [Testing Framework](../docs/testing-framework.md) - Architecture overview
- [Playwright Docs](https://playwright.dev) - Official Playwright documentation
- [MCP Protocol](https://modelcontextprotocol.io) - MCP specification

## Key Principles

1. **Single Source of Truth** - All MCP configs in `.vscode/mcp.json`
2. **Clear Separation** - MCP servers vs Test runner config
3. **Service Independence** - Tests wait for services, don't start them
4. **Comprehensive Reporting** - Multiple formats for different uses
5. **Browser Coverage** - Desktop + Mobile for inclusive testing
6. **Fail-Safe Timeouts** - Long timeouts prevent flakiness

## Future Improvements

- [ ] Add Docker Compose service orchestration
- [ ] Implement parallel test execution optimization
- [ ] Add visual regression testing
- [ ] Implement test result analytics dashboard
- [ ] Add custom wait strategies library
