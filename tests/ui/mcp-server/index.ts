import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { resetTestData, getTestData } from './tools/reset-data.js';
import { runTestSuite, runSingleTest } from './tools/run-tests.js';
import { getTestReport } from './tools/get-report.js';

/**
 * MCP Server for Playwright Test Execution
 * 
 * Exposes tools for:
 * - Resetting test data
 * - Running test suites
 * - Running single tests
 * - Retrieving test reports
 */
const server = new Server(
  {
    name: 'playwright-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'test:reset-data',
        description: 'Reset test data to seed state for consistent test execution',
        inputSchema: {
          type: 'object',
          properties: {
            teamId: {
              type: 'string',
              description: 'Optional team ID to reset (omit for all teams)',
            },
          },
          required: [],
        },
      },
      {
        name: 'test:run-suite',
        description: 'Execute Playwright test suite (smoke or regression)',
        inputSchema: {
          type: 'object',
          properties: {
            suite: {
              type: 'string',
              enum: ['smoke', 'regression', 'all'],
              description: 'Test suite to run',
            },
            browser: {
              type: 'string',
              enum: ['chromium', 'firefox', 'webkit'],
              description: 'Browser to use (default: chromium)',
            },
            headed: {
              type: 'boolean',
              description: 'Run in headed mode (default: false)',
            },
          },
          required: ['suite'],
        },
      },
      {
        name: 'test:run-single',
        description: 'Execute a single test file or test by name',
        inputSchema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              description: 'Test file path (relative to tests/ui/tests/)',
            },
            testName: {
              type: 'string',
              description: 'Optional test name to run within the file',
            },
            headed: {
              type: 'boolean',
              description: 'Run in headed mode (default: false)',
            },
          },
          required: ['file'],
        },
      },
      {
        name: 'test:get-report',
        description: 'Retrieve the latest test report',
        inputSchema: {
          type: 'object',
          properties: {
            format: {
              type: 'string',
              enum: ['html', 'json', 'summary'],
              description: 'Report format to retrieve',
            },
          },
          required: ['format'],
        },
      },
    ],
  };
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'playwright://report/latest',
        name: 'Latest Test Report',
        description: 'The most recent Playwright test report',
        mimeType: 'text/html',
      },
      {
        uri: 'playwright://results/json',
        name: 'Test Results JSON',
        description: 'JSON-formatted test results',
        mimeType: 'application/json',
      },
    ],
  };
});

// Read resources
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  
  if (uri === 'playwright://report/latest') {
    const report = await getTestReport('html');
    return {
      contents: [
        {
          uri,
          mimeType: 'text/html',
          text: report.content,
        },
      ],
    };
  }
  
  if (uri === 'playwright://results/json') {
    const report = await getTestReport('json');
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: report.content,
        },
      ],
    };
  }
  
  throw new Error(`Unknown resource: ${uri}`);
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'test:reset-data': {
        const result = await resetTestData(args?.teamId as string | undefined);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'test:run-suite': {
        const result = await runTestSuite(
          args?.suite as 'smoke' | 'regression' | 'all',
          args?.browser as 'chromium' | 'firefox' | 'webkit' | undefined,
          args?.headed as boolean | undefined
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'test:run-single': {
        const result = await runSingleTest(
          args?.file as string,
          args?.testName as string | undefined,
          args?.headed as boolean | undefined
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'test:get-report': {
        const result = await getTestReport(
          args?.format as 'html' | 'json' | 'summary'
        );
        return {
          content: [
            {
              type: 'text',
              text: result.content,
            },
          ],
        };
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Playwright MCP Server running on stdio');
}

main().catch(console.error);
