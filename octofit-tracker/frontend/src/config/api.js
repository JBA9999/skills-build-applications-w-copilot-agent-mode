/**
 * API Configuration
 * 
 * Uses VITE_CODESPACE_NAME environment variable to construct API endpoints.
 * Must be defined in .env.local or set in environment.
 * 
 * Example .env.local:
 *   VITE_CODESPACE_NAME=your-codespace-name
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not set. Using localhost fallback. ' +
      'Define VITE_CODESPACE_NAME in .env.local for production use.'
    );
    return 'http://localhost:8000';
  }
  
  return `https://${codespaceName}-8000.app.github.dev`;
};

export const API_BASE_URL = `${getApiBaseUrl()}/api`;

// API Endpoint URLs (used to construct dynamic endpoints with Codespace domains)
// Format: https://${CODESPACE_NAME}-8000.app.github.dev/api/[endpoint]/
export const API_ENDPOINTS = {
  activities: `${API_BASE_URL}/activities`,
  leaderboard: `${API_BASE_URL}/leaderboard`,
  teams: `${API_BASE_URL}/teams`,
  users: `${API_BASE_URL}/users`,
  workouts: `${API_BASE_URL}/workouts`,
};

/**
 * Helper to handle paginated and array responses
 * Returns an array of items from either:
 * - { data: [...] } format (paginated)
 * - Direct array format [...]
 */
export const extractDataFromResponse = (response) => {
  if (Array.isArray(response)) {
    return response;
  }
  if (response && response.data && Array.isArray(response.data)) {
    return response.data;
  }
  return [];
};

/**
 * Fetch data from API endpoint
 * @param {string} endpoint - API endpoint (e.g., 'activities', 'teams')
 * @returns {Promise<Array>} Array of items or empty array on error
 */
export const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return extractDataFromResponse(data);
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
};
