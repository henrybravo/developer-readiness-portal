# Spec2Cloud - AI-Powered Development Workflows

Transform any project into a spec2cloud-enabled development environment with specialized GitHub Copilot agents, skills, and workflows.

## ✨ What's New in This Release

### Skills Refactoring - Aligned with GitHub Copilot Skill Model

This release introduces a major architectural improvement following the [agentskills.io](https://agentskills.io) specification:

**Skills as Knowledge Base**: All methodology, templates, and examples now live in auto-loading skills
- **10 Comprehensive Skills**: Each skill contains complete workflows, templates, examples, and quality checklists
- **Auto-Loading**: Skills automatically load when you work with relevant files (e.g., opening `specs/prd.md` loads `#prd-generation`)
- **Single Source of Truth**: No more duplication - update once, use everywhere

**Prompts as Thin Orchestrators**: Workflow prompts are now lightweight triggers
- Reduced from 100+ lines to 15-25 lines
- Simply trigger the right agent and reference the right skill
- No embedded methodology - delegates to skills

**Agent Skill References**: Agents focus on persona and reference skills for methodology
- Agents define "who you are" (persona, communication style)
- Skills define "how to do it" (methodology, templates)
- Clear separation of concerns

**Benefits**:
- ✅ **Maintainable**: Single source of truth for all methodology
- ✅ **Discoverable**: Reference skills directly with `#skill-name`
- ✅ **Consistent**: All agents use the same methodology from skills
- ✅ **Aligned**: Follows GitHub Copilot's native skill model

## 🎯 What's Included

This package contains:

✅ **8 Specialized AI Agents**
- PM Agent - Product requirements and feature planning
- Dev Lead Agent - Technical architecture and standards
- Dev Agent - Implementation and code generation  
- Azure Agent - Cloud deployment and infrastructure
- Reverse Engineering Agent - Codebase documentation
- Modernization Agent - Technical debt and upgrades
- Planner Agent - Task breakdown and planning
- Architect Agent - System design and patterns

✅ **10 Auto-Loading Skills**
- `#prd-generation` - Product Requirements methodology
- `#frd-generation` - Feature Requirements breakdown
- `#adr-generation` - Architecture Decision Records (MADR format)
- `#implementation-planning` - Task breakdown with L0-L3 diagrams
- `#code-implementation` - TDD workflow and best practices
- `#azure-deployment` - 7-step Azure deployment workflow
- `#task-delegation` - GitHub Copilot Coding Agent delegation
- `#reverse-engineering` - Codebase documentation generation
- `#modernization-planning` - Technical debt and upgrade planning
- `#agents-generation` - Custom agent creation guidelines

✅ **13 Workflow Prompts**
- `/prd` - Create Product Requirements Document
- `/frd` - Create Feature Requirements Documents
- `/plan` - Create Technical Task Breakdown
- `/implement` - Implement features locally
- `/delegate` - Delegate to GitHub Copilot Coding Agent
- `/deploy` - Deploy to Azure
- `/rev-eng` - Reverse engineer existing codebase
- `/modernize` - Create modernization plan
- `/generate-agents` - Generate agent guidelines
- `/architect` - Design system architecture
- `/prd-brown` - Generate PRD from existing code
- `/frd-brown` - Generate FRDs from existing code
- `/plan-brown` - Generate tasks from existing code

✅ **Additional Components** (Full Package Only)
- MCP server configuration for enhanced AI capabilities
- Dev container setup with all required tools
- APM (Agent Package Manager) template for standards
- Directory structure templates

## 🚀 Quick Start

### Installation

Run the installer script:

**Linux/Mac**:
```bash
# Full installation (recommended)
./scripts/install.sh --full

# Minimal installation (agents and prompts only)
./scripts/install.sh --agents-only

# Install to specific directory
./scripts/install.sh --full /path/to/your/project
```

**Windows**:
```powershell
# Full installation (recommended)
.\scripts\install.ps1 -Full

# Minimal installation (agents and prompts only)
.\scripts\install.ps1 -AgentsOnly

# Install to specific directory
.\scripts\install.ps1 -Full C:\path\to\your\project
```

### Verification

After installation:

1. Open your project in VS Code
2. Open GitHub Copilot Chat (`Ctrl+Shift+I` or `Cmd+Shift+I`)
3. Type `@` to see available agents
4. Type `/` to see available workflows

You should see all 8 agents and 13 prompts listed.

## 🧠 How Skills Work

### Architecture Overview

```
┌─────────────────┐
│  Workflow Prompt│  ← Thin trigger (15-25 lines)
│  /prd           │  ← "Use @pm with #prd-generation"
└────────┬────────┘
         │ triggers
         ▼
┌─────────────────┐
│  Agent (@pm)    │  ← Persona definition
│  "Product Mgr" │  ← References #prd-generation
└────────┬────────┘
         │ uses
         ▼
┌─────────────────┐
│  Skill          │  ← Complete knowledge base (200+ lines)
│  #prd-generation│  ← Methodology, templates, examples
│  SKILL.md       │  ← Auto-loads when specs/prd.md is open
└─────────────────┘
```

### Auto-Loading Behavior

Skills automatically load when you work with relevant files:

| File You're Working On | Auto-Loaded Skill | Contains |
|------------------------|-------------------|----------|
| `specs/prd.md` | `#prd-generation` | Product requirements methodology, templates, quality checklist |
| `specs/features/*.md` | `#frd-generation` | Feature breakdown workflow, FRD templates, examples |
| `specs/adr/*.md` | `#adr-generation` | MADR format structure, decision templates, quality requirements |
| `specs/tasks/*.md` | `#implementation-planning` | Task breakdown with L0-L3 diagrams, estimation guidelines |
| Implementing code | `#code-implementation` | TDD workflow, testing best practices, code quality standards |
| Azure deployment | `#azure-deployment` | 7-step deployment workflow, Bicep best practices, security guidelines |

### Single Source of Truth

**Before** (Duplicated):
- Prompt had methodology ❌
- Agent had methodology ❌  
- Skill had methodology ✅ (but not used)

**After** (Skill-Centric):
- Prompt triggers agent ✅
- Agent references skill ✅
- Skill contains methodology ✅ (single source of truth)

### Benefits

1. **Maintainability**: Update methodology once in the skill → used everywhere
2. **Consistency**: All agents use the same methodology from skills
3. **Discoverability**: Reference skills directly with `#skill-name` in chat
4. **Auto-context**: Skills load automatically based on what you're working on

## 📖 Usage

### Greenfield (New Features)

Build new features from product ideas:

```
1. /prd       → Define product vision and requirements
2. /frd       → Break down into features
3. /plan      → Create technical tasks
4. /implement → Write the code
5. /deploy    → Deploy to Azure
```

### Brownfield (Existing Code)

Document and modernize existing codebases:

```
1. /rev-eng   → Reverse engineer into documentation
2. /modernize → (Optional) Create modernization plan
3. /plan      → (Optional) Implement modernization
4. /deploy    → (Optional) Deploy to Azure
```

## 📁 Directory Structure

After installation, your project will have:

```
your-project/
├── .github/
│   ├── agents/              # AI agent definitions (persona + skill references)
│   ├── prompts/             # Workflow prompts (thin orchestrators)
│   └── skills/              # Auto-loading skills (methodology + templates)
│       ├── prd-generation/
│       │   ├── SKILL.md
│       │   ├── templates/
│       │   └── examples/
│       ├── frd-generation/
│       ├── adr-generation/
│       └── ...
├── .vscode/
│   └── mcp.json            # MCP configuration (full install)
├── .devcontainer/
│   └── devcontainer.json   # Dev container (full install)
├── specs/                   # Generated documentation
│   ├── features/
│   ├── tasks/
│   └── docs/
└── apm.yml                 # APM config (full install)
```

## 🔧 Configuration

### MCP Servers (Full Install)

Model Context Protocol servers provide enhanced capabilities:
- **context7** - Up-to-date library documentation
- **github** - Repository management
- **microsoft.docs.mcp** - Microsoft/Azure docs
- **playwright** - Browser automation

Requires: Docker, uvx, Node.js

### Dev Container (Full Install)

Pre-configured development container includes:
- Python 3.12
- Node.js and TypeScript
- Azure CLI & Azure Developer CLI
- Docker-in-Docker
- VS Code extensions (Copilot, Azure, AI Toolkit)

### APM - Agent Package Manager (Full Install)

Manage engineering standards across projects:

```bash
# Install standards
apm install

# Generate consolidated agent guidelines
apm compile
```

## 🎓 Examples

### Example 1: New Feature

```
User: "I want to add user authentication to my app"

@pm /prd
→ Prompt triggers @pm agent
→ Agent uses #prd-generation skill
→ Creates PRD with authentication requirements

@pm /frd  
→ Prompt triggers @pm agent
→ Agent uses #frd-generation skill
→ Breaks down into login, signup, password reset features

@dev /plan
→ Prompt triggers @planner agent
→ Agent uses #implementation-planning skill
→ Creates technical tasks with L0-L3 diagrams

@dev /implement
→ Prompt triggers @dev agent
→ Agent uses #code-implementation skill
→ Implements authentication code following TDD workflow

@azure /deploy
→ Prompt triggers @azure agent
→ Agent uses #azure-deployment skill
→ Deploys to Azure with proper security (7-step workflow)
```

### Example 2: Document Legacy Code

```
User: "I inherited a Python app with no documentation"

@tech-analyst /rev-eng
→ Prompt triggers @tech-analyst agent
→ Agent uses #reverse-engineering skill
→ Analyzes codebase, creates comprehensive documentation
→ Generates tasks, features, and product vision

@modernizer /modernize
→ Prompt triggers @modernizer agent
→ Agent uses #modernization-planning skill
→ Identifies modernization opportunities
→ Creates upgrade plan for dependencies and architecture
```

### Example 3: Direct Skill Reference

You can also reference skills directly in chat:

```
User: "I need to write an ADR for using PostgreSQL"

@architect #adr-generation
→ Agent loads ADR generation skill
→ Provides MADR-format template
→ Guides through decision documentation
```

## ⚙️ Installation Options

| Flag | Description |
|------|-------------|
| `--full` / `-Full` | Install all components (recommended) |
| `--agents-only` / `-AgentsOnly` | Install only agents and prompts |
| `--merge` / `-Merge` | Merge with existing files (default) |
| `--force` / `-Force` | Overwrite without prompting |

## 🔍 Troubleshooting

### Agents Not Showing
- Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
- Check `.github/agents/` directory exists

### Skills Not Auto-Loading
- Ensure `.github/skills/` directory structure is correct
- Verify `SKILL.md` files contain proper metadata
- Check file paths match auto-loading patterns

### MCP Servers Not Loading
- Check `.vscode/mcp.json` configuration
- Verify Docker, uvx, Node.js are installed
- Restart VS Code

### Permission Issues
```bash
chmod +x scripts/install.sh
```

### Conflicting Configurations
- Check for `*.spec2cloud` files
- Manually merge with your existing configs
- Delete `.spec2cloud` files after merging

## 📚 Learn More

- **Skills Documentation**: See README.md "How Skills Work" section for architecture details
- **Integration Guide**: See `INTEGRATION.md` for detailed setup instructions
- **Skills Guide**: See `docs/skills.md` for complete skill reference
- **GitHub Repository**: https://github.com/EmeaAppGbb/spec2cloud
- **APM Documentation**: https://github.com/danielmeppiel/apm
- **Agentskills Specification**: https://agentskills.io

## 🆘 Support

- **Documentation**: Check README.md and INTEGRATION.md
- **Issues**: Report bugs on GitHub
- **Discussions**: Ask questions on GitHub Discussions

## 📝 License

See LICENSE.md for details.

---

**Ready to start?** Run the installer and open your project in VS Code! 🚀

```bash
# Linux/Mac
./scripts/install.sh --full

# Windows
.\scripts\install.ps1 -Full
```
