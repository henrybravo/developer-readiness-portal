# UI Testing Strategy - Playwright/MCP Integration

**Status:** Draft  
**Created:** 2026-01-05  
**Author:** Planner Agent  
**Related ADR:** [0005-testing-strategy.md](../adr/0005-testing-strategy.md)

---

## 1. Executive Summary

This document defines the end-to-end UI testing strategy for the Developer Readiness Portal using **Playwright** for browser automation and **MCP (Model Context Protocol)** tools for test orchestration, data seeding, and CI integration.

### Goals
- Automated UI regression testing for critical user flows
- Fast feedback loop (< 30s test execution target)
- CI/CD integration via GitHub Actions
- MCP tool exposure for AI-assisted test execution

---

## 2. Scope

### 2.1 In Scope

| Category | Items |
|----------|-------|
| **Pages** | TeamsOverview, TeamDetails |
| **Components** | TeamCard, StatusBadge, ChecklistSection, CircularProgress, Toast, SkeletonLoader |
| **Flows** | View teams, navigate to details, toggle checklist items, save changes, error handling |
| **Browsers** | Chromium (primary), Firefox, WebKit (matrix) |
| **Environments** | Local dev, CI preview |

### 2.2 Out of Scope (Phase 1)

- Upgrade Plan feature (not yet implemented)
- Test Runner feature (not yet implemented)
- Visual regression testing
- Performance/load testing
- Accessibility testing (future phase)

---

## 3. Test Matrix

### 3.1 Browser/Device Matrix

| Browser | Desktop | Mobile Viewport | Priority |
|---------|---------|-----------------|----------|
| Chromium | ✅ 1920×1080 | ✅ 375×667 (iPhone SE) | P0 |
| Firefox | ✅ 1920×1080 | ❌ | P1 |
| WebKit | ✅ 1920×1080 | ✅ 390×844 (iPhone 14) | P1 |

### 3.2 Environment Matrix

| Environment | Base URL | Backend | Data |
|-------------|----------|---------|------|
| **Local Dev** | `http://localhost:3000` | `http://localhost:5000` | Fresh seed data |
| **CI Preview** | `http://localhost:4173` | `http://localhost:5000` | Fresh seed data |
| **Staging** (future) | TBD | TBD | Isolated test data |

---

## 4. Test Categories

### 4.1 Smoke Tests (P0 - Every PR)

| Test ID | Flow | Expected Outcome |
|---------|------|------------------|
| SMOKE-001 | Homepage loads | Teams grid visible, no errors |
| SMOKE-002 | Navigate to team | Team details page renders |
| SMOKE-003 | Toggle checkbox | Checkbox state changes, save bar appears |
| SMOKE-004 | Save changes | Toast success message |

### 4.2 Regression Tests (P1 - Nightly/Release)

| Test ID | Flow | Expected Outcome |
|---------|------|------------------|
| REG-001 | Empty state | "No teams" message when 0 teams |
| REG-002 | Error handling | API error → error message with retry |
| REG-003 | Cancel changes | Unsaved changes reverted |
| REG-004 | Skeleton loaders | Loading states during fetch |
| REG-005 | Progress bar | Completion % matches checked items |
| REG-006 | Status badge colors | Red/Yellow/Green based on readiness |
| REG-007 | Responsive layout | 2-column → 1-column on mobile |
| REG-008 | Multiple teams | All teams render in grid |

---

## 5. Fixtures Strategy

### 5.1 Authentication Fixture

```
Fixture: auth
Purpose: No auth required (public app)
Implementation: Skip (no login flow)
```

### 5.2 Data Reset Fixture

```
Fixture: resetData
Purpose: Ensure consistent test data before each test
Trigger: beforeEach or beforeAll (suite level)
Method: 
  - Option A: Reset JSON data file via MCP tool
  - Option B: Call backend seed endpoint
  - Option C: Direct file copy in CI
```

### 5.3 API Mock Fixture (Optional)

