---
name: code-implementation
description: Implements features following development standards with proper testing, documentation, and quality gates. Use this skill when asked to implement a feature, write code, build a component, develop functionality, or complete a technical task.
---

# Code Implementation Skill

This skill guides the implementation of features following development standards, ensuring proper testing, documentation, and quality gates are met.

## When to Use This Skill

- Implementing features from task specifications
- Writing production code following team standards
- Building components with proper testing
- Completing technical tasks from the task breakdown

## Prerequisites

Before implementing, read:
- `specs/prd.md` - Product Requirements Document
- `specs/features/*.md` - Relevant Feature Requirements
- `specs/tasks/*.md` - Task specifications
- `specs/adr/*.md` - Architecture decisions and development standards

## Implementation Workflow

### 1. Gather Requirements Context
- Read PRD for overall product vision
- Read relevant FRDs for feature details
- Read task specifications for specific requirements
- Understand acceptance criteria

### 2. Create Implementation Plan
- Identify components/modules to create or modify
- Define data models and contracts
- Plan API endpoints or interfaces
- Design testing strategy

### 3. Identify Dependencies
- List required libraries and frameworks
- Check for existing shared components
- Verify infrastructure requirements

### 4. Research Best Practices
Use available documentation sources:
- Microsoft Learn for .NET/Azure guidance
- Official library documentation
- Existing patterns in the codebase

### 5. Implement the Code
Follow team standards:
- Coding standards from ADRs (`specs/adr/`)
- Architectural patterns defined in the project
- Type-safety requirements
- Modular, self-contained design

### 6. Write Unit Tests
Create comprehensive tests:
- Test all public methods and functions
- Cover edge cases and error conditions
- Aim for ≥85% code coverage

### 7. Run and Fix Tests
- Execute tests using the appropriate test runner
- Address any failures
- Iterate until all tests pass

### 8. Verify UI Integration (Frontend Only)
- [ ] Navigation: Feature linked in global navigation?
- [ ] Layout: Using consistent layout wrapper?
- [ ] Discoverability: Users can find the feature?
- [ ] Authentication: Login/logout works?
- [ ] Consistent UX: Matches design patterns?

### 9. Update Documentation
- Update docs in `/docs` directory
- Use MkDocs format (Markdown)
- Add API documentation if applicable
- Ensure `mkdocs build --strict` passes

## Quality Checklist

Before marking complete:
- ✅ All tests pass (unit, integration)
- ✅ Code coverage ≥85%
- ✅ Type safety enforced (no type errors)
- ✅ Linters and formatters pass
- ✅ Documentation updated
- ✅ No secrets committed
- ✅ Code follows ADR standards (`specs/adr/`)
- ✅ UI integration verified (frontend)

## Critical Rules

### When to Stop and Escalate
If you discover significant architectural decisions are needed:
1. **STOP** - Do not make major architectural decisions
2. **Escalate to architect** - Request ADR creation
3. **Provide context** - What decision is needed, what the blocker is
4. **Wait for ADR** - Before proceeding with implementation

### Code Standards
- Write modular, maintainable, testable code
- Document key decisions in code comments
- Follow existing patterns in the codebase
- No implementation code in task files

## Templates

See `templates/task-template.md` for task documentation format.

## Sample Output

See `examples/sample-task-implementation.md` for a complete example.
