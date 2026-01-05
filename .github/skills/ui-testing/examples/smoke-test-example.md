# UI Testing Skill Example

Example of using the ui-testing skill with the `/test-ui` prompt for testing the Developer Readiness Portal.

## Scenario: Smoke Test Validation

### Setup
```bash
# Terminal 1: Start backend
cd backend && dotnet run

# Terminal 2: Start frontend
cd frontend && npm run preview
```

### Test Execution

1. **Reset test data**
   ```
   /test-ui reset-data
   ```
   Expected: Test data reset to seed state

2. **Run smoke tests**
   ```
   /test-ui run smoke
   ```
   Expected: All 4 smoke tests pass
   - SMOKE-001: Homepage loads with teams grid
   - SMOKE-002: Navigate to team details page
   - SMOKE-003: Toggle checkbox shows unsaved changes bar
   - SMOKE-004: Save changes shows success toast

3. **Get test report**
   ```
   /test-ui report summary
   ```
   Expected: Summary showing 4 passed tests

### Output Example

```
✓ SMOKE-001: Homepage loads with teams grid (4.5s)
✓ SMOKE-002: Navigate to team details page (2.8s)
✓ SMOKE-003: Toggle checkbox shows unsaved changes bar (3.2s)
✓ SMOKE-004: Save changes shows success toast (5.1s)

4 passed (15.6s)
```

## Scenario: Interactive Exploration

### Test Flow

1. **Navigate to homepage**
   ```
   /test-ui navigate http://localhost:4173
   ```

2. **Take snapshot to verify structure**
   ```
   /test-ui snapshot
   ```
   Expected: Page contains teams grid with 4 team cards

3. **Click on Team Alpha**
   ```
   /test-ui click "Team Alpha"
   ```

4. **Capture current state**
   ```
   /test-ui screenshot
   ```
   Expected: Team details page with checklist items

5. **Explore checklist**
   ```
   /test-ui snapshot
   ```
   Expected: Accessibility tree shows 6 checklist categories with items

## Scenario: Regression Testing

### Full Suite Execution

1. **Reset data**
   ```
   /test-ui reset-data
   ```

2. **Run regression tests**
   ```
   /test-ui run regression
   ```
   Expected: 8 tests pass
   - REG-001: Empty state handling
   - REG-003: Cancel reverts changes
   - REG-004: Loading states
   - REG-005: Progress bar accuracy
   - REG-006: Status badge colors
   - REG-007: Mobile responsive layout
   - REG-008: Grid rendering

3. **Generate HTML report**
   ```
   /test-ui report html
   ```
   Expected: Interactive HTML report with traces and screenshots

## Scenario: Data Verification

### Verify Data Persistence

1. **Navigate to Team Alpha**
   ```
   /test-ui navigate http://localhost:4173/teams/team-alpha
   ```

2. **Take initial snapshot**
   ```
   /test-ui snapshot
   ```
   Expected: Team details with initial checklist state

3. **Toggle a checkbox**
   ```
   /test-ui click "checkbox-codebase-0"
   ```

4. **Verify unsaved changes bar**
   ```
   /test-ui snapshot
   ```
   Expected: Unsaved changes bar visible

5. **Click save button**
   ```
   /test-ui click "save-btn"
   ```

6. **Verify success toast**
   ```
   /test-ui snapshot
   ```
   Expected: Success toast notification appears

7. **Navigate back to same team**
   ```
   /test-ui navigate http://localhost:4173/teams/team-alpha
   ```

8. **Verify change persisted**
   ```
   /test-ui snapshot
   ```
   Expected: Checkbox remains checked from previous save

## Common Patterns

### Pattern: Test → Report → Analyze

```
/test-ui run smoke
→ /test-ui report summary
→ /test-ui report html
```

### Pattern: Explore → Understand → Automate

```
/test-ui navigate [url]
→ /test-ui snapshot
→ /test-ui run [related-test]
```

### Pattern: Reset → Test → Verify

```
/test-ui reset-data
→ /test-ui run all
→ /test-ui report json
```

## Results

### Expected Test Results
- ✅ 4/4 smoke tests pass
- ✅ 8/8 regression tests pass
- ✅ All checklist items verify correctly
- ✅ Data changes persist after save

### Performance Metrics
- Smoke tests: ~15 seconds
- Regression tests: ~25 seconds
- Full suite: ~40 seconds

## Troubleshooting

### Issue: Test data not resetting
**Solution:**
```
/test-ui reset-data
/test-ui run smoke
```

### Issue: Navigation fails
**Solution:** Verify services running:
```bash
# Check backend
curl http://localhost:5000/api/teams
# Check frontend
curl http://localhost:4173
```

### Issue: Browser automation not responding
**Solution:** Check MCP configuration:
```
cat .github/mcp/playwright.json
```

## Next Steps

1. Complete all scenarios above
2. Review test code in `tests/ui/`
3. Examine artifacts in HTML report
4. Extend with custom test cases
5. Integrate with CI/CD pipeline

## Documentation

- **Setup Guide**: `docs/TEST-UI-SETUP.md`
- **Prompt Reference**: `.github/prompts/test-ui.prompt.md`
- **Quick Reference**: `.github/prompts/test-ui.quick-ref.prompt.md`
- **Test Manual**: `docs/test-manual.md`
