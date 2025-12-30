---
name: task-delegation
description: Delegates implementation tasks to GitHub Copilot by creating well-structured GitHub issues. Use this skill when asked to delegate work, create GitHub issues for implementation, assign tasks to Copilot, or enable parallel development.
---

# Task Delegation Skill

This skill helps delegate implementation tasks to GitHub Copilot's coding agent by creating well-structured GitHub issues with complete requirements.

## When to Use This Skill

- Delegating implementation tasks to GitHub Copilot
- Creating GitHub issues for development work
- Enabling parallel development across multiple tasks
- Automating PR creation through Copilot

## Prerequisites

- Task specifications must exist in `specs/tasks/`
- GitHub repository must be configured
- GitHub Copilot coding agent must be available

## Workflow

### 1. Read Task Specification
Read the complete task file from `specs/tasks/` to understand:
- Task description and requirements
- Dependencies on other tasks
- Acceptance criteria
- Testing requirements

### 2. Create GitHub Issue

Use the GitHub MCP server to create an issue with:

**Title:** Clear, concise task name (e.g., "Implement user authentication API")

**Description:** Include ALL of the following:
- Full task description from task file
- Link to relevant FRD in `specs/features/`
- Link to PRD in `specs/prd.md`
- Reference to `AGENTS.md` for coding standards
- List of dependencies (tasks that must be completed first)
- Detailed acceptance criteria
- Testing requirements (≥85% coverage)
- Any architectural constraints or patterns to follow

**Labels:** Add appropriate labels:
- Type: `feature`, `bug`, `enhancement`, etc.
- Scope: `backend`, `frontend`, `infrastructure`, etc.
- Priority: `priority:high`, `priority:medium`, `priority:low`

### 3. Update Task File
Once the issue is created:
- Update the task file in `specs/tasks/` with the GitHub issue link
- Add the issue number at the top of the file

### 4. Assign to GitHub Copilot
- Use the GitHub MCP assign function
- Copilot will create a branch and PR automatically
- Copilot will implement according to the detailed requirements

## Issue Template

```markdown
## Description
[Full task description]

## Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]

## Dependencies
- #[issue-number] - [Dependency description]

## Acceptance Criteria
- [ ] [AC-1]
- [ ] [AC-2]

## Testing Requirements
- Minimum coverage: 85%
- Unit tests for all public methods
- Integration tests for API endpoints

## References
- PRD: [specs/prd.md](../specs/prd.md)
- FRD: [specs/features/xxx.md](../specs/features/xxx.md)
- Standards: [AGENTS.md](../AGENTS.md)
- Task: [specs/tasks/xxx.md](../specs/tasks/xxx.md)
```

## Quality Checklist

Before delegating, verify:
- ✅ Issue includes complete task description
- ✅ All dependencies are documented
- ✅ Acceptance criteria are clear and testable
- ✅ Testing requirements are specified
- ✅ Links to PRD, FRD, and AGENTS.md are included
- ✅ Task file updated with issue link
- ✅ Issue assigned to GitHub Copilot

## Benefits

- **Parallel Development:** Multiple tasks implemented simultaneously
- **Consistent Quality:** Copilot follows detailed requirements
- **Automatic PRs:** Copilot creates pull requests for review
- **Traceability:** Clear link between tasks, issues, and implementation

## Templates

See `templates/issue-template.md` for the GitHub issue format.

## Sample Output

See `examples/sample-github-issue.md` for a complete example.
