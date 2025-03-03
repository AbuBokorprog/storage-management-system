import { Folder } from './folders.model';

const createFolder = async (
  userId: string,
  name: string,
  parentId: string | null,
) => {
  const folder = await Folder.create({
    userId,
    name,
    parentId,
    files: [],
  });
  return folder;
};

const getFoldersByUser = async (userId: string) => {
  const folders = await Folder.find({ userId });
  return folders;
};

export const foldersService = { createFolder, getFoldersByUser };
