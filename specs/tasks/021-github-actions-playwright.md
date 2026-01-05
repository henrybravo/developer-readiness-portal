# Task 021: GitHub Actions CI Integration

**Status:** Not Started  
**Priority:** P0  
**Depends On:** Task 019 (Smoke Tests)  
**Blocks:** None

---

## Objective

Create GitHub Actions workflow to run Playwright tests on PR and push events with artifact upload and status reporting.

---

## Acceptance Criteria

- [ ] `.github/workflows/playwright.yml` created
- [ ] Smoke tests run on every PR to `main`
- [ ] Full regression runs on nightly schedule
- [ ] Test artifacts (reports, screenshots) uploaded
- [ ] PR status check blocks merge on test failure
- [ ] Workflow supports manual trigger with parameters

---

## Workflow Specification

### Triggers

| Event | Branch | Suite |
|-------|--------|-------|
| `push` | `main` | smoke |
| `pull_request` | `main` | smoke |
| `schedule` | - | regression (nightly 2am UTC) |
| `workflow_dispatch` | any | configurable |

### Jobs

#### 1. Build & Test

**Runs on:** `ubuntu-latest`

**Steps:**
1. Checkout repository
2. Setup Node.js 20
3. Setup .NET 9
4. Cache dependencies
5. Install backend dependencies
6. Install frontend dependencies
7. Install Playwright dependencies
8. Install Playwright browsers
9. Build frontend
10. Start backend (background)
11. Start frontend preview (background)
12. Wait for services (health checks)
13. Run Playwright tests
14. Upload test report artifact
15. Upload failure artifacts (screenshots/videos)

### Caching Strategy

| Cache | Key |
|-------|-----|
| npm | `npm-${{ hashFiles('**/package-lock.json') }}` |
| NuGet | `nuget-${{ hashFiles('**/*.csproj') }}` |
| Playwright | `playwright-${{ hashFiles('tests/ui/package-lock.json') }}` |

### Artifacts

| Artifact | Retention | Condition |
|----------|-----------|-----------|
| `playwright-report` | 30 days | Always |
| `test-results` | 7 days | On failure |

---

## Workflow File Structure

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # 2am UTC daily
  workflow_dispatch:
    inputs:
      suite:
        description: 'Test suite to run'
        required: true
        default: 'smoke'
        type: choice
        options:
          - smoke
          - regression
          - all

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    
    steps:
      # ... implementation details
```

---

## Health Check Script

Create `tests/ui/scripts/wait-for-servers.sh`:
```bash
#!/bin/bash
# Wait for backend
until curl -s http://localhost:5000/health > /dev/null; do
  sleep 1
done

# Wait for frontend
until curl -s http://localhost:4173 > /dev/null; do
  sleep 1
done

echo "Servers ready"
```

---

## PR Status Check Configuration

After workflow is created, configure branch protection:
1. Settings → Branches → `main`
2. Require status checks: `Playwright Tests / test`
3. Require checks to pass before merging

---

## Verification

1. Create test PR
2. Verify workflow triggers
3. Verify tests run successfully
4. Verify artifacts are uploaded
5. Verify PR status check appears

---

## Files to Create

- `.github/workflows/playwright.yml`
- `tests/ui/scripts/wait-for-servers.sh`

---

## References

- [UI Testing Strategy](../features/ui-testing-strategy.md) - Section 8
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
