"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = require("../errors/AppError");
const users_model_1 = require("../modules/users/users.model");
const http_status_1 = __importDefault(require("http-status"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)(async (req, res, next) => {
        const token = req.headers.authorization;
        // checking if the token is missing
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        // checking if the given token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role, userId, iat } = decoded;
        // checking if the user is exist
        const user = await users_model_1.UserModel.isUserExistsByCustomId(userId);
        if (!user) {
            throw new AppError_1.AppError(404, 'This user is not found !');
        }
        // checking if the user is already deleted
        const isDeleted = user?.isDeleted;
        if (isDeleted) {
            throw new AppError_1.AppError(401, 'This user is deleted !');
        }
        // checking if the user is blocked
        const userStatus = user?.status;
        if (userStatus === 'blocked') {
            throw new AppError_1.AppError(401, 'This user is blocked ! !');
        }
        if (user.passwordChangedAt &&
            (await users_model_1.UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat))) {
            throw new AppError_1.AppError(400, 'You are not authorized !');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.AppError(400, 'You are not authorized  hi!');
        }
        req.user = decoded;
        next();
    });
};
exports.default = auth;
