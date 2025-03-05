"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const files_services_1 = require("./files.services");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
// upload file
const uploadFile = (0, catchAsync_1.default)(async (req, res) => {
    const { folderId } = req.params;
    const userId = req.user?.id;
    const fileData = await files_services_1.fileService.uploadFile(req.file, userId, folderId);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'File uploaded successfully!',
        data: fileData,
    });
});
// get all files
const getAllFiles = (0, catchAsync_1.default)(async (req, res) => {
    const fileData = await files_services_1.fileService.getAllFiles();
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'File retrieve successfully!',
        data: fileData,
    });
});
// get all files by user id
const getAllFilesByUserId = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.user;
    const fileData = await files_services_1.fileService.getAllFilesByUserId(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'File retrieve successfully!',
        data: fileData,
    });
});
// delete file
const deleteFile = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const file = await files_services_1.fileService.deleteFile(id, req.user.id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'File deleted successfully!',
        data: file,
    });
});
// Rename a folder
const renameFile = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const file = await files_services_1.fileService.renameFile(id, name);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'File renamed successfully!',
        data: file,
    });
});
// Duplicate a folder
const duplicateFile = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const duplicatedFile = await files_services_1.fileService.duplicateFile(id, user?.id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'File duplicated successfully!',
        data: duplicatedFile,
    });
});
exports.fileController = {
    uploadFile,
    getAllFiles,
    getAllFilesByUserId,
    deleteFile,
    renameFile,
    duplicateFile,
};
