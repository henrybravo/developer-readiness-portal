# GitHub Copilot Skills

Spec2Cloud includes 13 GitHub Copilot skills that enhance the development workflow. Skills are **auto-loaded knowledge bases** that provide task-focused methodology, templates, and examples.

## What are Skills?

Skills are modular capabilities that GitHub Copilot **automatically loads based on context**. They differ from prompts and agents:

| Component | Purpose | Example |
|-----------|---------|---------|
| **Skill** | Knowledge base with methodology, templates, examples | `#prd-generation` provides PRD template, discovery questions, WHAT vs HOW guidelines |
| **Prompt** | Lightweight trigger/orchestrator | `/prd` triggers `@pm` agent → uses `#prd-generation` skill |
| **Agent** | Specialized persona with skill references | `@pm` agent references `#prd-generation` for PRD methodology |

### How Skills Work

**Skills auto-load when relevant:**
- Open `specs/prd.md` → `#prd-generation` skill automatically loads
- Open `specs/adr/0001-database.md` → `#adr-generation` skill automatically loads
- Working on Azure deployment → `#azure-deployment` skill automatically loads

**Architecture:**
```
User types: /prd
     ↓
Prompt: prd.prompt.md (thin trigger)
     ↓
Agent: @pm (persona: Product Manager)
     ↓
Skill: #prd-generation (methodology, templates, examples)
     ↓
Output: Complete PRD in specs/prd.md
```

**Benefits:**
- ✅ **Auto-loading**: No need to manually select or import
- ✅ **Reusable**: Multiple agents can reference the same skill
- ✅ **Maintainable**: Update methodology in one place (skill), used by all
- ✅ **Examples**: Real-world samples guide output quality
- ✅ **Templates**: Consistent structure across all outputs

## Skill Structure

Each skill lives in `.github/skills/<skill-name>/` with:

```
skill-name/
├── SKILL.md              # Main skill definition with YAML frontmatter
├── examples/             # Sample outputs
│   └── sample-output.md
└── templates/            # Reusable templates
    └── template.md
```

### SKILL.md Format

```yaml
---
name: skill-name
description: Concise description for Copilot matching. Include trigger keywords.
---

# Skill Name

## When to Use This Skill
[Context and scenarios]

## Workflow
[Step-by-step methodology]

## Templates
[Reference to templates/]

## Examples
[Reference to examples/]
```

## Prompts, Agents, and Skills: How They Work Together

### Design Philosophy

**Prompts = Lightweight orchestrators**
- Thin wrappers that trigger agents
- No methodology or templates embedded
- Example: `/prd` → triggers `@pm` agent

**Agents = Specialized personas with skill references**
- Role-specific instructions (PM, Developer, Architect, etc.)
- Reference skills for detailed methodology
- Example: `@pm` agent references `#prd-generation` skill

**Skills = Auto-loaded knowledge base**
- Comprehensive methodology, templates, examples
- Automatically loaded when relevant files are open
- Example: `#prd-generation` provides PRD template, WHAT vs HOW guidelines

### Example Flow: Creating a PRD

1. **User types**: `/prd`
2. **Prompt invoked**: `prd.prompt.md`
   - Lightweight trigger
   - Says: "Create PRD using **#prd-generation** skill"
3. **Agent activated**: `@pm`
   - Persona: Product Manager
   - Instructions reference: **#prd-generation** skill
4. **Skill loaded**: `#prd-generation`
   - Provides: PRD template, discovery questions, WHAT vs HOW guidelines
   - Contains: Examples, checklists, quality criteria
5. **Output**: Complete PRD in `specs/prd.md`

### Why This Separation?

**Before (Redundant)**:
- ❌ Methodology duplicated in prompts, agents, and skills
- ❌ Updates required in 3 places
- ❌ Inconsistent guidance

**After (Skill-Centric)**:
- ✅ Methodology lives in skills only
- ✅ Update once, used everywhere
- ✅ Consistent guidance across all agents
- ✅ Skills auto-load based on context (file being edited)

## Available Skills

### Specification Skills

