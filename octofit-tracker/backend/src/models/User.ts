import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age?: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  teams: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
