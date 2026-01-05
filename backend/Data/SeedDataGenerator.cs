using Backend.Models;

namespace Backend.Data;

/// <summary>
/// Generates realistic seed data for demonstration purposes.
/// Creates 2-4 teams with varying readiness levels and diverse tech stacks.
/// </summary>
public static class SeedDataGenerator
{
    /// <summary>
    /// Generates a collection of teams with realistic demo data.
    /// </summary>
    /// <returns>List of 4 teams with varied readiness states</returns>
    public static List<Team> GenerateTeams()
    {
        return new List<Team>
        {
            CreateTeam(
                id: "team-alpha",
                name: "Team Alpha - E-Commerce Platform",
                frontend: ".NET 6",
                backend: "React 16",
                database: "PostgreSQL 12",
                description: "Legacy e-commerce platform requiring modernization",
                readiness: ReadinessStatus.Red,
                codebaseCompletion: 30,
                versioningCompletion: 40,
                docsCompletion: 20,
                testingCompletion: 25,
                copilotCompletion: 10,
                modernizationCompletion: 15
            ),
            CreateTeam(
                id: "team-beta",
                name: "Team Beta - Customer Portal",
                frontend: "React 18",
                backend: "Java 11",
                database: "MongoDB 5",
                description: "Modern customer-facing portal with good practices",
                readiness: ReadinessStatus.Yellow,
                codebaseCompletion: 70,
                versioningCompletion: 65,
                docsCompletion: 60,
                testingCompletion: 75,
                copilotCompletion: 50,
                modernizationCompletion: 55
            ),
            CreateTeam(
                id: "team-gamma",
                name: "Team Gamma - Internal Tools",
                frontend: "React 18",
                backend: ".NET 8",
                database: "Redis 7",
                description: "Greenfield internal tools with modern stack",
                readiness: ReadinessStatus.Green,
                codebaseCompletion: 95,
                versioningCompletion: 90,
                docsCompletion: 92,
                testingCompletion: 88,
                copilotCompletion: 100,
                modernizationCompletion: 94
            ),
            CreateTeam(
                id: "team-delta",
                name: "Team Delta - Analytics Dashboard",
                frontend: "Angular 14",
                backend: "Java 6",
                database: "MySQL 5.7",
                description: "Analytics platform on legacy stack needing upgrades",
                readiness: ReadinessStatus.Yellow,
                codebaseCompletion: 55,
                versioningCompletion: 50,
                docsCompletion: 65,
                testingCompletion: 60,
                copilotCompletion: 45,
                modernizationCompletion: 40
            )
        };
    }

    private static Team CreateTeam(
        string id,
        string name,
        string frontend,
        string backend,
        string? database,
        string description,
        ReadinessStatus readiness,
        int codebaseCompletion,
        int versioningCompletion,
        int docsCompletion,
        int testingCompletion,
        int copilotCompletion,
        int modernizationCompletion)
    {
        return new Team
        {
            Id = id,
            Name = name,
            Stack = new TechStack
            {
                Frontend = frontend,
                Backend = backend,
                Database = database
            },
            Description = description,
            Readiness = readiness,
            Checklist = new Checklist
            {
                Codebase = GenerateChecklistItems("codebase", codebaseCompletion),
                Versioning = GenerateChecklistItems("versioning", versioningCompletion),
                Documentation = GenerateChecklistItems("documentation", docsCompletion),
                Testing = GenerateChecklistItems("testing", testingCompletion),
                Copilot = GenerateChecklistItems("copilot", copilotCompletion),
                Modernization = GenerateChecklistItems("modernization", modernizationCompletion)
            }
        };
    }

    private static List<ChecklistItem> GenerateChecklistItems(string category, int completionPercentage)
    {
        var items = category switch
        {
            "codebase" => new[]
            {
                ("Code follows consistent style guidelines", "Use EditorConfig or Prettier for automatic formatting"),
                ("No code smells or major technical debt", "Run static analysis tools like SonarQube"),
                ("Codebase is modular and maintainable", "Follow SOLID principles and design patterns"),
                ("Naming conventions are clear and consistent", "Use meaningful names that describe purpose"),
                ("Code comments explain complex logic", "Focus on 'why' rather than 'what'")
            },
            "versioning" => new[]
            {
                ("All dependencies are up to date", "Check for security vulnerabilities and breaking changes"),
                ("Using semantic versioning for releases", "Follow major.minor.patch versioning scheme"),
                ("Lock files are committed to repository", "Ensures consistent dependency versions across environments"),
                ("Dependency security scanning enabled", "Use tools like Dependabot or Snyk"),
                ("No deprecated dependencies in use", "Plan migration path for deprecated packages")
            },
            "documentation" => new[]
            {
                ("README with setup instructions exists", "Include prerequisites, installation, and quick start"),
                ("API documentation is current", "Use tools like Swagger, JSDoc, or XML comments"),
                ("Architecture diagrams are available", "Document high-level system design and data flow"),
                ("Runbooks for common operations exist", "Include troubleshooting and deployment procedures"),
                ("Code has inline documentation", "Document public APIs and complex algorithms")
            },
            "testing" => new[]
            {
                ("Unit tests cover critical paths", "Aim for 80%+ code coverage on business logic"),
                ("Integration tests verify key workflows", "Test interactions between system components"),
                ("E2E tests validate user scenarios", "Use tools like Playwright or Cypress"),
                ("Tests run automatically in CI/CD", "Integrate with GitHub Actions or similar"),
                ("Test data management strategy exists", "Use factories, fixtures, or seed data")
            },
            "copilot" => new[]
            {
                ("GitHub Copilot licenses assigned to team", "Ensure all developers have access"),
                ("Team trained on Copilot best practices", "Conduct workshops or share resources"),
                ("Copilot used for unit test generation", "Leverage AI to write comprehensive test cases"),
                ("Code review includes Copilot suggestions", "Validate AI-generated code during reviews"),
                ("Team shares Copilot tips and tricks", "Build internal knowledge base")
            },
            "modernization" => new[]
            {
                ("Framework versions are current", "Running latest stable versions of core frameworks"),
                ("Using modern language features", "Leverage async/await, pattern matching, etc."),
                ("Cloud-ready architecture", "Stateless services, externalized config, health checks"),
                ("Containerization implemented", "Application runs in Docker containers"),
                ("Infrastructure as code adopted", "Use Terraform, Bicep, or similar tools")
            },
            _ => Array.Empty<(string, string)>()
        };

        var totalItems = items.Length;
        var completedCount = (int)Math.Round(totalItems * (completionPercentage / 100.0));

        return items.Select((item, index) => new ChecklistItem
        {
            Id = $"{category}-{index + 1}",
            Description = item.Item1,
            Guidance = item.Item2,
            IsComplete = index < completedCount
        }).ToList();
    }
}
