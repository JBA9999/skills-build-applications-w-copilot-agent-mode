import express from 'express';
import Workout from '../models/Workout.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * GET /api/workouts/
 * Retrieve all workouts
 */
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({ message: 'Get all workouts', data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

/**
 * GET /api/workouts/personalized/:userId
 * Retrieve personalized workout suggestions for a user
 */
router.get('/personalized/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Recommend workouts based on fitness level
    const workouts = await Workout.find({ fitnessLevel: { $lte: user.fitnessLevel } });
    res.json({ message: `Get personalized workouts for user ${userId}`, data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch personalized workouts' });
  }
});

/**
 * GET /api/workouts/:id
 * Retrieve a specific workout
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json({ message: `Get workout ${id}`, data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

/**
 * POST /api/workouts/
 * Create a new workout suggestion
 */
router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({ message: 'Workout suggestion created', data: workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

/**
 * PUT /api/workouts/:id
 * Update a workout
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json({ message: `Workout ${id} updated`, data: workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

/**
 * DELETE /api/workouts/:id
 * Delete a workout
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json({ message: `Workout ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
