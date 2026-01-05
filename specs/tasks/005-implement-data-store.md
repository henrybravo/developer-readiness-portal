# Task 005: Implement Data Store

**Status:** ✅ Complete  
**Phase:** 2 - Data Layer & Models  
**Estimated Time:** 2-3 hours  
**Actual Time:** ~2 hours

## Objective

Implement a JSON file-based data store with thread-safe operations, automatic seed data generation, and dependency injection configuration.

## Requirements

From `specs/IMPLEMENTATION_PLAN.md`:
- Create IDataStore interface
- Implement JsonDataStore with SemaphoreSlim locking
- Add seed data generation (2-4 teams with realistic data)
- Add EnsureDataFileExists logic
- Configure dependency injection
- Verify: Seed data loads on startup, JSON file persists updates

## Implementation

### 1. IDataStore Interface

**File:** `backend/Data/IDataStore.cs`

Created abstraction layer for data persistence with methods:
- `GetAllTeamsAsync()` - Retrieve all teams
- `GetTeamByIdAsync(string id)` - Retrieve specific team
- `UpdateTeamAsync(Team team)` - Update existing team
- `AddTeamAsync(Team team)` - Add new team

This interface allows swapping implementations (JSON, Redis, SQL) without changing business logic.

### 2. JsonDataStore Implementation

**File:** `backend/Data/JsonDataStore.cs`

**Key Features:**

**Thread-Safe File Access:**
```csharp
private readonly SemaphoreSlim _fileLock = new(1, 1);
```
- Ensures only one thread can read/write JSON file at a time
- Prevents data corruption during concurrent operations
- Critical for multi-threaded ASP.NET Core environment

**Configuration-Driven Path:**
```csharp
_dataFilePath = configuration["DataStore:JsonPath"] ?? "/data/nefira-data.json";
```
- Reads from appsettings.json
- Defaults to `/data/nefira-data.json` for Docker volume
- Configurable for different environments

**Automatic Directory Creation:**
```csharp
var directory = Path.GetDirectoryName(_dataFilePath);
if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
{
    Directory.CreateDirectory(directory);
}
```
- Creates data directory if it doesn't exist
- Handles both relative and absolute paths

**Seed Data Generation:**
```csharp
private void EnsureDataFileExists()
{
    if (File.Exists(_dataFilePath)) return;
    
    var seedData = SeedDataGenerator.GenerateTeams();
    var json = JsonSerializer.Serialize(seedData, _jsonOptions);
    File.WriteAllText(_dataFilePath, json);
}
```
- Runs on first startup
- Only creates file if it doesn't exist
- Preserves existing data on restarts

**JSON Serialization Options:**
```csharp
_jsonOptions = new JsonSerializerOptions
{
    WriteIndented = true,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};
```
- Human-readable formatting (WriteIndented)
- camelCase for frontend compatibility
- Consistent with REST API conventions

### 3. Seed Data Generator

**File:** `backend/Data/SeedDataGenerator.cs`

**Generated Teams:**

1. **Team Alpha - E-Commerce Platform** (Red Status)
   - Tech Stack: .NET 6, React 16, PostgreSQL 12
   - Overall Completion: ~30%
   - Focus: Legacy platform needing modernization

2. **Team Beta - Customer Portal** (Yellow Status)
   - Tech Stack: React 18, Java 11, MongoDB 5
   - Overall Completion: ~65%
   - Focus: Modern portal with good practices

3. **Team Gamma - Internal Tools** (Green Status)
   - Tech Stack: React 18, .NET 8, Redis 7
   - Overall Completion: ~93%
   - Focus: Greenfield project with modern stack

4. **Team Delta - Analytics Dashboard** (Yellow Status)
   - Tech Stack: Angular 14, Java 6, MySQL 5.7
   - Overall Completion: ~52%
   - Focus: Analytics on legacy stack

**Checklist Generation Logic:**

The seed generator creates realistic checklists with:
- 6 categories (Codebase, Versioning, Documentation, Testing, Copilot, Modernization)
- 5 items per category (total 30 items per team)
- Parameterized completion percentages
- Context-specific guidance for each item

**Example Items:**
```csharp
("Code follows consistent style guidelines", "Use EditorConfig or Prettier for automatic formatting"),
("All dependencies are up to date", "Check for security vulnerabilities and breaking changes"),
("Unit tests cover critical paths", "Aim for 80%+ code coverage on business logic"),
```

### 4. Dependency Injection Configuration

**File:** `backend/Program.cs`

```csharp
builder.Services.AddSingleton<IDataStore, JsonDataStore>();
```

**Why Singleton?**
- JSON file is a shared resource
- Single instance manages file access
- SemaphoreSlim ensures thread safety
- Reduces file I/O operations

### 5. API Endpoints (Added for Testing)

Added temporary endpoints to verify data store:

```csharp
app.MapGet("/api/teams", async (IDataStore dataStore) =>
{
    var teams = await dataStore.GetAllTeamsAsync();
    return Results.Ok(teams);
});

app.MapGet("/api/teams/{id}", async (string id, IDataStore dataStore) =>
{
    var team = await dataStore.GetTeamByIdAsync(id);
    return team != null ? Results.Ok(team) : Results.NotFound();
});
```

