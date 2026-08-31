/**
 * Seed the octofit_db database with test data
 * 
 * This script initializes the Octofit database with realistic sample data
 * for users, teams, activities, workouts, and leaderboard entries.
 * 
 * Usage: npm run seed
 */

import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Workout from '../models/Workout.js';
import Leaderboard from '../models/Leaderboard.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    console.log('Connecting to octofit_db...');
    await mongoose.connect(connectionString);
    console.log('Connected successfully!');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);
    console.log('Data cleared.');

    // Create sample users
    console.log('Creating sample users...');
    const users = await User.create([
      {
        username: 'alice_runner',
        email: 'alice@example.com',
        password: 'hashedpassword1',
        firstName: 'Alice',
        lastName: 'Johnson',
        age: 28,
        fitnessLevel: 'advanced',
        teams: [],
      },
      {
        username: 'bob_lifter',
        email: 'bob@example.com',
        password: 'hashedpassword2',
        firstName: 'Bob',
        lastName: 'Smith',
        age: 35,
        fitnessLevel: 'intermediate',
        teams: [],
      },
      {
        username: 'charlie_cyclist',
        email: 'charlie@example.com',
        password: 'hashedpassword3',
        firstName: 'Charlie',
        lastName: 'Brown',
        age: 42,
        fitnessLevel: 'beginner',
        teams: [],
      },
      {
        username: 'diana_yogi',
        email: 'diana@example.com',
        password: 'hashedpassword4',
        firstName: 'Diana',
        lastName: 'Lee',
        age: 31,
        fitnessLevel: 'intermediate',
        teams: [],
      },
      {
        username: 'eve_swimmer',
        email: 'eve@example.com',
        password: 'hashedpassword5',
        firstName: 'Eve',
        lastName: 'Martinez',
        age: 27,
        fitnessLevel: 'advanced',
        teams: [],
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample teams
    console.log('Creating sample teams...');
    const teams = await Team.create([
      {
        name: 'Morning Runners Club',
        description: 'Early birds who love running',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[3]._id],
      },
      {
        name: 'Gym Warriors',
        description: 'Strength training enthusiasts',
        leader: users[1]._id,
        members: [users[1]._id, users[2]._id, users[4]._id],
      },
      {
        name: 'Wellness Warriors',
        description: 'Holistic health and fitness',
        leader: users[3]._id,
        members: [users[0]._id, users[3]._id, users[4]._id],
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Update users with team memberships
    users[0].teams = [teams[0]._id, teams[2]._id];
    users[1].teams = [teams[0]._id, teams[1]._id];
    users[2].teams = [teams[1]._id];
    users[3].teams = [teams[0]._id, teams[2]._id];
    users[4].teams = [teams[1]._id, teams[2]._id];
    await Promise.all(users.map((u) => u.save()));

    // Create sample workouts
    console.log('Creating sample workouts...');
    const workouts = await Workout.create([
      {
        name: 'Morning Run',
        description: 'A refreshing 5km run to start your day',
        fitnessLevel: 'beginner',
        exercises: [
          { name: 'Warm-up jog', duration: 5 },
          { name: 'Main run', duration: 25 },
          { name: 'Cool-down walk', duration: 5 },
        ],
        estimatedDuration: 35,
        calorieEstimate: 350,
      },
      {
        name: 'Full Body Strength',
        description: 'Complete workout targeting all muscle groups',
        fitnessLevel: 'intermediate',
        exercises: [
          { name: 'Squats', sets: 3, reps: 10 },
          { name: 'Bench Press', sets: 3, reps: 8 },
          { name: 'Deadlifts', sets: 3, reps: 6 },
          { name: 'Push-ups', sets: 2, reps: 15 },
        ],
        estimatedDuration: 60,
        calorieEstimate: 450,
      },
      {
        name: 'Yoga Flow',
        description: 'Relaxing yoga session for flexibility and mindfulness',
        fitnessLevel: 'beginner',
        exercises: [
          { name: 'Sun salutations', duration: 10 },
          { name: 'Standing poses', duration: 20 },
          { name: 'Seated stretches', duration: 15 },
          { name: 'Meditation', duration: 10 },
        ],
        estimatedDuration: 55,
        calorieEstimate: 200,
      },
      {
        name: 'HIIT Cardio Blast',
        description: 'High-intensity interval training for maximum burn',
        fitnessLevel: 'advanced',
        exercises: [
          { name: 'Burpees', duration: 30 },
          { name: 'Mountain climbers', duration: 30 },
          { name: 'Jump squats', duration: 30 },
          { name: 'Rest', duration: 30 },
        ],
        estimatedDuration: 30,
        calorieEstimate: 400,
      },
      {
        name: 'Cyclist Training',
        description: 'Endurance building cycling session',
        fitnessLevel: 'intermediate',
        exercises: [
          { name: 'Easy pace warm-up', duration: 10 },
          { name: 'Steady climb', distance: 15 },
          { name: 'Cool down', duration: 10 },
        ],
        estimatedDuration: 60,
        calorieEstimate: 500,
      },
    ]);
    console.log(`Created ${workouts.length} workouts`);

    // Create sample activities
    console.log('Creating sample activities...');
    const now = new Date();
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 35,
        distance: 5,
        caloriesBurned: 345,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        description: 'Morning run in the park',
      },
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 40,
        distance: 6,
        caloriesBurned: 420,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        description: 'Evening run by the river',
      },
      {
        userId: users[1]._id,
        type: 'Weightlifting',
        duration: 60,
        caloriesBurned: 450,
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        description: 'Chest and triceps day',
      },
      {
        userId: users[1]._id,
        type: 'Weightlifting',
        duration: 50,
        caloriesBurned: 400,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        description: 'Back and biceps workout',
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        duration: 90,
        distance: 25,
        caloriesBurned: 550,
        date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        description: 'Long distance tour',
      },
      {
        userId: users[3]._id,
        type: 'Yoga',
        duration: 60,
        caloriesBurned: 180,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        description: 'Relaxing evening yoga',
      },
      {
        userId: users[4]._id,
        type: 'Swimming',
        duration: 45,
        distance: 1.5,
        caloriesBurned: 420,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        description: 'Morning swim session',
      },
      {
        userId: users[4]._id,
        type: 'Running',
        duration: 30,
        distance: 4,
        caloriesBurned: 280,
        date: now,
        description: 'Quick morning jog',
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create leaderboard entries based on activities
    console.log('Creating leaderboard entries...');
    const leaderboardEntries = await Promise.all(
      users.map(async (user) => {
        const userActivities = await Activity.find({ userId: user._id });
        const totalCaloriesBurned = userActivities.reduce((sum, a) => sum + a.caloriesBurned, 0);
        const totalActivities = userActivities.length;
        const totalDuration = userActivities.reduce((sum, a) => sum + a.duration, 0);

        return {
          userId: user._id,
          username: user.username,
          totalCaloriesBurned,
          totalActivities,
          totalDuration,
          rank: 0,
        };
      })
    );

    // Sort by calories burned and assign ranks
    leaderboardEntries.sort((a, b) => b.totalCaloriesBurned - a.totalCaloriesBurned);
    leaderboardEntries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    const savedLeaderboard = await Leaderboard.create(leaderboardEntries);
    console.log(`Created ${savedLeaderboard.length} leaderboard entries`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\nSummary:`);
    console.log(`  - Users: ${users.length}`);
    console.log(`  - Teams: ${teams.length}`);
    console.log(`  - Workouts: ${workouts.length}`);
    console.log(`  - Activities: ${activities.length}`);
    console.log(`  - Leaderboard Entries: ${savedLeaderboard.length}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
