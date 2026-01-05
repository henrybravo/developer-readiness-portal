# Technical Stack Standards

This document defines the canonical technical stack and implementation patterns for the Nefira Developer Readiness Portal.

---

## Overview

Nefira is built as a **lightweight, containerized web application** with clear separation between frontend, backend, and data layers. All components run in Docker containers orchestrated by docker-compose for simple local deployment and demonstration.

**Design Principles:**
- ✅ Simplicity first—avoid unnecessary complexity
- ✅ Containerized—everything runs in Docker
- ✅ Self-contained—no external cloud dependencies
- ✅ Demo-ready—fast startup, reliable operation
- ✅ Type-safe—strong typing across the stack

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    docker-compose                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Frontend   │  │   Backend    │  │     Data     │ │
│  │              │  │              │  │              │ │
│  │    React     │→ │  .NET API    │→ │ JSON / Redis │ │
│  │              │  │              │  │              │ │
│  │  Port: 3000  │  │  Port: 5000  │  │  Port: 6379  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
         ↓
    localhost:3000 (User Access)
```

---

## Frontend Stack

### Framework: React 18+

**Build Tool:**
- Vite (recommended for fast development)
- Alternative: Create React App (CRA)

**Language:**
- JavaScript or TypeScript
- TypeScript strongly recommended for type safety

**Key Libraries:**
```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x"
}
```

**Optional UI Libraries:**
- Tailwind CSS (recommended for rapid styling)
- Or simple CSS modules
- No heavy component libraries required

### Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ReadinessIndicator.jsx
│   │   ├── ChecklistSection.jsx
│   │   ├── UpgradePlanCard.jsx
│   │   └── TestRunnerCard.jsx
│   ├── pages/            # Route-level pages
│   │   ├── TeamsOverview.jsx
│   │   └── TeamDetails.jsx
│   ├── services/         # API client layer
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── Dockerfile
└── package.json
```

### State Management

**Keep it simple:**
- Use React `useState` and `useEffect` for local state
- Props drilling is acceptable for this small app
- Context API if absolutely needed for shared state
- **Do NOT use** Redux, Zustand, or other state management libraries unless explicitly required

### API Communication

**Pattern: Centralized API Service**

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const teamsApi = {
  getAll: () => apiClient.get('/teams'),
  getById: (id) => apiClient.get(`/teams/${id}`),
  updateChecklist: (id, checklist) => apiClient.put(`/teams/${id}/checklist`, checklist)
};

export const upgradeApi = {
  getUpgradePlan: (id) => apiClient.get(`/teams/${id}/upgrade-plan`)
};

