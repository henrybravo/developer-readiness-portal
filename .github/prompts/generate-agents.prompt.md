---
agent: architect
---
# Generate AGENTS.md (Optional - APM Users Only)

> **Note**: This prompt is for teams using APM instead of the default Agent Skills approach. Most users don't need this—skills auto-load automatically.

Generate team development standards using the **#apm-integration** skill.

## Task

Create comprehensive AGENTS.md from APM packages for projects that prefer compiled standards.

## Skill Reference

Use **#apm-integration** skill for:
- Installing APM packages
- Compiling AGENTS.md from packages
- Standards synthesis
- Team guideline documentation

## Expected Outcome

- `apm_modules/` directory with installed packages
- `AGENTS.md` file at project root with consolidated standards

## When to Use

Use this prompt ONLY if you:
- Need a compiled `AGENTS.md` file (not auto-loading skills)
- Are sharing standards via APM packages
- Have existing APM packages to incorporate

See [docs/apm-optional.md](../../docs/apm-optional.md) for more details.
