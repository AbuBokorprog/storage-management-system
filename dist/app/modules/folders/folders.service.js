"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foldersService = void 0;
const folders_model_1 = require("./folders.model");
const createFolder = async (userId, name, parentId) => {
    const folder = await folders_model_1.Folder.create({
        userId,
        name,
        parentId,
        files: [],
    });
    return folder;
};
const getFoldersByUser = async (userId) => {
    const folders = await folders_model_1.Folder.find({ userId });
    return folders;
};
exports.foldersService = { createFolder, getFoldersByUser };
