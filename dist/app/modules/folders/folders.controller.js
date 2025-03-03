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
const createFolder = (0, catchAsync_1.default)(async (req, res) => {
    const { name, parentId } = req.body;
    const { id } = req.user;
    const folder = await folders_service_1.foldersService.createFolder(id, name, parentId);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: 'Folder created successfully!',
        data: folder,
    });
});
const getFolders = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const folders = await folders_service_1.foldersService.getFoldersByUser(userId);
    res.status(http_status_1.default.OK).json({
        success: true,
        data: folders,
    });
});
exports.foldersController = { createFolder, getFolders };
