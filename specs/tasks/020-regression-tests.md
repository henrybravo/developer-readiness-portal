# Task 020: Regression Tests Implementation

**Status:** Not Started  
**Priority:** P1  
**Depends On:** Task 019 (Smoke Tests)  
**Blocks:** None

---

## Objective

Implement P1 regression tests covering edge cases, error handling, loading states, and responsive design.

---

## Acceptance Criteria

- [ ] 8 regression tests implemented (REG-001 through REG-008)
- [ ] Tests organized in `tests/ui/tests/regression/`
- [ ] Error mocking tests use Playwright route interception
- [ ] Responsive tests validate mobile breakpoints
- [ ] All regression tests passing

---

## Test Specifications

### REG-001: Empty State Display

**File:** `edge-cases.spec.ts`

```
Given: No teams exist in the system
When: User navigates to "/"
Then:
  - "No teams yet" message is displayed
  - "Add Team" button/CTA is visible
  - No error messages shown
```

### REG-002: API Error Handling

**File:** `error-handling.spec.ts`

```
Given: API returns 500 error
When: User navigates to "/"
Then:
  - Error message is displayed
  - "Retry" button is visible
When: User clicks "Retry" and API succeeds
Then:
  - Teams are displayed
  - Error message is hidden
```

### REG-003: Cancel Unsaved Changes

**File:** `team-details.spec.ts`

```
Given: User has toggled a checkbox (unsaved changes)
When: User clicks "Cancel"
Then:
  - Checkbox reverts to original state
  - Unsaved changes bar disappears
```

### REG-004: Loading States (Skeleton)

**File:** `loading-states.spec.ts`

```
Given: API response is delayed (mock slow response)
When: User navigates to "/"
Then:
  - Skeleton loaders are visible
  - Skeleton loaders disappear when data loads
  - Teams are displayed
```

### REG-005: Progress Bar Accuracy

**File:** `visual-validation.spec.ts`

```
Given: Team has 2 of 5 items checked in a category
When: User views the category
Then:
  - Progress bar shows 40%
  - Text shows "2/5"
When: User checks another item
Then:
  - Progress bar updates to 60%
  - Text shows "3/5"
```

### REG-006: Status Badge Colors

**File:** `visual-validation.spec.ts`

```
Given: Teams with different readiness levels exist
When: User views the teams grid
Then:
  - Red badge for readiness < 50%
  - Yellow badge for readiness 50-89%
  - Green badge for readiness ≥ 90%
```

### REG-007: Responsive Layout

**File:** `responsive.spec.ts`

```
Given: User is on homepage
When: Viewport is desktop (1920x1080)
Then:
  - Teams display in 2-column grid
When: Viewport is mobile (375x667)
Then:
  - Teams display in 1-column stack
  - All content remains accessible
```

### REG-008: Multiple Teams Rendering

**File:** `teams-overview.spec.ts`

```
Given: 4 teams exist in the system
When: User navigates to "/"
Then:
  - All 4 team cards are visible
  - Each card shows team name
  - Each card shows status badge
  - Each card shows progress indicator
```

---

## Implementation Notes

### API Mocking

Use Playwright route interception for error tests:
```typescript
await page.route('**/api/teams', route => 
  route.fulfill({ status: 500 })
);
```

### Slow Response Mocking

```typescript
await page.route('**/api/teams', async route => {
  await new Promise(r => setTimeout(r, 2000));
  await route.continue();
});
```

### Viewport Testing

```typescript
test.use({ viewport: { width: 375, height: 667 } });
```

---

## Verification

```bash
cd tests/ui
npm test -- --grep="regression" --reporter=list
# All 8 tests should pass
```

---

## Files to Create

- `tests/ui/tests/regression/edge-cases.spec.ts`
- `tests/ui/tests/regression/error-handling.spec.ts`
- `tests/ui/tests/regression/loading-states.spec.ts`
- `tests/ui/tests/regression/visual-validation.spec.ts`
- `tests/ui/tests/regression/responsive.spec.ts`

---

## References

- [UI Testing Strategy](../features/ui-testing-strategy.md) - Section 4.2
- [Task 019](./019-smoke-tests.md)
