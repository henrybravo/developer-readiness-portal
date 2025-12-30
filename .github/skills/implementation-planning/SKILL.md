---
name: implementation-planning
description: Creates detailed implementation plans with L0-L3 Mermaid diagrams for software projects. Use this skill when asked to create a plan, break down features into tasks, create technical task breakdown, plan implementation, or visualize architecture with diagrams.
---

# Implementation Planning Skill

This skill creates detailed, multi-level implementation plans that break down features into technical tasks with clear dependencies, acceptance criteria, and visual architecture diagrams.

## When to Use This Skill

- Breaking down features into technical tasks
- Creating implementation roadmaps
- Visualizing system architecture with Mermaid diagrams
- Planning scaffolding and feature work
- Identifying task dependencies

## Core Principle: Planning Only

**This is a PLANNING skill - never implement.**

- Never write code, edit files, commit, or run commands
- Output Mermaid diagrams for visualization only
- Mark implementation work as tasks for developers
- Stop at ~80% confidence; avoid over-planning

## Prerequisites

Read the following before planning:
- `specs/prd.md` - Product Requirements Document
- `specs/features/*.md` - Feature Requirements Documents
- `AGENTS.md` - Development standards and guidelines
- `specs/adr/*.md` - Architecture Decision Records

## Workflow

### 1. Context Gathering (Read-Only)
- Read PRD for overall product vision
- Read FRDs for specific feature details
- Read AGENTS.md for development standards
- Build requirements tree: PRD → components → features → decisions

### 2. Identify Scaffolding Tasks First
Create scaffolding tasks BEFORE feature tasks:
- Backend scaffolding (API structure, services, middleware)
- Frontend scaffolding (app structure, components, state management)
- Documentation scaffolding (MkDocs structure)
- Infrastructure scaffolding (Aspire, deployment manifests)

### 3. Break Down Features
For each feature:
- Identify both backend AND frontend tasks
- Map dependencies between tasks
- Order by implementation sequence
- Define acceptance criteria

### 4. Create Mermaid Diagrams
Generate L0-L3 architecture diagrams:
- **L0**: System Context (high-level components)
- **L1**: Components per domain (frontend, backend, platform)
- **L2**: Features per component (mapped to FRDs)
- **L3**: Cross-cutting decisions (storage, cache, auth, shared services)

### 5. Document Tasks
Create task files in `specs/tasks/`:
- Filename: `<order>-task-<name>.md` (e.g., `001-task-backend-scaffolding.md`)
- Include: title, dependencies, technical requirements, acceptance criteria, testing requirements
- NO implementation code in task files

## Output Format

### Human Plan (Markdown)
```markdown
## Plan: {Title}
{TL;DR (20-100 words)}

**Steps (3-6):**
1. {Verb-first, concrete step}
2. ...

**Open Questions:**
1. ...

**Diagrams:**
[Mermaid diagrams for L0, L1, L2, L3]
```

### Machine Plan (JSON)
```json
{
  "title": "...",
  "requirements_tree": { "components": [...] },
  "diagrams": [...],
  "tasks": [...],
  "confidence": 0.8
}
```

## Quality Checklist

Before finalizing:
- ✅ All features map to FRDs
- ✅ Scaffolding tasks created first
- ✅ Backend and frontend tasks for each feature
- ✅ Dependencies clearly mapped
- ✅ Acceptance criteria defined
- ✅ Testing requirements specified (≥85% coverage)
- ✅ Tasks are implementation-agnostic (no code)
- ✅ Mermaid diagrams render correctly
- ✅ L0-L3 diagrams present

## Templates

See `templates/plan-template.md` for the plan format.

## Sample Output

See `examples/sample-plan.md` for a complete example.
