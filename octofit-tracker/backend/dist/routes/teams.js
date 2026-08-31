import express from 'express';
import Team from '../models/Team.js';
const router = express.Router();
/**
 * GET /api/teams/
 * Retrieve all teams
 */
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().populate('leader').populate('members');
        res.json({ message: 'Get all teams', data: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
/**
 * GET /api/teams/:id
 * Retrieve a specific team
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team.findById(id).populate('leader').populate('members');
        if (!team)
            return res.status(404).json({ error: 'Team not found' });
        res.json({ message: `Get team ${id}`, data: team });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
/**
 * POST /api/teams/
 * Create a new team
 */
router.post('/', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        await team.populate('leader');
        await team.populate('members');
        res.status(201).json({ message: 'Team created', data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
/**
 * PUT /api/teams/:id
 * Update a team
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team.findByIdAndUpdate(id, req.body, { new: true }).populate('leader').populate('members');
        if (!team)
            return res.status(404).json({ error: 'Team not found' });
        res.json({ message: `Team ${id} updated`, data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
/**
 * DELETE /api/teams/:id
 * Delete a team
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team.findByIdAndDelete(id);
        if (!team)
            return res.status(404).json({ error: 'Team not found' });
        res.json({ message: `Team ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
export default router;
