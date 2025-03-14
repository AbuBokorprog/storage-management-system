"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    return res.status(400).json({
        success: false,
        message: 'API not found',
        error: '',
    });
};
exports.default = notFound;
