"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = require("../users/users.model");
const http_status_1 = __importDefault(require("http-status"));
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = require("../../errors/AppError");
const sendMail_1 = require("../../utils/sendMail");
const config_1 = __importDefault(require("../../config"));
const folders_model_1 = require("../folders/folders.model");
// Register
const register = async (data) => {
    // check is user already exist?
    const existingUser = await users_model_1.User.findOne({ email: data.email });
    if (existingUser) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'Email already exists');
    }
    // hashing password
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const user = await users_model_1.User.create({
        email: data.email,
        name: data.name,
        photo: data.photo,
        password: hashedPassword,
    });
    await folders_model_1.Folder.create({
        name: 'New Folder',
        userId: user._id,
    });
    return user;
};
// login password
const login = async (email, password) => {
    const user = await users_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    const access_token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email }, config_1.default.jwt_access_secret, {
        expiresIn: '1d',
    });
    const refresh_token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email }, config_1.default.jwt_refresh_secret, {
        expiresIn: '1d',
    });
    return {
        user,
        access_token,
        refresh_token,
    };
};
// forget password
const forgetPassword = async (email) => {
    const user = await users_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    const resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();
    const resetUrl = `${config_1.default.client_url}/reset-password/${resetToken}`;
    await (0, sendMail_1.sendEmail)(user.email, 'Password Reset', `Reset your password using this link: ${resetUrl}`);
    return resetToken;
};
// reset password
const resetPassword = async (token, newPassword) => {
    const resetPasswordToken = crypto_1.default
        .createHash('sha256')
        .update(token)
        .digest('hex');
    const user = await users_model_1.User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Invalid or expired token');
    }
    user.password = await bcrypt_1.default.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
};
// change password
const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await users_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isPasswordValid = await bcrypt_1.default.compare(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Incorrect old password');
    }
    user.password = await bcrypt_1.default.hash(newPassword, 10);
    await user.save();
};
exports.authService = {
    register,
    login,
    forgetPassword,
    resetPassword,
    changePassword,
};
