"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const files_model_1 = require("../files/files.model");
const users_model_1 = require("../users/users.model");
const formatBytes_1 = require("../../utils/formatBytes");
const folders_model_1 = require("../folders/folders.model");
const dashboardSummary = async (userId) => {
    const user = await users_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'The user not found!');
    }
    const folders = await folders_model_1.Folder.find({
        userId: user.id,
    });
    const totalNote = await files_model_1.File.find({
        userId: userId,
        type: 'application/msword' ||
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const totalPDF = await files_model_1.File.find({
        userId: userId,
        type: 'application/pdf',
    });
    const totalImage = await files_model_1.File.find({
        userId,
        type: { $regex: 'image' },
    });
    const recentFiles = await files_model_1.File.find({
        userId: userId,
    })
        .limit(10)
        .sort({ createdAt: -1 });
    const totalStorage = (0, formatBytes_1.formatBytes)(user?.maxStorage || 0);
    const usedStorage = (0, formatBytes_1.formatBytes)(user?.storageUsed || 0);
    const availableStorage = (0, formatBytes_1.formatBytes)((user?.maxStorage || 0) - (user?.storageUsed || 0));
    const pdfsStorage = totalPDF?.reduce((acc, current) => acc + current.size, 0);
    const notesStorage = totalNote?.reduce((acc, current) => acc + current.size, 0);
    const imagesStorage = totalImage?.reduce((acc, current) => acc + current.size, 0);
    // const foldersUsedStorage = formatBytes(
    //   pdfsStorage + notesStorage + imagesStorage,
    // );
    const pdfsUsedStorage = (0, formatBytes_1.formatBytes)(pdfsStorage);
    const notesUsedStorage = (0, formatBytes_1.formatBytes)(notesStorage);
    const imagesUsedStorage = (0, formatBytes_1.formatBytes)(imagesStorage);
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
exports.dashboardService = { dashboardSummary };
