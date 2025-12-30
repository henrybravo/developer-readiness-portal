# PRD Validation Checklist

Use this checklist to validate Product Requirements Documents.

---

## Structure Validation

### Required Sections
- [ ] **Purpose** - Problem statement and target audience defined
- [ ] **Scope** - In-scope and out-of-scope clearly delineated
- [ ] **Goals & Success Criteria** - Measurable objectives defined
- [ ] **High-Level Requirements** - Requirements listed with IDs
- [ ] **User Stories** - At least one user story present
- [ ] **Assumptions & Constraints** - Both sections addressed

### Optional but Recommended
- [ ] **Stakeholders** - Key stakeholders identified
- [ ] **Timeline & Milestones** - High-level timeline provided
- [ ] **Revision History** - Version tracking present

## Content Quality

### Purpose Section
- [ ] Clearly states the problem being solved
- [ ] Identifies target audience/users
- [ ] Explains business value
- [ ] Avoids technical jargon

### Scope Section
- [ ] In-scope items are specific and measurable
- [ ] Out-of-scope items prevent scope creep
- [ ] Boundaries are clear and unambiguous

### Goals Section
- [ ] Goals are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- [ ] Success metrics are quantifiable
- [ ] Measurement methods are defined
- [ ] Business alignment is clear

### Requirements Section
- [ ] Each requirement has unique ID [REQ-X]
- [ ] Requirements describe WHAT, not HOW
- [ ] No technical implementation details
- [ ] Requirements are testable
- [ ] Priority is indicated (Critical/High/Medium/Low)

### User Stories Section
- [ ] Uses Gherkin format (As a... I want... So that...)
- [ ] Stories are from user perspective
- [ ] Acceptance criteria are defined
- [ ] Stories map to requirements

### Assumptions & Constraints
- [ ] Assumptions are clearly stated
- [ ] Constraints (business, regulatory, technical) identified
- [ ] Risks from assumptions considered

## WHAT vs HOW Validation

### Should NOT Contain
- [ ] No code snippets or algorithms
- [ ] No specific technology choices (e.g., "use React")
- [ ] No database schemas or API contracts
- [ ] No architecture diagrams
- [ ] No file structures or class names
- [ ] No implementation timelines

### Should Contain
- [ ] Business outcomes and user value
- [ ] Functional requirements (what the system does)
- [ ] Quality requirements (performance, security goals)
- [ ] User experience expectations
- [ ] Success metrics

## Traceability

- [ ] Requirements are numbered for reference
- [ ] User stories reference requirements
- [ ] Goals map to success metrics

## Scoring

| Category | Weight | Score |
|----------|--------|-------|
| Structure (all sections) | 20% | /100 |
| Content Quality | 40% | /100 |
| WHAT vs HOW | 25% | /100 |
| Traceability | 15% | /100 |
| **Total** | 100% | **/100** |

## Common Errors

1. **Missing success metrics** - Goals without measurable outcomes
2. **Technical leakage** - Implementation details in requirements
3. **Vague scope** - Unclear boundaries lead to scope creep
4. **Missing user perspective** - Requirements written from system view
5. **No priority** - All requirements seem equally important

---

*Validated by: [Agent]*
*Date: [Date]*
