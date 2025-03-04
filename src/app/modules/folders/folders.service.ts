import { Folder } from './folders.model';

// create folder
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

// get folders by user
const getFoldersByUser = async (userId: string) => {
  const folders = await Folder.find({ userId });
  return folders;
};

// Delete a folder and its subfolders recursively
const deleteFolder = async (folderId: string) => {
  const folder = await Folder.findById(folderId);
  if (!folder) throw new Error('Folder not found');

  // Delete all subfolders recursively
  await Folder.deleteMany({ parentId: folderId });
  await Folder.findByIdAndDelete(folderId);
};

// Rename a folder
const renameFolder = async (folderId: string, name: string) => {
  const folder = await Folder.findByIdAndUpdate(
    folderId,
    { name },
    { new: true },
  );
  if (!folder) throw new Error('Folder not found');
  return folder;
};

// Duplicate a folder with auto-incremented name
const duplicateFolder = async (folderId: string, userId: string) => {
  const folder = await Folder.findById(folderId);
  if (!folder) throw new Error('Folder not found');

  // Generate a new name with incremented copy number
  const baseName = folder.name;
  let newName = `${baseName} Copy`;

  // Find all existing copies to determine the correct number
  const existingFolders = await Folder.find({
    userId,
    name: { $regex: `^${baseName} Copy( \\d+)?$`, $options: 'i' },
  });

  if (existingFolders.length > 0) {
    // Extract the highest number from existing copies
    const copyNumbers = existingFolders.map((f) => {
      const match = f.name.match(/Copy(?: (\d+))?$/);
      return match ? parseInt(match[1]) || 1 : 0;
    });
    const maxNumber = Math.max(...copyNumbers);

    // Increment the number for the new copy
    newName = `${baseName} Copy ${maxNumber + 1}`;
  }

  // Create the duplicated folder
  const newFolder = await Folder.create({
    userId,
    name: newName,
    parentId: folder.parentId,
    files: folder.files,
  });

  return newFolder;
};

export const foldersService = {
  createFolder,
  getFoldersByUser,
  deleteFolder,
  renameFolder,
  duplicateFolder,
};
