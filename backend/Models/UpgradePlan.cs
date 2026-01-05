namespace Backend.Models;

/// <summary>
/// Represents an upgrade plan for a technology stack component.
/// </summary>
public record UpgradePlan
{
    /// <summary>
    /// Current version of the technology
    /// </summary>
    public string CurrentVersion { get; init; } = string.Empty;

    /// <summary>
    /// Recommended target version
    /// </summary>
    public string TargetVersion { get; init; } = string.Empty;

    /// <summary>
    /// Technology name (e.g., ".NET", "React", "Java")
    /// </summary>
    public string Technology { get; init; } = string.Empty;

    /// <summary>
    /// Rationale for the upgrade
    /// </summary>
    public string Rationale { get; init; } = string.Empty;

    /// <summary>
    /// Step-by-step upgrade instructions
    /// </summary>
    public List<string> Steps { get; init; } = new();

    /// <summary>
    /// Estimated effort (e.g., "2-4 hours", "1-2 days")
    /// </summary>
    public string? EstimatedEffort { get; init; }

    /// <summary>
    /// GitHub Copilot recommendations specific to this upgrade
    /// </summary>
    public List<string> CopilotRecommendations { get; init; } = new();
}
