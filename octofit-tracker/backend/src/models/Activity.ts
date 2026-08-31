import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  caloriesBurned: number;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
