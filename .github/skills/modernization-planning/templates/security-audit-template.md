# Security Audit Template

Use this template for `specs/modernize/assessment/security-audit.md`.

---

# Security Audit Report

## Executive Summary

[Brief overview of security posture and critical findings]

**Overall Security Score:** [Critical | High Risk | Medium Risk | Low Risk]
**Critical Vulnerabilities:** [X]
**High Vulnerabilities:** [X]

## Known Vulnerabilities (CVEs)

### Critical Severity
| CVE | Package | Version | CVSS | Exploitable | Remediation |
|-----|---------|---------|------|-------------|-------------|
| [CVE-XXX] | [Package] | [Version] | [Score] | [Yes/No] | [Upgrade to X] |

### High Severity
| CVE | Package | Version | CVSS | Exploitable | Remediation |
|-----|---------|---------|------|-------------|-------------|
| [CVE-XXX] | [Package] | [Version] | [Score] | [Yes/No] | [Upgrade to X] |

### Medium Severity
| CVE | Package | Version | CVSS | Remediation |
|-----|---------|---------|------|-------------|
| [CVE-XXX] | [Package] | [Version] | [Score] | [Action] |

## Authentication Assessment

### Current Implementation
| Aspect | Status | Risk | Recommendation |
|--------|--------|------|----------------|
| Password Storage | [Method] | [Risk Level] | [Recommendation] |
| Session Management | [Method] | [Risk Level] | [Recommendation] |
| MFA Support | [Yes/No] | [Risk Level] | [Recommendation] |
| Token Handling | [Method] | [Risk Level] | [Recommendation] |

### Gaps Identified
- [ ] [Gap 1 with risk level]
- [ ] [Gap 2 with risk level]

## Authorization Assessment

### Current Implementation
| Aspect | Status | Risk | Recommendation |
|--------|--------|------|----------------|
| Access Control Model | [RBAC/ABAC] | [Risk Level] | [Recommendation] |
| Permission Checks | [Consistent/Inconsistent] | [Risk Level] | [Recommendation] |
| Admin Functions | [Protected/Exposed] | [Risk Level] | [Recommendation] |

### Missing Authorization
| Endpoint/Function | Risk | Remediation |
|-------------------|------|-------------|
| [Endpoint] | [Risk Level] | [Add authorization] |

## Data Protection

### Encryption
| Data Type | At Rest | In Transit | Recommendation |
|-----------|---------|------------|----------------|
| User Credentials | [Yes/No] | [Yes/No] | [Recommendation] |
| PII | [Yes/No] | [Yes/No] | [Recommendation] |
| Business Data | [Yes/No] | [Yes/No] | [Recommendation] |

### Data Handling Gaps
- [ ] [Gap with risk level]

## Input Validation

### Vulnerabilities Found
| Type | Location | Severity | Remediation |
|------|----------|----------|-------------|
| SQL Injection | `[file:line]` | Critical | Parameterized queries |
| XSS | `[file:line]` | High | Output encoding |
| Command Injection | `[file:line]` | Critical | Input sanitization |

### Missing Validation
| Input | Location | Risk | Remediation |
|-------|----------|------|-------------|
| [Input] | `[file]` | [Risk] | [Validation type] |

## OWASP Top 10 Assessment

| Category | Status | Findings |
|----------|--------|----------|
| A01: Broken Access Control | [Pass/Fail] | [Details] |
| A02: Cryptographic Failures | [Pass/Fail] | [Details] |
| A03: Injection | [Pass/Fail] | [Details] |
| A04: Insecure Design | [Pass/Fail] | [Details] |
| A05: Security Misconfiguration | [Pass/Fail] | [Details] |
| A06: Vulnerable Components | [Pass/Fail] | [Details] |
| A07: Authentication Failures | [Pass/Fail] | [Details] |
| A08: Integrity Failures | [Pass/Fail] | [Details] |
| A09: Logging Failures | [Pass/Fail] | [Details] |
| A10: SSRF | [Pass/Fail] | [Details] |

## Compliance Gaps

### Regulatory Requirements
| Requirement | Status | Gap | Remediation |
|-------------|--------|-----|-------------|
| [GDPR/SOC2/etc.] | [Compliant/Non-compliant] | [Gap] | [Action] |

## Remediation Priority

### Immediate (Block Release)
1. [ ] [Critical security fix]
2. [ ] [Critical security fix]

### High Priority (Within 1 week)
1. [ ] [High priority fix]
2. [ ] [High priority fix]

### Medium Priority (Within 1 month)
1. [ ] [Medium priority fix]

### Low Priority (Backlog)
1. [ ] [Low priority improvement]

---

*Audited: [Date]*
*Analyst: Modernizer Agent*
