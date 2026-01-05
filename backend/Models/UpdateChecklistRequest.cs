namespace Backend.Models;

/// <summary>
/// Request model for updating a team's checklist
/// </summary>
public record UpdateChecklistRequest
{
    /// <summary>
    /// The updated checklist with modified items
    /// </summary>
    public required Checklist Checklist { get; init; }
}
