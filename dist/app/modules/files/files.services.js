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
const sendFileToCloudinary_1 = require("../../utils/sendFileToCloudinary");
const users_model_1 = require("../users/users.model");
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const cloudinary_1 = require("cloudinary");
// upload file
const uploadFile = async (file, userId, folderId) => {
    const user = await users_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    console.log(file);
    if (!file) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Please send file!');
    }
    const fileSize = file.size;
    // Check if the user has enough space for the file
    if (user.storageUsed + fileSize > user.maxStorage) {
        throw new Error('Not enough storage space.');
    }
    // Upload to Cloudinary
    const result = await (0, sendFileToCloudinary_1.sendFileToCloudinary)(file.originalname, file.path);
    // Save file data to DB
    const newFile = await files_model_1.File.create({
        userId,
        folderId,
        name: file.originalname,
        type: file.mimetype,
        path: result.secure_url,
        size: fileSize,
    });
    // Add the file to the folder's list of files
    await folders_model_1.Folder.findByIdAndUpdate(folderId, { $push: { files: newFile._id } });
    // Update user's storage usage
    user.storageUsed += fileSize;
    await user.save();
    return {
        fileUrl: result.secure_url,
        fileName: file.originalname,
    };
};
const getAllFiles = async () => {
    const data = await files_model_1.File.find({
        isEncrypted: false,
    });
    return data;
};
const getAllFilesByUserId = async (userId) => {
    const data = await files_model_1.File.find({ userId, isEncrypted: false });
    return data;
};
const deleteFile = async (fileId, userId) => {
    // Find the file and its size
    const file = await files_model_1.File.findById(fileId);
    if (!file) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'File not found');
    }
    // Get the user and their storage usage
    const user = await users_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Decrease the user's storage usage by the file's size
    user.storageUsed -= file.size;
    await user.save();
    // Delete the file from Cloudinary
    await cloudinary_1.v2.uploader.destroy(file.name, { resource_type: 'auto' });
    // Delete the file record from the database
    await files_model_1.File.findByIdAndDelete(fileId);
    return { success: true, message: 'File deleted successfully' };
};
// Rename a file
const renameFile = async (fileId, name) => {
    const file = await files_model_1.File.findByIdAndUpdate(fileId, { name }, { new: true, runValidators: true });
    if (!file)
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'File not found');
    return file;
};
// Duplicate a file with auto-incremented name
const duplicateFile = async (fileId, userId) => {
    const file = await files_model_1.File.findById(fileId);
    if (!file)
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'File not found');
    // Generate a new name with incremented copy number
    const baseName = file.name;
    let newName = `${baseName} Copy`;
    // Find all existing copies to determine the correct number
    const existingFiles = await files_model_1.File.find({
        userId,
        name: { $regex: `^${baseName} Copy( \\d+)?$`, $options: 'i' },
    });
    if (existingFiles.length > 0) {
        // Extract the highest number from existing copies
        const copyNumbers = existingFiles.map((f) => {
            const match = f.name.match(/Copy(?: (\d+))?$/);
            return match ? parseInt(match[1]) || 1 : 0;
        });
        const maxNumber = Math.max(...copyNumbers);
        // Increment the number for the new copy
        newName = `${baseName} Copy ${maxNumber + 1}`;
    }
    // Create the duplicated file
    const newFile = await files_model_1.File.create({
        userId,
        name: newName,
        folderId: file.folderId,
        path: file.path,
        size: file.size,
        type: file.type,
    });
    return newFile;
};
exports.fileService = {
    uploadFile,
    getAllFiles,
    getAllFilesByUserId,
    deleteFile,
    renameFile,
    duplicateFile,
};
