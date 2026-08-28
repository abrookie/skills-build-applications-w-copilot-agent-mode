// Builds the API base URL from the Codespaces name exposed via Vite env vars.
// `VITE_CODESPACE_NAME` must be defined (e.g. in `.env.local`) for this to resolve
// to a real Codespaces forwarding URL. Falls back to localhost when unset so the
// app never requests `https://undefined-8000...`.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

// Normalizes Express array responses and paginated `{ results: [...] }` shapes.
export function extractList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function fetchList(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`);
  if (!response.ok) {
    throw new Error(`Request to ${resource} failed with status ${response.status}`);
  }
  const data = await response.json();
  return extractList(data);
}
