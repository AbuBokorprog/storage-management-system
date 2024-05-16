"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const studnet_service_1 = require("./studnet.service");
const studentCreate = async (req, res) => {
    const student = req.body;
    //   will call service function and send data
    try {
        const result = await studnet_service_1.StudentServices.createStudentIntoMongodb(student);
        res.status(200).json({
            success: true,
            message: 'Student create successfully',
            result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error,
        });
    }
};
exports.StudentController = {
    studentCreate,
};
