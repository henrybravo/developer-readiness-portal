namespace Backend.Models;

/// <summary>
/// Represents the overall readiness status of a team.
/// Based on checklist completion percentages:
/// - Green: 90%+ items complete
/// - Yellow: 50-89% items complete
/// - Red: Less than 50% items complete
/// </summary>
public enum ReadinessStatus
{
    Red,
    Yellow,
    Green
}
