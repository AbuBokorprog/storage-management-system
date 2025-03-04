/* eslint-disable @typescript-eslint/no-explicit-any */

import catchAsync from '../../utils/catchAsync';
import { foldersService } from './folders.service';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import successResponse from '../../utils/successRespon';

// create folder
const createFolder = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { name, parentId } = req.body;
    const { id } = req.user;
    const folder = await foldersService.createFolder(id, name, parentId);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Folder created successfully!',
      data: folder,
    });
  },
);

// Get all folders by user
const getFolders = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    const folders = await foldersService.getFoldersByUser(userId);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Retrieve all folders successfully!',
      data: folders,
    });
  },
);

// Delete a folder
const deleteFolder = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    await foldersService.deleteFolder(id);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Folder deleted successfully!',
    });
  },
);

// Rename a folder
const renameFolder = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const folder = await foldersService.renameFolder(id, name);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Folder renamed successfully!',
      data: folder,
    });
  },
);

// Duplicate a folder
const duplicateFolder = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const { user } = req;
    const duplicatedFolder = await foldersService.duplicateFolder(id, user?.id);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Folder duplicated successfully!',
      data: duplicatedFolder,
    });
  },
);

export const foldersController = {
  createFolder,
  getFolders,
  deleteFolder,
  renameFolder,
  duplicateFolder,
};
