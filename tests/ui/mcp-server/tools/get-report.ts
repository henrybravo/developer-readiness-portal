import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TESTS_UI_DIR = path.resolve(__dirname, '../../');

export interface ReportResult {
  success: boolean;
  format: string;
  content: string;
  path?: string;
}

/**
 * Get test report in specified format
 */
export async function getTestReport(
  format: 'html' | 'json' | 'summary'
): Promise<ReportResult> {
  switch (format) {
    case 'html':
      return getHtmlReport();
    case 'json':
      return getJsonReport();
    case 'summary':
      return getSummaryReport();
    default:
      return {
        success: false,
        format,
        content: `Unknown format: ${format}`,
      };
  }
}

/**
 * Get HTML report path and content preview
 */
async function getHtmlReport(): Promise<ReportResult> {
  const reportPath = path.join(TESTS_UI_DIR, 'playwright-report', 'index.html');
  
  if (!fs.existsSync(reportPath)) {
    return {
      success: false,
      format: 'html',
      content: 'HTML report not found. Run tests first to generate the report.',
    };
  }
  
  const content = fs.readFileSync(reportPath, 'utf-8');
  
  return {
    success: true,
    format: 'html',
    content: content,
    path: reportPath,
  };
}

/**
 * Get JSON test results
 */
async function getJsonReport(): Promise<ReportResult> {
  const resultsPath = path.join(TESTS_UI_DIR, 'test-results', 'results.json');
  
  if (!fs.existsSync(resultsPath)) {
    return {
      success: false,
      format: 'json',
      content: JSON.stringify({
        error: 'JSON results not found. Run tests first to generate results.',
      }),
    };
  }
  
  const content = fs.readFileSync(resultsPath, 'utf-8');
  
  return {
    success: true,
    format: 'json',
    content: content,
    path: resultsPath,
  };
}

/**
 * Get summary from JSON results
 */
async function getSummaryReport(): Promise<ReportResult> {
  const resultsPath = path.join(TESTS_UI_DIR, 'test-results', 'results.json');
  
  if (!fs.existsSync(resultsPath)) {
    return {
      success: false,
      format: 'summary',
      content: 'No test results found. Run tests first.',
    };
  }
  
  try {
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
    
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    const failedTests: string[] = [];
    
    // Parse suites recursively
    function parseSuite(suite: any) {
      for (const spec of suite.specs || []) {
        for (const test of spec.tests || []) {
          const results = test.results || [];
          const lastResult = results[results.length - 1];
          
          if (lastResult?.status === 'passed' || test.status === 'expected') {
            passed++;
          } else if (lastResult?.status === 'failed' || test.status === 'unexpected') {
            failed++;
            failedTests.push(`${suite.title} > ${spec.title}`);
          } else if (lastResult?.status === 'skipped') {
            skipped++;
          }
        }
      }
      
      for (const childSuite of suite.suites || []) {
        parseSuite(childSuite);
      }
    }
    
    for (const suite of results.suites || []) {
      parseSuite(suite);
    }
    
    const total = passed + failed + skipped;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
    
    let summary = `## Test Summary\n\n`;
    summary += `- **Total Tests:** ${total}\n`;
    summary += `- **Passed:** ${passed} ✅\n`;
    summary += `- **Failed:** ${failed} ❌\n`;
    summary += `- **Skipped:** ${skipped} ⏭️\n`;
    summary += `- **Pass Rate:** ${passRate}%\n`;
    
    if (failedTests.length > 0) {
      summary += `\n### Failed Tests\n\n`;
      for (const test of failedTests) {
        summary += `- ${test}\n`;
      }
    }
    
    return {
      success: true,
      format: 'summary',
      content: summary,
    };
  } catch (error) {
    return {
      success: false,
      format: 'summary',
      content: `Failed to parse results: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
