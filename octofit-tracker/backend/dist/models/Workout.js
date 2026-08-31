import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
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
}, { timestamps: true });
export default mongoose.model('Workout', workoutSchema);
