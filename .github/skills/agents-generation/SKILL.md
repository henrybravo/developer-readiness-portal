---
name: agents-generation
description: Generates AGENTS.md documentation by synthesizing engineering standards from APM packages. Use this skill when asked to generate AGENTS.md, set up engineering standards, install APM packages, or configure development guidelines.
---

# Agents Generation Skill

This skill generates the AGENTS.md guardrails file by installing APM packages and synthesizing engineering standards that all agents follow.

## When to Use This Skill

- Setting up a new project with engineering standards
- Updating AGENTS.md after adding new APM packages
- Installing development guidelines from APM packages
- Configuring team coding standards

## What is AGENTS.md?

AGENTS.md is a consolidated file containing all engineering standards and guidelines that agents follow automatically. It's generated from APM (Agent Package Manager) packages that contain modular, reusable engineering standards.

## Workflow

### 1. Check APM Installation
```bash
if ! command -v apm &> /dev/null; then
    echo "APM not found. Installing APM CLI..."
    curl -sSL "https://raw.githubusercontent.com/danielmeppiel/apm/main/install.sh" | sh
    export PATH="$HOME/.local/bin:$PATH"
fi
```

### 2. Install APM Packages
```bash
apm install
```

This command:
- Reads `apm.yml` for package dependencies
- Downloads engineering standards from GitHub repositories
- Installs packages into `apm_modules/`
- Supports semantic versioning (e.g., `@1.0.0` or `@latest`)

### 3. Generate AGENTS.md
```bash
apm compile
```

This command:
- Scans `.apm/instructions/` in all installed packages
- Consolidates rules based on file pattern matching (`applyTo`)
- Creates comprehensive `AGENTS.md` at project root

## APM Configuration

The `apm.yml` file defines which packages to install:

```yaml
dependencies:
  apm:
    - EmeaAppGbb/spec2cloud-guidelines@latest
    - EmeaAppGbb/spec2cloud-guidelines-backend@latest
    - EmeaAppGbb/spec2cloud-guidelines-frontend@latest
```

### Adding Custom Packages

Edit `apm.yml` to add more packages:

```yaml
dependencies:
  apm:
    - EmeaAppGbb/spec2cloud-guidelines@latest
    - your-org/custom-standards@1.0.0
```

## Expected Output

After running the commands:
- `apm_modules/` directory with installed packages
- `AGENTS.md` file at project root with consolidated standards

## AGENTS.md Structure

The generated AGENTS.md typically includes:
- General engineering principles
- Code quality standards
- Testing requirements
- Documentation guidelines
- Security best practices
- Technology-specific guidelines (backend, frontend)

## When to Regenerate

Run `apm compile` again when:
- Adding new APM packages
- Updating package versions
- Modifying package configurations
- Standards have been updated upstream

## Templates

See `templates/agents-template.md` for the expected AGENTS.md structure.

## Sample Output

See `examples/sample-agents-md.md` for an example of generated AGENTS.md content.
