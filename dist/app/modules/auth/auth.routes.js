"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
// import auth from '../../middleware/auth';
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.authValidation.registerSchema), auth_controller_1.authController.register);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidation.loginSchema), auth_controller_1.authController.login);
router.post('/forget-password', (0, validateRequest_1.default)(auth_validation_1.authValidation.forgetPasswordSchema), auth_controller_1.authController.forgetPassword);
router.post('/reset-password/:token', (0, validateRequest_1.default)(auth_validation_1.authValidation.resetPasswordSchema), auth_controller_1.authController.resetPassword);
router.patch('/change-password', (0, auth_1.default)(), (0, validateRequest_1.default)(auth_validation_1.authValidation.changePasswordSchema), auth_controller_1.authController.changePassword);
exports.AuthRoutes = router;
