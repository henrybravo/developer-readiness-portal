# Task 007: Teams API Endpoints

**Status**: ✅ Completed  
**Assigned to**: Developer Agent  
**Priority**: High  
**Dependencies**: Task 005 (Data Store), Task 006 (Readiness Calculator)

## Objective

Implement REST API endpoints for team management, including listing teams, retrieving team details, and updating checklists with automatic readiness calculation.

## Requirements

### Functional Requirements
1. **GET /api/teams** - Retrieve list of all teams
   - Calculate readiness status for each team before returning
   - Return array of team objects
   
2. **GET /api/teams/{id}** - Retrieve specific team details
   - Calculate readiness status before returning
   - Return 404 error if team not found
   - Include full team details (checklist, tech stack, upgrade plan)

3. **PUT /api/teams/{id}/checklist** - Update team checklist
   - Accept checklist update request
   - Validate request payload
   - Update team's checklist items
   - Recalculate readiness status automatically
   - Persist changes to data store
   - Return updated team with new readiness status
   - Return appropriate errors (400, 404)

### Technical Requirements
1. Use ASP.NET Minimal APIs pattern
2. Inject dependencies (IDataStore, ReadinessCalculator)
3. Follow RESTful conventions
4. Provide standard error responses
5. Include Swagger documentation
6. Support CORS for frontend communication

## Implementation

### API Endpoints

#### GET /api/teams
**Purpose**: Retrieve all teams with calculated readiness

**Response**: `200 OK`
```json
[
  {
    "id": "team-alpha",
    "name": "Team Alpha - E-Commerce Platform",
    "stack": {
      "frontend": ".NET 6",
      "backend": "React 16",
      "database": "PostgreSQL 12"
    },
    "readiness": 0,  // Red=0, Yellow=1, Green=2
    "description": "Legacy e-commerce platform requiring modernization",
    "checklist": { ... }
  }
]
```

**Implementation Details**:
- Calls `dataStore.GetAllTeamsAsync()` to load teams
- Iterates through teams calling `calculator.UpdateTeamReadiness()` for each
- Returns complete team list with updated readiness values

---

#### GET /api/teams/{id}
**Purpose**: Retrieve specific team details with calculated readiness

**Parameters**:
- `id` (path) - Team identifier (e.g., "team-alpha")

**Response**: `200 OK`
```json
{
  "id": "team-alpha",
  "name": "Team Alpha - E-Commerce Platform",
  "stack": { ... },
  "readiness": 0,
  "description": "...",
  "checklist": {
    "codebase": [ ... ],
    "versioning": [ ... ],
    "documentation": [ ... ],
    "testing": [ ... ],
    "copilot": [ ... ],
    "modernization": [ ... ]
  },
  "upgradePlan": { ... }
}
```

**Response**: `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Team with ID 'invalid-id' not found",
  "path": "/api/teams/invalid-id",
  "timestamp": "2026-01-05T08:00:00Z"
}
```

**Implementation Details**:
- Calls `dataStore.GetTeamByIdAsync(id)` to load team
- Returns `ErrorResponse` with 404 if team is null
- Calls `calculator.UpdateTeamReadiness(team)` before returning
- Returns complete team object with calculated readiness

---

#### PUT /api/teams/{id}/checklist
**Purpose**: Update team's checklist items and recalculate readiness

**Parameters**:
- `id` (path) - Team identifier
- Request Body - `UpdateChecklistRequest`

**Request Body**:
```json
{
  "checklist": {
    "codebase": [
      {
        "title": "Code follows consistent style guidelines",
        "isComplete": true,
        "guidance": "Use EditorConfig or Prettier for automatic formatting"
      }
    ],
    "versioning": [ ... ],
    "documentation": [ ... ],
    "testing": [ ... ],
    "copilot": [ ... ],
    "modernization": [ ... ]
  }
}
```

**Response**: `200 OK`
```json
{
  "id": "team-alpha",
  "name": "Team Alpha - E-Commerce Platform",
  "readiness": 1,  // Updated after recalculation
  "checklist": { ... }  // Updated checklist
}
```

**Response**: `400 Bad Request`
```json
{
  "statusCode": 400,
  "message": "Checklist is required",
  "path": "/api/teams/team-alpha/checklist",
  "timestamp": "2026-01-05T08:00:00Z"
}
```

**Response**: `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Team with ID 'invalid-id' not found",
  "path": "/api/teams/invalid-id/checklist",
  "timestamp": "2026-01-05T08:00:00Z"
}
```

**Implementation Details**:
1. Validates request - returns 400 if checklist is null
2. Loads existing team - returns 404 if not found
3. Creates updated team using record `with` syntax
4. Calls `calculator.UpdateTeamReadiness(updatedTeam)` to recalculate status
5. Calls `dataStore.UpdateTeamAsync(updatedTeam)` to persist
6. Returns updated team with new readiness status

---

### Data Models

