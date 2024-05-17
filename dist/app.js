"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { StudentRoutes } from './modules/students/student.route';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
// app.use('/api/v1/student', StudentRoutes);
app.get('/', (req, res) => {
    res.send('Project setup home page');
});
exports.default = app;
