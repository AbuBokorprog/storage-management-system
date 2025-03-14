"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: `${process.env.MONGODB_URL}`,
    salt: process.env.SALT,
    default_password: process.env.DEFAULT_PASSWORD,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
    super_admin_pass: process.env.SUPER_ADMIN_PASSWORD,
    cloude_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret_key: process.env.CLOUDINARY_API_SECRET,
    client_url: process.env.CLIENT_URL,
    email: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
};
