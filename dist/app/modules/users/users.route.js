"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const sendFileToCloudinary_1 = require("../../utils/sendFileToCloudinary");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const users_validation_1 = require("./users.validation");
const router = express_1.default.Router();
router.get('/', users_controller_1.usersController.getAllUsers);
router.get('/me', (0, auth_1.default)(), users_controller_1.usersController.getMe);
router.patch('/update-profile', sendFileToCloudinary_1.upload.single('image'), (0, auth_1.default)(), (req, res, next) => {
    // req.body = JSON.parse(req?.body?.data);
    next();
}, (0, validateRequest_1.default)(users_validation_1.userValidation.updateProfile), users_controller_1.usersController.updateMyProfile);
exports.UserRoutes = router;
