import { test as base } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Seed data file path (original, read-only)
const SEED_DATA_PATH = path.resolve(__dirname, '../../seed-data.json');
// Working data file path (what the app uses)
const WORKING_DATA_PATH = path.resolve(__dirname, '../../../data/nefira-data.json');

/**
 * Fixture that provides data reset capabilities for tests
 */
export interface DataFixture {
  /**
   * Reset test data to seed state
   * @param teamId - Optional team ID to reset (omit for all teams)
   */
  resetTestData: (teamId?: string) => Promise<void>;
  
  /**
   * Get current test data
   */
  getTestData: () => Promise<Team[]>;
  
  /**
   * Create a team with specific readiness state
   * @param readiness - 'red' (0), 'yellow' (1), or 'green' (2)
   */
  seedTeam: (readiness: 'red' | 'yellow' | 'green') => Promise<Team>;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  stack: {
    frontend: string;
    backend: string;
    database?: string;
  };
  readiness: number;
  checklist: Record<string, ChecklistItem[]>;
}

export interface ChecklistItem {
  id: string;
  description: string;
  isComplete: boolean;
  guidance?: string;
}

/**
 * Extended test fixtures including data management
 */
export const test = base.extend<{ dataFixture: DataFixture }>({
  dataFixture: async ({}, use) => {
    // Ensure seed data exists
    if (!fs.existsSync(SEED_DATA_PATH)) {
      // Copy current data as seed if no seed exists
      const currentData = fs.readFileSync(WORKING_DATA_PATH, 'utf-8');
      fs.writeFileSync(SEED_DATA_PATH, currentData);
    }

    const fixture: DataFixture = {
      resetTestData: async (teamId?: string) => {
        const seedData: Team[] = JSON.parse(fs.readFileSync(SEED_DATA_PATH, 'utf-8'));
        
        if (teamId) {
          // Reset only specific team
          const workingData: Team[] = JSON.parse(fs.readFileSync(WORKING_DATA_PATH, 'utf-8'));
          const seedTeam = seedData.find(t => t.id === teamId);
          
          if (seedTeam) {
            const index = workingData.findIndex(t => t.id === teamId);
            if (index >= 0) {
              workingData[index] = seedTeam;
            }
            fs.writeFileSync(WORKING_DATA_PATH, JSON.stringify(workingData, null, 2));
          }
        } else {
          // Reset all data
          fs.writeFileSync(WORKING_DATA_PATH, JSON.stringify(seedData, null, 2));
        }
      },
      
      getTestData: async () => {
        return JSON.parse(fs.readFileSync(WORKING_DATA_PATH, 'utf-8'));
      },
      
      seedTeam: async (readiness: 'red' | 'yellow' | 'green') => {
        const readinessValue = readiness === 'red' ? 0 : readiness === 'yellow' ? 1 : 2;
        const newTeam: Team = {
          id: `test-team-${Date.now()}`,
          name: `Test Team (${readiness})`,
          description: `Auto-generated test team with ${readiness} readiness`,
          stack: {
            frontend: 'React',
            backend: '.NET',
            database: 'PostgreSQL',
          },
          readiness: readinessValue,
          checklist: {
            codebase: [
              { id: 'test-1', description: 'Test item 1', isComplete: readinessValue >= 1, guidance: 'Test guidance' },
              { id: 'test-2', description: 'Test item 2', isComplete: readinessValue >= 2, guidance: 'Test guidance' },
            ],
            versioning: [],
            documentation: [],
            testing: [],
            copilot: [],
            modernization: [],
          },
        };
        
        const workingData: Team[] = JSON.parse(fs.readFileSync(WORKING_DATA_PATH, 'utf-8'));
        workingData.push(newTeam);
        fs.writeFileSync(WORKING_DATA_PATH, JSON.stringify(workingData, null, 2));
        
        return newTeam;
      },
    };

    // Reset data before running tests in this fixture
    await fixture.resetTestData();

    await use(fixture);

    // Cleanup: Reset data after tests
    await fixture.resetTestData();
  },
});

export { expect } from '@playwright/test';
