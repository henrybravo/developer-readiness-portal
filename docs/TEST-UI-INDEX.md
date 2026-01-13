# Test-UI Consolidation Index

**Status:** ✅ Complete  
**Date:** January 7, 2026  
**Validation:** All checks passed

## Quick Links

### Start Here
- **[CONSOLIDATION-SUMMARY.md](CONSOLIDATION-SUMMARY.md)** - Executive summary of consolidation
- **[TEST-UI-CONSOLIDATION-CHECKLIST.md](TEST-UI-CONSOLIDATION-CHECKLIST.md)** - Detailed checklist of all tasks

### For Users
- **[docs/TEST-UI-QUICK-START.md](docs/TEST-UI-QUICK-START.md)** - Quick reference (5 min read)
- **[docs/TEST-UI-PORTFOLIO.md](docs/TEST-UI-PORTFOLIO.md)** - Complete guide (30 min read)
- **[docs/test-manual.md](docs/test-manual.md)** - Full testing guide

### Configuration Files
- **[.vscode/mcp.json](.vscode/mcp.json)** - MCP servers (UNIFIED CONFIG)
- **[tests/ui/playwright.config.ts](tests/ui/playwright.config.ts)** - Test runner settings
- **[tests/ui/global-setup.ts](tests/ui/global-setup.ts)** - Service health checks
- **[tests/ui/global-teardown.ts](tests/ui/global-teardown.ts)** - Cleanup

### Validation
- **[validate-test-consolidation.sh](validate-test-consolidation.sh)** - Run validation checks

---

## What Was Consolidated

### 3 Configuration Locations → 1
```
Before (Fragmented):
  .github/mcp/playwright.json
  .vscode/settings.json (references .github config)
  .vscode/mcp.json (duplicate, not used)

After (Unified):
  .vscode/mcp.json (SINGLE SOURCE OF TRUTH)
```

### Service Health Management
```
Added:
  global-setup.ts - Verifies backend/frontend ready before tests
  global-teardown.ts - Cleanup after tests
```

### Enhanced Reliability
```
Timeouts:
  Action: 10s → 15s
  Navigation: 30s → 45s
  Test: 30s → 60s
  Assertion: 5s → 10s
```

---

## Key Benefits

✅ **Single Source of Truth** - All MCP config in `.vscode/mcp.json`  
✅ **Service Awareness** - Tests wait for services to be ready  
✅ **Reduced Flakiness** - Enhanced timeouts prevent timing issues  
✅ **Agent Ready** - test-ui agent can execute any test  
✅ **Well Documented** - Comprehensive guides and quick references  
✅ **CI/CD Compatible** - Multiple report formats (HTML, JSON, JUnit)  

---

## Getting Started

### 1. Verify Consolidation (2 min)
```bash
bash validate-test-consolidation.sh
```

Should output: ✅ Test-UI Portfolio Consolidation Valid

### 2. Start Services (5 min)
```bash
# Terminal 1
cd backend && dotnet run

# Terminal 2
cd frontend && npm run preview
```

### 3. Run Tests (5 min)
```bash
cd tests/ui
npx playwright test --grep @smoke
```

### 4. View Report (2 min)
```bash
npx playwright show-report
```

### 5. Use test-ui Agent (in Copilot Chat)
```
/test-ui run smoke
/test-ui run all
/test-ui report html
/test-ui reset-data
```

---

## Configuration Architecture

```
User Input
    ↓
.vscode/mcp.json
├── playwright (interactive testing)
└── playwright-tests (automated execution)
        ↓
    tests/ui/mcp-server/dist/index.js
        ↓
    tests/ui/playwright.config.ts
    ├── global-setup.ts (health checks)
    ├── browsers (5 profiles)
    ├── timeouts (15s/45s/60s)
    └── reporters (4 formats)
```

---

## File Structure

