# .NET Shell Configuration Guide

Configuration guide for EmeaAppGbb .NET shell baselines.

---

## Quick Start

### 1. Clone and Initialize

```bash
# Clone the shell
git clone https://github.com/EmeaAppGbb/shell-dotnet.git my-project
cd my-project

# Reset git history
rm -rf .git
git init
git add .
git commit -m "Initial commit from shell-dotnet"
```

### 2. Update Project Names

Update the following files with your project name:

**Solution File:**
```bash
mv Shell.sln MyProject.sln
```

**Project Files:**
- `src/Api/Api.csproj` → `src/Api/MyProject.Api.csproj`
- Update namespace in all `.cs` files

**Docker:**
- Update `Dockerfile` with new project paths
- Update `docker-compose.yml` service names

### 3. Configure Environment

Create `appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyProject;..."
  },
  "Logging": {
    "LogLevel": {
      "Default": "Debug"
    }
  }
}
```

## Environment Variables

### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `ASPNETCORE_ENVIRONMENT` | Runtime environment | Development |
| `ConnectionStrings__DefaultConnection` | Database connection | Server=... |

### Optional Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | App Insights | None |
| `AzureAd__TenantId` | Azure AD tenant | None |
| `AzureAd__ClientId` | Azure AD client | None |

## Database Configuration

### Local Development (Docker)

```yaml
# docker-compose.yml
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      SA_PASSWORD: "YourStrong@Password"
      ACCEPT_EULA: "Y"
    ports:
      - "1433:1433"
```

### Azure SQL

1. Create Azure SQL Database
2. Configure connection string in Key Vault
3. Use managed identity for authentication

```csharp
// Program.cs
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));
```

## Authentication Configuration

### Azure AD B2C

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "your-tenant-id",
    "ClientId": "your-client-id",
    "Scopes": "api://your-api/access"
  }
}
```

### JWT Configuration

```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
```

## Aspire Configuration

If using .NET Aspire for orchestration:

```csharp
// AppHost/Program.cs
var builder = DistributedApplication.CreateBuilder(args);

var sql = builder.AddSqlServer("sql")
    .AddDatabase("mydb");

var api = builder.AddProject<Projects.MyProject_Api>("api")
    .WithReference(sql);

builder.Build().Run();
```

## CI/CD Configuration

### GitHub Actions

Update `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'
      - run: dotnet restore
      - run: dotnet build --no-restore
      - run: dotnet test --no-build
```

## Running the Application

### Development

```bash
# With Docker Compose
docker-compose up -d

# Or directly
dotnet run --project src/Api
```

### With Aspire

```bash
dotnet run --project src/AppHost
```

## Next Steps

1. Install spec2cloud: `curl -sSL .../install.sh | sh`
2. Create PRD: Use `/prd` command
3. Generate AGENTS.md: Use `/generate-agents`
4. Start implementing features

---

*Last Updated: December 2024*
