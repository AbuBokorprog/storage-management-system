"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const dashboard_service_1 = require("./dashboard.service");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const http_status_1 = __importDefault(require("http-status"));
const dashboardSummary = (0, catchAsync_1.default)(async (req, res) => {
    const data = await dashboard_service_1.dashboardService.dashboardSummary(req.user.id);
    (0, successRespon_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Dashboard summary retrieved successfully!',
        data,
    });
});
exports.dashboardController = { dashboardSummary };
