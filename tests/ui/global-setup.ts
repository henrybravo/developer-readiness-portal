import { chromium, expect } from '@playwright/test';

/**
 * Global setup for Playwright tests
 * Ensures backend and frontend services are running and healthy
 */
async function globalSetup() {
  console.log('🔍 Verifying services are running...');

  const baseURL = process.env.BASE_URL || 'http://localhost:4173';
  const backendURL = process.env.BACKEND_URL || 'http://localhost:5000';
  const maxRetries = 30; // 30 seconds with 1s interval
  let retries = 0;

  // Check backend health
  console.log(`  Checking backend at ${backendURL}...`);
  while (retries < maxRetries) {
    try {
      const response = await fetch(`${backendURL}/api/teams`, {
        method: 'GET',
        timeout: 5000,
      });
      if (response.ok) {
        console.log('  ✅ Backend is ready');
        break;
      }
    } catch (error) {
      retries++;
      if (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  if (retries >= maxRetries) {
    console.warn(`  ⚠️ Backend not responding at ${backendURL} - tests may fail`);
  }

  // Check frontend health using browser
  console.log(`  Checking frontend at ${baseURL}...`);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  retries = 0;
  while (retries < maxRetries) {
    try {
      await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 10000 });
      
      // Wait for teams container or error state
      const teamsContainer = page.locator('[data-testid="teams-container"]');
      const errorContainer = page.locator('[data-testid="error-container"]');
      
      const containerVisible = await teamsContainer.isVisible({ timeout: 5000 }).catch(() => false);
      const errorVisible = await errorContainer.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (containerVisible || errorVisible) {
        console.log('  ✅ Frontend is ready');
        break;
      }
    } catch (error) {
      retries++;
      if (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  if (retries >= maxRetries) {
    console.warn(`  ⚠️ Frontend not responding at ${baseURL} - tests may fail`);
  }

  await page.close();
  await context.close();
  await browser.close();

  console.log('✅ Global setup complete\n');
}

export default globalSetup;
