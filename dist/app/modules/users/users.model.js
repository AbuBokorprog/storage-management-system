"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    photo: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Number,
    },
    storageUsed: {
        type: Number,
        default: 0,
    },
    maxStorage: {
        type: Number,
        default: 15 * 1024 * 1024 * 1024,
    },
    encryptedPin: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
UserSchema.statics.isUserExistsByCustomId = async function (id) {
    return await exports.User.findOne({ _id: id });
};
UserSchema.statics.isPasswordMatched = async function (plainText, hashPassword) {
    return bcrypt_1.default.compare(plainText, hashPassword);
};
UserSchema.statics.isJWTIssuedBeforePasswordChanged = async function (passwordChangeTimestamps, jwtIssuedTimestamps) {
    const passwordChangedTime = new Date(passwordChangeTimestamps).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamps;
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
