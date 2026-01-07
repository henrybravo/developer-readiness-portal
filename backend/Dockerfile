# Backend Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy project files
COPY ["backend.csproj", "./"]
COPY ["HealthProbe/HealthProbe.csproj", "HealthProbe/"]

# Restore dependencies for both projects
RUN dotnet restore backend.csproj \
 && dotnet restore HealthProbe/HealthProbe.csproj

# Copy source code
COPY . .

# Build the application
RUN dotnet build backend.csproj -c Release -o /app/build

# Publish the application
RUN dotnet publish backend.csproj -c Release -o /app/publish \
 && dotnet publish HealthProbe/HealthProbe.csproj -c Release -o /app/healthprobe

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

# Copy published files
COPY --from=build /app/publish .
# Copy health probe
COPY --from=build /app/healthprobe /app/healthprobe

# Expose port
EXPOSE 5000

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Development

# Health check using C# probe
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
  CMD dotnet /app/healthprobe/HealthProbe.dll http://localhost:5000/health

ENTRYPOINT ["dotnet", "backend.dll"]
