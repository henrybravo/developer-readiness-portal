# Task 019: Smoke Tests Implementation

**Status:** Not Started  
**Priority:** P0  
**Depends On:** Task 018 (Playwright Infrastructure)  
**Blocks:** Task 020 (Regression Tests)

---

## Objective

Implement P0 smoke tests covering critical user flows: homepage load, navigation, checklist toggle, and save changes.

---

## Acceptance Criteria

- [ ] `tests/ui/tests/smoke/teams-overview.spec.ts` created
- [ ] `tests/ui/tests/smoke/team-details.spec.ts` created
- [ ] All 4 smoke tests passing (SMOKE-001 through SMOKE-004)
- [ ] Tests execute in < 15 seconds total
- [ ] Tests work with both `npm run dev` and `npm run preview`

---

## Test Specifications

### SMOKE-001: Homepage Loads

**File:** `teams-overview.spec.ts`

```
Given: Application is running
When: User navigates to "/"
Then: 
  - Page title contains "Developer Readiness"
  - Teams grid is visible
  - At least 1 team card is displayed
  - No error messages visible
```

### SMOKE-002: Navigate to Team Details

**File:** `teams-overview.spec.ts`

```
Given: User is on homepage with teams displayed
When: User clicks on first team card
Then:
  - URL changes to "/teams/{id}"
  - Team name heading is visible
  - Tech stack section is displayed
  - Checklist sections are visible
```

### SMOKE-003: Toggle Checklist Item

**File:** `team-details.spec.ts`

```
Given: User is on team details page
When: User clicks on an unchecked checkbox
Then:
  - Checkbox becomes checked
  - "You have unsaved changes" bar appears
  - Save Changes button is visible
  - Cancel button is visible
```

### SMOKE-004: Save Changes

**File:** `team-details.spec.ts`

```
Given: User has toggled a checkbox (unsaved changes)
When: User clicks "Save Changes"
Then:
  - Success toast appears with "saved successfully"
  - Unsaved changes bar disappears
  - Checkbox state persists on page reload
```

---

## Implementation Notes

### Page Object Pattern (Optional)

Consider creating page objects for reusability:

```
tests/ui/pages/
├── teams-overview.page.ts
└── team-details.page.ts
```

### Test Data Reset

Each test file should reset data in `beforeAll`:
```typescript
test.beforeAll(async () => {
  await resetTestData();
});
```

### Assertions

Use Playwright's built-in assertions:
- `expect(page).toHaveURL()`
- `expect(locator).toBeVisible()`
- `expect(locator).toBeChecked()`
- `expect(locator).toContainText()`

---

## Verification

```bash
cd tests/ui
npm test -- --grep="smoke" --reporter=list
# All 4 tests should pass
```

---

## Files to Create

- `tests/ui/tests/smoke/teams-overview.spec.ts`
- `tests/ui/tests/smoke/team-details.spec.ts`
- `tests/ui/pages/teams-overview.page.ts` (optional)
- `tests/ui/pages/team-details.page.ts` (optional)

---

## References

- [UI Testing Strategy](../features/ui-testing-strategy.md) - Section 4.1
- [Task 018](./018-playwright-infrastructure.md)
