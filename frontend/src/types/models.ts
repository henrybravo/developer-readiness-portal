/**
 * Represents the overall readiness status of a team.
 * Based on checklist completion percentages:
 * - Green: 90%+ items complete
 * - Yellow: 50-89% items complete
 * - Red: Less than 50% items complete
 */
export enum ReadinessStatus {
  Red = 'Red',
  Yellow = 'Yellow',
  Green = 'Green'
}

/**
 * Represents the technology stack used by a team.
 */
export interface TechStack {
  /** Frontend framework and version (e.g., "React 16", "Angular 14") */
  frontend: string;
  
  /** Backend framework and version (e.g., ".NET 6", "Java 11", "Node.js 18") */
  backend: string;
  
  /** Optional database technology (e.g., "PostgreSQL 15", "MongoDB 6") */
  database?: string;
}

/**
 * Represents a single item in a readiness checklist.
 */
export interface ChecklistItem {
  /** Unique identifier for the checklist item */
  id: string;
  
  /** Description of the checklist item */
  description: string;
  
  /** Whether the item has been completed */
  isComplete: boolean;
  
  /** Optional guidance or help text for completing this item */
  guidance?: string;
}

/**
 * Represents a comprehensive readiness checklist organized by categories.
 */
export interface Checklist {
  /** Codebase health items (code quality, standards, documentation) */
  codebase: ChecklistItem[];
  
  /** Version control and dependency management items */
  versioning: ChecklistItem[];
  
  /** Documentation completeness items */
  documentation: ChecklistItem[];
  
  /** Testing coverage and automation items */
  testing: ChecklistItem[];
  
  /** GitHub Copilot enablement and adoption items */
  copilot: ChecklistItem[];
  
  /** Modernization and upgrade readiness items */
  modernization: ChecklistItem[];
}

/**
 * Represents a development team with their technology stack and readiness information.
 */
export interface Team {
  /** Unique identifier for the team */
  id: string;
  
  /** Team name */
  name: string;
  
  /** Technology stack used by the team */
  stack: TechStack;
  
  /** Current readiness status (calculated from checklist completion) */
  readiness: ReadinessStatus;
  
  /** Comprehensive readiness checklist */
  checklist: Checklist;
  
  /** Optional description or notes about the team */
  description?: string;
}

/**
 * Represents an upgrade plan for a technology stack component.
 */
export interface UpgradePlan {
  /** Current version of the technology */
  currentVersion: string;
  
  /** Recommended target version */
  targetVersion: string;
  
  /** Technology name (e.g., ".NET", "React", "Java") */
  technology: string;
  
  /** Rationale for the upgrade */
  rationale: string;
  
  /** Step-by-step upgrade instructions */
  steps: string[];
  
  /** Estimated effort (e.g., "2-4 hours", "1-2 days") */
  estimatedEffort?: string;
  
  /** GitHub Copilot recommendations specific to this upgrade */
  copilotRecommendations: string[];
}

/**
 * Represents a comprehensive upgrade plan for a team's entire technology stack.
 */
export interface TeamUpgradePlan {
  /** Team identifier */
  teamId: string;
  
  /** Team name */
  teamName: string;
  
  /** Upgrade plan for frontend technology */
  frontend?: UpgradePlan;
  
  /** Upgrade plan for backend technology */
  backend?: UpgradePlan;
  
  /** Upgrade plan for database technology */
  database?: UpgradePlan;
  
  /** Overall recommended actions across the stack */
  generalRecommendations: string[];
}

/**
 * Represents the result of an automated UI test execution.
 */
export interface TestResult {
  /** Whether the test passed successfully */
  success: boolean;
  
  /** Test execution timestamp */
  timestamp: string;
  
  /** Test execution logs and output */
  logs: string;
  
  /** Base64-encoded screenshot captured during test */
  screenshotBase64?: string;
  
  /** Duration of test execution in milliseconds */
  durationMs: number;
  
  /** Name or identifier of the test that was run */
  testName: string;
  
  /** Error message if the test failed */
  errorMessage?: string;
}

/**
 * Helper function to calculate completion percentage of a checklist
 */
export function calculateCompletionPercentage(checklist: Checklist): number {
  const allItems = [
    ...checklist.codebase,
    ...checklist.versioning,
    ...checklist.documentation,
    ...checklist.testing,
    ...checklist.copilot,
    ...checklist.modernization
  ];

  if (allItems.length === 0) return 0;

  const completedCount = allItems.filter(item => item.isComplete).length;
  return (completedCount / allItems.length) * 100;
}

/**
 * Helper function to determine readiness status from completion percentage
 */
export function getReadinessStatusFromPercentage(percentage: number): ReadinessStatus {
  if (percentage >= 90) return ReadinessStatus.Green;
  if (percentage >= 50) return ReadinessStatus.Yellow;
  return ReadinessStatus.Red;
}

/**
 * Helper function to get a color class for readiness status
 */
export function getReadinessColor(status: ReadinessStatus): string {
  switch (status) {
    case ReadinessStatus.Green:
      return 'green';
    case ReadinessStatus.Yellow:
      return 'yellow';
    case ReadinessStatus.Red:
      return 'red';
    default:
      return 'gray';
  }
}
