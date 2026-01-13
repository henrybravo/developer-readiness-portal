# /test-ui Quick Reference

Fast reference for using the test-ui agent and prompt.

## Enable the Agent

The test-ui agent is configured in `.github/agents/test-ui.md`

Agents with testing capabilities:
- test-ui - UI testing and browser automation

## Use the Prompt

Invoke with `/test-ui` followed by an action:

```
/test-ui [action] [options]
```

## Quick Actions

| Action | Example | Purpose |
|--------|---------|---------|
| `navigate` | `/test-ui navigate http://localhost:4173` | Go to URL |
| `click` | `/test-ui click "Team Alpha"` | Click element |
| `screenshot` | `/test-ui screenshot` | Capture page |
| `snapshot` | `/test-ui snapshot` | Get page structure |
| `type` | `/test-ui type "text"` | Enter text |
| `run smoke` | `/test-ui run smoke` | Run critical tests |
| `run regression` | `/test-ui run regression` | Run edge case tests |
| `run all` | `/test-ui run all` | Run all tests |
| `reset-data` | `/test-ui reset-data` | Reset test data |
| `report summary` | `/test-ui report summary` | Show test results |
| `report html` | `/test-ui report html` | Generate HTML report |

## Common Workflows

### Quick Test
```
/test-ui run smoke
/test-ui report summary
```

### Explore App
```
/test-ui navigate http://localhost:4173
/test-ui snapshot
/test-ui click "Team Alpha"
/test-ui screenshot
```

### Full Validation
```
/test-ui reset-data
/test-ui run all
/test-ui report html
```

## Required Services

```bash
# Terminal 1: Backend
cd backend && dotnet run

# Terminal 2: Frontend
cd frontend && npm run preview
```

## MCP Servers Used

1. **@playwright/mcp** - Browser automation
2. **playwright-tests** - Test execution

## Test Status

- ✅ Smoke Tests: 4/4 passing
- ✅ Regression Tests: 8/8 passing
- ✅ Total: 12/12 passing

## Key Selectors

| Element | Selector |
|---------|----------|
| Teams grid | `teams-container` |
| Team card | `team-card-{id}` |
| Checkbox | `checkbox-{category}-{index}` |
| Save | `save-btn` |
| Cancel | `cancel-btn` |
| Unsaved | `unsaved-changes-bar` |
| Toast | `toast` |

## Test Suites

**Smoke Tests** (Critical paths)
- SMOKE-001: Homepage loads
- SMOKE-002: Navigation works
- SMOKE-003: Checkbox toggle
- SMOKE-004: Save changes

**Regression Tests** (Edge cases)
- REG-001: Empty state
- REG-002: API errors
- REG-003: Cancel operation
- REG-004: Loading states
- REG-005: Progress bar
- REG-006: Status colors
- REG-007: Mobile layout
- REG-008: Grid rendering

## Files

| File | Purpose |
|------|---------|
| `.github/agents/test-ui.agent.md` | Agent definition |
| `.github/prompts/test-ui.prompt.md` | Prompt reference |
| `.github/skills/ui-testing/SKILL.md` | Skill details |
| `.vscode/mcp.json` | MCP config |
| `docs/test-manual.md` | Full guide |
| `docs/TEST-UI-SETUP.md` | Setup guide |

## Troubleshooting

**Services not running?**
```bash
curl http://localhost:5000/api/teams
curl http://localhost:4173
```

**Tests failing?**
```
/test-ui reset-data
/test-ui run smoke
```

**Need details?**
```
/test-ui report html
```

## Full Documentation

- Agent: `.github/agents/test-ui.agent.md`
- Prompt: `.github/prompts/test-ui.prompt.md`
- Skill: `.github/skills/ui-testing/SKILL.md`
- Framework: `docs/testing-framework.md`
- Manual: `docs/test-manual.md`
- Setup: `docs/TEST-UI-SETUP.md`
