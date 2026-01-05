using System.Text.Json;
using Backend.Models;

namespace Backend.Data;

/// <summary>
/// JSON file-based implementation of IDataStore.
/// Uses SemaphoreSlim for thread-safe file access.
/// Automatically generates seed data on first run.
/// </summary>
public class JsonDataStore : IDataStore
{
    private readonly string _dataFilePath;
    private readonly SemaphoreSlim _fileLock = new(1, 1);
    private readonly ILogger<JsonDataStore> _logger;
    private readonly JsonSerializerOptions _jsonOptions;

    public JsonDataStore(IConfiguration configuration, ILogger<JsonDataStore> logger)
    {
        _logger = logger;
        _dataFilePath = configuration["DataStore:JsonPath"] ?? "/data/nefira-data.json";
        
        _jsonOptions = new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        EnsureDataFileExists();
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<Team>> GetAllTeamsAsync()
    {
        await _fileLock.WaitAsync();
        try
        {
            return await ReadTeamsFromFileAsync();
        }
        finally
        {
            _fileLock.Release();
        }
    }

    /// <summary>
    /// Internal method to read teams without acquiring lock.
    /// Caller must hold the lock.
    /// </summary>
    private async Task<List<Team>> ReadTeamsFromFileAsync()
    {
        if (!File.Exists(_dataFilePath))
        {
            _logger.LogWarning("Data file not found at {Path}, returning empty list", _dataFilePath);
            return new List<Team>();
        }

        var json = await File.ReadAllTextAsync(_dataFilePath);
        var teams = JsonSerializer.Deserialize<List<Team>>(json, _jsonOptions);
        
        _logger.LogInformation("Loaded {Count} teams from {Path}", teams?.Count ?? 0, _dataFilePath);
        return teams ?? new List<Team>();
    }

    /// <inheritdoc/>
    public async Task<Team?> GetTeamByIdAsync(string id)
    {
        var teams = await GetAllTeamsAsync();
        return teams.FirstOrDefault(t => t.Id == id);
    }

    /// <inheritdoc/>
    public async Task UpdateTeamAsync(Team team)
    {
        await _fileLock.WaitAsync();
        try
        {
            var teams = await ReadTeamsFromFileAsync();
            var index = teams.FindIndex(t => t.Id == team.Id);
            
            if (index < 0)
            {
                _logger.LogWarning("Team {TeamId} not found for update", team.Id);
                throw new InvalidOperationException($"Team with ID '{team.Id}' not found");
            }

            teams[index] = team;
            await SaveTeamsAsync(teams);
            
            _logger.LogInformation("Updated team {TeamId} ({TeamName})", team.Id, team.Name);
        }
        finally
        {
            _fileLock.Release();
        }
    }

    /// <inheritdoc/>
    public async Task AddTeamAsync(Team team)
    {
        await _fileLock.WaitAsync();
        try
        {
            var teams = await ReadTeamsFromFileAsync();
            
            if (teams.Any(t => t.Id == team.Id))
            {
                _logger.LogWarning("Team {TeamId} already exists", team.Id);
                throw new InvalidOperationException($"Team with ID '{team.Id}' already exists");
            }

            teams.Add(team);
            await SaveTeamsAsync(teams);
            
            _logger.LogInformation("Added new team {TeamId} ({TeamName})", team.Id, team.Name);
        }
        finally
        {
            _fileLock.Release();
        }
    }

    /// <summary>
    /// Saves the teams list to the JSON file.
    /// Note: Caller must hold the file lock before calling this method.
    /// </summary>
    private async Task SaveTeamsAsync(List<Team> teams)
    {
        var json = JsonSerializer.Serialize(teams, _jsonOptions);
        
        // Ensure directory exists
        var directory = Path.GetDirectoryName(_dataFilePath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
            _logger.LogInformation("Created data directory: {Directory}", directory);
        }

        await File.WriteAllTextAsync(_dataFilePath, json);
        _logger.LogDebug("Saved {Count} teams to {Path}", teams.Count, _dataFilePath);
    }

    /// <summary>
    /// Ensures the data file exists, creating it with seed data if necessary.
    /// </summary>
    private void EnsureDataFileExists()
    {
        if (File.Exists(_dataFilePath))
        {
            _logger.LogInformation("Data file already exists at {Path}", _dataFilePath);
            return;
        }

        _logger.LogInformation("Data file not found, generating seed data at {Path}", _dataFilePath);

        try
        {
            var seedData = SeedDataGenerator.GenerateTeams();
            var json = JsonSerializer.Serialize(seedData, _jsonOptions);

            // Ensure directory exists
            var directory = Path.GetDirectoryName(_dataFilePath);
            if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
                _logger.LogInformation("Created data directory: {Directory}", directory);
            }

            File.WriteAllText(_dataFilePath, json);
            _logger.LogInformation("Successfully created seed data with {Count} teams", seedData.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create seed data file at {Path}", _dataFilePath);
            throw;
        }
    }
}