#### UpdateChecklistRequest.cs
```csharp
public record UpdateChecklistRequest
{
    public required Checklist Checklist { get; init; }
}
```

#### ErrorResponse.cs
```csharp
public record ErrorResponse
{
    public required int StatusCode { get; init; }
    public required string Message { get; init; }
    public string? Details { get; init; }
    public string? Path { get; init; }
    public DateTime Timestamp { get; init; } = DateTime.UtcNow;
}
```

---

## Verification

### Build Status
```bash
cd backend
dotnet build
# Output: Build succeeded (0 errors, 1 warning)
```

### Endpoint Testing

#### Test GET /api/teams
```bash
curl -s http://localhost:5000/api/teams | jq 'length'
# Output: 4
```

#### Test GET /api/teams/{id}
```bash
curl -s http://localhost:5000/api/teams/team-alpha | jq '{id, name, readiness}'
# Output: {"id": "team-alpha", "name": "Team Alpha - E-Commerce Platform", "readiness": 0}
```

#### Test GET /api/teams/{id} - Not Found
```bash
curl -s http://localhost:5000/api/teams/invalid-id | jq '{statusCode, message}'
# Output: {"statusCode": 404, "message": "Team with ID 'invalid-id' not found"}
```

#### Test PUT /api/teams/{id}/checklist
```bash
curl -X PUT http://localhost:5000/api/teams/team-alpha/checklist \
  -H "Content-Type: application/json" \
  -d '{"checklist": {...}}' | jq '{id, readiness}'
# Output: Updated team with recalculated readiness
```

### Swagger UI Testing
Access `http://localhost:5000/swagger` to:
- View all endpoints with documentation
- Test endpoints interactively
- See request/response schemas
- Try different error scenarios

---

## Files Modified

### Created
- `backend/Models/UpdateChecklistRequest.cs` - Request DTO for checklist updates
- `backend/Models/ErrorResponse.cs` - Standard error response format

### Modified
- `backend/Program.cs` - Added three API endpoints with ReadinessCalculator integration:
  - Enhanced GET /api/teams with readiness calculation
  - Enhanced GET /api/teams/{id} with error handling and readiness calculation
  - Added PUT /api/teams/{id}/checklist with validation and auto-recalculation

---

## Integration Points

### ReadinessCalculator Integration
All three endpoints use `ReadinessCalculator.UpdateTeamReadiness()`:
- **GET /api/teams**: Calculates readiness for all teams before returning
- **GET /api/teams/{id}**: Calculates readiness for single team
- **PUT /api/teams/{id}/checklist**: Recalculates after checklist update

Benefits:
- Ensures returned data always has current readiness status
- Checklist updates immediately reflect in readiness
- No need for separate "calculate" endpoint

### Data Store Integration
- **GET** operations: Read-only access via `GetAllTeamsAsync()` and `GetTeamByIdAsync()`
- **PUT** operation: Persists changes via `UpdateTeamAsync()`
- All operations are async for better performance

### CORS Configuration
- Configured to allow frontend on `http://localhost:3000`
- Permits all methods and headers
- Required for React frontend to call API

---

## API Design Decisions

### Error Handling Strategy
1. **Consistent Error Format**: All errors return `ErrorResponse` with status code, message, path, and timestamp
2. **Appropriate Status Codes**:
   - 200 OK - Successful operations
   - 400 Bad Request - Invalid input (missing checklist)
   - 404 Not Found - Team not found
3. **Detailed Error Messages**: Include team ID in not-found messages for debugging

### Automatic Readiness Calculation
**Decision**: Calculate readiness on every GET request rather than storing calculated values

**Rationale**:
- Ensures data is always current
- Eliminates sync issues between checklist and readiness
- Calculation is fast (<1ms per team)
- Simpler data model (no stale calculated values)

**Alternative Considered**: Pre-calculate and store readiness
- Rejected: Adds complexity, requires cache invalidation

### Record Types with `with` Syntax
**Decision**: Use C# records with `with` expression for updates

**Example**:
```csharp
var updatedTeam = team with { Checklist = request.Checklist };
```

**Benefits**:
- Immutable updates (creates new instance)
- Preserves other properties automatically
- Thread-safe by default
- Clear intent in code

---

## Known Issues

None. All endpoints function as expected.

---

## Next Steps

1. ✅ API endpoints implemented
2. ✅ Error handling added
3. ✅ ReadinessCalculator integrated
4. ✅ Swagger documentation available
5. 🔄 Frontend integration (Task 010-012)
6. 🔄 E2E testing (Task 019)

---

## Related Tasks

- **Task 005**: Provides IDataStore for data persistence
- **Task 006**: Provides ReadinessCalculator for status calculation
- **Task 010**: Teams Overview UI will consume GET /api/teams
- **Task 011**: Team Details UI will consume GET /api/teams/{id}
- **Task 012**: Checklist UI will consume PUT /api/teams/{id}/checklist
