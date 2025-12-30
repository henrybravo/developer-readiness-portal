---
name: modernization-planning
description: Creates comprehensive modernization strategies for legacy systems, including technical debt analysis, security audits, and phased transformation roadmaps. Use this skill when asked to modernize a codebase, plan upgrades, assess technical debt, create migration strategies, or transform legacy systems.
---

# Modernization Planning Skill

This skill analyzes reverse engineering documentation and develops strategic modernization roadmaps that transform existing codebases into secure, scalable, and well-architected modern solutions.

## When to Use This Skill

- Planning modernization of legacy systems
- Assessing technical debt
- Creating migration strategies
- Upgrading outdated technologies
- Planning phased transformation approaches

## Prerequisites

Before starting, verify reverse engineering analysis exists:
- `specs/features/*.md` - Business feature documentation
- `specs/docs/architecture/overview.md` - System architecture
- `specs/docs/technology/stack.md` - Technology inventory
- `specs/docs/technology/dependencies.md` - Dependency analysis

**If missing**: Request Reverse Engineering Agent to complete analysis first.

## Critical Principles

1. **Build on reverse engineering analysis** - Use existing documentation
2. **Prioritize business continuity** - Preserve existing functionality
3. **Be strategic and incremental** - Phased approaches with milestones
4. **Focus on well-architected principles** - Reliability, security, performance, cost, operations
5. **Generate actionable tasks** - Create implementable work items
6. **Plan for testing** - Comprehensive validation at every step

## Modernization Workflow

### Phase 1: Assessment and Discovery

#### 1. Review Reverse Engineering Outputs
- Read all files in `specs/features/`
- Review `specs/docs/technology/stack.md`
- Examine `specs/docs/technology/dependencies.md`
- Analyze `specs/docs/architecture/overview.md`

#### 2. Gap Analysis and Prioritization
Create `specs/modernize/assessment/`:

| Document | Purpose |
|----------|---------|
| `technical-debt.md` | Outdated dependencies, deprecated frameworks, code smells |
| `security-audit.md` | CVEs, security gaps, compliance issues |
| `performance-analysis.md` | Bottlenecks, scalability issues |
| `architecture-review.md` | Current vs target architecture |
| `compliance-gaps.md` | Standards adherence, DevOps maturity |

#### 3. Risk Assessment
Create `specs/modernize/risk-management/risk-analysis.md`:
- Technical risks (breaking changes, dependencies)
- Business risks (feature regression, downtime)
- Security risks (vulnerability exposure)
- Operational risks (deployment, skill gaps)

### Phase 2: Strategy Formulation

#### 4. Create Modernization Roadmap
Create `specs/modernize/strategy/roadmap.md`:

**Phased Approach Example:**
```
Phase 1: Foundation
- Upgrade critical dependencies
- Establish testing framework
- Implement CI/CD pipeline

Phase 2: Architecture
- Refactor tightly coupled components
- Implement design patterns
- Optimize database

Phase 3: Security & Compliance
- Zero-trust security patterns
- Enhanced authentication
- Security scanning

Phase 4: Cloud-Native Transformation
- Containerization
- Cloud-native patterns
- DevOps automation
```

### Phase 3: Task Generation

#### 5. Create Implementation Tasks
Create tasks in `specs/tasks/` for each modernization item:
- Clear acceptance criteria
- Dependencies identified
- Testing requirements
- Risk mitigation steps

## Documentation Structure

```
specs/modernize/
├── assessment/
│   ├── technical-debt.md
│   ├── security-audit.md
│   ├── performance-analysis.md
│   ├── architecture-review.md
│   └── compliance-gaps.md
├── strategy/
│   ├── roadmap.md
│   ├── technology-upgrade-plan.md
│   ├── architecture-evolution-plan.md
│   ├── security-enhancement-plan.md
│   └── devops-transformation-plan.md
├── plans/
│   ├── dependency-upgrades/
│   ├── architecture-refactoring/
│   ├── security-remediation/
│   └── cloud-migration/
└── risk-management/
    ├── risk-analysis.md
    └── mitigation-strategies.md
```

## Well-Architected Framework Alignment

Assess and plan against five pillars:
1. **Reliability** - Fault tolerance, recovery
2. **Security** - Defense in depth, data protection
3. **Cost Optimization** - Right-sizing, efficiency
4. **Performance** - Scaling, optimization
5. **Operational Excellence** - Automation, observability

## Templates

See `templates/` for assessment and planning templates.

## Sample Output

See `examples/sample-modernization-plan.md` for a complete example.
