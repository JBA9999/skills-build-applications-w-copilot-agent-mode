import { useState, useEffect } from 'react';
import { fetchFromApi, API_ENDPOINTS } from '../config/api';

/**
 * Activities Component
 * Fetches data from: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
 */
export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('activities');
        setActivities(data);
        setError(null);
      } catch (err) {
        setError('Failed to load activities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="row">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.name || activity.type}</h5>
                  {activity.description && (
                    <p className="card-text">{activity.description}</p>
                  )}
                  {activity.duration && (
                    <p className="card-text">
                      <small className="text-muted">Duration: {activity.duration} min</small>
                    </p>
                  )}
                  {activity.date && (
                    <p className="card-text">
                      <small className="text-muted">
                        Date: {new Date(activity.date).toLocaleDateString()}
                      </small>
                    </p>
                  )}
                  {activity.calories && (
                    <p className="card-text">
                      <strong>Calories: {activity.calories}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
