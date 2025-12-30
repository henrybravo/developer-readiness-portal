---
name: frd-generation
description: Creates Feature Requirements Documents (FRDs) by decomposing PRDs into individual feature specifications. Use this skill when asked to break down requirements, create feature specs, define individual features, or decompose a PRD into implementable units.
---

# FRD Generation Skill

This skill helps break down Product Requirements Documents (PRDs) into focused Feature Requirements Documents (FRDs) that can be independently implemented by development teams.

## When to Use This Skill

- Breaking down a PRD into individual features
- Creating detailed feature specifications
- Defining inputs, outputs, and dependencies for features
- Establishing acceptance criteria for each feature

## Prerequisites

- A PRD must exist in `specs/prd.md`
- The PRD should have high-level requirements defined

## Workflow

### 1. Read and Analyze PRD
- Read the PRD from `specs/prd.md`
- Identify discrete features from high-level requirements
- Map features to PRD requirements for traceability

### 2. Feature Decomposition
- Break down each high-level requirement into implementable features
- Identify dependencies between features
- Define clear boundaries for each feature

### 3. Create FRD Files
- Create one file per feature in `specs/features/`
- Use kebab-case naming (e.g., `user-authentication.md`, `task-creation.md`)
- Ask for confirmation before creating each file

### 4. Maintain as Living Documents
- Update FRDs when the PRD changes
- Revise based on user feedback
- Maintain traceability to PRD requirements

## FRD Content Requirements

Each FRD must include:
- **Feature Name & ID**: Unique identifier linked to PRD
- **Description**: What the feature does
- **Inputs**: What data/actions trigger the feature
- **Outputs**: What the feature produces
- **Dependencies**: Other features or systems required
- **Acceptance Criteria**: Specific, testable conditions for completion
- **Technical Constraints**: Any known limitations
- **Integration Points**: How it connects to other features

## Critical Guidelines

**You define the WHAT, not the HOW.**

Like PRDs, FRDs focus on requirements, not implementation:
- Describe what the feature should accomplish
- Define measurable acceptance criteria
- Identify constraints and dependencies
- Leave technical decisions to developers

## File Locations

- **Input**: `specs/prd.md`
- **Output**: `specs/features/*.md` (one file per feature)
- **Naming**: Use descriptive kebab-case (e.g., `real-time-updates.md`)

## Next Steps

After creating FRDs:
1. Have them reviewed for technical feasibility (devlead)
2. Create Architecture Decision Records for key decisions
3. Generate implementation plans for each feature

## Templates

See `templates/frd-template.md` for the FRD format.

## Sample Output

See `examples/sample-frd.md` for a complete example.
