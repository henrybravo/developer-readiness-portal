namespace Backend.Models;

/// <summary>
/// Represents the technology stack used by a team.
/// </summary>
public record TechStack
{
    /// <summary>
    /// Frontend framework and version (e.g., "React 16", "Angular 14")
    /// </summary>
    public string Frontend { get; init; } = string.Empty;

    /// <summary>
    /// Backend framework and version (e.g., ".NET 6", "Java 11", "Node.js 18")
    /// </summary>
    public string Backend { get; init; } = string.Empty;

    /// <summary>
    /// Optional database technology (e.g., "PostgreSQL 15", "MongoDB 6")
    /// </summary>
    public string? Database { get; init; }
}
