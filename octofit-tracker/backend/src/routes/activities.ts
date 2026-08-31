import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

/**
 * GET /api/activities/
 * Retrieve all activities
 */
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('userId', 'username email');
    res.json({ message: 'Get all activities', data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

/**
 * GET /api/activities/:id
 * Retrieve a specific activity
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId', 'username email');
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json({ message: `Get activity ${id}`, data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

/**
 * POST /api/activities/
 * Create a new activity
 */
router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await activity.populate('userId', 'username email');
    res.status(201).json({ message: 'Activity created', data: activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

/**
 * PUT /api/activities/:id
 * Update an activity
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true }).populate('userId', 'username email');
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json({ message: `Activity ${id} updated`, data: activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

/**
 * DELETE /api/activities/:id
 * Delete an activity
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json({ message: `Activity ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
