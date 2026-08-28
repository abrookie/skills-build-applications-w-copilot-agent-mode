import { useEffect, useState } from 'react';
import { fetchList } from '../utils/api';

// `VITE_CODESPACE_NAME` must be defined (e.g. in `.env.local`) to resolve to a real
// Codespaces forwarding URL. Falls back to localhost when unset.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const TEAMS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(TEAMS_API_URL)
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Teams</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>
                {Array.isArray(team.members)
                  ? team.members.map((member) => member?.name ?? member).join(', ')
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
