"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const student_model_1 = require("./student.model");
const createStudentIntoMongodb = async (student) => {
    const result = await student_model_1.StudentModel.student.create(student);
    return result;
};
exports.StudentServices = {
    createStudentIntoMongodb,
};
