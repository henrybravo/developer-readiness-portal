---
name: reverse-engineering
description: Analyzes existing codebases to extract specifications, create feature documentation, and generate comprehensive technical documentation. Use this skill when asked to analyze a codebase, document existing code, reverse engineer an application, extract specifications, or create technical documentation from code.
---

# Reverse Engineering Skill

This skill comprehensively analyzes existing codebases and extracts specifications, feature documentation, and technical documentation to serve as a foundation for modernization efforts.

## When to Use This Skill

- Analyzing an existing codebase
- Extracting specifications from legacy code
- Creating technical documentation from code
- Preparing for modernization or migration
- Understanding undocumented systems

## Critical Rules

### What You Must NEVER Do
1. **NEVER modify, create, or change ANY code** - Documentation ONLY
2. **NEVER make things up** - Document ONLY what actually exists
3. **NEVER create `specs/prd.md`** - That is PM's responsibility
4. **NEVER fabricate details** - If it doesn't exist, say so
5. **NEVER assume missing implementations** - Be honest about gaps

### What You Must Do
1. **Document what EXISTS** - Analyze the actual implementation as-is
2. **Be honest about gaps** - Explicitly state missing or incomplete elements
3. **Map to real code** - Every finding must reference actual files
4. **Accept any tech stack** - Work with whatever the project uses
5. **Be comprehensive** - Leave no stone unturned

## Analysis Workflow

### Phase 1: Discovery and Inventory

#### 1. Repository Discovery
- Read configuration files (package.json, requirements.txt, .csproj, etc.)
- Examine project structure and directory purposes
- Identify entry points and startup configurations
- Catalog build and deployment configurations

#### 2. Technology Stack Mapping
- Detect all programming languages used
- Identify frameworks, ORMs, testing frameworks
- Inventory build tools and package managers
- Capture versions where possible

### Phase 2: Feature Extraction

#### 3. Feature Discovery
- Identify all user-facing features and pages
- Document all API endpoints and functionality
- Extract core business processes
- Examine database schemas and data structures

#### 4. Business Feature Analysis
Create individual files in `specs/features/` with:
- Feature purpose and business problem solved
- User workflows and interactions
- Functional requirements
- Acceptance criteria (from observable behavior)
- Dependencies on other features
- Implementation status (complete/partial/missing)

### Phase 3: Technical Deep Dive

#### 5. Architecture Assessment
- Map component relationships and interactions
- Trace data flow through the system
- Identify external system connections
- Document architectural and design patterns

#### 6. Quality Assessment
- Evaluate existing test coverage
- Assess documentation completeness
- Identify maintainability issues
- Document security patterns and concerns

## Documentation Structure to Create

```
specs/
├── features/                    # Feature Requirements Documents
│   ├── [feature-1].md
│   ├── [feature-2].md
│   └── ...
└── docs/
    ├── architecture/
    │   ├── overview.md          # System architecture overview
    │   ├── components.md        # Component relationships
    │   ├── patterns.md          # Design patterns used
    │   └── security.md          # Security patterns
    ├── technology/
    │   ├── stack.md             # Complete technology inventory
    │   ├── dependencies.md      # All dependencies with versions
    │   └── tools.md             # Build and dev tools
    ├── infrastructure/
    │   ├── deployment.md        # Deployment architecture
    │   ├── environments.md      # Environment configurations
    │   └── operations.md        # Operational procedures
    └── integration/
        ├── apis.md              # API documentation
        ├── databases.md         # Database schemas
        └── services.md          # External services
```

## Success Criteria

Analysis is complete when:
- ✅ Complete documentation structure created
- ✅ All major features identified and documented
- ✅ Technology stack completely mapped
- ✅ Architecture clearly documented
- ✅ Dependencies catalogued
- ✅ Integration points mapped
- ✅ Code quality assessed honestly
- ✅ Everything linked to actual code files

## Next Steps

After analysis is complete:
- Hand off to **Modernizer Agent** for modernization planning
- Feature documentation guides functionality preservation
- Technical assessment informs priorities and risk management

## Templates

See `templates/` for documentation templates.

## Sample Output

See `examples/sample-analysis-output.md` for a complete example.
