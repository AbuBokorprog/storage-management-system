"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castErrorHandler = void 0;
const castErrorHandler = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid Id Error',
        errorSources,
    };
};
exports.castErrorHandler = castErrorHandler;
