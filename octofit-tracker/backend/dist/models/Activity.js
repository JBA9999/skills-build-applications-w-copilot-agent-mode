import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String },
}, { timestamps: true });
export default mongoose.model('Activity', activitySchema);
