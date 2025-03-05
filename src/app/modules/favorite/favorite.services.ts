import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { File } from '../files/files.model';
import { Folder } from '../folders/folders.model';
import { User } from '../users/users.model';

const toggleFavoriteFile = async (userId: string, fileId: string) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const isAlreadyFavorite = await File.findOne({
    userId: userId,
    id: fileId,
    isFavorite: true,
  });

  if (isAlreadyFavorite) {
    await File.findByIdAndUpdate(
      fileId,
      { isFavorite: false },
      { new: true, runValidators: true },
    );
  } else {
    await File.findByIdAndUpdate(
      fileId,
      { isFavorite: true },
      { new: true, runValidators: true },
    );
  }
};

const toggleFavoriteFolder = async (userId: string, folderId: string) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const isAlreadyFavorite = await Folder.findOne({
    userId: userId,
    id: folderId,
    isFavorite: true,
  });

  if (isAlreadyFavorite) {
    await Folder.findByIdAndUpdate(
      folderId,
      { isFavorite: false },
      { new: true, runValidators: true },
    );
  } else {
    await Folder.findByIdAndUpdate(
      folderId,
      { isFavorite: true },
      { new: true, runValidators: true },
    );
  }
};

const getAllFavoriteFilesAndFolders = async (userId: string) => {
  const files = await File.find({
    userId: userId,
    isFavorite: true,
    isEncrypted: false,
  });

  const folders = await Folder.find({
    userId: userId,
    isFavorite: true,
    isEncrypted: false,
  });

  return {
    files,
    folders,
  };
};

export const favoriteService = {
  toggleFavoriteFile,
  toggleFavoriteFolder,
  getAllFavoriteFilesAndFolders,
};
