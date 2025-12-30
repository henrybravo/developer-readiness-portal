---
name: shell-baseline-integration
description: Integrates greenfield projects with shell baselines from EmeaAppGbb repositories for quick project bootstrapping. Use this skill when starting a new project from a shell baseline, integrating with shell-dotnet, agentic-shell-dotnet, agentic-shell-python, or bootstrapping a new application.
---

# Shell Baseline Integration Skill

This skill helps bootstrap new projects from predefined shell baselines, providing a head start with pre-configured architecture, patterns, and tooling.

## When to Use This Skill

- Starting a new greenfield project
- Bootstrapping from an established baseline
- Setting up a new .NET or Python project with best practices
- Integrating with EmeaAppGbb shell repositories

## Available Shell Baselines

### 1. shell-dotnet
**Repository:** https://github.com/EmeaAppGbb/shell-dotnet

A production-ready .NET 8 web application shell with:
- Clean Architecture structure
- ASP.NET Core Web API
- Entity Framework Core
- Docker support
- GitHub Actions CI/CD

### 2. agentic-shell-dotnet
**Repository:** https://github.com/EmeaAppGbb/agentic-shell-dotnet

An AI-agent-ready .NET shell with:
- All features of shell-dotnet
- Semantic Kernel integration
- Azure OpenAI configuration
- Agent orchestration patterns
- MCP server support

### 3. agentic-shell-python
**Repository:** https://github.com/EmeaAppGbb/agentic-shell-python

A Python-based agentic application shell with:
- FastAPI backend
- LangChain integration
- Azure OpenAI support
- Async patterns
- Poetry for dependency management

## Integration Workflow

### Step 1: Select Shell Baseline

Choose based on project requirements:

| Requirement | Recommended Shell |
|-------------|------------------|
| Standard .NET API | shell-dotnet |
| .NET with AI/Agents | agentic-shell-dotnet |
| Python with AI/Agents | agentic-shell-python |

### Step 2: Clone and Configure

```bash
# Clone the selected shell
git clone https://github.com/EmeaAppGbb/[shell-name].git my-project
cd my-project

# Remove git history to start fresh
rm -rf .git
git init
```

### Step 3: Customize Configuration

1. Update project name in configuration files
2. Configure environment variables
3. Set up Azure resources (if needed)
4. Update README with project-specific information

### Step 4: Add Spec2Cloud

```bash
# Install spec2cloud agents and prompts
curl -sSL https://github.com/EmeaAppGbb/spec2cloud/releases/latest/download/install.sh | sh
```

### Step 5: Define Requirements

Use spec2cloud workflow:
1. Create PRD with `/prd` command
2. Break down into FRDs with `/frd`
3. Let agents implement the gaps

## Shell Structure

### Common Structure (All Shells)

```
project/
├── .github/
│   └── workflows/       # CI/CD pipelines
├── src/
│   └── [application]    # Main application code
├── tests/               # Test projects
├── docs/                # Documentation
├── scripts/             # Utility scripts
├── .devcontainer/       # Dev container config
├── docker-compose.yml   # Local development
├── README.md
└── LICENSE
```

### .NET Shell Specifics

```
src/
├── Api/                 # Controllers, DTOs
├── Application/         # Business logic, CQRS
├── Domain/             # Entities, value objects
└── Infrastructure/     # Data access, external services
```

### Python Shell Specifics

```
src/
├── api/                 # FastAPI routes
├── services/           # Business logic
├── models/             # Pydantic models
└── agents/             # AI agent implementations
```

## Configuration Templates

See `templates/` for configuration examples:
- `dotnet-shell-config.md` - .NET configuration guide
- `python-shell-config.md` - Python configuration guide

## Best Practices

1. **Start with shell** - Don't build from scratch
2. **Keep shell patterns** - Follow established architecture
3. **Update dependencies** - Check for newer versions
4. **Configure early** - Set up environment before coding
5. **Use spec2cloud** - Let agents fill in the gaps

## Integration with Spec2Cloud Workflow

1. Clone shell baseline
2. Install spec2cloud
3. Run `/prd` to create requirements
4. Run `/frd` to break down features
5. Run `/plan` to create implementation tasks
6. Run `/implement` to build features
7. Run `/deploy` to deploy to Azure

The shell provides the foundation; spec2cloud agents fill in the business logic.
