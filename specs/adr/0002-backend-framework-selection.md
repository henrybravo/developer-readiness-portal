# 0002 Backend Framework Selection

**Date**: 2025-12-30  
**Status**: Accepted

## Context

The Nefira Developer Readiness Portal requires a backend API to serve team data, manage checklists, provide upgrade plans, and integrate with the Playwright MCP server. The backend must:
- Expose REST API endpoints for teams, checklists, upgrade plans, and tests
- Support lightweight data persistence (JSON or Redis)
- Run in Docker containers
- Handle concurrent checklist updates safely
- Integrate with local MCP server via HTTP
- Be simple to implement within 2-4 week timeline

Per PRD constraints, the backend must use **C# with .NET** and avoid Azure dependencies.

## Decision Drivers

- **Mandate**: C# with .NET (specified in PRD technical constraints)
- **Simplicity**: Minimal boilerplate for a simple CRUD API
- **Performance**: API responses under 2 seconds
- **Containerization**: Must run efficiently in Docker
- **Development Speed**: Support rapid implementation (2-4 weeks)
- **Type Safety**: Strong typing to reduce runtime errors
- **API Documentation**: Built-in OpenAPI/Swagger support
- **Team Skills**: Likely familiar with .NET ecosystem

## Considered Options

### Option 1: .NET 8 Minimal APIs
**Description**: Lightweight approach introduced in .NET 6, refined in .NET 8, using top-level statements and endpoint routing without controller classes.

**Pros**:
- **Minimal boilerplate** - Entire API can be defined in Program.cs
- **Fast to develop** - Less code to write and maintain
- **High performance** - Direct endpoint routing without controller overhead
- **Modern approach** - Aligns with current .NET best practices
- **Built-in OpenAPI** - Swagger UI with minimal configuration
- **Easy dependency injection** - Services injected directly into route handlers
- **Perfect for simple APIs** - Designed exactly for this use case
- **Smaller container image** - Less framework code to package
- **Latest .NET features** - Record types, pattern matching, global usings

**Cons**:
- **Less structure** - Can become messy if not organized well
- **Newer pattern** - Some developers may be more familiar with controllers
- **Limited middleware** - Some controller features not available (minimal impact for simple API)
- **Testing patterns** - Slightly different testing approach than controllers

### Option 2: .NET 8 Controller-Based API
**Description**: Traditional MVC pattern with controller classes, action methods, and attribute-based routing.

**Pros**:
- **Familiar pattern** - Traditional approach most .NET developers know
- **Clear structure** - Controllers, actions, and attributes provide organization
- **Rich middleware** - Full access to MVC filter pipeline
- **Mature testing** - Well-established testing patterns
- **Better for large APIs** - Scales well to 100+ endpoints
- **Attribute routing** - Declarative routing with attributes

**Cons**:
- **More boilerplate** - Controller classes, action methods, more attributes
- **Slower development** - More code to write for simple CRUD operations
- **Overhead** - MVC pipeline adds latency (minimal but measurable)
- **Overkill** - Too much structure for 6-8 endpoints
- **Larger footprint** - More framework code in container

### Option 3: ASP.NET Core Web API with CQRS Pattern
**Description**: Structured approach using Command Query Responsibility Segregation with MediatR library.

**Pros**:
- **Clear separation** - Commands and queries are separate concerns
- **Testability** - Each handler is independently testable
- **Scalability** - Patterns work well for complex domains
- **Maintainability** - Changes are localized to handlers

**Cons**:
- **Extreme overkill** - CQRS is for complex domains, not simple CRUD
- **Slow development** - Significant boilerplate for each operation
- **Additional dependencies** - MediatR and related libraries
- **Complexity** - Learning curve and mental overhead
- **Not justified** - Simple app with 2-4 teams doesn't need this

## Decision Outcome

**Chosen Option**: .NET 8 Minimal APIs

