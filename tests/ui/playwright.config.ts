import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Playwright configuration for Developer Readiness Portal UI tests
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Use 1 worker in CI to avoid flakiness, default otherwise */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter configuration */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'junit-report.xml' }],
    ['list']
  ],
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL for navigating to pages */
    baseURL: process.env.BASE_URL || 'http://localhost:4174',
    
    /* Collect trace when retrying the failed test */
    trace: 'retain-on-failure',
    
    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Maximum time each action can take */
    actionTimeout: 15000,
    
    /* Navigation timeout */
    navigationTimeout: 45000,
  },

  /* Global timeout for each test */
  timeout: 60000,

  /* Expect timeout */
  expect: {
    timeout: 10000,
  },

  /* Global setup/teardown */
  globalSetup: resolve(__dirname, './global-setup.ts'),
  globalTeardown: resolve(__dirname, './global-teardown.ts'),

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    /* Mobile viewports */
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['iPhone 14'],
      },
    },

    {
      name: 'mobile-safari',
      use: { 
        ...devices['iPhone 14'],
        browserName: 'webkit',
      },
    },
  ],

  /*
   * Web servers are managed externally:
   * - CI: GitHub Actions workflow starts servers before running tests
   * - Local: Start servers manually before running tests
   */
});