export const testApi = {
  runTests: () => apiClient.post('/test-run'),
  getResults: () => apiClient.get('/test-results')
};
```

### Routing

**Use React Router v6:**

```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeamsOverview />} />
        <Route path="/teams/:id" element={<TeamDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Error Handling

**Pattern: Consistent error display**

```javascript
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  teamsApi.getAll()
    .then(response => setTeams(response.data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);

// Display error to user
{error && <div className="error-message">{error}</div>}
{loading && <div className="loading-spinner">Loading...</div>}
```

### Styling Approach

**Option 1: Tailwind CSS (Recommended)**
- Utility-first CSS framework
- Fast development
- Small bundle size with PurgeCSS

**Option 2: CSS Modules**
- Component-scoped styles
- No naming conflicts
- Simple and predictable

**Do NOT use:**
- Heavy UI frameworks (Material-UI, Ant Design)
- CSS-in-JS libraries (styled-components, emotion) unless specifically needed

---

## Backend Stack

### Framework: .NET 8+ with C#

**Project Type:**
- ASP.NET Core Web API
- Minimal APIs or Controller-based APIs (both acceptable)

**Language:**
- C# 12+

**Key Packages:**
```xml
<PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.*" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.*" />
<PackageReference Include="System.Text.Json" Version="8.0.*" />
<PackageReference Include="StackExchange.Redis" Version="2.7.*" />
```

### Project Structure

```
backend/
├── Controllers/          # API controllers (if using controller pattern)
│   ├── TeamsController.cs
│   ├── UpgradeController.cs
│   └── TestController.cs
├── Services/            # Business logic layer
│   ├── ITeamService.cs
│   ├── TeamService.cs
│   ├── ReadinessCalculator.cs
│   └── UpgradePlanService.cs
├── Models/              # Data models and DTOs
│   ├── Team.cs
│   ├── ChecklistItem.cs
│   ├── UpgradePlan.cs
│   └── TestResult.cs
├── Data/                # Data access layer
│   ├── IDataStore.cs
│   ├── JsonDataStore.cs
│   └── RedisDataStore.cs
├── Program.cs
├── Dockerfile
└── backend.csproj
```

### API Pattern: Minimal APIs (Recommended)

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddCors();
builder.Services.AddSingleton<IDataStore, JsonDataStore>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure CORS for frontend
app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseSwagger();
app.UseSwaggerUI();

// Define endpoints
app.MapGet("/api/teams", async (ITeamService teamService) =>
{
    var teams = await teamService.GetAllTeamsAsync();
    return Results.Ok(teams);
});

app.MapGet("/api/teams/{id}", async (string id, ITeamService teamService) =>
{
    var team = await teamService.GetTeamByIdAsync(id);
    return team is not null ? Results.Ok(team) : Results.NotFound();
});

app.MapPut("/api/teams/{id}/checklist", async (string id, Checklist checklist, ITeamService teamService) =>
{
    await teamService.UpdateChecklistAsync(id, checklist);
    return Results.NoContent();
});

app.Run();
```

### Alternative: Controller Pattern

```csharp
[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly ITeamService _teamService;

    public TeamsController(ITeamService teamService)
    {
        _teamService = teamService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Team>>> GetAllTeams()
    {
        var teams = await _teamService.GetAllTeamsAsync();
        return Ok(teams);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> GetTeam(string id)
    {
        var team = await _teamService.GetTeamByIdAsync(id);
        if (team == null) return NotFound();
        return Ok(team);
    }

    [HttpPut("{id}/checklist")]
    public async Task<IActionResult> UpdateChecklist(string id, [FromBody] Checklist checklist)
    {
        await _teamService.UpdateChecklistAsync(id, checklist);
        return NoContent();
    }
}
```

### Error Handling

**Pattern: Global exception handler**

```csharp
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var error = context.Features.Get<IExceptionHandlerFeature>();
        if (error != null)
        {
            var errorResponse = new
            {
                message = "An error occurred processing your request",
                details = error.Error.Message
            };
            
            await context.Response.WriteAsJsonAsync(errorResponse);
        }
    });
});
```

### Service Layer Pattern

```csharp
public interface ITeamService
{
    Task<IEnumerable<Team>> GetAllTeamsAsync();
    Task<Team?> GetTeamByIdAsync(string id);
    Task UpdateChecklistAsync(string id, Checklist checklist);
    Task<ReadinessStatus> CalculateReadinessAsync(string id);
}

public class TeamService : ITeamService
{
    private readonly IDataStore _dataStore;
    private readonly ReadinessCalculator _readinessCalculator;

    public TeamService(IDataStore dataStore, ReadinessCalculator readinessCalculator)
    {
        _dataStore = dataStore;
        _readinessCalculator = readinessCalculator;
    }

    public async Task<IEnumerable<Team>> GetAllTeamsAsync()
    {
        return await _dataStore.GetAllTeamsAsync();
    }

    public async Task UpdateChecklistAsync(string id, Checklist checklist)
    {
        var team = await _dataStore.GetTeamByIdAsync(id);
        if (team == null) throw new NotFoundException($"Team {id} not found");
        
        team.Checklist = checklist;
        team.Readiness = _readinessCalculator.Calculate(checklist);
        
        await _dataStore.UpdateTeamAsync(team);
    }
}
```

---

## Data Persistence

### Option 1: JSON Files (Default/Simplest)

**Storage Location:** `/data/teams.json` (mounted volume)

**Implementation:**

```csharp
public class JsonDataStore : IDataStore
{
    private readonly string _dataFilePath;
    private readonly SemaphoreSlim _fileLock = new(1, 1);

    public JsonDataStore(IConfiguration configuration)
    {
        _dataFilePath = configuration["DataPath"] ?? "/data/teams.json";
        EnsureDataFileExists();
    }

