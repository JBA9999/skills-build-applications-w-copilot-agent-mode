import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🐙 Octofit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mt-5 text-center">
              <h1>Welcome to Octofit Tracker</h1>
              <p className="lead">
                Track your fitness activities, compete on leaderboards, and achieve your goals.
              </p>
              <div className="row mt-4">
                <div className="col-md-3">
                  <Link to="/activities" className="btn btn-primary btn-lg">
                    📊 Activities
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/leaderboard" className="btn btn-success btn-lg">
                    🏆 Leaderboard
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/teams" className="btn btn-info btn-lg">
                    👥 Teams
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/workouts" className="btn btn-warning btn-lg">
                    💪 Workouts
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
