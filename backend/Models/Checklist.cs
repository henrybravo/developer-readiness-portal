namespace Backend.Models;

/// <summary>
/// Represents a comprehensive readiness checklist organized by categories.
/// </summary>
public record Checklist
{
    /// <summary>
    /// Codebase health items (code quality, standards, documentation)
    /// </summary>
    public List<ChecklistItem> Codebase { get; init; } = new();

    /// <summary>
    /// Version control and dependency management items
    /// </summary>
    public List<ChecklistItem> Versioning { get; init; } = new();

    /// <summary>
    /// Documentation completeness items
    /// </summary>
    public List<ChecklistItem> Documentation { get; init; } = new();

    /// <summary>
    /// Testing coverage and automation items
    /// </summary>
    public List<ChecklistItem> Testing { get; init; } = new();

    /// <summary>
    /// GitHub Copilot enablement and adoption items
    /// </summary>
    public List<ChecklistItem> Copilot { get; init; } = new();

    /// <summary>
    /// Modernization and upgrade readiness items
    /// </summary>
    public List<ChecklistItem> Modernization { get; init; } = new();

    /// <summary>
    /// Gets all checklist items across all categories
    /// </summary>
    public IEnumerable<ChecklistItem> GetAllItems()
    {
        return Codebase
            .Concat(Versioning)
            .Concat(Documentation)
            .Concat(Testing)
            .Concat(Copilot)
            .Concat(Modernization);
    }

    /// <summary>
    /// Calculates the overall completion percentage
    /// </summary>
    public double GetCompletionPercentage()
    {
        var allItems = GetAllItems().ToList();
        if (allItems.Count == 0) return 0;

        var completedCount = allItems.Count(item => item.IsComplete);
        return (double)completedCount / allItems.Count * 100;
    }
}
