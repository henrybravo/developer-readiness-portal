---
name: apm-integration
description: Optional APM workflow for generating AGENTS.md. Use this skill ONLY if your project uses APM instead of the default Agent Skills approach. Triggers on requests for AGENTS.md generation, APM packages, or compiled engineering standards.
---

# APM Integration Skill (Optional)

> **Note**: This skill is for teams that prefer APM's compiled `AGENTS.md` approach over the default Agent Skills auto-loading. Most users should use Agent Skills directly—see [docs/agent-skills.md](../../../docs/agent-skills.md).

This skill generates the AGENTS.md guardrails file by installing APM packages and synthesizing engineering standards.

## When to Use This Skill

Use this skill ONLY if you:
- Need a single compiled `AGENTS.md` file at the project root
- Are sharing standards via APM packages with other teams
- Have existing APM packages you want to incorporate
- Prefer explicit compilation over auto-loading skills

**If you're using the default Agent Skills approach, you don't need this skill.**

## Agent Skills vs APM

| Approach | How It Works | Use When |
|----------|--------------|----------|
| **Agent Skills** (Default) | Skills in `.github/skills/` auto-load by context | Most projects |
| **APM** (This Skill) | Compiles packages to single `AGENTS.md` | Sharing standards via packages |

## What is AGENTS.md?

AGENTS.md is a consolidated file containing all engineering standards and guidelines. It's generated from APM (Agent Package Manager) packages that contain modular, reusable engineering standards.

## Workflow

### 1. Check APM Installation
```bash
if ! command -v apm &> /dev/null; then
    echo "APM not found. Installing APM CLI..."
    curl -sSL "https://raw.githubusercontent.com/danielmeppiel/apm/main/install.sh" | sh
    export PATH="$HOME/.local/bin:$PATH"
fi
```

### 2. Set Up apm.yml

Copy the template if you don't have an apm.yml:
```bash
cp templates/apm.yml.template apm.yml
```

### 3. Install APM Packages
```bash
apm install
```

This command:
- Reads `apm.yml` for package dependencies
- Downloads engineering standards from GitHub repositories
- Installs packages into `apm_modules/`
- Supports semantic versioning (e.g., `@1.0.0` or `@latest`)

### 4. Generate AGENTS.md
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
name: your-project-name
version: 1.0.0

dependencies:
  apm:
    - EmeaAppGbb/azure-standards@latest
    - EmeaAppGbb/python-backend@latest  # if using Python
    - EmeaAppGbb/react-frontend@latest  # if using React
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
- Standards have been updated upstream

## Templates

See `templates/agents-template.md` for the expected AGENTS.md structure.

## Sample Output

See `examples/sample-agents-md.md` for an example of generated AGENTS.md content.

## Learn More

- [APM Repository](https://github.com/danielmeppiel/apm)
- [APM Optional Guide](../../../docs/apm-optional.md)