    public async Task<IEnumerable<Team>> GetAllTeamsAsync()
    {
        await _fileLock.WaitAsync();
        try
        {
            var json = await File.ReadAllTextAsync(_dataFilePath);
            return JsonSerializer.Deserialize<List<Team>>(json) ?? new List<Team>();
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
            
            var json = JsonSerializer.Serialize(teams, new JsonSerializerOptions 
            { 
                WriteIndented = true 
            });
            await File.WriteAllTextAsync(_dataFilePath, json);
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
            var json = JsonSerializer.Serialize(seedData, new JsonSerializerOptions 
            { 
                WriteIndented = true 
            });
            File.WriteAllText(_dataFilePath, json);
        }
    }
}
```

### Option 2: Redis (Alternative)

**When to use:** If you need faster concurrent access or want to demonstrate Redis usage.

**Implementation:**

```csharp
public class RedisDataStore : IDataStore
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _db;
    private const string TeamsKey = "teams";

    public RedisDataStore(IConnectionMultiplexer redis)
    {
        _redis = redis;
        _db = _redis.GetDatabase();
        EnsureSeedData();
    }

    public async Task<IEnumerable<Team>> GetAllTeamsAsync()
    {
        var json = await _db.StringGetAsync(TeamsKey);
        if (json.IsNullOrEmpty) return new List<Team>();
        return JsonSerializer.Deserialize<List<Team>>(json!) ?? new List<Team>();
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

**Dependency Injection Setup:**

```csharp
// For JSON (default)
builder.Services.AddSingleton<IDataStore, JsonDataStore>();

// For Redis (alternative)
builder.Services.AddSingleton<IConnectionMultiplexer>(
    ConnectionMultiplexer.Connect(builder.Configuration["Redis:ConnectionString"]));
builder.Services.AddSingleton<IDataStore, RedisDataStore>();
```

---

## Data Models

### Core Models

```csharp
public record Team
{
    public string Id { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public TechStack Stack { get; init; } = new();
    public ReadinessStatus Readiness { get; set; } = ReadinessStatus.Red;
    public Checklist Checklist { get; init; } = new();
}

public record TechStack
{
    public string Frontend { get; init; } = string.Empty;
    public string Backend { get; init; } = string.Empty;
}

public enum ReadinessStatus
{
    Red,
    Yellow,
    Green
}

public record Checklist
{
    public List<ChecklistItem> Codebase { get; init; } = new();
    public List<ChecklistItem> Versioning { get; init; } = new();
    public List<ChecklistItem> Documentation { get; init; } = new();
    public List<ChecklistItem> Testing { get; init; } = new();
    public List<ChecklistItem> Copilot { get; init; } = new();
    public List<ChecklistItem> Modernization { get; init; } = new();
}

public record ChecklistItem
{
    public string Id { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public bool IsComplete { get; set; }
    public string? Guidance { get; init; }
}

public record UpgradePlan
{
    public string CurrentVersion { get; init; } = string.Empty;
    public string TargetVersion { get; init; } = string.Empty;
    public List<string> Steps { get; init; } = new();
}

public record TestResult
{
    public bool Success { get; init; }
    public string Logs { get; init; } = string.Empty;
    public string? ScreenshotBase64 { get; init; }
}
```

---

## Containerization

### Docker Compose Structure

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
    depends_on:
      - backend
    networks:
      - nefira-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - DataStore=Json
      - DataPath=/data/teams.json
    volumes:
      - ./data:/data
    networks:
      - nefira-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - nefira-network
    # Only include if using Redis instead of JSON

networks:
  nefira-network:
    driver: bridge

volumes:
  data:
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["backend.csproj", "./"]
RUN dotnet restore

COPY . .
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "backend.dll"]
```

---

## Testing Strategy

### Playwright UI Tests

**Location:** `/tests/ui/`

**Framework:** Playwright with TypeScript

**GitHub Actions Workflow:**

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Start application
        run: docker-compose up -d
      
      - name: Wait for application
        run: |
          timeout 60 bash -c 'until curl -f http://localhost:3000; do sleep 2; done'
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install Playwright
        run: |
          cd tests/ui
          npm ci
          npx playwright install --with-deps
      
      - name: Run Playwright tests
        run: |
          cd tests/ui
          npx playwright test
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-results
          path: tests/ui/playwright-report/
      
      - name: Shutdown application
        if: always()
        run: docker-compose down
```

