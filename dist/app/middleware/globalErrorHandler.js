"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const zodErrorHandler_1 = require("../errors/zodErrorHandler");
const mongooseErrorHandler_1 = require("../errors/mongooseErrorHandler");
const castErrorHandler_1 = require("../errors/castErrorHandler");
const duplicateErrorHandler_1 = require("../errors/duplicateErrorHandler");
const AppError_1 = require("../errors/AppError");
const globalErrorHandler = (err, req, res, next) => {
    // default error
    let statusCode = err?.statusCode || 500;
    let message = err?.message || 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'something went wrong.',
        },
    ];
    // zod error handler
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodErrorHandler_1.handleZodError)(err);
        // eslint-disable-next-line no-unused-expressions
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message),
            (errorSources = simplifiedError.errorSources);
    }
    else if (err.name === 'ValidationError') {
        // mongoose validation error handler
        const simplifyMongooseError = (0, mongooseErrorHandler_1.validationErrorHandler)(err);
        statusCode = simplifyMongooseError?.statusCode;
        message = simplifyMongooseError?.message;
        errorSources = simplifyMongooseError?.errorSources;
    }
    else if (err.name === 'CastError') {
        // mongoose validation cast error handler
        const simplifyMongooseError = (0, castErrorHandler_1.castErrorHandler)(err);
        statusCode = simplifyMongooseError?.statusCode;
        message = simplifyMongooseError?.message;
        errorSources = simplifyMongooseError?.errorSources;
    }
    else if (err.code === 11000) {
        // mongoose duplicate error handler
        const simplifyMongooseError = (0, duplicateErrorHandler_1.duplicateErrorHandler)(err);
        statusCode = simplifyMongooseError?.statusCode;
        message = simplifyMongooseError?.message;
        errorSources = simplifyMongooseError?.errorSources;
    }
    else if (err instanceof AppError_1.AppError) {
        // error
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    // ultimate return error
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.node_env === 'development' ? err?.stack : null,
    });
};
exports.default = globalErrorHandler;
