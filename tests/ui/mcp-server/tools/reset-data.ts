import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Paths relative to the mcp-server directory
const SEED_DATA_PATH = path.resolve(__dirname, '../../seed-data.json');
const WORKING_DATA_PATH = path.resolve(__dirname, '../../../../data/nefira-data.json');

export interface ResetResult {
  success: boolean;
  message: string;
  teamId?: string;
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
  checklist: Record<string, unknown[]>;
}

/**
 * Reset test data to seed state
 * @param teamId - Optional team ID to reset (omit for all teams)
 */
export async function resetTestData(teamId?: string): Promise<ResetResult> {
  try {
    // Ensure seed data exists
    if (!fs.existsSync(SEED_DATA_PATH)) {
      return {
        success: false,
        message: 'Seed data file not found. Run tests first to generate seed data.',
      };
    }

    const seedData: Team[] = JSON.parse(fs.readFileSync(SEED_DATA_PATH, 'utf-8'));

    if (teamId) {
      // Reset only specific team
      const workingData: Team[] = JSON.parse(fs.readFileSync(WORKING_DATA_PATH, 'utf-8'));
      const seedTeam = seedData.find(t => t.id === teamId);

      if (!seedTeam) {
        return {
          success: false,
          message: `Team with ID '${teamId}' not found in seed data.`,
          teamId,
        };
      }

      const index = workingData.findIndex(t => t.id === teamId);
      if (index >= 0) {
        workingData[index] = seedTeam;
      } else {
        workingData.push(seedTeam);
      }

      fs.writeFileSync(WORKING_DATA_PATH, JSON.stringify(workingData, null, 2));

      return {
        success: true,
        message: `Team '${teamId}' reset to seed state.`,
        teamId,
      };
    } else {
      // Reset all data
      fs.writeFileSync(WORKING_DATA_PATH, JSON.stringify(seedData, null, 2));

      return {
        success: true,
        message: `All test data reset to seed state. ${seedData.length} teams restored.`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to reset data: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Get current test data
 */
export async function getTestData(): Promise<Team[]> {
  if (!fs.existsSync(WORKING_DATA_PATH)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(WORKING_DATA_PATH, 'utf-8'));
}
