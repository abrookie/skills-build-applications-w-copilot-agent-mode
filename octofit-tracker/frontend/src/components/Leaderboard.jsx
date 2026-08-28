import { useEffect, useState } from 'react';
import { fetchList } from '../utils/api';

// `VITE_CODESPACE_NAME` must be defined (e.g. in `.env.local`) to resolve to a real
// Codespaces forwarding URL. Falls back to localhost when unset.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const LEADERBOARD_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(LEADERBOARD_API_URL)
      .then(setEntries)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{entry.user?.name ?? entry.user}</td>
              <td>{entry.team?.name ?? entry.team ?? '-'}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
