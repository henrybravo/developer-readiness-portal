# MCP Server Setup for Test-UI

The test-ui prompt uses MCP (Model Context Protocol) servers to provide testing capabilities.

## Status

✅ **MCP Server Built and Configured**

## Available MCP Servers

### 1. @playwright/mcp
Browser automation for interactive testing (installed via npx)

### 2. playwright-tests
Custom MCP server for test execution (local)
- **Location**: `tests/ui/mcp-server/`
- **Build**: `tests/ui/mcp-server/dist/index.js`
- **Status**: ✅ Built and ready

## Configuration Files

- **MCP Config**: `.github/mcp/playwright.json`
- **VS Code Settings**: `.vscode/settings.json`
- **DevContainer**: `.devcontainer/devcontainer.json`

## Available Tools

The playwright-tests MCP server provides:

1. **test:reset-data** - Reset test data to seed state
2. **test:run-suite** - Run smoke/regression/all tests
3. **test:run-single** - Run a specific test file
4. **test:get-report** - Get test results in various formats

## How It Works

1. VS Code detects `.vscode/settings.json` with MCP config
2. GitHub Copilot loads MCP servers from `.github/mcp/playwright.json`
3. When you use `/test-ui` prompt, Copilot can invoke MCP tools
4. MCP server executes Playwright commands and returns results

## Manual Build (if needed)

```bash
cd tests/ui/mcp-server
npm install
npm run build
```

## Testing the MCP Server

```bash
cd tests/ui/mcp-server
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

## Auto-Build

The devcontainer `postCreateCommand` automatically builds the MCP server on container creation:
```bash
cd tests/ui && npm install && npx playwright install-deps && npx playwright install && cd mcp-server && npm install && npm run build
```

## Troubleshooting

**MCP tools not available?**
1. Reload VS Code window
2. Check `.vscode/settings.json` exists
3. Verify MCP server is built: `ls tests/ui/mcp-server/dist/index.js`
4. Check GitHub Copilot Chat settings for MCP

**Build errors?**
```bash
cd tests/ui/mcp-server
rm -rf node_modules dist
npm install
npm run build
```

## Next Steps

Now you can use the `/test-ui` prompt with MCP tools enabled:
- `/test-ui run smoke`
- `/test-ui reset-data`
- `/test-ui report summary`