**Sample Playwright Test:**

```typescript
// tests/ui/teams-overview.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Teams Overview', () => {
  test('should display teams dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Nefira');
    
    // Check teams are listed
    const teams = page.locator('[data-testid="team-card"]');
    await expect(teams).toHaveCountGreaterThan(0);
    
    // Check status indicators exist
    const statusIndicators = page.locator('[data-testid="status-indicator"]');
    await expect(statusIndicators.first()).toBeVisible();
  });

  test('should navigate to team details', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Click first team
    await page.locator('[data-testid="team-card"]').first().click();
    
    // Verify on team details page
    await expect(page).toHaveURL(/\/teams\/.+/);
    await expect(page.locator('[data-testid="checklist"]')).toBeVisible();
  });

  test('should toggle checklist items', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('[data-testid="team-card"]').first().click();
    
    // Find and toggle a checklist item
    const checklistItem = page.locator('[data-testid="checklist-item"]').first();
    await checklistItem.click();
    
    // Verify item is checked
    await expect(checklistItem.locator('input[type="checkbox"]')).toBeChecked();
  });
});
```

---

## Development Workflow

### Getting Started

```bash
# Clone repository
git clone <repository-url>
cd developer-readiness-portal

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/swagger
# Redis (if enabled): localhost:6379
```

### Local Development (Without Docker)

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
dotnet restore
dotnet run
```

### Code Quality Standards

**C# Backend:**
- Follow Microsoft C# coding conventions
- Use nullable reference types
- Use record types for DTOs and immutable models
- Async/await for all I/O operations
- Dependency injection for all services

**React Frontend:**
- Functional components only (no class components)
- Custom hooks for reusable logic
- PropTypes or TypeScript for type safety
- Clear component naming (PascalCase)
- Small, focused components

---

## MCP Integration (Playwright)

The application integrates with a local MCP (Model Context Protocol) server for Playwright test execution.

**Backend Endpoint:**

```csharp
app.MapPost("/api/test-run", async (IPlaywrightService playwrightService) =>
{
    var result = await playwrightService.RunTestsAsync();
    return Results.Ok(result);
});
```

**Playwright Service:**

```csharp
public class PlaywrightService : IPlaywrightService
{
    private readonly HttpClient _mcpClient;

    public PlaywrightService(IHttpClientFactory httpClientFactory)
    {
        _mcpClient = httpClientFactory.CreateClient("MCP");
    }

    public async Task<TestResult> RunTestsAsync()
    {
        try
        {
            // Call local MCP server
            var response = await _mcpClient.PostAsync("/run-test", null);
            response.EnsureSuccessStatusCode();
            
            var result = await response.Content.ReadFromJsonAsync<TestResult>();
            return result ?? new TestResult { Success = false, Logs = "No response from MCP" };
        }
        catch (Exception ex)
        {
            return new TestResult 
            { 
                Success = false, 
                Logs = $"Error: {ex.Message}" 
            };
        }
    }
}
```

---

## Configuration Management

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MCP_ENABLED=true
```

### Backend (appsettings.json)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "DataStore": "Json",
  "DataPath": "/data/teams.json",
  "Redis": {
    "ConnectionString": "redis:6379"
  },
  "MCP": {
    "BaseUrl": "http://localhost:8080"
  }
}
```

---

## Summary Checklist

When implementing features, ensure:

- [ ] Frontend uses React with functional components
- [ ] Backend uses .NET 8+ with C#
- [ ] API follows RESTful conventions
- [ ] Data stored in JSON files or Redis (not both initially)
- [ ] All components containerized with Dockerfiles
- [ ] docker-compose orchestrates all services
- [ ] GitHub Actions workflow for Playwright tests
- [ ] Error handling implemented consistently
- [ ] Loading states shown during async operations
- [ ] Code follows established patterns in this document
- [ ] Tests written for critical paths

---

**This document is the canonical source for all technical decisions. When in doubt, refer to this standard.**
