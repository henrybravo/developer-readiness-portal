import { spawn } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TESTS_UI_DIR = path.resolve(__dirname, '../../');

export interface TestResult {
  success: boolean;
  passed: number;
  failed: number;
  skipped: number;
  duration: string;
  reportPath: string;
  output?: string;
  error?: string;
}

/**
 * Execute Playwright test suite
 */
export async function runTestSuite(
  suite: 'smoke' | 'regression' | 'all',
  browser: 'chromium' | 'firefox' | 'webkit' = 'chromium',
  headed: boolean = false
): Promise<TestResult> {
  const args = ['playwright', 'test'];
  
  // Add suite filter
  if (suite !== 'all') {
    args.push('--grep', `@${suite}`);
  }
  
  // Add browser project
  args.push('--project', browser);
  
  // Add headed mode
  if (headed) {
    args.push('--headed');
  }
  
  // Add JSON reporter for parsing results
  args.push('--reporter', 'json');
  
  return executePlaywright(args);
}

/**
 * Execute a single test file
 */
export async function runSingleTest(
  file: string,
  testName?: string,
  headed: boolean = false
): Promise<TestResult> {
  const args = ['playwright', 'test', file];
  
  // Add test name filter
  if (testName) {
    args.push('--grep', testName);
  }
  
  // Add headed mode
  if (headed) {
    args.push('--headed');
  }
  
  // Add JSON reporter for parsing results
  args.push('--reporter', 'json');
  
  return executePlaywright(args);
}

/**
 * Execute Playwright with given arguments
 */
async function executePlaywright(args: string[]): Promise<TestResult> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let stdout = '';
    let stderr = '';
    
    const proc = spawn('npx', args, {
      cwd: TESTS_UI_DIR,
      shell: true,
      env: {
        ...process.env,
        CI: 'true',
      },
    });
    
    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    proc.on('close', (code) => {
      const duration = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
      
      // Try to parse JSON output
      let passed = 0;
      let failed = 0;
      let skipped = 0;
      
      try {
        // Look for JSON output in stdout
        const jsonMatch = stdout.match(/\{[\s\S]*"suites"[\s\S]*\}/);
        if (jsonMatch) {
          const results = JSON.parse(jsonMatch[0]);
          // Parse results from JSON structure
          if (results.suites) {
            for (const suite of results.suites) {
              for (const spec of suite.specs || []) {
                for (const test of spec.tests || []) {
                  if (test.status === 'passed' || test.status === 'expected') {
                    passed++;
                  } else if (test.status === 'failed' || test.status === 'unexpected') {
                    failed++;
                  } else if (test.status === 'skipped') {
                    skipped++;
                  }
                }
              }
            }
          }
        }
      } catch {
        // If JSON parsing fails, try to extract from text output
        const passedMatch = stdout.match(/(\d+) passed/);
        const failedMatch = stdout.match(/(\d+) failed/);
        const skippedMatch = stdout.match(/(\d+) skipped/);
        
        passed = passedMatch ? parseInt(passedMatch[1]) : 0;
        failed = failedMatch ? parseInt(failedMatch[1]) : 0;
        skipped = skippedMatch ? parseInt(skippedMatch[1]) : 0;
      }
      
      resolve({
        success: code === 0,
        passed,
        failed,
        skipped,
        duration,
        reportPath: 'playwright-report/index.html',
        output: stderr || stdout,
        error: code !== 0 ? `Test run failed with exit code ${code}` : undefined,
      });
    });
    
    proc.on('error', (error) => {
      resolve({
        success: false,
        passed: 0,
        failed: 0,
        skipped: 0,
        duration: '0s',
        reportPath: 'playwright-report/index.html',
        error: error.message,
      });
    });
  });
}
