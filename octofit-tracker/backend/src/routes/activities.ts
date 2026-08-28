import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user');
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Error updating activity', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity', error });
  }
});

export default router;
