using Backend.Models;

namespace Backend.Data;

/// <summary>
/// Interface for data persistence operations.
/// Implementations can use JSON files, Redis, or other storage mechanisms.
/// </summary>
public interface IDataStore
{
    /// <summary>
    /// Retrieves all teams from the data store.
    /// </summary>
    /// <returns>Collection of all teams</returns>
    Task<IEnumerable<Team>> GetAllTeamsAsync();

    /// <summary>
    /// Retrieves a specific team by its unique identifier.
    /// </summary>
    /// <param name="id">Team identifier</param>
    /// <returns>Team if found, null otherwise</returns>
    Task<Team?> GetTeamByIdAsync(string id);

    /// <summary>
    /// Updates an existing team in the data store.
    /// </summary>
    /// <param name="team">Team with updated information</param>
    /// <returns>Task representing the async operation</returns>
    Task UpdateTeamAsync(Team team);

    /// <summary>
    /// Adds a new team to the data store.
    /// </summary>
    /// <param name="team">Team to add</param>
    /// <returns>Task representing the async operation</returns>
    Task AddTeamAsync(Team team);
}
