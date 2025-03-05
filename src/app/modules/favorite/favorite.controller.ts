// controllers/favorite.controller.ts
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { favoriteService } from './favorite.services';
import successResponse from '../../utils/successRespon';

const toggleFavoriteFile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id as string;
    const { fileId } = req.params;
    const data = await favoriteService.toggleFavoriteFile(userId, fileId);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Favorite folder updated!',
      data,
    });
  },
);

const toggleFavoriteFolder = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id as string;
    const { folderId } = req.params;
    const data = await favoriteService.toggleFavoriteFolder(userId, folderId);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Favorite folder updated!',
      data,
    });
  },
);

const getAllFavoriteFilesAndFolders = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await favoriteService.getAllFavoriteFilesAndFolders(
      req.user.id,
    );

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Retrieve all files and folders!',
      data,
    });
  },
);

export const favoriteController = {
  toggleFavoriteFile,
  toggleFavoriteFolder,
  getAllFavoriteFilesAndFolders,
};
