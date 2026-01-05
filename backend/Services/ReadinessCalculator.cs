using Backend.Models;

namespace Backend.Services;

/// <summary>
/// Service for calculating team and category-level readiness status.
/// Implements the business rules:
/// - Green: 90%+ completion
/// - Yellow: 50-89% completion
/// - Red: Less than 50% completion
/// </summary>
public class ReadinessCalculator
{
    /// <summary>
    /// Calculates the overall readiness status for a team based on their complete checklist.
    /// </summary>
    /// <param name="checklist">The team's checklist</param>
    /// <returns>Calculated readiness status</returns>
    public ReadinessStatus CalculateTeamStatus(Checklist checklist)
    {
        var completionPercentage = checklist.GetCompletionPercentage();
        return GetStatusFromPercentage(completionPercentage);
    }

    /// <summary>
    /// Calculates the readiness status for a specific category.
    /// </summary>
    /// <param name="items">Checklist items in the category</param>
    /// <returns>Category readiness status</returns>
    public ReadinessStatus CalculateCategoryStatus(List<ChecklistItem> items)
    {
        if (items == null || items.Count == 0)
            return ReadinessStatus.Red;

        var completedCount = items.Count(item => item.IsComplete);
        var completionPercentage = (double)completedCount / items.Count * 100;
        
        return GetStatusFromPercentage(completionPercentage);
    }

    /// <summary>
    /// Gets category-level readiness for all categories in a checklist.
    /// </summary>
    /// <param name="checklist">The team's checklist</param>
    /// <returns>Dictionary of category names to their readiness status</returns>
    public Dictionary<string, ReadinessStatus> CalculateCategoryStatuses(Checklist checklist)
    {
        return new Dictionary<string, ReadinessStatus>
        {
            { "Codebase", CalculateCategoryStatus(checklist.Codebase) },
            { "Versioning", CalculateCategoryStatus(checklist.Versioning) },
            { "Documentation", CalculateCategoryStatus(checklist.Documentation) },
            { "Testing", CalculateCategoryStatus(checklist.Testing) },
            { "Copilot", CalculateCategoryStatus(checklist.Copilot) },
            { "Modernization", CalculateCategoryStatus(checklist.Modernization) }
        };
    }

    /// <summary>
    /// Gets category-level completion percentages.
    /// </summary>
    /// <param name="checklist">The team's checklist</param>
    /// <returns>Dictionary of category names to their completion percentage</returns>
    public Dictionary<string, double> CalculateCategoryPercentages(Checklist checklist)
    {
        return new Dictionary<string, double>
        {
            { "Codebase", CalculatePercentage(checklist.Codebase) },
            { "Versioning", CalculatePercentage(checklist.Versioning) },
            { "Documentation", CalculatePercentage(checklist.Documentation) },
            { "Testing", CalculatePercentage(checklist.Testing) },
            { "Copilot", CalculatePercentage(checklist.Copilot) },
            { "Modernization", CalculatePercentage(checklist.Modernization) }
        };
    }

    /// <summary>
    /// Updates a team's readiness status based on their current checklist.
    /// </summary>
    /// <param name="team">Team to update</param>
    /// <returns>Updated team with new readiness status</returns>
    public Team UpdateTeamReadiness(Team team)
    {
        var newStatus = CalculateTeamStatus(team.Checklist);
        
        return team with { Readiness = newStatus };
    }

    /// <summary>
    /// Converts a completion percentage to a ReadinessStatus enum value.
    /// Business Rules:
    /// - 90% or higher = Green
    /// - 50% to 89% = Yellow
    /// - Below 50% = Red
    /// </summary>
    /// <param name="percentage">Completion percentage (0-100)</param>
    /// <returns>Corresponding readiness status</returns>
    private ReadinessStatus GetStatusFromPercentage(double percentage)
    {
        if (percentage >= 90.0)
            return ReadinessStatus.Green;
        
        if (percentage >= 50.0)
            return ReadinessStatus.Yellow;
        
        return ReadinessStatus.Red;
    }

    /// <summary>
    /// Calculates completion percentage for a list of checklist items.
    /// </summary>
    /// <param name="items">List of checklist items</param>
    /// <returns>Completion percentage (0-100)</returns>
    private double CalculatePercentage(List<ChecklistItem> items)
    {
        if (items == null || items.Count == 0)
            return 0;

        var completedCount = items.Count(item => item.IsComplete);
        return (double)completedCount / items.Count * 100;
    }
}