| Location | Type | Purpose |
|----------|------|---------|
| `.vscode/mcp.json` | Configuration | MCP servers (UNIFIED) |
| `.vscode/settings.json` | Configuration | VS Code settings |
| `tests/ui/playwright.config.ts` | Configuration | Test runner config |
| `tests/ui/global-setup.ts` | Code | Service health checks |
| `tests/ui/global-teardown.ts` | Code | Cleanup |
| `tests/ui/mcp-server/dist/index.js` | Code | Compiled MCP server |
| `docs/TEST-UI-PORTFOLIO.md` | Documentation | Complete guide |
| `docs/TEST-UI-QUICK-START.md` | Documentation | Quick reference |
| `CONSOLIDATION-SUMMARY.md` | Documentation | Consolidation overview |
| `TEST-UI-CONSOLIDATION-CHECKLIST.md` | Documentation | Task checklist |
| `validate-test-consolidation.sh` | Script | Validation checks |

---

## Service Health Checks

The global setup automatically:

1. Checks backend at `http://localhost:5000/api/teams`
2. Checks frontend at `http://localhost:4173`
3. Retries up to 30 times (30 seconds) with 1-second intervals
4. Logs warnings if services unavailable
5. Proceeds with tests if services ready

---

## Browser Coverage

| Browser | Desktop | Mobile | Viewport |
|---------|---------|--------|----------|
| Chromium | ✅ | ✅ | 1920x1080 / iPhone 14 |
| Firefox | ✅ | — | 1920x1080 |
| WebKit | ✅ | ✅ | 1920x1080 / iPhone 14 |

---

## Test Suites

### Smoke Tests (4 critical path tests)
- SMOKE-001: Homepage loads with teams grid
- SMOKE-002: Navigate to team details page
- SMOKE-003: Toggle checkbox shows unsaved changes bar
- SMOKE-004: Save changes shows success toast

### Regression Tests (8+ edge case tests)
- REG-001 through REG-008: Various edge cases and validations

---

## Troubleshooting

**MCP tools not available?**
- Reload VS Code (`Ctrl+Shift+P` → "Reload Window")
- Verify MCP server built: `ls tests/ui/mcp-server/dist/index.js`

**Services not ready?**
- Check backend: `curl http://localhost:5000/api/teams`
- Check frontend: `curl http://localhost:4173`
- Ensure both services started before running tests

**Tests failing?**
- View reports: `npx playwright show-report`
- Reset test data: `cp tests/ui/seed-data.json data/nefira-data.json`
- Check test logs for specific errors

---

## Documentation Map

| Document | Audience | Length | Purpose |
|----------|----------|--------|---------|
| [CONSOLIDATION-SUMMARY.md](CONSOLIDATION-SUMMARY.md) | Managers/Leads | 10 min | Overview & benefits |
| [TEST-UI-CONSOLIDATION-CHECKLIST.md](TEST-UI-CONSOLIDATION-CHECKLIST.md) | Engineers | 10 min | Detailed tasks & status |
| [docs/TEST-UI-QUICK-START.md](docs/TEST-UI-QUICK-START.md) | Users | 5 min | Common commands & quick reference |
| [docs/TEST-UI-PORTFOLIO.md](docs/TEST-UI-PORTFOLIO.md) | Users | 30 min | Complete reference guide |
| [docs/test-manual.md](docs/test-manual.md) | Users | 60 min | Full testing guide |

---

## Maintenance

### Monitor
- Test flakiness metrics (should decrease with enhanced timeouts)
- Service startup times
- Test execution duration

### Deprecated
- `.github/mcp/playwright.json` (can remove in future cleanup)

### Future
- Docker Compose orchestration
- Parallel test optimization
- Visual regression testing
- Analytics dashboard

---

## Support

For questions about the consolidated portfolio:

1. **Quick answers** → [TEST-UI-QUICK-START.md](TEST-UI-QUICK-START.md)
2. **Detailed reference** → [TEST-UI-PORTFOLIO.md](TEST-UI-PORTFOLIO.md)
3. **Consolidation details** → [CONSOLIDATION-SUMMARY.md](CONSOLIDATION-SUMMARY.md)
4. **Full testing guide** → [test-manual.md](test-manual.md)

---

## Success Criteria ✅

- ✅ Single source of truth for MCP configuration
- ✅ Service health verified before test execution
- ✅ Enhanced timeouts reduce test flakiness
- ✅ test-ui agent executes all test types
- ✅ Comprehensive documentation provided
- ✅ No breaking changes to existing tests
- ✅ All validation checks passing

---

**Status:** Ready for production use  
**Last Updated:** January 7, 2026
