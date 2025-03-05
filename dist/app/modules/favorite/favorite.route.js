"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const favorite_controller_1 = require("./favorite.controller");
const router = express_1.default.Router();
router.post('/file/:fileId', (0, auth_1.default)(), favorite_controller_1.favoriteController.toggleFavoriteFile);
router.post('/folder/:folderId', (0, auth_1.default)(), favorite_controller_1.favoriteController.toggleFavoriteFolder);
router.get('/', (0, auth_1.default)(), favorite_controller_1.favoriteController.getAllFavoriteFilesAndFolders);
exports.favoriteRoutes = router;
