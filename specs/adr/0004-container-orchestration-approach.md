# 0004 Container Orchestration Approach

**Date**: 2025-12-30  
**Status**: Accepted

## Context

The Nefira Developer Readiness Portal must be deployed as containerized services that can start with a single command. The application consists of:
- Frontend (React)
- Backend (.NET API)
- Data storage (JSON file or optional Redis)
- Playwright MCP server (external, not managed)

Per PRD requirements:
- Must run via Docker containers
- Single command startup (< 5 minute setup time)
- All containers healthy within 60 seconds
- Must work on Windows, macOS, and Linux
- No cloud dependencies

## Decision Drivers

- **Mandate**: Docker containers with docker-compose (per PRD)
- **Simplicity**: Single command to start all services
- **Startup Time**: All services healthy within 60 seconds
- **Cross-Platform**: Must work on Windows, macOS, Linux
- **Demo Reliability**: Predictable startup order and health checks
- **Developer Experience**: Easy local development workflow
- **No Cloud**: Fully local deployment only
- **Maintenance**: Minimal orchestration complexity

## Considered Options

### Option 1: Docker Compose
**Description**: Use docker-compose.yml to define and orchestrate all services with dependency management and health checks.

**Pros**:
- **Industry standard** - Most common local multi-container tool
- **Simple YAML config** - Easy to read and maintain
- **Single command** - `docker-compose up` starts everything
- **Built-in networking** - Services communicate via service names
- **Health checks** - Native support for service health monitoring
- **Dependency management** - `depends_on` with health check conditions
- **Volume management** - Easy volume mounts for data persistence
- **Cross-platform** - Works identically on all platforms
- **No installation** - Included with Docker Desktop
- **Great DX** - `docker-compose logs -f` for debugging
- **Perfect for demos** - Reliable and predictable

**Cons**:
- **Not for production** - Compose is dev/test tool, not production orchestrator
- **Single host only** - No multi-host deployment (not needed)
- **Limited scaling** - Can't scale across machines (not needed)
- **Basic networking** - No advanced service mesh features (not needed)

### Option 2: Kubernetes (Minikube or Kind)
**Description**: Use local Kubernetes cluster with deployment manifests.

**Pros**:
- **Production-like** - Same orchestrator as cloud deployments
- **Advanced features** - Service mesh, ingress, secrets management
- **Scaling** - Horizontal pod autoscaling available
- **Industry standard** - Widely used in enterprise

**Cons**:
- **Massive overkill** - Kubernetes for 2 containers is absurd
- **Complex setup** - Requires Minikube/Kind installation
- **Slow startup** - Cluster startup adds 30+ seconds
- **Resource heavy** - 2GB+ RAM for control plane
- **Steep learning curve** - YAML manifests are complex
- **Fragile demos** - More components means more failure points
- **Against simplicity** - Violates simplicity-first principle
- **Against requirements** - PRD specifies docker-compose, not K8s

### Option 3: Podman with Pods
**Description**: Use Podman pods to group containers with pod specification.

**Pros**:
- **Rootless** - Better security than Docker
- **Daemonless** - No background daemon required
- **OCI compliant** - Standard container runtime
- **Pod concept** - Similar to Kubernetes pods
- **Compose support** - Can use docker-compose.yml with podman-compose

**Cons**:
- **Less common** - Fewer developers have Podman installed
- **Compatibility issues** - Not 100% Docker-compatible
- **Smaller ecosystem** - Less tooling and documentation
- **Extra installation** - Users must install Podman separately
- **Podman Compose immature** - Less stable than docker-compose
- **Risk for demos** - Lower adoption means higher risk of user issues

## Decision Outcome

**Chosen Option**: Docker Compose

**Rationale**:
1. **Explicit requirement** - PRD mandates "orchestrated with docker-compose"
2. **Perfect fit** - Docker Compose is designed exactly for this use case: local multi-container development
3. **Ubiquitous** - Included with Docker Desktop; everyone has it
4. **Simplicity alignment** - Minimal configuration, maximum functionality
5. **Demo reliability** - Well-tested, predictable, reliable
6. **Developer experience** - `docker-compose up` is the industry standard for local development
7. **Cross-platform** - Works identically on Windows, macOS, Linux
8. **Meets requirements** - Easily achieves < 60 second startup time

Kubernetes would be engineering malpractice for a 2-container demo app. Docker Compose is the obvious and only reasonable choice.

## Consequences

### Positive
- **Zero learning curve** - Developers already know docker-compose
- **Fast startup** - Services start in parallel with health checks
- **Easy debugging** - `docker-compose logs` shows all service logs
- **Simple updates** - Edit docker-compose.yml and restart
- **Network isolation** - Services communicate via private network
- **Volume management** - Data persists across restarts
- **Single source of truth** - docker-compose.yml documents entire stack
- **Great developer experience** - Start/stop/rebuild with simple commands

### Negative
- **Dev tool only** - Cannot use for cloud deployment (acceptable - out of scope)
- **Single host** - No multi-machine deployment (not needed)
- **Limited monitoring** - No built-in observability (not needed for demos)

### Neutral
- Can migrate to Kubernetes later if cloud deployment becomes a requirement (unlikely for demo app)
- Compose files can be converted to K8s manifests with tools like Kompose if needed

## Implementation Notes

### Docker Compose Structure

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - nefira-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 20s

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:5000
      - DataStore=Json
      - DataPath=/data/teams.json
    volumes:
      - ./data:/data
    networks:
      - nefira-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 10s

  # Optional: Only include if using Redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - nefira-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
      start_period: 5s

networks:
  nefira-network:
    driver: bridge

volumes:
  data:
```

### Health Check Endpoints

**Backend must expose health endpoint:**
```csharp
// Program.cs
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));
```

### Service Startup Order

With health checks, services start in correct order automatically:
1. **Redis** (if used) - healthiest first (~5 seconds)
2. **Backend** - waits for dependencies (~15 seconds)
3. **Frontend** - waits for backend (~25 seconds)
4. **Total**: ~30-40 seconds to full health

### Usage Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up --build -d

# View service status
docker-compose ps

# Stop and remove volumes (fresh start)
docker-compose down -v
```

### Environment-Specific Overrides

```bash
# Development
docker-compose up

# Development with override
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# CI/CD (no ports, just health checks)
docker-compose -f docker-compose.yml -f docker-compose.ci.yml up --exit-code-from tests
```

### Makefile for Convenience (Optional)

```makefile
.PHONY: up down logs build clean

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

build:
	docker-compose up --build -d

clean:
	docker-compose down -v
```

### .env File for Configuration

```env
# .env
COMPOSE_PROJECT_NAME=nefira
API_PORT=5000
FRONTEND_PORT=3000
DATA_STORE=Json
```

### Docker Ignore Files

```
# frontend/.dockerignore
node_modules
npm-debug.log
.env.local
.git
README.md

# backend/.dockerignore
bin
obj
*.user
.git
README.md
```

## References

- [PRD Section 6: Technical Stack Constraints](../prd.md#technical-stack-constraints)
- [PRD Section 9: Deployment Requirements](../prd.md#deployment)
- [PRD Section 9: Container Health and Startup](../prd.md#container-health-and-startup)
- [PRD Story 7: Deploy and Run Easily](../prd.md#story-7-deploy-and-run-easily)
- [Technical Stack: Containerization](../../docs/technical-stack.md#containerization)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
