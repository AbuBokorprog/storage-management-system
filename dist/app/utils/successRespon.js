"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const successResponse = (res, data) => {
    return res.status(data?.statusCode).json({
        success: data?.success,
        message: data?.message,
        data: data?.data,
    });
};
exports.default = successResponse;
