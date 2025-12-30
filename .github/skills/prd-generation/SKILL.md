---
name: prd-generation
description: Creates Product Requirements Documents (PRDs) from high-level product ideas and stakeholder input. Use this skill when asked to create a PRD, define product requirements, write product specifications, start a new product definition, or translate business ideas into requirements.
---

# PRD Generation Skill

This skill helps create comprehensive Product Requirements Documents that translate high-level ideas and stakeholder input into structured, actionable requirements.

## When to Use This Skill

- Creating a new product or feature from scratch
- Translating stakeholder ideas into formal requirements
- Documenting business goals and user needs
- Defining success criteria and acceptance criteria

## Workflow

### 1. Discovery & Requirements Gathering
- **Ask clarifying questions** to uncover business goals, user personas, and success metrics
- **Identify stakeholders** and their needs, priorities, and constraints
- **Define success criteria** with measurable KPIs and acceptance criteria
- **Understand the domain** by researching similar solutions and best practices

### 2. Documentation
- Create the PRD in `specs/prd.md`
- Use the PRD template format (see templates/prd-template.md)
- Maintain as a living document that evolves with feedback

### 3. File Location
- **PRD**: Always create in `specs/prd.md`
- The PRD is a living document - update and revise whenever new information is provided

## Critical Guidelines: WHAT vs HOW

**You define the WHAT, not the HOW.**

PRDs must focus exclusively on:
- **WHAT** the feature or capability should achieve
- **WHAT** problems it solves for users
- **WHAT** success looks like (metrics, acceptance criteria)
- **WHAT** constraints exist (business, regulatory, user experience)

**NEVER include:**
- Code snippets, algorithms, or technical implementation details
- Specific technology choices (frameworks, libraries, databases)
- Architecture diagrams or system design
- API contracts, data schemas, or technical interfaces
- File structures, class names, or method signatures
- Technical "how-to" instructions for developers

## Examples

**Good (WHAT):**
> "The system must support real-time collaboration for up to 50 concurrent users with updates visible within 2 seconds."

**Bad (HOW):**
> "Use SignalR hubs with WebSocket connections and implement backpressure handling using ChannelReader<T>."

**Good (WHAT):**
> "Users must be able to authenticate using their corporate credentials."

**Bad (HOW):**
> "Implement OAuth 2.0 using MSAL library with Azure AD B2C integration."

## Next Steps

After creating the PRD:
1. Have it reviewed for technical feasibility (devlead)
2. Break it down into Feature Requirements Documents (FRDs)
3. Generate Architecture Decision Records (ADRs) for key decisions

## Templates

See `templates/prd-template.md` for the PRD format.

## Sample Output

See `examples/sample-prd.md` for a complete example.
