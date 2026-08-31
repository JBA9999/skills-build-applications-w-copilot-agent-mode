import { useState, useEffect } from 'react';
import { fetchFromApi } from '../config/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('teams');
        setTeams(data);
        setError(null);
      } catch (err) {
        setError('Failed to load teams');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
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
      <h1>Teams</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  {team.description && (
                    <p className="card-text">{team.description}</p>
                  )}
                  <div className="card-text">
                    <small className="text-muted">
                      Members: {team.members?.length || 0}
                    </small>
                  </div>
                  {team.leader && (
                    <p className="card-text">
                      <small className="text-muted">Leader: {team.leader}</small>
                    </p>
                  )}
                  {team.totalPoints !== undefined && (
                    <p className="card-text">
                      <strong>Points: {team.totalPoints}</strong>
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
