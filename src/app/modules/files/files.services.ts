/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { File } from './files.model';
import { Folder } from '../folders/folders.model';
import path from 'path';
import fs from 'fs';

const uploadFile = async (file: any, userId: string, folderId: string) => {
  const filePath = path.join(
    __dirname,
    '../../../uploads/user_folders',
    userId,
    folderId,
    file.filename,
  );
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  const fileUrl = `/uploads/user_folders/${userId}/${folderId}/${file.filename}`;

  // Save file data to DB
  const newFile = await File.create({
    userId,
    folderId,
    name: file.originalname,
    type: file.mimetype,
    path: fileUrl,
  });

  // Add the file to the folder's list of files
  await Folder.findByIdAndUpdate(folderId, { $push: { files: newFile._id } });

  return fileUrl;
};

export const fileService = { uploadFile };
