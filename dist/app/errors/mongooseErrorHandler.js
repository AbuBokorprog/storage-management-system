"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorHandler = void 0;
const validationErrorHandler = (err) => {
    const errorSources = Object.values(err?.errors).map((value) => {
        return {
            path: value?.path,
            message: value?.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Mongoose validation error',
        errorSources,
    };
};
exports.validationErrorHandler = validationErrorHandler;
