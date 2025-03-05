"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: config_1.default.node_env === 'production',
        auth: {
            user: config_1.default.email,
            pass: config_1.default.pass,
        },
    });
    await transporter.sendMail({
        from: config_1.default.email,
        to,
        subject,
        text,
    });
};
exports.sendEmail = sendEmail;
