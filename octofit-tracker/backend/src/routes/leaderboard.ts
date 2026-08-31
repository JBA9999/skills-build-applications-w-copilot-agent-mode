import express from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = express.Router();

/**
 * GET /api/leaderboard/
 * Retrieve the leaderboard
 */
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).limit(100);
    res.json({ message: 'Get leaderboard', data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

/**
 * GET /api/leaderboard/global
 * Retrieve global leaderboard rankings
 */
router.get('/global', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ totalCaloriesBurned: -1 }).limit(50);
    res.json({ message: 'Get global leaderboard', data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

/**
 * GET /api/leaderboard/team/:teamId
 * Retrieve leaderboard for a specific team
 */
router.get('/team/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find().sort({ totalCaloriesBurned: -1 });
    res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

/**
 * GET /api/leaderboard/user/:userId
 * Retrieve leaderboard position for a specific user
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userLeaderboard = await Leaderboard.findOne({ userId });
    if (!userLeaderboard) return res.status(404).json({ error: 'User not found on leaderboard' });
    res.json({ message: `Get leaderboard position for user ${userId}`, data: userLeaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user leaderboard position' });
  }
});

export default router;
