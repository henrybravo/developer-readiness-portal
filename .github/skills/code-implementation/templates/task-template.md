# Task Documentation Template

Use this template to document implementation tasks in `specs/tasks/`.

---

# [Order]-Task-[Name]

**Task ID**: TASK-[XXX]
**FRD Reference**: FRD-[XXX]
**Status**: Not Started | In Progress | Complete
**Assigned To**: [Developer Name]

## Description

[Clear, concise explanation of what needs to be built - 2-3 sentences]

## Technical Requirements

### Backend Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

### Frontend Requirements (if applicable)
- [ ] [Requirement 1]
- [ ] [Requirement 2]

### API Endpoints (if applicable)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/resource` | [Description] |
| POST | `/api/v1/resource` | [Description] |

### Data Models (if applicable)

```
Entity: [Name]
- property1: type
- property2: type
- property3: type
```

## Dependencies

| Task | Status | Notes |
|------|--------|-------|
| TASK-[XXX] | Complete | [Reason for dependency] |
| TASK-[XXX] | In Progress | [Reason for dependency] |

## Acceptance Criteria

- [ ] **AC-1**: [Specific, testable criterion]
- [ ] **AC-2**: [Specific, testable criterion]
- [ ] **AC-3**: [Specific, testable criterion]
- [ ] **AC-4**: [Specific, testable criterion]

## Testing Requirements

### Unit Tests
- [ ] Test [scenario 1]
- [ ] Test [scenario 2]
- [ ] Test [error handling]
- [ ] Coverage ≥85%

### Integration Tests
- [ ] Test [integration scenario 1]
- [ ] Test [end-to-end flow]

### Manual Testing
- [ ] [Manual test case 1]
- [ ] [Manual test case 2]

## Implementation Notes

[Optional: Key considerations, gotchas, or implementation hints discovered during planning]

## References

- FRD: [Link to FRD]
- ADR: [Link to relevant ADR]
- Design: [Link to design mockups]

---

*DO NOT include implementation code in this file. This is for requirements only.*
