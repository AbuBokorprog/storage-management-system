"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calenderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const calender_services_1 = require("./calender.services");
// get all files
const getAllFilesAndFolders = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.user;
    const fileData = await calender_services_1.calenderServices.getAllFilesAndFolders(id, req.query);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Files and folders retrieve successfully!',
        data: fileData,
    });
});
exports.calenderController = { getAllFilesAndFolders };
