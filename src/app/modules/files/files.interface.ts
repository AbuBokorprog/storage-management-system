import mongoose from 'mongoose';

export interface IFile {
  userId: mongoose.Types.ObjectId;
  folderId: mongoose.Types.ObjectId | null;
  name: string;
  type: string;
  path: string;
  size: number;
  isFavorite: boolean;
  isEncrypted: boolean;
}
