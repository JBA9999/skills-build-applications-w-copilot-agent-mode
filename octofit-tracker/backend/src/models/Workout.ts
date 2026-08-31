import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    duration?: number;
  }>;
  estimatedDuration: number;
  calorieEstimate: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    description: { type: String },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number },
        reps: { type: Number },
        duration: { type: Number },
      },
    ],
    estimatedDuration: { type: Number, required: true },
    calorieEstimate: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
