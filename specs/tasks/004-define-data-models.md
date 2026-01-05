# Task 004: Define Data Models

**Status:** ✅ Complete  
**Phase:** 2 - Data Layer & Models  
**Estimated Time:** 1-2 hours  
**Actual Time:** ~1 hour

## Objective

Create comprehensive data models in both C# (backend) and TypeScript (frontend) to ensure type safety across the entire stack.

## Requirements

From `specs/IMPLEMENTATION_PLAN.md`:
- Create C# record types: Team, TechStack, Checklist, ChecklistItem, UpgradePlan, TestResult
- Create TypeScript interfaces matching C# models
- Add ReadinessStatus enum (Green, Yellow, Red)
- Verify: Models compile without errors

## Implementation

### 1. Backend Models (C# Records)

Created 8 model files in `backend/Models/`:

#### Core Domain Models

**ReadinessStatus.cs** - Enum defining team status levels
- `Red` - Less than 50% checklist completion
- `Yellow` - 50-89% checklist completion
- `Green` - 90%+ checklist completion

**Team.cs** - Primary domain entity
- Properties: Id, Name, Stack, Readiness, Checklist, Description
- Represents a development team with their complete readiness profile

**TechStack.cs** - Technology stack information
- Properties: Frontend, Backend, Database (optional)
- Examples: "React 16", ".NET 6", "PostgreSQL 15"

**Checklist.cs** - Organized readiness checklist
- Six categories: Codebase, Versioning, Documentation, Testing, Copilot, Modernization
- Helper methods:
  - `GetAllItems()` - Flattens all checklist items
  - `GetCompletionPercentage()` - Calculates overall progress

**ChecklistItem.cs** - Individual checklist entry
- Properties: Id, Description, IsComplete, Guidance
- Mutable `IsComplete` property for state updates

#### Supporting Models

**UpgradePlan.cs** - Technology upgrade guidance
- Properties: CurrentVersion, TargetVersion, Technology, Rationale, Steps, EstimatedEffort, CopilotRecommendations
- Provides step-by-step upgrade instructions with GitHub Copilot suggestions

**TeamUpgradePlan.cs** - Comprehensive team upgrade plan
- Properties: TeamId, TeamName, Frontend, Backend, Database, GeneralRecommendations
- Aggregates upgrade plans for entire technology stack

**TestResult.cs** - Automated test execution results
- Properties: Success, Timestamp, Logs, ScreenshotBase64, DurationMs, TestName, ErrorMessage
- Captures Playwright test execution outcomes

### 2. Frontend Models (TypeScript Interfaces)

Created unified type definition file: `frontend/src/types/models.ts`

#### Type Definitions

All TypeScript interfaces match C# models with property name casing converted to camelCase:
- `ReadinessStatus` enum (Red, Yellow, Green)
- `TechStack` interface
- `ChecklistItem` interface
- `Checklist` interface
- `Team` interface
- `UpgradePlan` interface
- `TeamUpgradePlan` interface
- `TestResult` interface

#### Helper Utilities

Added TypeScript helper functions for common operations:

```typescript
calculateCompletionPercentage(checklist: Checklist): number
getReadinessStatusFromPercentage(percentage: number): ReadinessStatus
getReadinessColor(status: ReadinessStatus): string
```

These utilities simplify client-side calculations and UI rendering.

### 3. Type Safety Alignment

**Property Mapping Convention:**
- C# uses PascalCase: `CurrentVersion`, `IsComplete`
- TypeScript uses camelCase: `currentVersion`, `isComplete`
- JSON serialization will handle automatic conversion

**Enum Synchronization:**
- Both use string-based `ReadinessStatus` enum
- Values: "Red", "Yellow", "Green"
- Ensures consistent serialization/deserialization

**Nullable Properties:**
- C# uses `?` suffix: `string? Database`
- TypeScript uses `?` prefix: `database?: string`
- Both indicate optional fields

## Verification

### Backend Compilation
```bash
cd backend && dotnet build
```
**Result:** ✅ Build succeeded in 7.7s
- All 8 model files compiled without errors
- No warnings or type issues

### Frontend Type Checking
```bash
cd frontend && npx tsc --noEmit --skipLibCheck src/types/models.ts
```
**Result:** ✅ TypeScript check complete with no errors

## Files Created

### Backend (`backend/Models/`)
1. `ReadinessStatus.cs` - Status enum (Red, Yellow, Green)
2. `TechStack.cs` - Technology stack record
3. `ChecklistItem.cs` - Individual checklist item record
4. `Checklist.cs` - Complete checklist with helper methods
5. `Team.cs` - Team domain entity
6. `UpgradePlan.cs` - Technology upgrade plan
7. `TeamUpgradePlan.cs` - Comprehensive team upgrade plan
8. `TestResult.cs` - Test execution result

### Frontend (`frontend/src/types/`)
1. `models.ts` - Complete TypeScript type definitions and helper utilities

## Design Decisions

### 1. C# Records vs Classes
**Decision:** Use C# records for immutability
- Records provide value-based equality
- Init-only properties prevent accidental mutations
- Cleaner syntax for DTOs
- Exception: `IsComplete` is mutable for state updates

### 2. Checklist Helper Methods
**Decision:** Add utility methods to `Checklist` model
- `GetAllItems()` simplifies iteration across categories
- `GetCompletionPercentage()` centralizes calculation logic
- Reduces code duplication in services

### 3. TypeScript Helpers
**Decision:** Include helper functions in models.ts
- `calculateCompletionPercentage` matches C# logic
- `getReadinessStatusFromPercentage` ensures consistent status calculation
- `getReadinessColor` simplifies UI styling

### 4. Additional Model: TeamUpgradePlan
**Decision:** Created aggregate model for complete upgrade plans
- Combines frontend, backend, database upgrade plans
- Provides holistic view of team modernization needs
- Matches API endpoint design (GET /api/teams/{id}/upgrade-plan)

## Quality Checklist

- ✅ All C# models compile without errors
- ✅ All TypeScript interfaces type-check correctly
- ✅ Comprehensive XML documentation on C# models
- ✅ TSDoc comments on TypeScript interfaces
- ✅ Property naming conventions followed (PascalCase C#, camelCase TS)
- ✅ Nullable properties correctly defined
- ✅ Enums synchronized across languages
- ✅ Helper methods documented and implemented
- ⚠️ Unit tests not yet written (will be added with services)

## Next Steps

Based on `specs/IMPLEMENTATION_PLAN.md`:

**Task 005:** Implement Data Store
- Create `IDataStore` interface
- Implement `JsonDataStore` with SemaphoreSlim locking
- Add seed data generation (2-4 teams)
- Configure dependency injection
- Verify data persistence

## Notes

- Models are designed to be serializable to JSON for both API responses and file storage
- `Checklist` model includes category-based organization matching PRD requirements
- `TestResult` includes screenshot support (Base64) for Playwright integration
- `UpgradePlan` includes GitHub Copilot recommendations as specified in PRD
- TypeScript helper functions reduce boilerplate in React components
- All models include comprehensive documentation for maintainability

## Dependencies

**Backend:**
- .NET 9 SDK (targeting .NET 8+ compatible)
- System.Text.Json (included in .NET)

**Frontend:**
- TypeScript type system (no runtime dependencies)
- Helper functions are pure TypeScript (no external libraries)