```
Fixture: mockApi
Purpose: Test error states without breaking backend
Method: Playwright route interception
Use Cases: 
  - Simulate 500 errors
  - Simulate slow responses
  - Test empty data states
```

---

## 6. Selector Strategy

### 6.1 Recommended Approach

| Priority | Selector Type | Example | Use When |
|----------|---------------|---------|----------|
| 1 | `data-testid` | `[data-testid="team-card-alpha"]` | Primary choice |
| 2 | Role + Name | `getByRole('button', { name: 'Save' })` | Accessible elements |
| 3 | Text content | `getByText('Team Alpha')` | Unique visible text |
| 4 | CSS class | `.team-card` | Last resort |

### 6.2 Required `data-testid` Additions

Components needing `data-testid` attributes:

| Component | Element | Proposed `data-testid` |
|-----------|---------|------------------------|
| TeamCard | Card container | `team-card-{id}` |
| TeamCard | Card link | `team-card-link-{id}` |
| StatusBadge | Badge | `status-badge-{status}` |
| ChecklistSection | Section | `checklist-section-{category}` |
| ChecklistSection | Checkbox | `checklist-item-{category}-{index}` |
| ChecklistSection | Toggle button | `checklist-toggle-{category}` |
| TeamDetails | Save button | `save-changes-btn` |
| TeamDetails | Cancel button | `cancel-changes-btn` |
| TeamDetails | Back link | `back-to-teams-link` |
| Toast | Container | `toast-{type}` |
| CircularProgress | Container | `progress-{size}` |

---

## 7. MCP Tools Integration

### 7.1 Exposed MCP Tools for Testing

| Tool Name | Purpose | Parameters |
|-----------|---------|------------|
| `test:reset-data` | Reset test data to seed state | `{ teamId?: string }` |
| `test:run-suite` | Execute Playwright test suite | `{ suite: 'smoke' \| 'regression', browser?: string }` |
| `test:run-single` | Execute single test file | `{ file: string, headed?: boolean }` |
| `test:get-report` | Retrieve latest test report | `{ format: 'html' \| 'json' }` |
| `test:seed-team` | Create test team with specific state | `{ readiness: 'red' \| 'yellow' \| 'green' }` |

### 7.2 MCP Server Configuration

```
Server: playwright-mcp-server
Transport: stdio
Capabilities:
  - tools (test execution)
  - resources (reports, screenshots)
Location: tests/ui/mcp-server/
```

---

## 8. CI/CD Integration

### 8.1 GitHub Actions Workflow

**Trigger Events:**
- `push` to `main` branch (smoke tests)
- `pull_request` to `main` (smoke tests)
- `schedule` nightly (full regression)
- `workflow_dispatch` (manual with params)

**Job Steps:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Install Playwright browsers (`npx playwright install --with-deps`)
5. Start backend (`dotnet run &`)
6. Build frontend (`npm run build`)
7. Start preview server (`npm run preview &`)
8. Wait for servers (health checks)
9. Run Playwright tests
10. Upload artifacts (reports, screenshots, videos)
11. Publish test results

### 8.2 Artifacts

| Artifact | Retention | Purpose |
|----------|-----------|---------|
| `playwright-report/` | 30 days | HTML report |
| `test-results/` | 7 days | Screenshots, videos on failure |
| `junit-report.xml` | 30 days | CI test summary |

---

## 9. Flaky Test Policy

### 9.1 Detection

- Track test pass rate over 10 runs
- Flag tests with < 95% pass rate as flaky
- Quarantine flaky tests to separate suite

### 9.2 Mitigation

| Strategy | Implementation |
|----------|----------------|
| Retry on failure | `retries: 2` in playwright.config.ts |
| Explicit waits | Use `waitForSelector`, `waitForResponse` |
| Test isolation | Fresh data per test, no shared state |
| Stable selectors | Prefer `data-testid` over CSS classes |
| Network idle | Wait for `networkidle` on navigation |

### 9.3 Quarantine Process

1. Flaky test identified (fails > 5% of runs)
2. Move to `tests/quarantine/` folder
3. Create issue with `flaky-test` label
4. Fix root cause
5. Validate 10 consecutive passes
6. Restore to main suite

