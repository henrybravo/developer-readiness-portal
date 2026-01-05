# 0003 Data Persistence Strategy

**Date**: 2025-12-30  
**Status**: Accepted

## Context

The Nefira Developer Readiness Portal needs to persist team data, checklists, and their states across application restarts. The requirements are:
- Store data for 2-4 teams with checklists
- Persist checklist state updates
- Support concurrent updates safely
- Load seed data automatically on first startup
- Work in containerized environment
- No complex database setup or migrations
- Support demo scenarios with pre-populated data

Per PRD constraints, must use **local JSON documents or local Redis container** and avoid cloud dependencies.

## Decision Drivers

- **Mandate**: Local JSON or Redis only (per PRD technical constraints)
- **Simplicity**: No complex database setup, migrations, or schemas
- **Demo Readiness**: Seed data must load automatically
- **Data Volume**: Only 2-4 teams, minimal data (< 100KB total)
- **Concurrency**: Must handle checklist updates safely
- **Portability**: Must work in Docker containers
- **Startup Time**: Contribute to < 60 second full startup requirement
- **Persistence**: Data must survive container restarts
- **Development Speed**: Quick to implement

## Considered Options

### Option 1: JSON Files (Default)
**Description**: Store all data in a single JSON file (`teams.json`) mounted as a Docker volume with file-based locking for concurrent access.

**Pros**:
- **Extreme simplicity** - No additional services or dependencies
- **Human-readable** - Can view and edit data directly
- **Version control friendly** - Seed data can be committed to git
- **Zero setup** - No container to configure or start
- **Instant startup** - File read is < 10ms
- **Easy debugging** - Can inspect data file at any time
- **Built-in seed data** - Just commit the initial teams.json
- **Docker volume simple** - Single file mount
- **No network overhead** - Direct file system access
- **Perfect for demo** - Completely self-contained

**Cons**:
- **File locking complexity** - Need semaphore or mutex for concurrent writes
- **No query capabilities** - Must load entire file and filter in memory
- **Limited scalability** - Not suitable for > 100 teams (not a concern)
- **Atomicity** - Need careful write patterns to avoid corruption
- **No built-in indexing** - Linear search (negligible for 2-4 teams)

### Option 2: Redis Container
**Description**: Run Redis in a separate Docker container, use it as an in-memory data store with optional persistence to disk.

**Pros**:
- **Atomic operations** - Built-in atomic reads and writes
- **Concurrency safe** - Handles concurrent access natively
- **Fast** - In-memory operations are extremely fast
- **Demonstrates modern stack** - Shows Redis usage in demos
- **Pub/Sub capability** - Could enable real-time updates (not needed)
- **Rich data types** - Hashes, lists, sets available (overkill)
- **Industry standard** - Familiar to developers

**Cons**:
- **Additional complexity** - Another container to manage
- **Startup dependency** - Backend must wait for Redis health check
- **Memory overhead** - Redis process uses 10-50MB even for tiny datasets
- **Network overhead** - TCP calls instead of direct file access
- **Harder debugging** - Need Redis CLI to inspect data
- **Seed data complexity** - Must load JSON into Redis on startup
- **Overkill** - Redis features wasted on 2-4 teams
- **Demo complexity** - One more thing that could fail

### Option 3: SQLite Database
**Description**: Use SQLite embedded database with Entity Framework Core.

**Pros**:
- **Relational model** - Proper schema and relationships
- **SQL queries** - Familiar query language
- **ACID transactions** - Built-in atomicity and consistency
- **EF Core integration** - Familiar ORM for .NET developers
- **Single file** - Similar simplicity to JSON

**Cons**:
- **NOT ALLOWED** - PRD explicitly specifies JSON or Redis only
- **Schema complexity** - Need to define models and migrations
- **EF Core overhead** - Additional dependencies and learning curve
- **Less readable** - Binary file format, need tools to inspect
- **Migration complexity** - Schema changes require migrations
- **Slower development** - More setup than JSON

## Decision Outcome

**Chosen Option**: JSON Files (Default), with Redis as optional alternative

**Rationale**:
1. **Simplicity wins** - For 2-4 teams, JSON files provide perfect balance of simplicity and capability
2. **Zero dependencies** - No additional containers means faster startup and fewer failure points
3. **Demo reliability** - Fewer moving parts means more reliable demos
4. **Development speed** - JSON is fastest to implement and test
5. **Debugging ease** - Can inspect/edit data file directly during development
6. **Seed data natural** - JSON seed data is straightforward and version-controlled
7. **Startup time** - File read is instant; Redis adds 5-10 seconds to startup
8. **Appropriate scale** - For 2-4 teams, file I/O is faster than network calls to Redis

**Implementation Strategy**:
- **Primary**: JSON file implementation (default)
- **Optional**: Redis implementation available via configuration
- **Interface**: `IDataStore` abstraction allows swapping implementations
- **Recommendation**: Use JSON for demos, Redis only if showing Redis usage is a goal

## Consequences

### Positive
- **Fastest development** - JSON serialization is trivial in .NET
- **Simplest deployment** - No Redis container in docker-compose by default
- **Fastest startup** - No waiting for Redis health checks
- **Easier debugging** - Direct file inspection
- **Git-friendly seed data** - Seed data committed to repository
- **Most reliable demos** - Fewer services means fewer failure points
- **Lower resource usage** - No Redis memory overhead

