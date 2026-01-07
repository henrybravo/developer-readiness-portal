using Backend.Data;
using Backend.Models;
using Backend.Services;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Configure JSON serialization to accept camelCase from frontend
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:4173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Services
builder.Services.AddSingleton<ReadinessCalculator>();

// Add Data Store
builder.Services.AddSingleton<IDataStore, JsonDataStore>();

// Add Health Checks
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

// Health check endpoint
app.MapHealthChecks("/health");

app.MapGet("/", () => new { 
    service = "Nefira Developer Readiness Portal API",
    version = "1.0.0",
    status = "running"
})
.WithName("GetRoot");

// Teams API endpoints
app.MapGet("/api/teams", async (IDataStore dataStore, ReadinessCalculator calculator) =>
{
    var teams = await dataStore.GetAllTeamsAsync();
    
    // Calculate current readiness for all teams
    foreach (var team in teams)
    {
        calculator.UpdateTeamReadiness(team);
    }
    
    return Results.Ok(teams);
})
.WithName("GetAllTeams")
.Produces<List<Team>>(StatusCodes.Status200OK);

app.MapGet("/api/teams/{id}", async (string id, IDataStore dataStore, ReadinessCalculator calculator) =>
{
    var team = await dataStore.GetTeamByIdAsync(id);
    
    if (team == null)
    {
        return Results.NotFound(new ErrorResponse
        {
            StatusCode = StatusCodes.Status404NotFound,
            Message = $"Team with ID '{id}' not found",
            Path = $"/api/teams/{id}"
        });
    }
    
    // Calculate current readiness
    calculator.UpdateTeamReadiness(team);
    
    return Results.Ok(team);
})
.WithName("GetTeamById")
.Produces<Team>(StatusCodes.Status200OK)
.Produces<ErrorResponse>(StatusCodes.Status404NotFound);

app.MapPut("/api/teams/{id}/checklist", async (
    string id,
    UpdateChecklistRequest request,
    IDataStore dataStore,
    ReadinessCalculator calculator) =>
{
    // Validate request
    if (request.Checklist == null)
    {
        return Results.BadRequest(new ErrorResponse
        {
            StatusCode = StatusCodes.Status400BadRequest,
            Message = "Checklist is required",
            Path = $"/api/teams/{id}/checklist"
        });
    }
    
    // Get existing team
    var team = await dataStore.GetTeamByIdAsync(id);
    if (team == null)
    {
        return Results.NotFound(new ErrorResponse
        {
            StatusCode = StatusCodes.Status404NotFound,
            Message = $"Team with ID '{id}' not found",
            Path = $"/api/teams/{id}/checklist"
        });
    }
    
    // Update checklist
    var updatedTeam = team with { Checklist = request.Checklist };
    
    // Recalculate readiness status
    calculator.UpdateTeamReadiness(updatedTeam);
    
    // Save updated team
    await dataStore.UpdateTeamAsync(updatedTeam);
    
    return Results.Ok(updatedTeam);
})
.WithName("UpdateTeamChecklist")
.Produces<Team>(StatusCodes.Status200OK)
.Produces<ErrorResponse>(StatusCodes.Status400BadRequest)
.Produces<ErrorResponse>(StatusCodes.Status404NotFound);

app.Run();
