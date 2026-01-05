# Task 006: Implement Readiness Calculator

**Status**: ✅ Completed  
**Assigned to**: Developer Agent  
**Priority**: High  
**Dependencies**: Task 004 (Data Models), Task 005 (Data Store)

## Objective

Implement the ReadinessCalculator service that calculates team and category readiness status based on checklist completion percentages.

## Requirements

### Functional Requirements
1. Calculate team-level readiness status from checklist
2. Calculate category-level readiness status for each category
3. Apply status thresholds:
   - **Green**: ≥90% completion
   - **Yellow**: 50-89% completion  
   - **Red**: <50% completion
4. Aggregate category statuses into team status
5. Update team readiness field with calculated status

### Technical Requirements
1. Create `ReadinessCalculator` service class
2. Implement public methods for status calculation
3. Write comprehensive unit tests (≥85% coverage)
4. Register service in dependency injection container
5. Follow TDD principles

## Implementation

### Service: ReadinessCalculator.cs

**Location**: `/workspaces/developer-readiness-portal/backend/Services/ReadinessCalculator.cs`

**Public Methods**:
- `CalculateTeamStatus(Checklist checklist)` - Calculates overall team status
- `CalculateCategoryStatus(List<ChecklistItem> items)` - Calculates status for a category
- `CalculateCategoryStatuses(Checklist checklist)` - Returns status for all 6 categories
- `CalculateCompletionPercentage(Checklist checklist)` - Returns overall completion %
- `CalculateCategoryPercentage(List<ChecklistItem> items)` - Returns category completion %
- `UpdateTeamReadiness(Team team)` - Updates team's readiness field
- `UpdateTeamReadiness(List<Team> teams)` - Bulk update for multiple teams
- `GetStatusFromPercentage(double percentage)` - Converts percentage to status enum

**Private Methods**:
- `CalculatePercentage(List<ChecklistItem> items)` - Helper for percentage calculation

### Tests: ReadinessCalculatorTests.cs

**Location**: `/workspaces/developer-readiness-portal/backend/Tests/ReadinessCalculatorTests.cs`

**Test Coverage** (19 tests, 100% pass rate):

#### Team Status Tests (8 tests)
- ✅ All items complete → Green
- ✅ Exactly 90% complete → Green  
- ✅ 89% complete → Yellow
- ✅ Exactly 50% complete → Yellow
- ✅ 49% complete → Red
- ✅ No items complete → Red
- ✅ Mixed completion → Status calculated correctly
- ✅ Empty checklist → Red

#### Category Status Tests (4 tests)
- ✅ All category items complete → Green
- ✅ Partial category completion → Yellow
- ✅ Low category completion → Red
- ✅ Empty category → Red

#### Percentage Calculation Tests (3 tests)
- ✅ Calculate completion percentage correctly
- ✅ Calculate category percentage correctly
- ✅ Handle zero items edge case

#### Category Statuses Tests (2 tests)
- ✅ Return all 6 category statuses
- ✅ Calculate each category correctly

#### Team Readiness Update Tests (2 tests)
- ✅ Update single team readiness field
- ✅ Bulk update multiple teams

### Dependency Injection

**File**: `/workspaces/developer-readiness-portal/backend/Program.cs`

```csharp
builder.Services.AddSingleton<ReadinessCalculator>();
```

## Verification

### Test Results
```
Test summary: total: 19, failed: 0, succeeded: 19, skipped: 0
Build succeeded with 1 warning(s) in 8.7s
```

### Status Calculation Logic
The implementation correctly applies the business rules:
- Percentage ≥ 90.0 → Green
- Percentage ≥ 50.0 and < 90.0 → Yellow  
- Percentage < 50.0 → Red

### Edge Cases Handled
- Empty checklists (0 items)
- Null item lists
- Mixed completion scenarios
- Boundary conditions (exactly 50%, exactly 90%)

## Files Modified

### Created
- `backend/Services/ReadinessCalculator.cs` (128 lines)
- `backend/Tests/ReadinessCalculatorTests.cs` (330+ lines)

### Modified
- `backend/Program.cs` - Added ReadinessCalculator to DI
- `backend/backend.csproj` - Added xUnit packages and coverlet.collector

## Dependencies Added

```xml
<PackageReference Include="xunit" Version="2.9.3" />
<PackageReference Include="xunit.runner.visualstudio" Version="3.1.5" />
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="18.0.1" />
<PackageReference Include="coverlet.collector" Version="6.0.4" />
```

## Testing Instructions

```bash
# Run all tests
cd backend
dotnet test --verbosity normal

# Run with coverage
dotnet test --collect:"XPlat Code Coverage" --results-directory ./TestResults

# Run specific test class
dotnet test --filter "FullyQualifiedName~ReadinessCalculatorTests"
```

## Known Issues

None. All tests pass successfully.

## Next Steps

1. ✅ Service implementation complete
2. ✅ Unit tests complete (19 tests, 100% pass)
3. ✅ DI registration complete
4. 🔄 Integration with JsonDataStore (Task 007)
5. 🔄 API endpoints to use ReadinessCalculator (Task 007)

## Related Tasks

- **Task 004**: Provides data models (Team, Checklist, ReadinessStatus)
- **Task 005**: Provides JsonDataStore for persistence
- **Task 007**: Will use ReadinessCalculator in API endpoints
