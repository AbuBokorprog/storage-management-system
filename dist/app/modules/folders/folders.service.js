"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foldersService = void 0;
const folders_model_1 = require("./folders.model");
// create folder
const createFolder = async (userId, name, parentId) => {
    const folder = await folders_model_1.Folder.create({
        userId,
        name,
        parentId,
        files: [],
    });
    return folder;
};
// get folders by user
const getFoldersByUser = async (userId) => {
    const folders = await folders_model_1.Folder.find({ userId, isEncrypted: false });
    return folders;
};
// Delete a folder and its subfolders recursively
const deleteFolder = async (folderId) => {
    const folder = await folders_model_1.Folder.findById(folderId);
    if (!folder)
        throw new Error('Folder not found');
    // Delete all subfolders recursively
    await folders_model_1.Folder.deleteMany({ parentId: folderId });
    await folders_model_1.Folder.findByIdAndDelete(folderId);
};
// Rename a folder
const renameFolder = async (folderId, name) => {
    const folder = await folders_model_1.Folder.findByIdAndUpdate(folderId, { name }, { new: true });
    if (!folder)
        throw new Error('Folder not found');
    return folder;
};
// Duplicate a folder with auto-incremented name
const duplicateFolder = async (folderId, userId) => {
    const folder = await folders_model_1.Folder.findById(folderId);
    if (!folder)
        throw new Error('Folder not found');
    // Generate a new name with incremented copy number
    const baseName = folder.name;
    let newName = `${baseName} Copy`;
    // Find all existing copies to determine the correct number
    const existingFolders = await folders_model_1.Folder.find({
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
    const newFolder = await folders_model_1.Folder.create({
        userId,
        name: newName,
        parentId: folder.parentId,
        files: folder.files,
    });
    return newFolder;
};
exports.foldersService = {
    createFolder,
    getFoldersByUser,
    deleteFolder,
    renameFolder,
    duplicateFolder,
};
