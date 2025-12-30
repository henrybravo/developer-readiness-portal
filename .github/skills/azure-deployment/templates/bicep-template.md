# Bicep Template Structure

Use this structure for Azure infrastructure as code.

---

## Folder Structure

```
infra/
├── main.bicep              # Main orchestrator
├── main.parameters.json    # Parameter values
├── abbreviations.json      # Resource naming abbreviations
├── modules/
│   ├── app-service.bicep   # App Service module
│   ├── sql-database.bicep  # SQL Database module
│   ├── key-vault.bicep     # Key Vault module
│   ├── app-insights.bicep  # Application Insights module
│   └── storage.bicep       # Storage account module
└── core/                   # Azure Verified Modules (if using)
```

## main.bicep Template

```bicep
targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the environment (e.g., dev, staging, prod)')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Tags to apply to all resources')
param tags object = {}

// Resource naming
var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))

// Resource Group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: '${abbrs.resourcesResourceGroups}${environmentName}'
  location: location
  tags: union(tags, { 'azd-env-name': environmentName })
}

// App Service Plan
module appServicePlan './modules/app-service-plan.bicep' = {
  name: 'appServicePlan'
  scope: rg
  params: {
    name: '${abbrs.webServerFarms}${resourceToken}'
    location: location
    tags: tags
    sku: {
      name: 'B1'
      tier: 'Basic'
    }
  }
}

// Web App
module webApp './modules/app-service.bicep' = {
  name: 'webApp'
  scope: rg
  params: {
    name: '${abbrs.webSitesAppService}${resourceToken}'
    location: location
    tags: tags
    appServicePlanId: appServicePlan.outputs.id
    appSettings: {
      APPLICATIONINSIGHTS_CONNECTION_STRING: monitoring.outputs.connectionString
    }
  }
}

// Application Insights
module monitoring './modules/app-insights.bicep' = {
  name: 'monitoring'
  scope: rg
  params: {
    name: '${abbrs.insightsComponents}${resourceToken}'
    location: location
    tags: tags
  }
}

// Key Vault
module keyVault './modules/key-vault.bicep' = {
  name: 'keyVault'
  scope: rg
  params: {
    name: '${abbrs.keyVaultVaults}${resourceToken}'
    location: location
    tags: tags
    principalId: webApp.outputs.identityPrincipalId
  }
}

// Outputs
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output WEB_APP_URL string = webApp.outputs.uri
output APPLICATIONINSIGHTS_CONNECTION_STRING string = monitoring.outputs.connectionString
```

## Module Template Example

```bicep
// modules/app-service.bicep

@description('The name of the app service')
param name string

@description('The location for the app service')
param location string = resourceGroup().location

@description('Tags to apply to the app service')
param tags object = {}

@description('The app service plan ID')
param appServicePlanId string

@description('App settings')
param appSettings object = {}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: name
  location: location
  tags: tags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlanId
    httpsOnly: true
    siteConfig: {
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
      appSettings: [for key in objectKeys(appSettings): {
        name: key
        value: appSettings[key]
      }]
    }
  }
}

output id string = webApp.id
output name string = webApp.name
output uri string = 'https://${webApp.properties.defaultHostName}'
output identityPrincipalId string = webApp.identity.principalId
```

## abbreviations.json

```json
{
  "resourcesResourceGroups": "rg-",
  "webServerFarms": "plan-",
  "webSitesAppService": "app-",
  "insightsComponents": "appi-",
  "keyVaultVaults": "kv-",
  "storageStorageAccounts": "st",
  "sqlServers": "sql-",
  "sqlServersDatabases": "sqldb-"
}
```

## Best Practices

1. **Use Azure Verified Modules** when available
2. **Enable managed identity** for all services
3. **Configure diagnostic settings** for all resources
4. **Use parameters** for environment-specific values
5. **Apply consistent tags** across all resources
6. **Use unique resource tokens** to avoid naming conflicts
