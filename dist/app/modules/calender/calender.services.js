"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calenderServices = void 0;
const files_model_1 = require("../files/files.model");
const folders_model_1 = require("../folders/folders.model");
const getAllFilesAndFolders = async (userId, query) => {
    const filter = { userId, isEncrypted: false };
    if (query.createdAt) {
        const startOfDay = new Date(query.createdAt);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(query.createdAt);
        endOfDay.setHours(23, 59, 59, 999);
        filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }
    const files = await files_model_1.File.find(filter);
    const folders = await folders_model_1.Folder.find(filter);
    return {
        files,
        folders,
    };
};
exports.calenderServices = { getAllFilesAndFolders };
