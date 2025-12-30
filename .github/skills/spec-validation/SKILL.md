---
name: spec-validation
description: Validates generated specifications against standards and best practices to ensure quality and completeness. Use this skill when asked to validate PRDs, review FRDs, check ADRs for completeness, ensure specification quality, or verify documentation standards.
---

# Spec Validation Skill

This skill validates generated specifications (PRDs, FRDs, ADRs) against standards and best practices to ensure quality, completeness, and consistency.

## When to Use This Skill

- Validating PRD quality and completeness
- Reviewing FRD specifications
- Checking ADR format and content
- Ensuring traceability between documents
- Quality gating before implementation

## Validation Workflow

### 1. Document Discovery
- Locate all specification files
- `specs/prd.md` - Product Requirements
- `specs/features/*.md` - Feature Requirements
- `specs/adr/*.md` - Architecture Decisions

### 2. Run Validation Checks
- Format and structure validation
- Content completeness checks
- Cross-reference verification
- Quality scoring

### 3. Generate Report
- List all findings
- Severity levels (Error, Warning, Info)
- Recommendations for fixes

## Validation Checklists

### PRD Validation
See `checklists/prd-checklist.md`:
- [ ] Purpose section clearly defines the problem
- [ ] Scope defines in-scope and out-of-scope items
- [ ] Goals have measurable success criteria
- [ ] Requirements use [REQ-X] numbering
- [ ] User stories follow Gherkin format
- [ ] Assumptions and constraints documented
- [ ] No technical implementation details (WHAT not HOW)

### FRD Validation
See `checklists/frd-checklist.md`:
- [ ] Feature ID links to PRD requirement
- [ ] Inputs and outputs clearly defined
- [ ] Dependencies identified
- [ ] Acceptance criteria are testable
- [ ] Technical constraints documented
- [ ] Integration points mapped
- [ ] Traceability to PRD maintained

### ADR Validation
See `checklists/adr-checklist.md`:
- [ ] Uses MADR format
- [ ] Context clearly explains the problem
- [ ] At least 3 options considered
- [ ] Decision drivers documented
- [ ] Rationale explains why option was chosen
- [ ] Consequences (positive/negative) listed
- [ ] Sequential numbering maintained

## Quality Scoring

### Scoring Criteria

| Score | Description |
|-------|-------------|
| 100% | All checks pass, exemplary documentation |
| 80-99% | Minor issues, ready for implementation |
| 60-79% | Some issues need attention |
| <60% | Significant issues, requires revision |

### Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| Error | Blocks implementation | Must fix |
| Warning | Quality concern | Should fix |
| Info | Improvement suggestion | Nice to have |

## Validation Report Format

```markdown
# Specification Validation Report

**Date:** [Date]
**Documents Validated:** [Count]
**Overall Score:** [X]%

## Summary
- Errors: [X]
- Warnings: [X]
- Info: [X]

## PRD Validation
**File:** specs/prd.md
**Score:** [X]%

### Errors
- [ERROR] [Description] - Line [X]

### Warnings
- [WARNING] [Description] - Line [X]

## FRD Validation
[Similar format for each FRD]

## ADR Validation
[Similar format for each ADR]

## Recommendations
1. [Recommendation]
2. [Recommendation]
```

## Common Issues

### PRD Issues
- Missing success metrics
- Technical details in requirements (HOW vs WHAT)
- Vague acceptance criteria
- Missing stakeholder information

### FRD Issues
- No traceability to PRD
- Missing acceptance criteria
- Unclear dependencies
- No testing requirements

### ADR Issues
- Single option considered
- Missing rationale
- Vague consequences
- No references to requirements

## Integration with Workflow

- Run after PRD creation (before FRD)
- Run after FRD creation (before planning)
- Run after ADR creation (before implementation)
- Gate quality before handoff to next agent

## Checklists

See `checklists/` directory for detailed validation checklists.
