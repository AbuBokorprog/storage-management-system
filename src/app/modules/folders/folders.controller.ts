/* eslint-disable @typescript-eslint/no-explicit-any */

import catchAsync from '../../utils/catchAsync';
import { foldersService } from './folders.service';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

const createFolder = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { name, parentId } = req.body;
    const { id } = req.user;
    const folder = await foldersService.createFolder(id, name, parentId);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Folder created successfully!',
      data: folder,
    });
  },
);

const getFolders = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    const folders = await foldersService.getFoldersByUser(userId);

    res.status(httpStatus.OK).json({
      success: true,
      data: folders,
    });
  },
);

export const foldersController = { createFolder, getFolders };
