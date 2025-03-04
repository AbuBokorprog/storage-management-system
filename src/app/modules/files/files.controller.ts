import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { fileService } from './files.services';
import successResponse from '../../utils/successRespon';

// upload file
const uploadFile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { folderId } = req.params;
    const userId = req.user?.id as string;

    const fileData = await fileService.uploadFile(req.file, userId, folderId);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'File uploaded successfully!',
      data: fileData,
    });
  },
);

// get all files
const getAllFiles = catchAsync(async (req, res) => {
  const fileData = await fileService.getAllFiles();

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'File retrieve successfully!',
    data: fileData,
  });
});

// get all files by user id
const getAllFilesByUserId = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.user;

    const fileData = await fileService.getAllFilesByUserId(id);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'File retrieve successfully!',
      data: fileData,
    });
  },
);

// delete file
const deleteFile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const file = await fileService.deleteFile(id, req.user.id);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'File deleted successfully!',
      data: file,
    });
  },
);

// Rename a folder
const renameFile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const file = await fileService.renameFile(id, name);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'File renamed successfully!',
      data: file,
    });
  },
);

// Duplicate a folder
const duplicateFile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const { user } = req;
    const duplicatedFile = await fileService.duplicateFile(id, user?.id);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'File duplicated successfully!',
      data: duplicatedFile,
    });
  },
);

export const fileController = {
  uploadFile,
  getAllFiles,
  getAllFilesByUserId,
  deleteFile,
  renameFile,
  duplicateFile,
};
