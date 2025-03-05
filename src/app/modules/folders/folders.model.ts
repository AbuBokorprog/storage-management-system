import mongoose, { Schema } from 'mongoose';
import { IFolder } from './folders.interface';

const folderSchema = new Schema<IFolder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
    name: { type: String, required: true },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isEncrypted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Folder = mongoose.model<IFolder>('Folder', folderSchema);
