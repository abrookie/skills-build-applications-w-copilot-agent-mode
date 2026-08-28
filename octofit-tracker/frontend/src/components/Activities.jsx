import { useEffect, useState } from 'react';
import { fetchList } from '../utils/api';

// `VITE_CODESPACE_NAME` must be defined (e.g. in `.env.local`) to resolve to a real
// Codespaces forwarding URL. Falls back to localhost when unset.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const ACTIVITIES_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(ACTIVITIES_API_URL)
      .then(setActivities)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Activities</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.name ?? activity.user}</td>
              <td>{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.caloriesBurned ?? '-'}</td>
              <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
