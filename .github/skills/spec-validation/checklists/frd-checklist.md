# FRD Validation Checklist

Use this checklist to validate Feature Requirements Documents.

---

## Structure Validation

### Required Sections
- [ ] **Feature ID** - Unique identifier (FRD-XXX)
- [ ] **PRD Reference** - Links to PRD requirement(s)
- [ ] **Overview** - Description, business value, user impact
- [ ] **Inputs** - All inputs documented with sources
- [ ] **Outputs** - All outputs documented with destinations
- [ ] **User Stories** - Feature-specific stories
- [ ] **Acceptance Criteria** - Testable criteria listed
- [ ] **Dependencies** - Feature and external dependencies

### Optional but Recommended
- [ ] **Non-Functional Requirements** - Performance, security, etc.
- [ ] **Integration Points** - System integrations
- [ ] **Open Questions** - Unresolved items tracked
- [ ] **Revision History** - Version tracking

## Content Quality

### Feature Identification
- [ ] Feature ID is unique and follows naming convention
- [ ] Status is clearly indicated (Draft/In Review/Approved)
- [ ] Priority is set (Critical/High/Medium/Low)
- [ ] PRD reference points to valid requirement(s)

### Overview Section
- [ ] Description explains what the feature does
- [ ] Business value is clearly articulated
- [ ] User impact is described
- [ ] Scope boundaries are clear

### Inputs Section
- [ ] All inputs are listed
- [ ] Input sources are specified
- [ ] Required vs optional is indicated
- [ ] Data types/formats are described

### Outputs Section
- [ ] All outputs are documented
- [ ] Output destinations are specified
- [ ] Output formats are described
- [ ] Success/error outputs covered

### User Stories
- [ ] Uses Gherkin format
- [ ] Stories are specific to this feature
- [ ] Each story has acceptance criteria
- [ ] Stories cover main and alternative flows

### Acceptance Criteria
- [ ] Each criterion has unique ID (AC-X)
- [ ] Criteria are specific and testable
- [ ] Criteria are binary (pass/fail)
- [ ] Edge cases are covered
- [ ] Error handling is addressed

### Dependencies
- [ ] Internal feature dependencies listed
- [ ] External system dependencies identified
- [ ] Dependency type is specified (Required/Optional)
- [ ] Dependency status is noted

## Traceability

- [ ] Feature ID links to PRD requirements
- [ ] User stories reference acceptance criteria
- [ ] Dependencies link to other FRDs
- [ ] Constraints reference ADRs if applicable

## Completeness Checks

### Functional Coverage
- [ ] All user workflows documented
- [ ] Alternative flows addressed
- [ ] Error scenarios covered
- [ ] Edge cases identified

### Non-Functional Coverage
- [ ] Performance requirements specified
- [ ] Security requirements addressed
- [ ] Scalability considerations noted
- [ ] Accessibility requirements (if UI feature)

## WHAT vs HOW Validation

### Should NOT Contain
- [ ] No implementation code
- [ ] No specific technology mandates
- [ ] No database schemas
- [ ] No API contracts (save for integration docs)
- [ ] No file/class names

### Should Contain
- [ ] What the feature accomplishes
- [ ] User-facing behavior
- [ ] Business rules and logic
- [ ] Quality expectations

## Scoring

| Category | Weight | Score |
|----------|--------|-------|
| Structure (all sections) | 15% | /100 |
| Content Quality | 35% | /100 |
| Traceability | 20% | /100 |
| Acceptance Criteria | 20% | /100 |
| WHAT vs HOW | 10% | /100 |
| **Total** | 100% | **/100** |

## Common Errors

1. **No PRD traceability** - Feature doesn't link to requirements
2. **Vague acceptance criteria** - Untestable criteria
3. **Missing dependencies** - Undocumented dependencies cause issues
4. **Incomplete inputs/outputs** - Missing data flow documentation
5. **No error handling** - Only happy path documented

---

*Validated by: [Agent]*
*Date: [Date]*
