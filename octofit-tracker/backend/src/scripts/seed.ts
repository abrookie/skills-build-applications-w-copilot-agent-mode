import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Thunderbolts', members: [] },
      { name: 'Iron Wolves', members: [] },
    ]);

    const [thunderbolts, ironWolves] = teams;

    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@octofit.com', age: 29, team: thunderbolts._id },
      { name: 'Grace Hopper', email: 'grace@octofit.com', age: 34, team: thunderbolts._id },
      { name: 'Alan Turing', email: 'alan@octofit.com', age: 27, team: ironWolves._id },
      { name: 'Margaret Hamilton', email: 'margaret@octofit.com', age: 31, team: ironWolves._id },
    ]);

    const [ada, grace, alan, margaret] = users;

    await Team.findByIdAndUpdate(thunderbolts._id, { members: [ada._id, grace._id] });
    await Team.findByIdAndUpdate(ironWolves._id, { members: [alan._id, margaret._id] });

    await Activity.insertMany([
      { user: ada._id, type: 'Running', duration: 30, caloriesBurned: 300, date: new Date('2026-08-20') },
      { user: grace._id, type: 'Cycling', duration: 45, caloriesBurned: 400, date: new Date('2026-08-21') },
      { user: alan._id, type: 'Swimming', duration: 60, caloriesBurned: 500, date: new Date('2026-08-22') },
      { user: margaret._id, type: 'Yoga', duration: 20, caloriesBurned: 120, date: new Date('2026-08-23') },
    ]);

    await Leaderboard.insertMany([
      { user: ada._id, team: thunderbolts._id, points: 850 },
      { user: grace._id, team: thunderbolts._id, points: 920 },
      { user: alan._id, team: ironWolves._id, points: 780 },
      { user: margaret._id, team: ironWolves._id, points: 640 },
    ]);

    await Workout.insertMany([
      {
        name: 'Beginner Full Body',
        description: 'A gentle full-body routine to build a fitness foundation.',
        difficulty: 'beginner',
        suggestedFor: [margaret._id],
      },
      {
        name: 'Interval Cardio Blast',
        description: 'High-intensity intervals to boost cardiovascular endurance.',
        difficulty: 'intermediate',
        suggestedFor: [ada._id, alan._id],
      },
      {
        name: 'Advanced Strength Circuit',
        description: 'A demanding strength circuit for experienced athletes.',
        difficulty: 'advanced',
        suggestedFor: [grace._id],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
