/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { File } from './files.model';
import { Folder } from '../folders/folders.model';
import { sendFileToCloudinary } from '../../utils/sendFileToCloudinary';
import { User } from '../users/users.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { v2 as cloudinary } from 'cloudinary';

// upload file
const uploadFile = async (file: any, userId: string, folderId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please send file!');
  }

  const fileSize = file.size;

  // Check if the user has enough space for the file
  if (user.storageUsed + fileSize > user.maxStorage) {
    throw new Error('Not enough storage space.');
  }

  // Upload to Cloudinary
  const result = await sendFileToCloudinary(file.originalname, file.path);

  // Save file data to DB
  const newFile = await File.create({
    userId,
    folderId,
    name: file.originalname,
    type: file.mimetype,
    path: result.secure_url,
    size: fileSize,
  });

  // Add the file to the folder's list of files
  await Folder.findByIdAndUpdate(folderId, { $push: { files: newFile._id } });

  // Update user's storage usage
  user.storageUsed += fileSize;
  await user.save();

  return {
    fileUrl: result.secure_url,
    fileName: file.originalname,
  };
};

const getAllFiles = async () => {
  const data = await File.find({
    isEncrypted: false,
  });
  return data;
};

const getAllFilesByUserId = async (userId: string, query: any) => {
  let dateQuery;

  if (query.createdAt) {
    dateQuery = new Date(query.createdAt);
  }

  const data = await File.find({
    userId: userId,
    createdAt: dateQuery,
    isEncrypted: false,
  });
  return data;
};

const deleteFile = async (fileId: string, userId: string) => {
  // Find the file and its size
  const file = await File.findById(fileId);

  if (!file) {
    throw new AppError(httpStatus.NOT_FOUND, 'File not found');
  }

  // Get the user and their storage usage
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Decrease the user's storage usage by the file's size
  user.storageUsed -= file.size;
  await user.save();

  // Delete the file from Cloudinary
  await cloudinary.uploader.destroy(file.name, { resource_type: 'auto' });

  // Delete the file record from the database
  await File.findByIdAndDelete(fileId);

  return { success: true, message: 'File deleted successfully' };
};

// Rename a file
const renameFile = async (fileId: string, name: string) => {
  const file = await File.findByIdAndUpdate(
    fileId,
    { name },
    { new: true, runValidators: true },
  );
  if (!file) throw new AppError(httpStatus.NOT_FOUND, 'File not found');
  return file;
};

// Duplicate a file with auto-incremented name
const duplicateFile = async (fileId: string, userId: string) => {
  const file = await File.findById(fileId);
  if (!file) throw new AppError(httpStatus.NOT_FOUND, 'File not found');

  // Generate a new name with incremented copy number
  const baseName = file.name;
  let newName = `${baseName} Copy`;

  // Find all existing copies to determine the correct number
  const existingFiles = await File.find({
    userId,
    name: { $regex: `^${baseName} Copy( \\d+)?$`, $options: 'i' },
  });

  if (existingFiles.length > 0) {
    // Extract the highest number from existing copies
    const copyNumbers = existingFiles.map((f) => {
      const match = f.name.match(/Copy(?: (\d+))?$/);
      return match ? parseInt(match[1]) || 1 : 0;
    });
    const maxNumber = Math.max(...copyNumbers);

    // Increment the number for the new copy
    newName = `${baseName} Copy ${maxNumber + 1}`;
  }

  // Create the duplicated file
  const newFile = await File.create({
    userId,
    name: newName,
    folderId: file.folderId,
    path: file.path,
    size: file.size,
    type: file.type,
  });

  return newFile;
};

export const fileService = {
  uploadFile,
  getAllFiles,
  getAllFilesByUserId,
  deleteFile,
  renameFile,
  duplicateFile,
};
