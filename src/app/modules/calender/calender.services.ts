import { File } from '../files/files.model';
import { Folder } from '../folders/folders.model';

const getAllFilesAndFolders = async (userId: string, query: any) => {
  const filter: any = { userId, isEncrypted: false };

  if (query.createdAt) {
    const startOfDay = new Date(query.createdAt);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(query.createdAt);
    endOfDay.setHours(23, 59, 59, 999);

    filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
  }
  const files = await File.find(filter);
  const folders = await Folder.find(filter);
  return {
    files,
    folders,
  };
};

export const calenderServices = { getAllFilesAndFolders };
