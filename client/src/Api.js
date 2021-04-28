const API_URL = 'http://localhost:3001';

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'GET',
  });
  return response.json();
}
