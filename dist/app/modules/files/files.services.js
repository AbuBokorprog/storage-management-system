"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileService = void 0;
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
const files_model_1 = require("./files.model");
const folders_model_1 = require("../folders/folders.model");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadFile = async (file, userId, folderId) => {
    const filePath = path_1.default.join(__dirname, '../../../uploads/user_folders', userId, folderId, file.filename);
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
    }
    const fileUrl = `/uploads/user_folders/${userId}/${folderId}/${file.filename}`;
    // Save file data to DB
    const newFile = await files_model_1.File.create({
        userId,
        folderId,
        name: file.originalname,
        type: file.mimetype,
        path: fileUrl,
    });
    // Add the file to the folder's list of files
    await folders_model_1.Folder.findByIdAndUpdate(folderId, { $push: { files: newFile._id } });
    return fileUrl;
};
exports.fileService = { uploadFile };
