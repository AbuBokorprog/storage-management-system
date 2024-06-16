"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./app/route"));
// import { StudentRoutes } from './modules/students/student.route';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use(route_1.default);
app.get('/', (req, res) => {
    res.send('Project setup home page');
});
// global error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    const status = 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        message: message,
        error: err,
    });
});
// notfound route handler
app.use((req, res, next) => {
    return res.status(400).json({
        success: false,
        message: 'API not found',
        error: '',
    });
});
exports.default = app;
