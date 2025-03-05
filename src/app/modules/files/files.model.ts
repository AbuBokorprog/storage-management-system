import mongoose, { Schema } from 'mongoose';
import { IFile } from './files.interface';

const fileSchema = new Schema<IFile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    folderId: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
    name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
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

export const File = mongoose.model<IFile>('File', fileSchema);
