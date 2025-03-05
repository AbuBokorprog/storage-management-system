"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const files_model_1 = require("../files/files.model");
const folders_model_1 = require("../folders/folders.model");
const users_model_1 = require("../users/users.model");
const toggleFavoriteFile = async (userId, fileId) => {
    const user = await users_model_1.User.findById(userId);
    if (!user)
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    const isAlreadyFavorite = await files_model_1.File.findOne({
        userId: userId,
        id: fileId,
        isFavorite: true,
    });
    if (isAlreadyFavorite) {
        await files_model_1.File.findByIdAndUpdate(fileId, { isFavorite: false }, { new: true, runValidators: true });
    }
    else {
        await files_model_1.File.findByIdAndUpdate(fileId, { isFavorite: true }, { new: true, runValidators: true });
    }
};
const toggleFavoriteFolder = async (userId, folderId) => {
    const user = await users_model_1.User.findById(userId);
    if (!user)
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    const isAlreadyFavorite = await folders_model_1.Folder.findOne({
        userId: userId,
        id: folderId,
        isFavorite: true,
    });
    if (isAlreadyFavorite) {
        await folders_model_1.Folder.findByIdAndUpdate(folderId, { isFavorite: false }, { new: true, runValidators: true });
    }
    else {
        await folders_model_1.Folder.findByIdAndUpdate(folderId, { isFavorite: true }, { new: true, runValidators: true });
    }
};
const getAllFavoriteFilesAndFolders = async (userId) => {
    const files = await files_model_1.File.find({
        userId: userId,
        isFavorite: true,
        isEncrypted: false,
    });
    const folders = await folders_model_1.Folder.find({
        userId: userId,
        isFavorite: true,
        isEncrypted: false,
    });
    return {
        files,
        folders,
    };
};
exports.favoriteService = {
    toggleFavoriteFile,
    toggleFavoriteFolder,
    getAllFavoriteFilesAndFolders,
};
