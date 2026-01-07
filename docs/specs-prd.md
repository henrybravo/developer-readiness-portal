# ✅ **Nefira - a Developer Readiness Portal — Product Requirements Document**


# **1. Product Vision**

The *Developer Readiness Portal* is a lightweight internal-facing web application designed to help software development teams assess, track, and improve their engineering readiness.  
It provides a simple, intuitive interface for developers to:

*   Understand their project’s current readiness state
*   Track modernization or upgrade steps (e.g., framework or library version updates)
*   Review automated test runs (including Playwright UI tests)
*   Enable GitHub Copilot–assisted workflows
*   Prepare development teams for internal best practices, code quality expectations, and modernization goals

The application is intentionally simple, approachable, and non‑infrastructure‑heavy to support teams with varying levels of cloud or Azure familiarity.

# **1.1 Nefira Branding & Logo (ASCII)**

**Nefira** is the chosen product name for the Developer Readiness Portal.  
The name is inspired by *Nephele* (Νεφέλη), the mythological cloud‑nymph formed from mist, symbolizing clarity emerging from uncertainty — perfectly aligned with the portal’s goal of revealing readiness, health, and modernization paths for development teams.

- Taglines "Nefira — Developer Readiness in Clear Skies"
- The logo should be created using ASCII art

# **2. Goals**

1.  **Provide a low‑barrier, easy-to-use developer portal** that helps teams track readiness without overwhelming technical depth.
2.  **Showcase GitHub Copilot value** through readiness insights, task suggestions, and structured workflows.
3.  **Demonstrate upgrade readiness** (e.g., Java → newer versions or .NET → latest versions) without actually performing upgrades.
4.  **Provide a clean demo path for UI automation** using Playwright MCP integration.
5.  **Support APG’s preference for online, low-key, non-cost-related, non-Azure-heavy demos.**

# **3. Non-Goals**

*   No Azure provisioning, Bicep, infra automation, or cost estimation
*   No enterprise licensing discussion
*   No complex DevOps integrations
*   No team identity syncing or integration with real authentication providers
*   No actual repository scanning (all diagnostics are mocked or rule-based)

# **4. Target Users & Personas**

### **4.1 Primary Persona: Application Developer**

*   Uses C#, .NET, React, Java
*   Works in VS Code or IntelliJ
*   Wants clarity on upgrade tasks and modernization steps
*   Wants simple readiness signals (green/yellow/red)
*   Appreciates concise automation (Playwright UI tests)

### **4.2 Secondary Persona: Team Lead / Tech Lead**

*   Wants to track technical readiness across multiple teams
*   Wants high-level insights rather than deep configuration
*   Prefers simple dashboards over complex architectures

### **4.3 Tertiary Persona: Platform Engineering / CoP Facilitator**

*   Uses the portal to guide group sessions
*   Wants to demonstrate value of GHCP or automated workflows
*   Needs a safe, simple demo environment

# **5. Core Features**

The application consists of four major functional areas.

## **5.1 Teams Overview Module**

A landing page listing all teams (static seed list):

*   Team name
*   Tech stack (e.g., “.NET 6”, “Java 6/Tomcat”, “React 18”)
*   Readiness status (indicator: Green / Yellow / Red)
*   “View Details” button

**Functional behavior:**

*   Readiness status is computed from simple rule-based metrics (mocked).
*   No authentication required (demo simplicity).
*   Teams stored in mock DB or JSON file.

## **5.2 Readiness Checklist Module**

A detail page per team with checklist sections:

### **Sections**

*   Codebase Health
*   Dependency & Version Readiness
*   Documentation Quality
*   Testing & Automation Readiness
*   GitHub Copilot Enablement
*   Modernization Opportunities

**Each section supports:**

*   A status indicator (Green/Yellow/Red)
*   A set of toggleable checklist items
*   Optional description text
*   “Suggested next tasks” (hardcoded or rule-based)

Checklist updates are persisted in a small database (SQLite/JSON).

## **5.3 Version Upgrade Planner**

A simple contextual panel for the team:

*   Current version (e.g., Java 6, .NET 6)
*   Target recommended version (Java 11/17, .NET 8)
*   Steps to upgrade (mocked task list)
*   GHCP-generated recommendations (static examples or rule-based)

