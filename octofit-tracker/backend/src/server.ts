import express from 'express';
import './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// CORS and API URL support for Codespaces
app.use((req, res, next) => {
  const apiUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
  res.setHeader('X-API-URL', apiUrl);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  const apiUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
  console.log(`Octofit Tracker API server running on ${apiUrl}`);
});
