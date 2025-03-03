import mongoose from 'mongoose';

export interface IFolder {
  userId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId | null;
  name: string;
  files: mongoose.Types.ObjectId[];
}
