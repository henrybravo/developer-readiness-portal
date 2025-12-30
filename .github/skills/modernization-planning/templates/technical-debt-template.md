# Technical Debt Assessment Template

Use this template for `specs/modernize/assessment/technical-debt.md`.

---

# Technical Debt Assessment

## Executive Summary

[Brief overview of technical debt state and key findings]

**Overall Technical Debt Score:** [High | Medium | Low]
**Estimated Remediation Effort:** [X person-weeks]

## Outdated Dependencies

### Critical (Security Vulnerabilities)
| Dependency | Current | Latest | CVEs | Priority |
|------------|---------|--------|------|----------|
| [Package] | [Version] | [Version] | [CVE-XXX] | Critical |

### High (End of Life)
| Dependency | Current | EOL Date | Replacement | Priority |
|------------|---------|----------|-------------|----------|
| [Package] | [Version] | [Date] | [New Package] | High |

### Medium (Multiple Major Versions Behind)
| Dependency | Current | Latest | Breaking Changes | Priority |
|------------|---------|--------|------------------|----------|
| [Package] | [Version] | [Version] | [Yes/No] | Medium |

### Low (Minor Updates Available)
| Dependency | Current | Latest | Priority |
|------------|---------|--------|----------|
| [Package] | [Version] | [Version] | Low |

## Deprecated Frameworks

| Framework | Current Version | Status | Migration Path |
|-----------|-----------------|--------|----------------|
| [Framework] | [Version] | [EOL/Deprecated] | [Target Framework] |

**Impact Analysis:**
- [Impact of staying on deprecated framework]
- [Effort to migrate]

## Code Smells and Anti-Patterns

### High Severity
| Pattern | Location | Impact | Remediation |
|---------|----------|--------|-------------|
| God Class | `[file:line]` | Maintainability | Extract classes |
| Circular Dependency | `[modules]` | Testability | Refactor |

### Medium Severity
| Pattern | Location | Impact | Remediation |
|---------|----------|--------|-------------|
| Duplicate Code | `[files]` | Maintainability | Extract method |
| Long Methods | `[file:line]` | Readability | Refactor |

### Low Severity
| Pattern | Location | Impact | Remediation |
|---------|----------|--------|-------------|
| Magic Numbers | `[files]` | Readability | Constants |
| Dead Code | `[files]` | Clutter | Remove |

## Technical Constraints

### Infrastructure Limitations
| Constraint | Impact | Workaround | Long-term Solution |
|------------|--------|------------|-------------------|
| [Constraint] | [Impact] | [Workaround] | [Solution] |

### Architecture Limitations
| Constraint | Impact | Workaround | Long-term Solution |
|------------|--------|------------|-------------------|
| [Constraint] | [Impact] | [Workaround] | [Solution] |

## Prioritized Remediation Plan

### Immediate (Within 2 weeks)
1. [ ] [Action item with file reference]
2. [ ] [Action item with file reference]

### Short-term (Within 1 month)
1. [ ] [Action item with file reference]
2. [ ] [Action item with file reference]

### Medium-term (Within 3 months)
1. [ ] [Action item with file reference]
2. [ ] [Action item with file reference]

### Long-term (6+ months)
1. [ ] [Action item with file reference]
2. [ ] [Action item with file reference]

## Effort Estimation

| Category | Items | Estimated Effort |
|----------|-------|------------------|
| Critical Dependencies | [X] | [Y] days |
| Deprecated Frameworks | [X] | [Y] weeks |
| Code Refactoring | [X] | [Y] weeks |
| Architecture Changes | [X] | [Y] weeks |
| **Total** | | **[Z] weeks** |

---

*Assessed: [Date]*
*Analyst: Modernizer Agent*