**Outputs:**

*   A “Generate PR Draft” button (does not integrate with GitHub; produces a markdown preview modal)
*   A list of tasks (suitable for `/plan` decomposition later in Spec2Cloud)

## **5.4 Automated UI Test Runner (Playwright MCP)**

Integration with the Playwright MCP server:

*   A “Run UI Test” button
*   Calls backend endpoint → triggers MCP Playwright run
*   Returns:
    *   Test passed / failed
    *   Screenshot artifact (“after” screenshot)
    *   Log output (text)

**Purpose:**  
Demonstrate automated testing workflows and GHCP integration in a safe, simple setting.

# **6. Functional Requirements**

### **6.1 Teams API**

*   `GET /api/teams`
*   `GET /api/teams/{id}`
*   `PUT /api/teams/{id}/checklist`

### **6.2 Readiness Calculation**

*   Rule-based logic
*   Example:
    *   All checklist items complete → Green
    *   > 50% complete → Yellow
    *   ≤50% complete → Red

### **6.3 Upgrade Planner**

*   `GET /api/teams/{id}/upgrade-plan`
*   Returns mocked transformation steps

### **6.4 Playwright MCP Test Runner**

*   `POST /api/test-run`
*   Returns: success, logs, screenshot data URI

# **7. UI Requirements**

### **7.1 Navigation**

*   Home: Team overview
*   Team Details: Checklists + upgrade plan
*   Test Runner Modal

### **7.2 Components**

*   ReadinessIndicator
*   ChecklistSection
*   UpgradePlanCard
*   TestRunnerCard
*   Modal for PR preview

### **7.3 Style**

*   Minimal styling (Tailwind or simple CSS)
*   Accessible color contrasts
*   No dependency on design systems (to reduce cognitive load)

# **8. Technical Requirements**

### **8.1 Frontend**

*   React (recommended: Vite or CRA)
*   TypeScript optional
*   Simple routing (React Router)
*   Fetch API or Axios

### **8.2 Backend**

*   .NET Minimal API (.NET 8 recommended)
*   In-memory or SQLite store
*   Clean endpoint separation
*   No entity framework required
*   Simple services for readiness + upgrade logic

### **8.3 MCP Integration**

*   Backend makes calls to local MCP server
*   Playwright test file stored inside `/tests/ui/`
*   Output surfaced to frontend as JSON

# **9. Data Model**

### **Team**

    {
      "id": "string",
      "name": "string",
      "stack": {
        "frontend": "React 18",
        "backend": ".NET 6" | "Java 6" | "Java 11" | ...
      },
      "readiness": "green" | "yellow" | "red",
      "checklist": {
        "codebase": [...],
        "versioning": [...],
        "docs": [...],
        "testing": [...],
        "copilot": [...],
        "modernization": [...]
      }
    }

### **UpgradePlan**

    {
      "currentVersion": "string",
      "targetVersion": "string",
      "steps": ["string"]
    }

### **TestResult**

    {
      "success": true | false,
      "logs": "string",
      "screenshotBase64": "string"
    }

# **10. Constraints & Assumptions**

*   No real repo scanning — version detection uses presets.
*   No authentication — demo runs locally or containerised.
*   No Azure services — fully local backend.
*   MCP + Playwright is optional but recommended.
*   Seed data for 2–4 teams.

# **11. Acceptance Criteria**

1.  User can view teams and readiness states.
2.  User can open a team and toggle checklist items.
3.  User can view a simple upgrade plan.
4.  User can run a UI test and see results.
5.  UI works on mobile and desktop.
6.  App runs locally with no external dependencies.

# **12. Future Extensions (Not in Scope)**

*   Real repo scanning
*   GitHub Actions automations
*   AuthN/AuthZ
*   Integration with DevOps platforms
*   Multi‑environment deployment

# **13. Demo Script (Optional)**

For your APG CoP session:

1.  Show Teams Overview
2.  Open a team
3.  Check some readiness items
4.  Show Upgrade Planner
5.  Click “Run UI Test” → show Playwright results
6.  Close with: “What else would you like to explore next time?”
