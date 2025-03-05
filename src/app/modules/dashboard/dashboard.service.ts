import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { File } from '../files/files.model';
import { User } from '../users/users.model';
import { formatBytes } from '../../utils/formatBytes';
import { Folder } from '../folders/folders.model';

const dashboardSummary = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
  }

  const folders = await Folder.find({
    userId: user.id,
  });

  const totalNote = await File.find({
    userId: userId,
    type:
      'application/msword' ||
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const totalPDF = await File.find({
    userId: userId,
    type: 'application/pdf',
  });

  const totalImage = await File.find({
    userId,

    type: { $regex: 'image' },
  });

  const recentFiles = await File.find({
    userId: userId,
  })
    .limit(10)
    .sort({ createdAt: -1 });

  const totalStorage = formatBytes(user?.maxStorage || 0);
  const usedStorage = formatBytes(user?.storageUsed || 0);
  const availableStorage = formatBytes(
    (user?.maxStorage || 0) - (user?.storageUsed || 0),
  );

  const pdfsStorage = totalPDF?.reduce((acc, current) => acc + current.size, 0);
  const notesStorage = totalNote?.reduce(
    (acc, current) => acc + current.size,
    0,
  );
  const imagesStorage = totalImage?.reduce(
    (acc, current) => acc + current.size,
    0,
  );
  // const foldersUsedStorage = formatBytes(
  //   pdfsStorage + notesStorage + imagesStorage,
  // );
  const pdfsUsedStorage = formatBytes(pdfsStorage);
  const notesUsedStorage = formatBytes(notesStorage);
  const imagesUsedStorage = formatBytes(imagesStorage);

  return {
    totalStorage,
    usedStorage,
    availableStorage,
    folders: {
      totalFolders: folders?.length,
      usedStorage: usedStorage,
    },
    pdf: {
      totalPDF: totalPDF?.length,
      usedStorage: pdfsUsedStorage,
    },
    images: {
      totalImage: totalImage?.length,
      usedStorage: imagesUsedStorage,
    },
    notes: {
      totalNote: totalNote.length,
      usedStorage: notesUsedStorage,
    },
    recentFiles,
  };
};

export const dashboardService = { dashboardSummary };
