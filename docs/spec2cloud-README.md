# Nefira - Developer Readiness Portal

[![Playwright Tests](https://github.com/user/developer-readiness-portal/actions/workflows/playwright.yml/badge.svg)](https://github.com/user/developer-readiness-portal/actions/workflows/playwright.yml)

```
    _   __     ____                
   / | / /__  / __(_)________ _   
  /  |/ / _ \/ /_/ / ___/ __ `/   
 / /|  /  __/ __/ / /  / /_/ /    
/_/ |_/\___/_/ /_/_/   \__,_/     
                                   
Developer Readiness in Clear Skies
```

A lightweight internal-facing web portal that helps software development teams assess, track, and improve their engineering readiness through simple dashboards, checklists, and automated insights.

---

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Git](https://git-scm.com/) installed

### Start the Application

```bash
# Clone the repository
git clone <repository-url>
cd developer-readiness-portal

# Start all services
docker-compose up -d

# Wait for containers to be healthy (~60 seconds)
# Application will be available at:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000/swagger
# - (Optional) Redis: localhost:6379
```

---

## 📋 Features

- **Teams Overview Dashboard** - View all development teams and their readiness status
- **Readiness Checklists** - Track progress across six dimensions
- **Version Upgrade Planner** - Framework upgrade guidance
- **Automated Test Runner** - Execute Playwright UI tests
- **Demo-Ready Seed Data** - Pre-populated sample teams

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    docker-compose                       │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Frontend   │  │   Backend    │  │     Data     │   │
│  │    React     │→ │  .NET API    │→ │ JSON / Redis │   │
│  │  Port: 3000  │  │  Port: 5000  │  │  Port: 6379  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Technology Stack**: React 18 + .NET 8 + Docker

See [docs/technical-stack.md](docs/technical-stack.md) for details.

---

## 📖 Documentation

- [Product Requirements](specs/prd.md)
- [Technical Standards](docs/technical-stack.md)
- [Architecture Decisions](specs/adr/)
- [Implementation Plan](specs/IMPLEMENTATION_PLAN.md)

---

**Nefira** — *Clarity emerging from uncertainty* ☁️

---

# spec2cloud Integration

**Spec2Cloud** is an AI-powered development workflow that transforms high-level product ideas into production-ready applications deployed on Azure—using specialized GitHub Copilot agents working together.

## 🎯 Overview

This repository provides a preconfigured development environment and agent-driven workflow that works in two directions:

- **Greenfield (Build New)**: Transform product ideas into deployed applications through structured specification-driven development

https://github.com/user-attachments/assets/f0529e70-f437-4a14-93bc-4ab5a0450540


- **Greenfield (Shell-Based)**: Start from a predefined “shell” baseline and let coding agents translate natural language requirements to fill in the gaps via code.
   - https://github.com/EmeaAppGbb/shell-dotnet
   - https://github.com/EmeaAppGbb/agentic-shell-dotnet
   - https://github.com/EmeaAppGbb/agentic-shell-python

- **Brownfield (Document Existing + Modernize)**: Reverse engineer existing codebases into comprehensive product and technical documentation and optionally modernize codebases

Both workflows use specialized GitHub Copilot agents working together to maintain consistency, traceability, and best practices.

## 🚀 Quick Start

### Option 1: Use This Repository as a Template (Full Environment)

**Greenfield (New Project)**:
1. **Use this repo as a template** - Click "Use this template" to create your own GitHub repository
2. **Open in Dev Container** - Everything is preconfigured in `.devcontainer/`
3. **Describe your app idea** - The more specific, the better
4. **Follow the workflow** - Use the prompts to guide specialized agents through each phase

**Brownfield (Existing Codebase)**:
1. **Use this repo as a template** - Click "Use this template" to create your own GitHub repository
2. **copy your existing codebase** into the new repository
3. **Open in Dev Container** - Everything is preconfigured in `.devcontainer/`
4. **Run `/rev-eng`** - Reverse engineer codebase into specs and documentation
5. **Run `/modernize`** - (optional) Create modernization plan and tasks
6. **Run `/plan`** - (optional) Execute modernization tasks planned by the modernization agent

### Option 2: Install Into Existing Project using VSCode Extension

TODO

### Option 3: Install Into Existing Project using APM CLI

TODO

### Option 4: Install Into Existing Project using Manual Script

Transform any existing project into a spec2cloud-enabled development environment:

**One-Line Install** (Recommended):
```bash
curl -fsSL https://raw.githubusercontent.com/EmeaAppGbb/spec2cloud/main/scripts/quick-install.sh | bash
```

**Manual Install**:
```bash
# Download latest release
curl -L https://github.com/EmeaAppGbb/spec2cloud/releases/latest/download/spec2cloud-full-latest.zip -o spec2cloud.zip
unzip spec2cloud.zip -d spec2cloud
cd spec2cloud

# Run installer
./scripts/install.sh --full                    # Linux/Mac
.\scripts\install.ps1 -Full                    # Windows

# Start using workflows
code .
# Use @pm, @dev, @azure agents and /prd, /frd, /plan, /deploy prompts
```

**What Gets Installed**:
- ✅ 9 specialized AI agents (PM, Dev Lead, Dev, Azure, Rev-Eng, Modernizer, Planner, Architect, Spec2Cloud Orchestrator)
- ✅ 10 workflow prompts
- ✅ 13 GitHub Copilot skills (auto-loaded based on context)
- ✅ MCP server configuration (optional)
- ✅ Dev container setup (optional)
- ✅ APM configuration (optional)

See **[INTEGRATION.md](INTEGRATION.md)** for detailed installation options and troubleshooting.


## 🏗️ Three-Layer Architecture

Spec2Cloud uses the open [Agent Skills](https://agentskills.io) standard to organize AI-powered workflows:

```
┌─────────────────────────────────────────────────────────┐
│  Prompts (/prd, /frd, /plan, /implement, /deploy)      │
│  Lightweight workflow triggers that users invoke        │
└────────────────┬────────────────────────────────────────┘
                 │ activates
┌────────────────▼────────────────────────────────────────┐
│  Agents (@pm, @devlead, @dev, @azure, @architect)       │
│  Specialized personas with role-specific expertise      │
└────────────────┬────────────────────────────────────────┘
                 │ uses
┌────────────────▼────────────────────────────────────────┐
│  Skills (#prd-generation, #frd-generation, etc.)        │
│  Auto-loaded knowledge base with templates & examples   │
└─────────────────────────────────────────────────────────┘
```

### How It Works

1. **Prompts** = User-facing triggers (e.g., `/prd`) that activate agents
2. **Agents** = Personas (e.g., `@pm`) that orchestrate work using skills
3. **Skills** = Auto-loaded expertise (e.g., `#prd-generation`) with templates, examples, and workflows

Skills follow the [Agent Skills specification](https://agentskills.io/specification) and are **progressively disclosed**:
- **Discovery**: Metadata (name + description) loaded at startup
- **Activation**: Full skill instructions loaded when task context matches
- **Execution**: Referenced files and scripts loaded on-demand

## 🛠️ Available Skills

Spec2Cloud includes 13 GitHub Copilot Agent Skills located in `.github/skills/`:

| Skill | Auto-loads When | Provides | Description |
|-------|-----------------|----------|-------------|
| `#prd-generation` | Working with `specs/prd.md` | PRD templates, discovery questions, WHAT vs HOW guidelines | Create Product Requirements Documents from ideas |
| `#frd-generation` | Working with `specs/features/*.md` | FRD templates, decomposition methodology, traceability | Break PRDs into Feature Requirements Documents |
| `#adr-generation` | Working with `specs/adr/*.md` | MADR format, decision drivers, options evaluation | Create Architecture Decision Records (MADR format) |
| `#implementation-planning` | Creating task breakdowns | L0-L3 diagrams, scaffolding approach, dependency mapping | L0-L3 planning with Mermaid diagrams |
| `#code-implementation` | Implementing features | TDD workflow, quality gates, testing requirements | Implement features with tests |
| `#task-delegation` | Delegating to Copilot | Task scoping, context packaging, acceptance criteria | Delegate tasks to GitHub Copilot |
| `#agents-generation` | Creating `AGENTS.md` | Standards synthesis, guideline documentation | Generate AGENTS.md from standards |
| `#azure-deployment` | Deploying to Azure | Bicep templates, azd workflows, security best practices | Deploy to Azure with Bicep/CI-CD |
| `#reverse-engineering` | Analyzing existing code | Documentation generation, requirement extraction | Document existing codebases |
| `#modernization-planning` | Modernizing codebases | Migration strategies, risk assessment | Create modernization strategies |
| `#spec-validation` | Validating specifications | Quality checks, completeness verification | Validate specs against standards |
| `#shell-baseline-integration` | Using shell baselines | Bootstrap workflows, shell adaptation | Bootstrap from shell baselines |
| `#documentation-synthesis` | Generating docs | Documentation patterns, auto-generation | Auto-generate docs from code |

Each skill includes templates, examples, and step-by-step workflows.

See **[docs/skills.md](docs/skills.md)** for detailed skill documentation.

## 📚 Documentation

Longer guides are in the `docs/` folder (MkDocs-ready structure).

- Docs index: [docs/index.md](docs/index.md)
- Skills: [docs/skills.md](docs/skills.md)
- Shell baselines: [docs/shells.md](docs/shells.md)
- Architecture: [docs/architecture.md](docs/architecture.md)
- Workflows: [docs/workflows.md](docs/workflows.md)
- Generated docs structure: [docs/specs-structure.md](docs/specs-structure.md)
- Standards / APM: [docs/apm.md](docs/apm.md)
- Examples: [docs/examples.md](docs/examples.md)
- Benefits: [docs/benefits.md](docs/benefits.md)

For installation/integration scenarios, see [INTEGRATION.md](INTEGRATION.md).

## 🧭 Constitution (Agent Memory)

A **constitution** is a set of rules and guardrails that govern AI agent behavior, ensuring safety, quality, and alignment with project values. A minimal constitution is added in the project location: `.specify/memory/constitution.md`

References on constitutions for AI agents:

- Constitutional AI: Harmlessness from AI Feedback (arXiv: https://arxiv.org/abs/2212.08073)

- Microsoft Responsible AI Standard (v2): https://aka.ms/raistandard

- Responsible AI resources hub: https://www.microsoft.com/ai/responsible-ai

- NIST AI RMF 1.0: https://www.nist.gov/itl/ai-risk-management-framework

## 🤝 Contributing

Contributions welcome! Extend with additional agents, prompts, or MCP servers.

---

**From idea to production in minutes, not months.** 🚀
