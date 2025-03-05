"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const favorite_services_1 = require("./favorite.services");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const toggleFavoriteFile = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { fileId } = req.params;
    const data = await favorite_services_1.favoriteService.toggleFavoriteFile(userId, fileId);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Favorite folder updated!',
        data,
    });
});
const toggleFavoriteFolder = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { folderId } = req.params;
    const data = await favorite_services_1.favoriteService.toggleFavoriteFolder(userId, folderId);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Favorite folder updated!',
        data,
    });
});
const getAllFavoriteFilesAndFolders = (0, catchAsync_1.default)(async (req, res) => {
    const data = await favorite_services_1.favoriteService.getAllFavoriteFilesAndFolders(req.user.id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieve all files and folders!',
        data,
    });
});
exports.favoriteController = {
    toggleFavoriteFile,
    toggleFavoriteFolder,
    getAllFavoriteFilesAndFolders,
};
