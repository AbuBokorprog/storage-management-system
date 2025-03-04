"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const files_model_1 = require("../files/files.model");
const users_model_1 = require("../users/users.model");
const dashboardSummary = async (userId) => {
    const user = await users_model_1.User.findById(userId);
    const totalNote = await files_model_1.File.find({
        userId: userId,
        type: 'application/msword' ||
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const totalPDF = await files_model_1.File.find({
        userId: userId,
        type: 'application/pdf',
    });
    const totalImage = await files_model_1.File.find({
        userId,
        type: 'image/png' ||
            'image/svg+xml' ||
            'image/webp' ||
            'image/gif' ||
            'image/jpeg',
    });
    return {
        totalStorage: user?.maxStorage,
        usedStorage: user?.storageUsed,
        totalPDF: totalPDF?.length,
        totalImage: totalImage?.length,
        totalNote: totalNote.length,
    };
};
exports.dashboardService = { dashboardSummary };
