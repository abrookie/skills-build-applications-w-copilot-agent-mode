// Normalizes Express array responses and paginated `{ results: [...] }` shapes.
export function extractList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

// `url` must be a full endpoint URL, e.g. `https://<codespace>-8000.app.github.dev/api/activities`.
export async function fetchList(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  const data = await response.json();
  return extractList(data);
}
