---
name: adr-generation
description: Creates Architecture Decision Records (ADRs) using MADR format to document key technical and architectural decisions. Use this skill when asked to create an ADR, document architecture decisions, evaluate technology choices, or record technical decisions with rationale.
---

# ADR Generation Skill

This skill helps create Architecture Decision Records that document key technical and architectural decisions for the project using the MADR (Markdown Any Decision Records) format.

## When to Use This Skill

Create ADRs when significant architectural decisions need to be documented, including:
- Technology stack choices (frameworks, libraries, languages)
- Database selection and data modeling approach
- API design patterns and conventions
- Frontend architecture and state management
- Authentication and authorization strategy
- Deployment and infrastructure approach
- Agent framework and orchestration patterns
- Testing strategy and quality gates
- Observability and monitoring approach
- Security and compliance measures
- Caching and messaging patterns
- Cloud service selections (Azure services)

## Prerequisites

Before creating ADRs, read and analyze:
1. **Product Requirements** - `specs/prd.md`
2. **Feature Requirements** - `specs/features/*.md`
3. **Engineering Standards** - `AGENTS.md` or `standards/` folder
4. **Existing ADRs** - `specs/adr/*.md` (maintain consistency, avoid duplicates)

## Workflow

### 1. Receive Request
From PM, DevLead, or manual invocation

### 2. Read Context
- PRD, FRDs, AGENTS.md, existing ADRs

### 3. Identify Decisions
- What architectural decisions need documentation?

### 4. Research Options
- Evaluate at least 3 alternatives for each decision
- Use research tools to gather best practices

### 5. Create ADRs
- One ADR per decision, using MADR format
- Follow naming and numbering conventions

### 6. Review Alignment
- Ensure ADRs align with requirements and standards

## File Naming Convention

**Location**: `specs/adr/NNNN-short-title.md`

**Examples**:
- `0001-database-choice.md`
- `0002-frontend-framework.md`
- `0003-authentication-strategy.md`
- `0004-deployment-platform.md`

**Sequential Numbering**:
1. Check existing ADRs to find the highest number
2. Create new ADR with next sequential number (zero-padded to 4 digits)
3. Never reuse numbers, even for superseded ADRs

## MADR Format Structure

Each ADR must use this structure:

```markdown
# [ADR Number] [Short Title in Kebab-Case]

**Date**: YYYY-MM-DD  
**Status**: Proposed | Accepted | Deprecated | Superseded

## Context

What is the issue that motivates this decision or change?
- What problem are we trying to solve?
- What constraints exist?
- What are the business or technical drivers?

## Decision Drivers

What factors influence this decision?
- Performance requirements
- Scalability needs
- Team expertise
- Budget constraints
- Timeline pressures
- Integration requirements
- Compliance/security requirements

## Considered Options

List at least 3 options that were evaluated:

### Option 1: [Name]
**Description**: Brief description

**Pros**:
- Advantage 1
- Advantage 2

**Cons**:
- Disadvantage 1
- Disadvantage 2

### Option 2: [Name]
**Description**: Brief description

**Pros**:
- Advantage 1

**Cons**:
- Disadvantage 1

### Option 3: [Name]
**Description**: Brief description

**Pros**:
- Advantage 1

**Cons**:
- Disadvantage 1

## Decision Outcome

**Chosen Option**: [Option Name]

**Rationale**:
- Why this option was selected
- How it best addresses the decision drivers
- What trade-offs were acceptable

## Consequences

### Positive
- Benefit 1
- Benefit 2

### Negative
- Trade-off 1
- Trade-off 2
- Mitigation strategies

### Neutral
- Other impacts to be aware of

## Implementation Notes (Optional)

- Key implementation considerations
- Migration path from current state (if applicable)
- Dependencies on other decisions

## References (Optional)

- Links to PRD/FRD sections
- Links to other ADRs
- External documentation
- Research sources
```

## Example ADR Topics by Project Type

### Web Application
- Frontend framework (React vs Angular vs Vue)
- Backend framework (.NET vs Node vs Python)
- Database (SQL vs NoSQL)
- Authentication (OAuth, JWT, session-based)
- State management (Redux, Context, Zustand)
- API design (REST vs GraphQL)
- Deployment (App Service, Container Apps, Static Web Apps)

### Microservices
- Service communication (REST, gRPC, message queues)
- Service discovery and API gateway
- Data consistency patterns
- Distributed tracing and circuit breakers

### AI/ML Application
- Model serving approach
- Agent orchestration framework
- Vector database selection
- Prompt management strategy
- Observability for AI workloads

## Quality Requirements

### Must Have
- At least 3 considered options
- Clear decision rationale
- Both positive and negative consequences
- Proper MADR format
- Sequential numbering
- Links to relevant PRD/FRD sections

### Should Have
- Decision drivers clearly stated
- Implementation notes for complex decisions
- References to research sources
- Migration path (if changing existing architecture)

### Avoid
- Single option (no alternatives considered)
- Missing rationale
- Vague consequences
- Implementation code (save for dev agent)
- Duplicating existing ADRs

## ADR Status Values

- **Proposed** - Initial draft, not yet reviewed
- **Accepted** - Approved for implementation
- **Deprecated** - No longer recommended
- **Superseded** - Replaced by a newer ADR

## Important Notes

- ADRs are **living documents** - update status when decisions change
- Mark ADRs as **Superseded** when replaced, don't delete them
- Keep ADRs **focused** - one decision per ADR
- Make ADRs **actionable** - developers should understand implications
- Document **trade-offs** honestly - include negatives, not just positives

## Next Steps

After creating ADRs:
1. Review with DevLead for technical validation
2. Validate alignment with PM on product requirements
3. Hand to Planner for implementation planning

## Templates

See `templates/adr-template.md` for the complete MADR template.

## Sample Output

See `examples/sample-adr.md` for a complete example.
