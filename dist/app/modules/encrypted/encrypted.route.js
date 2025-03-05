"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptedRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const encrypted_controller_1 = require("./encrypted.controller");
const router = express_1.default.Router();
// set encrypted pin
router.post('/set', (0, auth_1.default)(), encrypted_controller_1.encryptedController.setEncryptedPin);
// get all encrypted files and folders
router.post('/get-all', (0, auth_1.default)(), encrypted_controller_1.encryptedController.getEncryptedFilesAndFolders);
// remove encrypted pin
router.post('/remove', (0, auth_1.default)(), encrypted_controller_1.encryptedController.encryptedPinRemove);
// file encrypted
router.post('/file/:fileId', (0, auth_1.default)(), encrypted_controller_1.encryptedController.toggleFileEncrypt);
// folder encrypted
router.post('/folder/:folderId', (0, auth_1.default)(), encrypted_controller_1.encryptedController.toggleFolderEncrypt);
exports.encryptedRoutes = router;
