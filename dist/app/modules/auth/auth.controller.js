"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../config"));
const register = (0, catchAsync_1.default)(async (req, res) => {
    const user = await auth_service_1.authService.register(req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'User registered successfully!',
        data: user,
    });
});
const login = (0, catchAsync_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const data = await auth_service_1.authService.login(email, password);
    res.cookie('refreshToken', data.refresh_token, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User logged in successfully!',
        data,
    });
});
const forgetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const data = await auth_service_1.authService.forgetPassword(req.body.email);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Password reset link sent to your email!',
        data,
    });
});
const resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    await auth_service_1.authService.resetPassword(req.params.token, req.body.password);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Password reset successfully!',
    });
});
const changePassword = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    await auth_service_1.authService.changePassword(user.id, req.body.oldPassword, req.body.newPassword);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Password changed successfully!',
    });
});
exports.authController = {
    register,
    login,
    forgetPassword,
    resetPassword,
    changePassword,
};
