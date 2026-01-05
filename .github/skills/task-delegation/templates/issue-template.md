# GitHub Issue Template for Task Delegation

Use this template when creating GitHub issues for Copilot implementation.

---

## [Task Title]

### Description

[Provide a clear, comprehensive description of what needs to be implemented. Include context about why this feature/fix is needed.]

### Requirements

#### Technical Requirements
- [ ] [Technical requirement 1]
- [ ] [Technical requirement 2]
- [ ] [Technical requirement 3]

#### Functional Requirements
- [ ] [Functional requirement 1]
- [ ] [Functional requirement 2]

### Dependencies

This task depends on:
- #[issue-number] - [Brief description of dependency]
- #[issue-number] - [Brief description of dependency]

**Note:** Do not start this task until all dependencies are merged.

### Acceptance Criteria

- [ ] **AC-1:** [Specific, testable criterion]
- [ ] **AC-2:** [Specific, testable criterion]
- [ ] **AC-3:** [Specific, testable criterion]
- [ ] **AC-4:** [Specific, testable criterion]

### Testing Requirements

#### Unit Tests
- [ ] All public methods have unit tests
- [ ] Edge cases are covered
- [ ] Error handling is tested
- [ ] **Minimum coverage: 85%**

#### Integration Tests
- [ ] API endpoints are tested end-to-end
- [ ] Database operations are tested
- [ ] External service integrations are mocked/tested

#### Manual Testing
- [ ] [Manual test case 1]
- [ ] [Manual test case 2]

### Technical Constraints

- Follow coding standards in ADRs (`specs/adr/`)
- Use existing patterns from the codebase
- [Any specific architectural constraints]
- [Any specific library/framework requirements]

### References

| Document | Link |
|----------|------|
| PRD | [specs/prd.md](../specs/prd.md) |
| FRD | [specs/features/xxx.md](../specs/features/xxx.md) |
| Task Spec | [specs/tasks/xxx.md](../specs/tasks/xxx.md) |
| ADRs | [specs/adr/](../specs/adr/) |
| ADR | [specs/adr/xxxx-xxx.md](../specs/adr/xxxx-xxx.md) |

### Labels

- `feature` / `bug` / `enhancement`
- `backend` / `frontend` / `infrastructure`
- `priority:high` / `priority:medium` / `priority:low`

---

**Assigned to:** @copilot
