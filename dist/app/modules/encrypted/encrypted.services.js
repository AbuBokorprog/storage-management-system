"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptedServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = require("../users/users.model");
const files_model_1 = require("../files/files.model");
const folders_model_1 = require("../folders/folders.model");
const setEncryptedPin = async (userId, pin) => {
    const isExistUser = await users_model_1.User.findById(userId);
    if (!isExistUser)
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'The user not found!');
    if (!pin) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'PIN is required');
    }
    const hashedPin = await bcrypt_1.default.hash(pin, 10);
    const user = await users_model_1.User.findByIdAndUpdate(userId, {
        encryptedPin: hashedPin,
    }, { new: true, runValidators: true });
    return user;
};
const getEncryptedFilesAndFolders = async (userId, pin) => {
    const isExistUser = await users_model_1.User.findById(userId);
    if (!isExistUser) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'The user not found!');
    }
    if (!pin) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'PIN is required');
    }
    const isMatch = await bcrypt_1.default.compare(pin, isExistUser.encryptedPin);
    if (!isMatch)
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "Invalid PIN'");
    const files = await files_model_1.File.find({ userId, isEncrypted: true });
    const folders = await folders_model_1.Folder.find({ userId, isEncrypted: true });
    return { files, folders };
};
const encryptedPinRemove = async (userId, pin) => {
    const isExistUser = await users_model_1.User.findById(userId);
    if (!isExistUser) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'The user not found!');
    }
    const isMatch = await bcrypt_1.default.compare(pin, isExistUser.encryptedPin);
    if (!isMatch)
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "Invalid PIN'");
    await users_model_1.User.findByIdAndUpdate(userId, { encryptedPin: null });
    await files_model_1.File.updateMany({ userId, isEncrypted: true }, {
        isEncrypted: false,
    });
    await folders_model_1.Folder.updateMany({ userId, isEncrypted: true }, {
        isEncrypted: false,
    });
    return isExistUser;
};
const toggleFileEncrypt = async (userId, pin, fileId) => {
    const user = await users_model_1.User.findById(userId);
    if (!user?.encryptedPin) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'No encrypted PIN set');
    }
    const isMatch = await bcrypt_1.default.compare(pin, user.encryptedPin);
    if (!isMatch)
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "Invalid PIN'");
    const isFileEncrypted = await files_model_1.File.findById(fileId);
    if (isFileEncrypted?.isEncrypted) {
        await files_model_1.File.findByIdAndUpdate(fileId, {
            isEncrypted: false,
        });
    }
    else {
        await files_model_1.File.findByIdAndUpdate(fileId, {
            isEncrypted: true,
        });
    }
};
const toggleFolderEncrypt = async (userId, pin, folderId) => {
    const user = await users_model_1.User.findById(userId);
    if (!user?.encryptedPin) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'No encrypted PIN set');
    }
    const isMatch = await bcrypt_1.default.compare(pin, user.encryptedPin);
    if (!isMatch)
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "Invalid PIN'");
    const isFolderEncrypted = await folders_model_1.Folder.findById(folderId);
    if (isFolderEncrypted?.isEncrypted) {
        await folders_model_1.Folder.findByIdAndUpdate(folderId, {
            isEncrypted: false,
        });
    }
    else {
        await folders_model_1.Folder.findByIdAndUpdate(folderId, {
            isEncrypted: true,
        });
    }
};
exports.encryptedServices = {
    setEncryptedPin,
    getEncryptedFilesAndFolders,
    encryptedPinRemove,
    toggleFileEncrypt,
    toggleFolderEncrypt,
};
