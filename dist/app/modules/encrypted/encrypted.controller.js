"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptedController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const encrypted_services_1 = require("./encrypted.services");
const setEncryptedPin = (0, catchAsync_1.default)(async (req, res) => {
    const { pin } = req.body;
    const data = await encrypted_services_1.encryptedServices.setEncryptedPin(req.user.id, pin);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Encrypted pin set!',
        data,
    });
});
const getEncryptedFilesAndFolders = (0, catchAsync_1.default)(async (req, res) => {
    const { pin } = req.body;
    const data = await encrypted_services_1.encryptedServices.getEncryptedFilesAndFolders(req.user.id, pin);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieve all encrypted files and folders!',
        data,
    });
});
const encryptedPinRemove = (0, catchAsync_1.default)(async (req, res) => {
    const { pin } = req.body;
    const data = await encrypted_services_1.encryptedServices.encryptedPinRemove(req.user.id, pin);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Encrypted pin removed!',
        data,
    });
});
const toggleFileEncrypt = (0, catchAsync_1.default)(async (req, res) => {
    const { fileId } = req.params;
    const { pin } = req.body;
    await encrypted_services_1.encryptedServices.toggleFileEncrypt(req.user.id, pin, fileId);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'The file encrypted successfully!',
    });
});
const toggleFolderEncrypt = (0, catchAsync_1.default)(async (req, res) => {
    const { folderId } = req.params;
    const { pin } = req.body;
    await encrypted_services_1.encryptedServices.toggleFolderEncrypt(req.user.id, pin, folderId);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'The folder encrypted successfully!',
    });
});
exports.encryptedController = {
    setEncryptedPin,
    getEncryptedFilesAndFolders,
    encryptedPinRemove,
    toggleFileEncrypt,
    toggleFolderEncrypt,
};
