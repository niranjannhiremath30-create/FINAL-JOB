/**
 * Test Checklist - localStorage management
 * Key: jobTrackerTestStatus
 */

const STORAGE_KEY = 'jobTrackerTestStatus';

export const TEST_ITEMS = [
  {
    id: 'prefs-persist',
    label: 'Preferences persist after refresh',
    howToTest: 'Go to Settings, save preferences, refresh the page. Verify preferences are still there.'
  },
  {
    id: 'match-score',
    label: 'Match score calculates correctly',
    howToTest: 'Set preferences in Settings. Go to Dashboard and verify jobs show match percentages based on your criteria.'
  },
  {
    id: 'show-matches-toggle',
    label: '"Show only matches" toggle works',
    howToTest: 'On Dashboard, check the "Show only jobs above my threshold" toggle. Verify only matching jobs appear.'
  },
  {
    id: 'save-job-persist',
    label: 'Save job persists after refresh',
    howToTest: 'Save a job on Dashboard, refresh the page. Verify the job remains saved and appears on Saved page.'
  },
  {
    id: 'apply-new-tab',
    label: 'Apply opens in new tab',
    howToTest: 'Click Apply on any job card. Verify the application URL opens in a new browser tab.'
  },
  {
    id: 'status-persist',
    label: 'Status update persists after refresh',
    howToTest: 'Change a job status (e.g., to Applied), refresh the page. Verify the status is still set.'
  },
  {
    id: 'status-filter',
    label: 'Status filter works correctly',
    howToTest: 'Set some jobs to different statuses. Use the Status filter dropdown. Verify only matching jobs appear.'
  },
  {
    id: 'digest-top10',
    label: 'Digest generates top 10 by score',
    howToTest: 'Set preferences, go to Digest, generate digest. Verify it shows up to 10 jobs sorted by match score.'
  },
  {
    id: 'digest-persist',
    label: 'Digest persists for the day',
    howToTest: 'Generate a digest, refresh the page. Verify the same digest is shown without regenerating.'
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on main pages',
    howToTest: 'Open browser DevTools (F12), navigate through all pages. Check Console tab for any red errors.'
  }
];

/**
 * Get all test statuses from localStorage
 * Returns object with test id as key, boolean as value
 */
export function getTestStatuses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initializeTestStatuses();
    }
    return JSON.parse(stored);
  } catch {
    return initializeTestStatuses();
  }
}

/**
 * Initialize all tests as unchecked
 */
function initializeTestStatuses() {
  const initial = {};
  TEST_ITEMS.forEach(item => {
    initial[item.id] = false;
  });
  return initial;
}

/**
 * Save test statuses to localStorage
 */
export function saveTestStatuses(statuses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch {
    // Silent fail if localStorage unavailable
  }
}

/**
 * Toggle a single test status
 */
export function toggleTestStatus(testId) {
  const statuses = getTestStatuses();
  statuses[testId] = !statuses[testId];
  saveTestStatuses(statuses);
  return statuses;
}

/**
 * Reset all test statuses to unchecked
 */
export function resetTestStatuses() {
  const initial = initializeTestStatuses();
  saveTestStatuses(initial);
  return initial;
}

/**
 * Count how many tests are passed
 */
export function getPassedCount(statuses) {
  return Object.values(statuses).filter(Boolean).length;
}

/**
 * Check if all tests are passed
 */
export function allTestsPassed(statuses) {
  return getPassedCount(statuses) === TEST_ITEMS.length;
}
