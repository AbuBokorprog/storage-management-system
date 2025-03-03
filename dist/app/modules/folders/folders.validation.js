"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderValidation = void 0;
const zod_1 = require("zod");
exports.folderValidation = {
    createFolderSchema: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string().min(1, 'Name is required'),
            userId: zod_1.z.string({ message: 'User id is required!' }),
        }),
    }),
};
