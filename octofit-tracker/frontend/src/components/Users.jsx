import { useState, useEffect } from 'react';
import { fetchFromApi, API_ENDPOINTS } from '../config/api';

/**
 * Users Component
 * Fetches data from: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
 */
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('users');
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
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
      <h1>Users</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user._id || user.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name || user.username}</h5>
                  {user.email && (
                    <p className="card-text">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </p>
                  )}
                  {user.bio && (
                    <p className="card-text">{user.bio}</p>
                  )}
                  <div className="card-text">
                    <small className="text-muted">
                      {user.team && `Team: ${user.team}`}
                    </small>
                  </div>
                  {user.points !== undefined && (
                    <p className="card-text">
                      <strong>Points: {user.points}</strong>
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
