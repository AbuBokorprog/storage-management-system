"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foldersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const folders_controller_1 = require("./folders.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const folders_validation_1 = require("./folders.validation");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(), (0, validateRequest_1.default)(folders_validation_1.folderValidation.createFolderSchema), folders_controller_1.foldersController.createFolder);
router.get('/', (0, auth_1.default)(), folders_controller_1.foldersController.getFolders);
exports.foldersRoutes = router;
