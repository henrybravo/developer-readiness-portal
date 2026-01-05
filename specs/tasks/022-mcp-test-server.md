# Task 022: MCP Server for Test Execution

**Status:** Not Started  
**Priority:** P2  
**Depends On:** Task 019 (Smoke Tests), Task 021 (GitHub Actions)  
**Blocks:** None

---

## Objective

Create an MCP server that exposes Playwright test execution and report retrieval tools for AI agent integration.

---

## Acceptance Criteria

- [ ] MCP server created in `tests/ui/mcp-server/`
- [ ] 4 tools implemented: `reset-data`, `run-suite`, `run-single`, `get-report`
- [ ] Server can be started via stdio transport
- [ ] Tools callable from Copilot/Claude agents
- [ ] Server configuration documented in `.github/mcp/`

---

## MCP Tools Specification

### Tool 1: `test:reset-data`

**Purpose:** Reset test data to seed state

**Parameters:**
```json
{
  "teamId": {
    "type": "string",
    "description": "Optional team ID to reset (omit for all)",
    "required": false
  }
}
```

**Returns:**
```json
{
  "success": true,
  "message": "Test data reset successfully"
}
```

### Tool 2: `test:run-suite`

**Purpose:** Execute Playwright test suite

**Parameters:**
```json
{
  "suite": {
    "type": "string",
    "enum": ["smoke", "regression", "all"],
    "description": "Test suite to run",
    "required": true
  },
  "browser": {
    "type": "string",
    "enum": ["chromium", "firefox", "webkit"],
    "description": "Browser to use",
    "required": false,
    "default": "chromium"
  },
  "headed": {
    "type": "boolean",
    "description": "Run in headed mode",
    "required": false,
    "default": false
  }
}
```

**Returns:**
```json
{
  "success": true,
  "passed": 4,
  "failed": 0,
  "skipped": 0,
  "duration": "12.5s",
  "reportPath": "playwright-report/index.html"
}
```

### Tool 3: `test:run-single`

**Purpose:** Execute single test file or test name

**Parameters:**
```json
{
  "file": {
    "type": "string",
    "description": "Test file path (relative to tests/)",
    "required": true
  },
  "testName": {
    "type": "string",
    "description": "Specific test name to run",
    "required": false
  },
  "headed": {
    "type": "boolean",
    "description": "Run in headed mode",
    "required": false,
    "default": false
  }
}
```

### Tool 4: `test:get-report`

**Purpose:** Retrieve test report content

**Parameters:**
```json
{
  "format": {
    "type": "string",
    "enum": ["summary", "json", "failures"],
    "description": "Report format",
    "required": true
  }
}
```

**Returns (summary):**
```json
{
  "lastRun": "2026-01-05T14:30:00Z",
  "passed": 12,
  "failed": 0,
  "skipped": 0,
  "duration": "28.3s",
  "suites": ["smoke", "regression"]
}
```

**Returns (failures):**
```json
{
  "failures": [
    {
      "test": "SMOKE-004: Save Changes",
      "file": "team-details.spec.ts",
      "error": "Timeout waiting for toast",
      "screenshot": "test-results/screenshot.png"
    }
  ]
}
```

---

## Server Implementation Structure

```
tests/ui/mcp-server/
├── index.ts           # Server entry point
├── server.ts          # MCP server setup
├── tools/
│   ├── reset-data.ts
│   ├── run-suite.ts
│   ├── run-single.ts
│   └── get-report.ts
├── utils/
│   └── playwright-runner.ts
└── package.json
```

---

## MCP Configuration

Add to `.github/mcp/mcp.json`:
```json
{
  "servers": {
    "playwright-tests": {
      "command": "npx",
      "args": ["tsx", "tests/ui/mcp-server/index.ts"],
      "env": {
        "PLAYWRIGHT_CONFIG": "tests/ui/playwright.config.ts"
      }
    }
  }
}
```

---

## Usage Examples

### From Agent

```
@agent Run the smoke test suite and report any failures
```

Agent calls:
```json
{
  "tool": "test:run-suite",
  "arguments": { "suite": "smoke" }
}
```

### Debug Failing Test

```
@agent Run the save changes test in headed mode
```

Agent calls:
```json
{
  "tool": "test:run-single",
  "arguments": { 
    "file": "smoke/team-details.spec.ts",
    "testName": "SMOKE-004",
    "headed": true
  }
}
```

---

## Verification

1. Start MCP server: `npx tsx tests/ui/mcp-server/index.ts`
2. Test tool invocation via MCP client
3. Verify test execution output
4. Verify report retrieval

---

## Files to Create

- `tests/ui/mcp-server/package.json`
- `tests/ui/mcp-server/index.ts`
- `tests/ui/mcp-server/server.ts`
- `tests/ui/mcp-server/tools/reset-data.ts`
- `tests/ui/mcp-server/tools/run-suite.ts`
- `tests/ui/mcp-server/tools/run-single.ts`
- `tests/ui/mcp-server/tools/get-report.ts`
- `tests/ui/mcp-server/utils/playwright-runner.ts`
- `.github/mcp/mcp.json` (update)

---

## Dependencies

- `@modelcontextprotocol/sdk` - MCP SDK
- `tsx` - TypeScript execution
- `execa` - Process execution

---

## References

- [UI Testing Strategy](../features/ui-testing-strategy.md) - Section 7
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
