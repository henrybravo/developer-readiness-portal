# Sample azure.yaml Configuration

This is an example of an azure.yaml file for Azure Dev CLI.

---

```yaml
# azure.yaml - Azure Developer CLI configuration
name: taskflow

metadata:
  template: taskflow@1.0.0

services:
  # Backend API service
  api:
    project: ./src/backend
    language: csharp
    host: appservice
    # host: containerapp  # Alternative for containerized deployment

  # Frontend web application
  web:
    project: ./src/frontend
    language: ts
    host: appservice
    # host: staticwebapp  # Alternative for static web app

# Infrastructure configuration
infra:
  provider: bicep
  path: ./infra
  module: main

# Pipeline configuration
pipeline:
  provider: github

# Environment hooks
hooks:
  # Run before deployment
  predeploy:
    shell: sh
    run: |
      echo "Running pre-deployment checks..."
      dotnet test --no-build

  # Run after deployment
  postdeploy:
    shell: sh
    run: |
      echo "Deployment complete!"
      echo "API URL: ${SERVICE_API_ENDPOINT_URL}"
      echo "Web URL: ${SERVICE_WEB_ENDPOINT_URL}"

# Required Azure resources (automatically provisioned)
# These are inferred from the infra/main.bicep file
```

## Complete Example with Multiple Services

```yaml
name: taskflow-microservices

services:
  # API Gateway
  gateway:
    project: ./src/gateway
    language: csharp
    host: containerapp

  # Task Service
  tasks-api:
    project: ./src/services/tasks
    language: csharp
    host: containerapp

  # User Service
  users-api:
    project: ./src/services/users
    language: csharp
    host: containerapp

  # Frontend
  web:
    project: ./src/frontend
    language: ts
    host: staticwebapp

infra:
  provider: bicep
  path: ./infra
  module: main

pipeline:
  provider: github

# Environment-specific overrides
environments:
  dev:
    services:
      gateway:
        host: appservice  # Use cheaper option in dev

  prod:
    services:
      gateway:
        host: containerapp
        config:
          minReplicas: 2
          maxReplicas: 10
```

## Host Options

| Host Type | Use Case |
|-----------|----------|
| `appservice` | Traditional web apps, APIs |
| `containerapp` | Containerized apps with scaling |
| `function` | Serverless functions |
| `staticwebapp` | Static frontend apps (React, Vue, etc.) |
| `aks` | Kubernetes (complex orchestration) |

## Common Commands

```bash
# Initialize project
azd init

# Create environment
azd env new dev

# Provision infrastructure
azd provision

# Deploy application
azd deploy

# View deployed resources
azd show

# Tear down environment
azd down

# Full deploy (provision + deploy)
azd up
```

## Environment Variables

Set environment-specific variables:

```bash
# Set variable for current environment
azd env set DATABASE_SKU "S1"

# Get variable
azd env get-values
```
