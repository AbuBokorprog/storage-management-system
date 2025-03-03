"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const http_status_1 = __importDefault(require("http-status"));
const users_services_1 = require("./users.services");
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const users = await users_services_1.usersServices.getAllUsers();
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Users retrieve successfully!',
        data: users,
    });
});
const getMe = (0, catchAsync_1.default)(async (req, res) => {
    const users = await users_services_1.usersServices.getMe(req.user.id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Users retrieve successfully!',
        data: users,
    });
});
const updateMyProfile = (0, catchAsync_1.default)(async (req, res) => {
    const users = await users_services_1.usersServices.updateMe(req.user.id, req.body, req.file);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Users retrieve successfully!',
        data: users,
    });
});
exports.usersController = { getAllUsers, getMe, updateMyProfile };
