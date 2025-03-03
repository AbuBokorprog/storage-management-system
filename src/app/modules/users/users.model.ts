import { Schema, model } from 'mongoose';
import { IUser } from './users.interface';

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    photo: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', UserSchema);