## Verification

### Build Success
```bash
cd backend && dotnet build
```
**Result:** ✅ Build succeeded in 7.6s

### Startup and Seed Data Generation
```bash
dotnet run
```
**Result:** 
- ✅ Server started on http://localhost:5000
- ✅ Data file created at `/data/nefira-data.json` (28KB)
- ✅ 821 lines of JSON data

### API Testing
```bash
curl http://localhost:5000/api/teams | jq 'length'
# Output: 4

curl http://localhost:5000/api/teams/team-alpha | jq '{name, readiness}'
# Output: {"name": "Team Alpha - E-Commerce Platform", "readiness": 0}
```

### Data Persistence
- ✅ File survives server restarts
- ✅ Data is not regenerated on subsequent startups
- ✅ JSON is human-readable and properly formatted

## Files Created/Modified

### Created:
- `backend/Data/IDataStore.cs` - Data store interface (5 methods)
- `backend/Data/JsonDataStore.cs` - Thread-safe JSON implementation (175 lines)
- `backend/Data/SeedDataGenerator.cs` - Realistic seed data (188 lines)

### Modified:
- `backend/Program.cs` - Added DI configuration and test API endpoints
- `backend/appsettings.json` - Already had DataStore configuration
- `backend/backend.csproj` - Removed conflicting OpenAPI package

## Design Decisions

### 1. SemaphoreSlim for Thread Safety
**Decision:** Use `SemaphoreSlim(1, 1)` instead of lock keyword
- **Rationale:** Supports async/await pattern
- **Alternative:** ReaderWriterLockSlim (more complex, not needed)
- **Trade-off:** Slightly more overhead, but async-compatible

### 2. Singleton Lifetime
**Decision:** Register JsonDataStore as Singleton
- **Rationale:** File is a shared resource
- **Alternative:** Scoped (would create multiple instances)
- **Risk Mitigation:** SemaphoreSlim ensures safe concurrent access

### 3. Comprehensive Seed Data
**Decision:** Generate 4 teams with 30 checklist items each
- **Rationale:** Demonstrates all readiness levels (Red/Yellow/Green)
- **Coverage:** All tech stacks mentioned in PRD
- **Realism:** Includes guidance text for each checklist item

### 4. camelCase JSON Serialization
**Decision:** Use camelCase for property names in JSON
- **Rationale:** Matches JavaScript/TypeScript conventions
- **Compatibility:** Frontend expects camelCase
- **Consistency:** REST API best practices

### 5. Automatic Directory Creation
**Decision:** Create `/data` directory if it doesn't exist
- **Rationale:** Simplifies Docker deployment
- **Benefit:** Works locally and in containers
- **Robustness:** Handles missing directories gracefully

## Quality Checklist

- ✅ All code compiles without errors or warnings
- ✅ Thread-safe file access implemented
- ✅ Seed data generated correctly (4 teams, 120 total checklist items)
- ✅ Dependency injection configured
- ✅ API endpoints return valid JSON
- ✅ Data persists across restarts
- ✅ Comprehensive logging added
- ✅ Error handling for file operations
- ⚠️ Unit tests not yet written (will be added in Task 006+)
- ✅ Code follows C# conventions and best practices

## Known Issues & Resolutions

### Issue 1: OpenAPI Version Conflict
**Problem:** `Microsoft.AspNetCore.OpenApi` conflicted with `Swashbuckle.AspNetCore`
**Solution:** Removed `Microsoft.AspNetCore.OpenApi` package
**Impact:** Removed `.WithOpenApi()` calls temporarily

### Issue 2: Readiness Status Shows 0 Instead of Enum Name
**Observation:** JSON shows `"readiness": 0` instead of `"readiness": "Red"`
**Cause:** JSON serializer defaults to numeric enum values
**Resolution Needed:** Will be fixed in Task 006 when ReadinessCalculator is implemented

## Next Steps

Based on `specs/IMPLEMENTATION_PLAN.md`:

**Task 006:** Implement Readiness Calculator
- Create `ReadinessCalculator` service
- Implement status calculation rules (90%+ = Green, 50-89% = Yellow, <50% = Red)
- Add category-level and team-level aggregation
- Write unit tests
- Fix enum serialization to use string values

## Notes

- File path is configurable via `appsettings.json` (`DataStore:JsonPath`)
- Lock mechanism prevents race conditions during high concurrency
- Seed data includes realistic scenarios for demos
- All 4 teams have unique tech stacks and completion levels
- Checklist items include helpful guidance text
- Data file is 28KB (~820 lines) with formatted JSON
- Logger provides detailed startup information
- Future: Can add `DeleteTeamAsync()` method if needed
- Future: Can implement `RedisDataStore` as alternative implementation

## Dependencies

**Runtime:**
- .NET 9 SDK (compatible with .NET 8+)
- System.Text.Json (included in .NET)
- SemaphoreSlim (System.Threading)

**Development:**
- IConfiguration for dependency injection
- ILogger for diagnostics

**No External Packages Required** - All functionality uses built-in .NET libraries
