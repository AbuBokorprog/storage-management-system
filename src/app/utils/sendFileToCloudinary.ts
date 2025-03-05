import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request } from 'express';

cloudinary.config({
  cloud_name: config.cloude_name,
  api_key: config.api_key,
  api_secret: config.api_secret_key, // Click 'View Credentials' below to copy your API secret
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

const fileFilter = (req: Request, file: any, cb: multer.FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only images, .doc, and .pdf files are allowed!',
      ),
    );
  }
};

export const sendFileToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName.trim(),
        resource_type: 'auto',
        access_control: [{ access_type: 'anonymous' }],
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);
        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + '/uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   },
// });

const newStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

export const upload = multer({
  storage: newStorage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});
