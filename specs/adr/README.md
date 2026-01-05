# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Nefira Developer Readiness Portal project, following the [MADR](https://adr.github.io/madr/) format.

## What are ADRs?

Architecture Decision Records document significant architectural and technical decisions made during the project, including:
- The context and problem being addressed
- Options that were considered
- The decision that was made and why
- Consequences (positive, negative, and neutral)

ADRs help maintain project knowledge, explain rationale to new team members, and provide traceability for architectural choices.

## Current ADRs

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [0001](0001-frontend-framework-selection.md) | Frontend Framework Selection | Accepted | 2025-12-30 |
| [0002](0002-backend-framework-selection.md) | Backend Framework Selection | Accepted | 2025-12-30 |
| [0003](0003-data-persistence-strategy.md) | Data Persistence Strategy | Accepted | 2025-12-30 |
| [0004](0004-container-orchestration-approach.md) | Container Orchestration Approach | Accepted | 2025-12-30 |
| [0005](0005-testing-and-ci-cd-strategy.md) | Testing and CI/CD Strategy | Accepted | 2025-12-30 |

## Decision Summary

### Frontend: React 18+
- **Why**: Best balance of simplicity, developer familiarity, and ecosystem maturity
- **Alternatives**: Vue 3, Angular 17+
- **Key Factor**: Rapid development timeline and demo reliability

### Backend: .NET 8 Minimal APIs
- **Why**: Minimal boilerplate for simple CRUD API, mandated by PRD
- **Alternatives**: Controller-based API, CQRS pattern
- **Key Factor**: Simplicity-first approach for 6-8 endpoints

### Data: JSON Files (with Redis option)
- **Why**: Zero dependencies, human-readable, perfect for 2-4 teams
- **Alternatives**: Redis, SQLite
- **Key Factor**: Extreme simplicity and demo reliability

### Orchestration: Docker Compose
- **Why**: Industry standard for local multi-container development
- **Alternatives**: Kubernetes, Podman
- **Key Factor**: Simplicity, ubiquity, explicitly required by PRD

### Testing: Playwright + GitHub Actions
- **Why**: Modern, reliable, explicitly required by PRD
- **Alternatives**: Selenium, Cypress
- **Key Factor**: Auto-wait intelligence, MCP integration alignment

## ADR Lifecycle

```
┌─────────┐
│ Proposed│ - Initial draft, under review
└────┬────┘
     │
     ▼
┌─────────┐
│Accepted │ - Approved for implementation
└────┬────┘
     │
     ├──────────────┬──────────────┐
     ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│Still Valid│  │Deprecated│  │Superseded│
└──────────┘  └──────────┘  └──────────┘
```

## Creating New ADRs

1. **Identify Decision**: Determine if the decision is significant enough to warrant an ADR
2. **Research Options**: Evaluate at least 3 alternatives
3. **Read Context**: Review PRD, FRDs, existing ADRs, and technical stack documentation
4. **Create ADR**: Use the next sequential number (e.g., 0006)
5. **Follow MADR Format**: See [templates](../../.github/skills/adr-generation/templates/)
6. **Link to Requirements**: Reference relevant PRD/FRD sections
7. **Get Review**: Have architect and devlead review before accepting

## When to Create an ADR

**Create ADRs for:**
- Technology stack choices (frameworks, libraries, databases)
- Architectural patterns (API design, state management, error handling)
- Infrastructure decisions (deployment, containerization, CI/CD)
- Security approaches (authentication, authorization, data protection)
- Significant trade-offs affecting multiple areas

**Don't create ADRs for:**
- Minor implementation details (variable naming, code style)
- Temporary decisions that will change frequently
- Decisions already covered by existing ADRs
- Decisions mandated by PRD (just implement, don't debate)

## References

- [MADR Format](https://adr.github.io/madr/)
- [ADR Generation Skill](../../.github/skills/adr-generation/SKILL.md)
- [Product Requirements Document](../prd.md)
- [Technical Stack Standards](../../docs/technical-stack.md)
