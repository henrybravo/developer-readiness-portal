# GitHub Actions Deployment Template

Use this template for Azure deployment workflows.

---

## deploy.yml

```yaml
name: Deploy to Azure

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

env:
  AZURE_CLIENT_ID: ${{ vars.AZURE_CLIENT_ID }}
  AZURE_TENANT_ID: ${{ vars.AZURE_TENANT_ID }}
  AZURE_SUBSCRIPTION_ID: ${{ vars.AZURE_SUBSCRIPTION_ID }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: 'src/frontend/package-lock.json'

      - name: Restore dependencies
        run: dotnet restore

      - name: Build
        run: dotnet build --no-restore --configuration Release

      - name: Test
        run: dotnet test --no-build --configuration Release --verbosity normal --collect:"XPlat Code Coverage"

      - name: Build Frontend
        working-directory: src/frontend
        run: |
          npm ci
          npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: |
            src/backend/bin/Release
            src/frontend/.next

  deploy-dev:
    needs: build
    runs-on: ubuntu-latest
    environment: development
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-artifacts

      - name: Install azd
        uses: Azure/setup-azd@v1.0.0

      - name: Log in with Azure (Federated Credentials)
        run: |
          azd auth login \
            --client-id "$AZURE_CLIENT_ID" \
            --federated-credential-provider "github" \
            --tenant-id "$AZURE_TENANT_ID"

      - name: Provision Infrastructure
        run: azd provision --no-prompt
        env:
          AZURE_ENV_NAME: dev
          AZURE_LOCATION: eastus

      - name: Deploy Application
        run: azd deploy --no-prompt

  deploy-prod:
    needs: deploy-dev
    runs-on: ubuntu-latest
    environment: production
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-artifacts

      - name: Install azd
        uses: Azure/setup-azd@v1.0.0

      - name: Log in with Azure (Federated Credentials)
        run: |
          azd auth login \
            --client-id "$AZURE_CLIENT_ID" \
            --federated-credential-provider "github" \
            --tenant-id "$AZURE_TENANT_ID"

      - name: Provision Infrastructure
        run: azd provision --no-prompt
        env:
          AZURE_ENV_NAME: prod
          AZURE_LOCATION: eastus

      - name: Deploy Application
        run: azd deploy --no-prompt
```

## Repository Secrets Required

Configure these in GitHub Settings > Secrets and variables > Actions:

| Variable | Description |
|----------|-------------|
| `AZURE_CLIENT_ID` | Azure AD App Registration Client ID |
| `AZURE_TENANT_ID` | Azure AD Tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Azure Subscription ID |

## Federated Credentials Setup

1. Create Azure AD App Registration
2. Add Federated Credential for GitHub:
   - Organization: `your-org`
   - Repository: `your-repo`
   - Entity type: `Branch` or `Environment`
   - Subject identifier: `repo:your-org/your-repo:ref:refs/heads/main`

## Environment Protection Rules

Configure in GitHub Settings > Environments:

### Development
- No required reviewers
- Deploy from: `main` branch only

### Production
- Required reviewers: 1+
- Wait timer: 5 minutes (optional)
- Deploy from: `main` branch only
