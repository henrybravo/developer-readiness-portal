namespace Backend.Models;

/// <summary>
/// Represents a development team with their technology stack and readiness information.
/// </summary>
public record Team
{
    /// <summary>
    /// Unique identifier for the team
    /// </summary>
    public string Id { get; init; } = string.Empty;

    /// <summary>
    /// Team name
    /// </summary>
    public string Name { get; init; } = string.Empty;

    /// <summary>
    /// Technology stack used by the team
    /// </summary>
    public TechStack Stack { get; init; } = new();

    /// <summary>
    /// Current readiness status (calculated from checklist completion)
    /// </summary>
    public ReadinessStatus Readiness { get; set; } = ReadinessStatus.Red;

    /// <summary>
    /// Comprehensive readiness checklist
    /// </summary>
    public Checklist Checklist { get; init; } = new();

    /// <summary>
    /// Optional description or notes about the team
    /// </summary>
    public string? Description { get; init; }
}
