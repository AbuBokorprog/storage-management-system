import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { fileService } from './files.services';

const uploadFile = catchAsync(async (req: Request, res: Response) => {
  const { folderId } = req.params;
  const userId = req.user?._id as string;
  const fileUrl = await fileService.uploadFile(req.file, userId, folderId);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'File uploaded successfully!',
    data: { fileUrl },
  });
});

export const fileController = { uploadFile };
