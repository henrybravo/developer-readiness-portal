# Architecture Overview Template

Use this template for `specs/docs/architecture/overview.md`.

---

# System Architecture Overview

## Executive Summary

[2-3 sentences describing the system at a high level]

## Architecture Type

**Primary Pattern:** [Monolith | Microservices | Modular Monolith | Serverless | Hybrid]

**Architectural Style:**
- [ ] Layered Architecture
- [ ] Event-Driven Architecture
- [ ] CQRS
- [ ] Domain-Driven Design
- [ ] Clean Architecture
- [ ] Other: [Specify]

## System Context

```
[Describe or diagram the system in context with external systems]
```

### External Dependencies
| System | Type | Purpose |
|--------|------|---------|
| [System] | [API/Database/Service] | [Purpose] |

## Component Architecture

### High-Level Components

```
[Directory/module structure with purposes]
```

### Component Relationships

| Component | Depends On | Purpose |
|-----------|------------|---------|
| [Component A] | [Component B, C] | [What it does] |

## Data Architecture

### Data Stores
| Store | Type | Purpose | Tables/Collections |
|-------|------|---------|-------------------|
| [DB Name] | [SQL/NoSQL] | [Purpose] | [Count] |

### Data Flow
1. [Data entry point]
2. [Processing step]
3. [Storage]
4. [Retrieval]

## Integration Architecture

### Internal APIs
| API | Protocol | Purpose |
|-----|----------|---------|
| [API] | [REST/gRPC/GraphQL] | [Purpose] |

### External Integrations
| Service | Integration Type | Purpose |
|---------|-----------------|---------|
| [Service] | [Type] | [Purpose] |

## Deployment Architecture

### Environments
| Environment | Purpose | Infrastructure |
|-------------|---------|---------------|
| Development | [Purpose] | [Details] |
| Staging | [Purpose] | [Details] |
| Production | [Purpose] | [Details] |

### Deployment Topology
[Describe how components are deployed and scaled]

## Security Architecture

### Authentication
- **Method:** [JWT | OAuth | Session | API Key]
- **Implementation:** [Location/library]

### Authorization
- **Model:** [RBAC | ABAC | Claims-based]
- **Implementation:** [Location]

### Data Protection
- Encryption at rest: [Yes/No]
- Encryption in transit: [Yes/No]
- PII handling: [Approach]

## Observed Patterns

### Design Patterns
| Pattern | Location | Purpose |
|---------|----------|---------|
| [Pattern] | [Files] | [Purpose] |

### Anti-Patterns / Technical Debt
| Issue | Location | Impact |
|-------|----------|--------|
| [Issue] | [Files] | [Impact level] |

## Quality Attributes

### Performance
- [Observed performance characteristics]
- [Bottlenecks identified]

### Scalability
- [Current scaling approach]
- [Limitations observed]

### Maintainability
- [Code organization quality]
- [Documentation level]
- [Test coverage]

## Recommendations for Modernization

*(To be addressed by Modernizer Agent)*

| Area | Current State | Potential Improvement |
|------|--------------|----------------------|
| [Area] | [State] | [Improvement] |

---

*Analyzed: [Date]*
*Analyst: Tech Analyst Agent*
