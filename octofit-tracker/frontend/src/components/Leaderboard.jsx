import { useEffect, useState } from 'react';
import { fetchList } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList('/api/leaderboard/')
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
