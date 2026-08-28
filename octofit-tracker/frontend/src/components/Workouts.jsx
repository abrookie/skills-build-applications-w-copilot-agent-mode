import { useEffect, useState } from 'react';
import { fetchList } from '../utils/api';

// `VITE_CODESPACE_NAME` must be defined (e.g. in `.env.local`) to resolve to a real
// Codespaces forwarding URL. Falls back to localhost when unset.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const WORKOUTS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(WORKOUTS_API_URL)
      .then(setWorkouts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.description ?? '-'}</td>
              <td>{workout.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
