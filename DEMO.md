# Demo Runbook — Playwright MCP via GitHub Copilot (Developer Readiness Portal)

## Purpose / What we’re demoing
- Use **GitHub Copilot Chat in VS Code** with **MCP** enabled to drive the app via **Playwright MCP** (interactive browser automation).
- Use Copilot + MCP to **run Playwright tests** (via the repo’s custom `playwright-tests` MCP server).
- (Optional) Show the “dev loop”: **run 5 tests → introduce a small break → rerun → interpret failures**.

## System Overview (Stack)
- **Frontend:** Vite/React (`frontend\`) served at **http://localhost:4173**
- **Backend:** .NET API (`backend\`) served at **http://localhost:5000** (Swagger at `/swagger`)
- **Data store:** JSON-backed store (runtime data under `data\`; UI tests reset to a seed state)
- **UI tests:** Playwright (`tests\ui\`) with:
  - Smoke tests: `tests\ui\tests\smoke\`
  - Regression tests: `tests\ui\tests\regression\`
- **Copilot MCP servers (from `.vscode\mcp.json`):**
  - `playwright` → `npx @playwright/mcp@latest --headless` (browser automation)
  - `playwright-tests` → `node tests\ui\mcp-server\dist\index.js` (run suites / reset data / reports)

## Start the App (Two Terminals)

### Terminal A — Backend

- Console indicates the app is listening on **http://localhost:5000**

```powershell
curl http://localhost:5000/api/teams
```

### Terminal B — Frontend
**Working dir:** repo root
```powershell
cd frontend
npm run preview
```

**Healthy looks like**
- Console indicates the preview server is available at **http://localhost:4173**
```powershell
curl http://localhost:4173
```

### Smoke-check URLs (open in browser)
- Frontend: **http://localhost:4173**
- Backend Swagger: **http://localhost:5000/swagger**

## What to Show in the Browser
A tight, repeatable “happy path” (60–120 seconds):
1. Open **http://localhost:4173** (teams grid)
2. Click the first team card (e.g., “Team Alpha”) → land on `/teams/<team-id>`
3. Toggle the first checklist checkbox (category “codebase”, index 0) → **Unsaved changes** bar appears
4. Click **Save Changes** → success toast appears and unsaved changes bar disappears

## Prepare Playwright MCP in GitHub Copilot (VS Code Copilot Chat)

### Confirm MCP is enabled + tools are available
2. In Copilot Chat, copy/paste:
```
Confirm MCP is enabled and list tools available from:
1) playwright
2) playwright-tests
```

### Browser automation demo prompts (Playwright MCP)
Copy/paste in Copilot Chat:
```
/test-ui navigate http://localhost:4173
/test-ui snapshot
/test-ui click "Team Alpha"
/test-ui screenshot "Team details loaded"
```

### Test execution demo prompts (custom playwright-tests MCP)
Copy/paste in Copilot Chat:
```
/test-ui reset-data
/test-ui run smoke
/test-ui report summary
```

**Note:** `/test-ui run smoke` runs the `@smoke` tagged suite (and won’t include **REG-002** unless you also run regression/all). The CLI command below is the reproducible “source of truth” for running the **exact 5-test gate** and also works when MCP isn’t available.

## (Optional) Run the Test Suite (5 tests) (CLI / exact gate)
**Facilitator-only / fallback:** this isn’t required for the VS Code/Copilot/MCP demo, but it’s useful to prove the exact same 5-test gate can run outside Copilot (and matches CI).

We’ll run **exactly five tests**: **SMOKE-001..004 + REG-002**, **Chromium only**.

### One command (recommended)
```powershell
cd tests\ui
npx playwright test --project=chromium --grep "SMOKE-00[1-4]|REG-002"
```

### What each verifies (for narration)
- **SMOKE-001** (in `teams-overview.spec.ts`): homepage loads, teams grid visible, at least one team card
- **SMOKE-002** (in `teams-overview.spec.ts`): click team card navigates to details page and key sections render
- **SMOKE-003** (in `team-details.spec.ts`): toggle checkbox shows the unsaved changes bar
- **SMOKE-004** (in `team-details.spec.ts`): save changes shows success toast and persists after reload
- **REG-002** (in `error-handling.spec.ts`): initial `/api/teams` 500 shows error + retry, then loads successfully

(Optional) open the HTML report:
```powershell
cd tests\ui
npx playwright show-report
```

## Introduce a Controlled Break
We will intentionally break **SMOKE-004** by changing a toast attribute the test asserts.

### Change
**File:** `frontend\src\components\Toast.jsx`

Change the toast root element attribute:
- from: `data-toast-type={type}`
- to: `data-toast-kind={type}`

### Restart frontend
In Terminal B:
1) Stop preview (Ctrl+C)
2) Start again:
```powershell
cd frontend
npm run preview
```

### Re-run the same 5 tests
```powershell
cd tests\ui
npx playwright test --project=chromium --grep "SMOKE-00[1-4]|REG-002"
```

### Expected failures (how to interpret)
- Only **SMOKE-004** should fail.
- Failure should mention the missing/changed attribute (expected `data-toast-type`).
- Talking point: tests enforce UI contracts (selectors/attributes); small UI changes can break them.

### Reset after demo
Revert the file change and restart frontend again.

## Wrap-up
- We proved Copilot Chat can use MCP to **explore the UI** and **run Playwright tests** end-to-end.
- We demonstrated the dev loop: **green run → controlled break → actionable failure**.
- Next steps:
  - Keep this 5-test set as a fast “smoke gate” and expand coverage incrementally.
  - Treat `data-testid` + key `data-*` attributes as a stable UI contract.
  - Integrate the suite into CI (see `.github\workflows\playwright.yml`).
