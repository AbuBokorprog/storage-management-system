"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
exports.authValidation = {
    registerSchema: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        photo: zod_1.z.string().url().optional(),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    }),
    loginSchema: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password is required'),
    }),
    forgetPasswordSchema: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
    }),
    resetPasswordSchema: zod_1.z.object({
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    }),
    changePasswordSchema: zod_1.z.object({
        oldPassword: zod_1.z.string().min(6, 'Old password is required'),
        newPassword: zod_1.z
            .string()
            .min(6, 'New password must be at least 6 characters long'),
    }),
};
