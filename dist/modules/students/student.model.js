"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const StudentsSchema = new mongoose_1.Schema({});
const student = (0, mongoose_1.model)('Student', StudentsSchema);
exports.StudentModel = {
    student,
};