### Negative
- **Manual concurrency control** - Must implement file locking with `SemaphoreSlim`
- **Write atomicity** - Must use safe write patterns (write to temp, rename)
- **No advanced queries** - Must load and filter in memory (negligible for 2-4 teams)
- **Less "modern"** - Redis might seem more impressive in demos (but simplicity is the goal)

### Neutral
- Can switch to Redis via configuration without code changes (abstracted via `IDataStore`)
- Both options support all required features equally well
- Performance difference is negligible at this scale

## Implementation Notes

### Data Store Interface
```csharp
public interface IDataStore
{
    Task<IEnumerable<Team>> GetAllTeamsAsync();
    Task<Team?> GetTeamByIdAsync(string id);
    Task UpdateTeamAsync(Team team);
}
```

### JSON Implementation
```csharp
public class JsonDataStore : IDataStore
{
    private readonly string _dataFilePath;
    private readonly SemaphoreSlim _fileLock = new(1, 1);

    public JsonDataStore(IConfiguration config)
    {
        _dataFilePath = config["DataPath"] ?? "/data/teams.json";
        EnsureDataFileExists();
    }

    public async Task<IEnumerable<Team>> GetAllTeamsAsync()
    {
        await _fileLock.WaitAsync();
        try
        {
            var json = await File.ReadAllTextAsync(_dataFilePath);
            return JsonSerializer.Deserialize<List<Team>>(json) 
                ?? new List<Team>();
        }
        finally
        {
            _fileLock.Release();
        }
    }

    public async Task UpdateTeamAsync(Team team)
    {
        await _fileLock.WaitAsync();
        try
        {
            var teams = (await GetAllTeamsAsync()).ToList();
            var index = teams.FindIndex(t => t.Id == team.Id);
            if (index >= 0) teams[index] = team;
            
            var json = JsonSerializer.Serialize(teams, 
                new JsonSerializerOptions { WriteIndented = true });
            
            // Atomic write: write to temp, then rename
            var tempPath = $"{_dataFilePath}.tmp";
            await File.WriteAllTextAsync(tempPath, json);
            File.Move(tempPath, _dataFilePath, overwrite: true);
        }
        finally
        {
            _fileLock.Release();
        }
    }

    private void EnsureDataFileExists()
    {
        if (!File.Exists(_dataFilePath))
        {
            var seedData = SeedDataGenerator.GenerateTeams();
            var json = JsonSerializer.Serialize(seedData, 
                new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_dataFilePath, json);
        }
    }
}
```

### Redis Implementation (Optional)
```csharp
public class RedisDataStore : IDataStore
{
    private readonly IDatabase _db;
    private const string TeamsKey = "teams";

    public RedisDataStore(IConnectionMultiplexer redis)
    {
        _db = redis.GetDatabase();
        EnsureSeedData();
    }

    public async Task<IEnumerable<Team>> GetAllTeamsAsync()
    {
        var json = await _db.StringGetAsync(TeamsKey);
        if (json.IsNullOrEmpty) return new List<Team>();
        return JsonSerializer.Deserialize<List<Team>>(json!) 
            ?? new List<Team>();
    }

    public async Task UpdateTeamAsync(Team team)
    {
        var teams = (await GetAllTeamsAsync()).ToList();
        var index = teams.FindIndex(t => t.Id == team.Id);
        if (index >= 0) teams[index] = team;
        
        var json = JsonSerializer.Serialize(teams);
        await _db.StringSetAsync(TeamsKey, json);
    }
}
```

### Dependency Injection Configuration
```csharp
// appsettings.json
{
  "DataStore": "Json", // or "Redis"
  "DataPath": "/data/teams.json",
  "Redis": {
    "ConnectionString": "redis:6379"
  }
}

// Program.cs
if (builder.Configuration["DataStore"] == "Redis")
{
    builder.Services.AddSingleton<IConnectionMultiplexer>(
        ConnectionMultiplexer.Connect(
            builder.Configuration["Redis:ConnectionString"]));
    builder.Services.AddSingleton<IDataStore, RedisDataStore>();
}
else
{
    builder.Services.AddSingleton<IDataStore, JsonDataStore>();
}
```

### Docker Volume Configuration (JSON)
```yaml
# docker-compose.yml
services:
  backend:
    volumes:
      - ./data:/data
    environment:
      - DataStore=Json
      - DataPath=/data/teams.json
```

### Docker Volume Configuration (Redis - Optional)
```yaml
# docker-compose.yml
services:
  backend:
    depends_on:
      redis:
        condition: service_healthy
    environment:
      - DataStore=Redis
      - Redis__ConnectionString=redis:6379

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
```

### Seed Data Structure
```json
[
  {
    "id": "team-001",
    "name": "Enterprise Platform Team",
    "stack": {
      "frontend": "React 18",
      "backend": ".NET 6"
    },
    "readiness": "yellow",
    "checklist": {
      "codebase": [
        {
          "id": "cb-001",
          "description": "Unit tests achieve 80%+ coverage",
          "isComplete": true,
          "guidance": "Run dotnet test --collect:\"XPlat Code Coverage\""
        }
      ]
    }
  }
]
```

## References

- [PRD Section 6: Technical Stack Constraints](../prd.md#technical-stack-constraints)
- [PRD Section 10: Data Requirements](../prd.md#data-requirements)
- [PRD REQ-5: Simple Data Management](../prd.md#req-5-simple-data-management)
- [PRD REQ-9: Seed Data and Demo Readiness](../prd.md#req-9-seed-data-and-demo-readiness)
- [Technical Stack: Data Persistence](../../docs/technical-stack.md#data-persistence)
