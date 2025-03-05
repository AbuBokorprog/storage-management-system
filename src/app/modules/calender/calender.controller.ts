import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { calenderServices } from './calender.services';
import { Request, Response } from 'express';

// get all files
const getAllFilesAndFolders = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.user;
    const fileData = await calenderServices.getAllFilesAndFolders(
      id,
      req.query,
    );

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Files and folders retrieve successfully!',
      data: fileData,
    });
  },
);

export const calenderController = { getAllFilesAndFolders };