| Skill | Description | Source |
|-------|-------------|--------|
| [prd-generation](#prd-generation) | Create Product Requirements Documents | prd.prompt.md + pm.agent.md |
| [frd-generation](#frd-generation) | Break PRDs into Feature Requirements | frd.prompt.md + pm.agent.md |
| [adr-generation](#adr-generation) | Create Architecture Decision Records | adr.prompt.md + architect.agent.md |
| [spec-validation](#spec-validation) | Validate specs against standards | NEW |

### Planning & Implementation Skills

| Skill | Description | Source |
|-------|-------------|--------|
| [implementation-planning](#implementation-planning) | L0-L3 planning with diagrams | plan.prompt.md + planner.agent.md |
| [code-implementation](#code-implementation) | Implement features with tests | implement.prompt.md + dev.agent.md |
| [task-delegation](#task-delegation) | Delegate tasks to Copilot | delegate.prompt.md + dev.agent.md |

### Infrastructure & Deployment Skills

| Skill | Description | Source |
|-------|-------------|--------|
| [azure-deployment](#azure-deployment) | Deploy to Azure with Bicep/CI-CD | deploy.prompt.md + azure.agent.md |
| [agents-generation](#agents-generation) | Generate AGENTS.md | generate-agents.prompt.md + architect.agent.md |

### Brownfield Skills

| Skill | Description | Source |
|-------|-------------|--------|
| [reverse-engineering](#reverse-engineering) | Document existing codebases | rev-eng.prompt.md + tech-analyst.agent.md |
| [modernization-planning](#modernization-planning) | Create modernization strategies | modernize.prompt.md + modernizer.agent.md |

### Utility Skills

| Skill | Description | Source |
|-------|-------------|--------|
| [shell-baseline-integration](#shell-baseline-integration) | Bootstrap from shell baselines | NEW |
| [documentation-synthesis](#documentation-synthesis) | Auto-generate docs from code | NEW |

---

## Skill Details

### prd-generation

**Location:** `.github/skills/prd-generation/`

**Purpose:** Creates comprehensive Product Requirements Documents from high-level ideas.

**When to Use:**
- Starting a new project
- Documenting product vision
- Creating requirements for stakeholder review

**Key Outputs:**
- `specs/prd.md` - Complete PRD with purpose, scope, goals, requirements

**Templates:**
- `templates/prd-template.md` - Standard PRD structure

**Examples:**
- `examples/sample-prd.md` - TaskFlow task management app PRD

---

### frd-generation

**Location:** `.github/skills/frd-generation/`

**Purpose:** Breaks down PRDs into granular Feature Requirements Documents.

**When to Use:**
- After PRD is complete
- Before implementation planning
- For feature-level specifications

**Key Outputs:**
- `specs/features/FRD-XXX-feature-name.md` - Individual FRDs

**Templates:**
- `templates/frd-template.md` - Standard FRD structure

---

### adr-generation

**Location:** `.github/skills/adr-generation/`

**Purpose:** Creates Architecture Decision Records using MADR format.

**When to Use:**
- Making significant technical decisions
- Documenting technology choices
- Recording architectural tradeoffs

**Key Outputs:**
- `specs/adr/ADR-XXXX-decision-title.md` - Individual ADRs

**Templates:**
- `templates/adr-template.md` - MADR format template

---

### implementation-planning

**Location:** `.github/skills/implementation-planning/`

**Purpose:** Creates multi-level implementation plans with Mermaid diagrams.

**Planning Levels:**
- **L0 (Epic)**: High-level feature groupings
- **L1 (Feature)**: Major deliverables
- **L2 (Task)**: Implementable work items
- **L3 (Subtask)**: Detailed technical steps

**Key Outputs:**
- `specs/tasks/PLAN.md` - Complete implementation plan
- Mermaid dependency diagrams

---

### code-implementation

**Location:** `.github/skills/code-implementation/`

**Purpose:** Implements features following established patterns and best practices.

**Key Outputs:**
- Source code following project conventions
- Unit tests with high coverage
- Updated documentation

**Guidelines:**
- Read existing code before modifying
- Follow established patterns
- Include tests for new functionality

---

### task-delegation

**Location:** `.github/skills/task-delegation/`

**Purpose:** Delegates tasks to GitHub Copilot via well-structured GitHub Issues.

**Key Outputs:**
- GitHub Issues with detailed context
- Clear acceptance criteria
- Implementation guidance

**Templates:**
- `templates/issue-template.md` - GitHub issue format

---

### agents-generation

**Location:** `.github/skills/agents-generation/`

**Purpose:** Generates AGENTS.md files synthesizing project standards.

**Key Outputs:**
- `AGENTS.md` - Comprehensive coding standards
- Technology-specific guidelines
- Project conventions

---

### azure-deployment

**Location:** `.github/skills/azure-deployment/`

**Purpose:** Deploys applications to Azure using infrastructure as code.

**Key Outputs:**
- `azure.yaml` - Azure Developer CLI configuration
- `infra/*.bicep` - Infrastructure as code
- `.github/workflows/*.yml` - CI/CD pipelines

**Templates:**
- `templates/bicep-template.md` - Bicep structure guide
- `templates/github-actions-template.md` - CI/CD workflow template

---

### reverse-engineering

**Location:** `.github/skills/reverse-engineering/`

**Purpose:** Documents existing codebases comprehensively.

**Key Outputs:**
- Feature inventory
- Architecture documentation
- Technology stack analysis
- Dependency mapping

**Templates:**
- `templates/feature-template.md`
- `templates/architecture-template.md`
- `templates/technology-stack-template.md`

---

### modernization-planning

**Location:** `.github/skills/modernization-planning/`

**Purpose:** Creates modernization strategies for legacy systems.

**Key Outputs:**
- Technical debt assessment
- Security audit findings
- Modernization roadmap
- Risk analysis

**Templates:**
- `templates/technical-debt-template.md`
- `templates/security-audit-template.md`
- `templates/roadmap-template.md`

---

### spec-validation

**Location:** `.github/skills/spec-validation/`

**Purpose:** Validates generated specifications against quality standards.

**Key Outputs:**
- Validation reports
- Quality scores
- Recommendations

**Checklists:**
- `checklists/prd-checklist.md` - PRD validation criteria
- `checklists/frd-checklist.md` - FRD validation criteria
- `checklists/adr-checklist.md` - ADR validation criteria

---

### shell-baseline-integration

**Location:** `.github/skills/shell-baseline-integration/`

**Purpose:** Bootstraps projects from EmeaAppGbb shell baselines.

**Supported Shells:**
- `shell-dotnet` - Production-ready .NET 8 web application
- `agentic-shell-dotnet` - AI-agent-ready .NET shell
- `agentic-shell-python` - Python-based agentic shell

**Templates:**
- `templates/dotnet-shell-config.md` - .NET configuration guide
- `templates/python-shell-config.md` - Python configuration guide

---

### documentation-synthesis

**Location:** `.github/skills/documentation-synthesis/`

**Purpose:** Auto-generates documentation from code and specifications.

**Key Outputs:**
- API reference documentation
- Architecture documentation
- User guides

**Templates:**
- `templates/api-docs-template.md`
- `templates/architecture-docs-template.md`
- `templates/user-guide-template.md`

---

## Skills vs Agents vs Prompts

| Aspect | Skills | Agents | Prompts |
|--------|--------|--------|---------|
| **Focus** | Task-focused | Persona-focused | Command-focused |
| **Activation** | Auto-loaded by context | Explicit @mention | Explicit /command |
| **Contains** | Instructions + examples + templates | System prompt + personality | Workflow instructions |
| **Location** | `.github/skills/` | `.github/agents/` | `.github/prompts/` |

## Best Practices

1. **Let skills auto-activate** - Don't force a skill; describe your task naturally
2. **Use templates** - Start from skill templates for consistent outputs
3. **Reference examples** - Check examples for expected format
4. **Combine with prompts** - Skills enhance prompt outputs
5. **Validate outputs** - Use spec-validation skill to check quality

## Extending Skills

To add a new skill:

1. Create directory: `.github/skills/my-skill/`
2. Add `SKILL.md` with YAML frontmatter and instructions
3. Add examples in `examples/`
4. Add templates in `templates/`
5. Update installation scripts if distributing

```yaml
---
name: my-skill
description: Description with trigger keywords for auto-matching.
---

# My Skill

## When to Use
[Scenarios where this skill applies]

## Workflow
[Step-by-step instructions]

## Examples
See `examples/` directory.

## Templates
See `templates/` directory.
```
