"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const files_services_1 = require("./files.services");
const uploadFile = (0, catchAsync_1.default)(async (req, res) => {
    const { folderId } = req.params;
    const userId = req.user?._id;
    const fileUrl = await files_services_1.fileService.uploadFile(req.file, userId, folderId);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: 'File uploaded successfully!',
        data: { fileUrl },
    });
});
exports.fileController = { uploadFile };