**Rationale**:
1. **Perfect fit for simple APIs** - Minimal APIs are designed exactly for this use case: lightweight REST APIs with few endpoints
2. **Development speed** - Minimal boilerplate enables rapid development aligned with 2-4 week timeline
3. **Modern .NET best practice** - Microsoft recommends Minimal APIs for new lightweight services
4. **Simplicity-first alignment** - Avoids unnecessary framework complexity
5. **Container optimization** - Smaller codebase results in faster builds and smaller images
6. **Performance** - Direct routing is faster than controller pipeline (though difference is negligible for our scale)
7. **Easy to refactor** - Can migrate to controllers later if complexity grows (unlikely for a demo app)

For a demo-focused application with 6-8 endpoints and 2-4 teams, Minimal APIs provide exactly the right level of abstraction.

## Consequences

### Positive
- **Faster implementation** - Less boilerplate means features are implemented quicker
- **Easier to understand** - Entire API surface visible in Program.cs or organized by feature
- **Better developer experience** - Less context switching between files
- **Modern codebase** - Uses latest .NET 8 features and patterns
- **Optimal performance** - Direct endpoint routing with no controller overhead
- **Smaller container** - Less code to package and deploy
- **Easy onboarding** - New developers can quickly understand the entire API

### Negative
- **Organization discipline required** - Must proactively organize endpoints into logical groups to avoid a massive Program.cs
- **Less familiar to some** - Developers used to controllers may need to adapt
- **Testing patterns differ** - Integration tests are more common than unit testing individual endpoints
- **Limited built-in validation** - Need to add manual validation or use libraries like FluentValidation

### Neutral
- Can still use dependency injection, middleware, and most .NET features
- Swagger/OpenAPI works identically to controller-based APIs
- Migration path to controllers exists if needed (unlikely)

## Implementation Notes

### Recommended Structure
```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IDataStore, JsonDataStore>();
builder.Services.AddScoped<ITeamService, TeamService>();

var app = builder.Build();

app.UseCors(/* ... */);
app.UseSwagger();
app.UseSwaggerUI();

// Define endpoints by feature
app.MapTeamEndpoints();
app.MapUpgradeEndpoints();
app.MapTestEndpoints();

app.Run();
```

### Endpoint Organization Pattern
Create extension methods to organize endpoints by feature:

```csharp
// Endpoints/TeamEndpoints.cs
public static class TeamEndpoints
{
    public static void MapTeamEndpoints(this WebApplication app)
    {
        app.MapGet("/api/teams", async (ITeamService service) => 
            await service.GetAllTeamsAsync());
            
        app.MapGet("/api/teams/{id}", async (string id, ITeamService service) =>
            await service.GetTeamByIdAsync(id));
            
        app.MapPut("/api/teams/{id}/checklist", async (string id, Checklist data, ITeamService service) =>
            await service.UpdateChecklistAsync(id, data));
    }
}
```

### Service Layer Pattern
Keep business logic in services, not endpoints:
- `ITeamService` / `TeamService` - Team CRUD and readiness calculation
- `IUpgradePlanService` / `UpgradePlanService` - Upgrade plan generation
- `IPlaywrightService` / `PlaywrightService` - MCP integration
- `IDataStore` / `JsonDataStore` or `RedisDataStore` - Data persistence

### Key Packages
```xml
<PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.*" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.*" />
<PackageReference Include="System.Text.Json" Version="8.0.*" />
```

### Error Handling
Use global exception handler middleware:
```csharp
app.UseExceptionHandler(/* custom error response */);
```

### CORS Configuration
Enable CORS for frontend access:
```csharp
app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
```

## References

- [PRD Section 6: Technical Stack Constraints](../prd.md#technical-stack-constraints)
- [PRD Section 11: API Requirements](../prd.md#api-requirements)
- [Technical Stack: Backend](../../docs/technical-stack.md#backend-stack)
- [Microsoft: Minimal APIs Overview](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis)
- [Microsoft: Minimal APIs vs Controllers](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/min-api-vs-controller)
