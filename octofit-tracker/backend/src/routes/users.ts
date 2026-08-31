import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * GET /api/users/
 * Retrieve all users
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ message: 'Get all users', data: users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * GET /api/users/:id
 * Retrieve a specific user
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password').populate('teams');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: `Get user ${id}`, data: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

/**
 * POST /api/users/
 * Create a new user
 */
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const userData = user.toObject();
    const { password, ...userDataWithoutPassword } = userData;
    res.status(201).json({ message: 'User created', data: userDataWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

/**
 * PUT /api/users/:id
 * Update a user
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: `User ${id} updated`, data: user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

/**
 * DELETE /api/users/:id
 * Delete a user
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: `User ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
