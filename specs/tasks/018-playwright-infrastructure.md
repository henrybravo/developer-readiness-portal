# Task 018: Playwright Infrastructure Setup

**Status:** Not Started  
**Priority:** P0  
**Depends On:** Task 010-012 (Frontend UI Components)  
**Blocks:** Task 019-022

---

## Objective

Set up Playwright testing infrastructure in `tests/ui/` with configuration, fixtures, and component `data-testid` attributes.

---

## Acceptance Criteria

- [ ] `tests/ui/package.json` created with Playwright dependencies
- [ ] `tests/ui/playwright.config.ts` configured per strategy document
- [ ] Data reset fixture implemented
- [ ] All required `data-testid` attributes added to React components
- [ ] npm scripts added: `test:ui`, `test:ui:headed`, `test:ui:report`
- [ ] Playwright browsers installable via `npx playwright install`

---

## Implementation Details

### 1. Package Setup

Create `tests/ui/package.json`:
```json
{
  "name": "ui-tests",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:report": "playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "typescript": "^5.3.0"
  }
}
```

### 2. Playwright Configuration

Create `tests/ui/playwright.config.ts` with:
- Test directory: `./tests`
- Timeout: 30 seconds
- Retries: 2 in CI, 0 locally
- Reporters: HTML, JSON, JUnit
- Projects: Chromium, Firefox, WebKit, Mobile
- Web server: Frontend preview + Backend

### 3. Data Fixture

Create `tests/ui/fixtures/data.fixture.ts`:
- `resetTestData()` - Copy seed data to working data file
- `seedTeam(readiness)` - Create team with specific state

### 4. Required `data-testid` Additions

Update React components:

| File | Element | Attribute |
|------|---------|-----------|
| `TeamCard.jsx` | Link wrapper | `data-testid="team-card-{team.id}"` |
| `StatusBadge.jsx` | Badge span | `data-testid="status-badge"` |
| `ChecklistSection.jsx` | Section div | `data-testid="checklist-{categoryKey}"` |
| `ChecklistSection.jsx` | Checkbox | `data-testid="checkbox-{categoryKey}-{index}"` |
| `ChecklistSection.jsx` | Toggle btn | `data-testid="toggle-{categoryKey}"` |
| `TeamDetails.jsx` | Save button | `data-testid="save-btn"` |
| `TeamDetails.jsx` | Cancel button | `data-testid="cancel-btn"` |
| `TeamDetails.jsx` | Back link | `data-testid="back-link"` |
| `Toast.jsx` | Container | `data-testid="toast"` |

### 5. npm Scripts (Root)

Add to root `package.json`:
```json
{
  "scripts": {
    "test:ui": "cd tests/ui && npm test",
    "test:ui:headed": "cd tests/ui && npm run test:headed"
  }
}
```

---

## Verification

```bash
cd tests/ui
npm install
npx playwright install chromium
npx playwright test --list
# Should show 0 tests (no specs yet)
```

---

## Files to Create/Modify

- `tests/ui/package.json` (create)
- `tests/ui/playwright.config.ts` (create)
- `tests/ui/fixtures/data.fixture.ts` (create)
- `tests/ui/tsconfig.json` (create)
- `tests/ui/.gitignore` (create)
- `frontend/src/components/TeamCard.jsx` (modify)
- `frontend/src/components/StatusBadge.jsx` (modify)
- `frontend/src/components/ChecklistSection.jsx` (modify)
- `frontend/src/components/Toast.jsx` (modify)
- `frontend/src/pages/TeamDetails.jsx` (modify)

---

## References

- [UI Testing Strategy](../features/ui-testing-strategy.md)
- [ADR 0005 - Testing Strategy](../adr/0005-testing-strategy.md)
