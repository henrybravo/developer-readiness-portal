# ADR Validation Checklist

Use this checklist to validate Architecture Decision Records.

---

## Structure Validation (MADR Format)

### Required Sections
- [ ] **Title** - Short, descriptive title in kebab-case
- [ ] **Date** - Decision date in YYYY-MM-DD format
- [ ] **Status** - Proposed/Accepted/Deprecated/Superseded
- [ ] **Context** - Problem statement and drivers
- [ ] **Decision Drivers** - Factors influencing the decision
- [ ] **Considered Options** - At least 3 options evaluated
- [ ] **Decision Outcome** - Chosen option with rationale
- [ ] **Consequences** - Positive, negative, and neutral impacts

### Optional but Recommended
- [ ] **Implementation Notes** - Key considerations
- [ ] **References** - Links to PRD/FRD/external docs
- [ ] **Migration Path** - If changing existing architecture

## Numbering and Naming

- [ ] Sequential 4-digit number (0001, 0002, etc.)
- [ ] No reused numbers (even for superseded ADRs)
- [ ] Filename matches: `NNNN-short-title.md`
- [ ] Title is descriptive and concise

## Content Quality

### Context Section
- [ ] Clearly explains the problem
- [ ] States what motivates this decision
- [ ] Identifies constraints
- [ ] Mentions business/technical drivers

### Decision Drivers
- [ ] Lists specific factors influencing decision
- [ ] Includes both technical and business drivers
- [ ] Prioritizes drivers by importance
- [ ] Covers: performance, security, cost, team skills, timeline

### Considered Options
- [ ] **Minimum 3 options evaluated**
- [ ] Each option has description
- [ ] Each option has pros listed
- [ ] Each option has cons listed
- [ ] Options are genuinely different approaches
- [ ] No straw-man options

### Decision Outcome
- [ ] Clearly states chosen option
- [ ] Rationale explains WHY this option
- [ ] References decision drivers
- [ ] Acknowledges trade-offs made

### Consequences
- [ ] **Positive consequences** - Benefits of the decision
- [ ] **Negative consequences** - Trade-offs accepted
- [ ] **Neutral consequences** - Other impacts
- [ ] Mitigation strategies for negatives

## Quality Checks

### Research Evidence
- [ ] Options based on research, not assumptions
- [ ] External sources referenced where applicable
- [ ] Best practices considered
- [ ] Existing patterns in codebase evaluated

### Completeness
- [ ] Decision is actionable
- [ ] Implementation implications clear
- [ ] Dependencies on other decisions noted
- [ ] Links to related ADRs included

### Objectivity
- [ ] Pros/cons fairly evaluated
- [ ] No bias toward preferred option
- [ ] Trade-offs honestly acknowledged
- [ ] Negative consequences not hidden

## Traceability

- [ ] References relevant PRD/FRD sections
- [ ] Links to other ADRs if related
- [ ] Notes features/components affected
- [ ] Implementation tasks can be derived

## Anti-Pattern Detection

### Should NOT Have
- [ ] Single option (no alternatives)
- [ ] Missing rationale for decision
- [ ] Vague consequences
- [ ] Implementation code
- [ ] Duplicate of existing ADR

### Red Flags
- [ ] "We've always done it this way"
- [ ] Only one option seriously considered
- [ ] All options have same pros/cons
- [ ] Consequences are all positive

## Scoring

| Category | Weight | Score |
|----------|--------|-------|
| MADR Structure | 15% | /100 |
| Context Quality | 15% | /100 |
| Options (≥3, balanced) | 25% | /100 |
| Decision Rationale | 25% | /100 |
| Consequences | 15% | /100 |
| Traceability | 5% | /100 |
| **Total** | 100% | **/100** |

## Common Errors

1. **Single option** - No alternatives seriously considered
2. **Missing rationale** - Decision stated without explanation
3. **Vague consequences** - "It will be better" without specifics
4. **No negatives** - Unrealistic view of trade-offs
5. **Implementation code** - ADR becomes design doc
6. **Duplicate decisions** - Same topic in multiple ADRs

---

*Validated by: [Agent]*
*Date: [Date]*
