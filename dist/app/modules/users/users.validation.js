"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
exports.userValidation = {
    createUserSchema: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        photo: zod_1.z.string().url().optional(),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    }),
    updateProfile: zod_1.z.object({
        name: zod_1.z.string().optional(),
        photo: zod_1.z.string().url().optional(),
        email: zod_1.z.string().email().optional(),
    }),
};
