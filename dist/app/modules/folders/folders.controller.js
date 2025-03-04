"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foldersController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const folders_service_1 = require("./folders.service");
const http_status_1 = __importDefault(require("http-status"));
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
// create folder
const createFolder = (0, catchAsync_1.default)(async (req, res) => {
    const { name, parentId } = req.body;
    const { id } = req.user;
    const folder = await folders_service_1.foldersService.createFolder(id, name, parentId);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Folder created successfully!',
        data: folder,
    });
});
// Get all folders by user
const getFolders = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const folders = await folders_service_1.foldersService.getFoldersByUser(userId);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieve all folders successfully!',
        data: folders,
    });
});
// Delete a folder
const deleteFolder = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    await folders_service_1.foldersService.deleteFolder(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Folder deleted successfully!',
    });
});
// Rename a folder
const renameFolder = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const folder = await folders_service_1.foldersService.renameFolder(id, name);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Folder renamed successfully!',
        data: folder,
    });
});
// Duplicate a folder
const duplicateFolder = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const duplicatedFolder = await folders_service_1.foldersService.duplicateFolder(id, user?.id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Folder duplicated successfully!',
        data: duplicatedFolder,
    });
});
exports.foldersController = {
    createFolder,
    getFolders,
    deleteFolder,
    renameFolder,
    duplicateFolder,
};
