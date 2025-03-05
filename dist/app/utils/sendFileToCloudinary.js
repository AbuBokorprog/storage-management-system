"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendFileToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloude_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret_key, // Click 'View Credentials' below to copy your API secret
});
const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-rar-compressed',
];
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only images, .doc, and .pdf files are allowed!'));
    }
};
const sendFileToCloudinary = (imageName, path) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, {
            public_id: imageName.trim(),
            resource_type: 'auto',
            access_control: [{ access_type: 'anonymous' }],
        }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
            // delete a file asynchronously
            fs_1.default.unlink(path, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('File is deleted.');
                }
            });
        });
    });
};
exports.sendFileToCloudinary = sendFileToCloudinary;
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + '/uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   },
// });
const newStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
});
exports.upload = (0, multer_1.default)({
    storage: newStorage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 },
});
