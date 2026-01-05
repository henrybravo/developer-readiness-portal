namespace Backend.Models;

/// <summary>
/// Represents a single item in a readiness checklist.
/// </summary>
public record ChecklistItem
{
    /// <summary>
    /// Unique identifier for the checklist item
    /// </summary>
    public string Id { get; init; } = string.Empty;

    /// <summary>
    /// Description of the checklist item
    /// </summary>
    public string Description { get; init; } = string.Empty;

    /// <summary>
    /// Whether the item has been completed
    /// </summary>
    public bool IsComplete { get; set; }

    /// <summary>
    /// Optional guidance or help text for completing this item
    /// </summary>
    public string? Guidance { get; init; }
}
