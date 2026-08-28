// Builds the API base URL from the Codespaces name exposed via Vite env vars.
// `VITE_CODESPACE_NAME` must be defined (e.g. in `.env.local`) for this to resolve
// to a real Codespaces forwarding URL. Falls back to localhost when unset so the
// app never requests `https://undefined-8000...`.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_ORIGIN = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Normalizes Express array responses and paginated `{ results: [...] }` shapes.
export function extractList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

// `path` must be an absolute endpoint path, e.g. `/api/activities`.
export async function fetchList(path) {
  const response = await fetch(`${API_ORIGIN}${path}/`);
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  const data = await response.json();
  return extractList(data);
}
