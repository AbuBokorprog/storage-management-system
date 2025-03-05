"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const files_controller_1 = require("./files.controller");
const sendFileToCloudinary_1 = require("../../utils/sendFileToCloudinary");
const router = express_1.default.Router();
router.post('/upload/:folderId', (0, auth_1.default)(), sendFileToCloudinary_1.upload.single('file'), files_controller_1.fileController.uploadFile);
router.get('/', (0, auth_1.default)(), files_controller_1.fileController.getAllFiles);
router.get('/users', (0, auth_1.default)(), files_controller_1.fileController.getAllFilesByUserId);
router.delete('/:id', (0, auth_1.default)(), files_controller_1.fileController.deleteFile);
router.patch('/:id/rename', (0, auth_1.default)(), files_controller_1.fileController.renameFile);
router.post('/:id/duplicate', (0, auth_1.default)(), files_controller_1.fileController.duplicateFile);
exports.fileRoutes = router;
