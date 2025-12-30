# Feature Documentation Template

Use this template for documenting features in `specs/features/`.

---

# Feature: [Feature Name]

**Status:** Complete | Partial | Incomplete
**Primary Files:** `[path/to/main/file.cs]`, `[path/to/component.tsx]`

## Overview

### Description
[Brief description of what this feature does]

### Business Purpose
[What business problem does this feature solve?]

### Implementation Status
- **Frontend:** [Complete/Partial/Missing]
- **Backend:** [Complete/Partial/Missing]
- **Tests:** [Complete/Partial/Missing]
- **Documentation:** [Complete/Partial/Missing]

## User Workflows

### Primary Flow
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Alternative Flows
- [Alternative scenario 1]
- [Alternative scenario 2]

## Functional Requirements

Based on code analysis:

### FR-1: [Requirement Name]
- **Implementation:** `[file:line]`
- **Behavior:** [What the code does]
- **Status:** Implemented | Partial | Missing

### FR-2: [Requirement Name]
- **Implementation:** `[file:line]`
- **Behavior:** [What the code does]
- **Status:** Implemented | Partial | Missing

## Technical Implementation

### Frontend Components
| Component | File | Purpose |
|-----------|------|---------|
| [Component] | `[path]` | [Purpose] |

### Backend Endpoints
| Endpoint | Method | Handler | Purpose |
|----------|--------|---------|---------|
| `/api/xxx` | GET | `[handler]` | [Purpose] |

### Data Models
```
Entity: [Name]
Location: [file path]
Properties:
- property1: type
- property2: type
```

## Dependencies

### Feature Dependencies
| Feature | Type | Notes |
|---------|------|-------|
| [Feature] | Required | [Notes] |

### External Dependencies
- [External service/API]
- [Database table]

## Acceptance Criteria

Based on observable behavior:

- [ ] **AC-1:** [Criterion derived from code behavior]
- [ ] **AC-2:** [Criterion derived from code behavior]

## Gaps and Technical Debt

### Missing Functionality
- [Missing feature 1]
- [Missing feature 2]

### Technical Debt
- [Issue 1 with file reference]
- [Issue 2 with file reference]

### Testing Gaps
- [Missing test coverage]
- [Untested scenarios]

## Evidence

### Code References
- Main implementation: `[file:line-range]`
- Tests: `[test-file:line-range]`
- Configuration: `[config-file]`

### Screenshots/Diagrams
[If applicable, reference UI screenshots or architecture diagrams]

---

*Analyzed: [Date]*
*Analyst: Tech Analyst Agent*
