import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ points: -1 }).populate('user').populate('team');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findById(req.params.id).populate('user').populate('team');
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard entry', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const entry = await Leaderboard.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error creating leaderboard entry', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error updating leaderboard entry', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting leaderboard entry', error });
  }
});

export default router;
