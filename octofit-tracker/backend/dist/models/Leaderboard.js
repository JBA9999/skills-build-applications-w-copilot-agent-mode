import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    username: { type: String, required: true },
    totalCaloriesBurned: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.model('Leaderboard', leaderboardSchema);