---

## 10. Reporting

### 10.1 Report Formats

| Format | Purpose | Location |
|--------|---------|----------|
| HTML | Human review | `playwright-report/index.html` |
| JSON | Programmatic access / MCP | `test-results/results.json` |
| JUnit XML | GitHub Actions integration | `junit-report.xml` |

### 10.2 Report Contents

- Test name, status, duration
- Screenshots on failure
- Video recordings (optional, failures only)
- Trace files for debugging
- Console logs

---

## 11. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Backend not ready | Medium | High | Health check with retry in CI |
| Port conflicts | Low | Medium | Use dynamic ports or fixed test ports |
| Data file corruption | Low | High | Reset data before each suite |
| Browser install failures | Low | Medium | Cache Playwright browsers in CI |
| Flaky tests | High | Medium | Retry policy + quarantine process |
| Slow tests | Medium | Medium | Parallel execution, test sharding |
| Missing `data-testid` | High | Low | Add as prerequisite task |

---

## 12. Task Breakdown

### Phase 1: Infrastructure (Task 018)
- [ ] Install Playwright in `tests/ui/`
- [ ] Create `playwright.config.ts`
- [ ] Add `data-testid` attributes to components
- [ ] Create data reset fixture
- [ ] Add npm scripts

### Phase 2: Smoke Tests (Task 019)
- [ ] `teams-overview.spec.ts` - SMOKE-001, SMOKE-002
- [ ] `team-details.spec.ts` - SMOKE-003, SMOKE-004

### Phase 3: Regression Tests (Task 020)
- [ ] Error handling tests (REG-002)
- [ ] Loading state tests (REG-004)
- [ ] Responsive tests (REG-007)
- [ ] Edge case tests (REG-001, REG-003)

### Phase 4: CI Integration (Task 021)
- [ ] Create `.github/workflows/playwright.yml`
- [ ] Configure artifact upload
- [ ] Add PR status checks

### Phase 5: MCP Integration (Task 022)
- [ ] Create `tests/ui/mcp-server/`
- [ ] Implement test execution tools
- [ ] Implement report retrieval tools
- [ ] Add to MCP configuration

---

## 13. Dependencies

| Dependency | Source | Required For |
|------------|--------|--------------|
| Frontend built | Task 010-012 | Test target |
| Backend running | Task 007 | API responses |
| Seed data | Task 005 | Consistent test data |
| `data-testid` attrs | New task | Stable selectors |

---

## 14. Success Criteria

- [ ] All P0 smoke tests passing
- [ ] Test execution < 30 seconds (smoke suite)
- [ ] CI pipeline green on PR merge
- [ ] HTML report accessible in CI artifacts
- [ ] MCP tools callable from agent

---

## Appendix A: Proposed Test File Structure

```
tests/ui/
├── playwright.config.ts
├── package.json
├── fixtures/
│   ├── data.fixture.ts      # Data reset/seed
│   └── page.fixture.ts      # Extended page with helpers
├── tests/
│   ├── smoke/
│   │   ├── teams-overview.spec.ts
│   │   └── team-details.spec.ts
│   ├── regression/
│   │   ├── error-handling.spec.ts
│   │   ├── loading-states.spec.ts
│   │   └── responsive.spec.ts
│   └── quarantine/
│       └── .gitkeep
├── mcp-server/
│   ├── index.ts
│   └── tools/
│       ├── run-tests.ts
│       └── get-report.ts
└── .gitignore
```

---

## Appendix B: Sample playwright.config.ts (Reference Only)

```typescript
// NOTE: This is a reference structure, not implementation
{
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['json'], ['junit', { outputFile: 'junit-report.xml' }]],
  use: {
    baseURL: 'http://localhost:4173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
  webServer: [
    { command: 'npm run preview', port: 4173, reuseExistingServer: !process.env.CI },
  ],
}
```

---

*This document is planning-only. Implementation tasks are defined in `specs/tasks/018-*.md` through `specs/tasks/022-*.md`.*
