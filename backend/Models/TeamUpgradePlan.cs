namespace Backend.Models;

/// <summary>
/// Represents a comprehensive upgrade plan for a team's entire technology stack.
/// </summary>
public record TeamUpgradePlan
{
    /// <summary>
    /// Team identifier
    /// </summary>
    public string TeamId { get; init; } = string.Empty;

    /// <summary>
    /// Team name
    /// </summary>
    public string TeamName { get; init; } = string.Empty;

    /// <summary>
    /// Upgrade plan for frontend technology
    /// </summary>
    public UpgradePlan? Frontend { get; init; }

    /// <summary>
    /// Upgrade plan for backend technology
    /// </summary>
    public UpgradePlan? Backend { get; init; }

    /// <summary>
    /// Upgrade plan for database technology
    /// </summary>
    public UpgradePlan? Database { get; init; }

    /// <summary>
    /// Overall recommended actions across the stack
    /// </summary>
    public List<string> GeneralRecommendations { get; init; } = new();
}
