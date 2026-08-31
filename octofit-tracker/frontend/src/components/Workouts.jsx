import { useState, useEffect } from 'react';
import { fetchFromApi } from '../config/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('workouts');
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load workouts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
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
      <h1>Workouts</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || workout.type}</h5>
                  {workout.description && (
                    <p className="card-text">{workout.description}</p>
                  )}
                  {workout.difficulty && (
                    <p className="card-text">
                      <small className="text-muted">
                        Difficulty: {workout.difficulty}
                      </small>
                    </p>
                  )}
                  {workout.duration && (
                    <p className="card-text">
                      <small className="text-muted">Duration: {workout.duration} min</small>
                    </p>
                  )}
                  {workout.caloriesBurned && (
                    <p className="card-text">
                      <strong>Calories: {workout.caloriesBurned}</strong>
                    </p>
                  )}
                  {workout.exercisesCount !== undefined && (
                    <p className="card-text">
                      <small className="text-muted">
                        Exercises: {workout.exercisesCount}
                      </small>
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
