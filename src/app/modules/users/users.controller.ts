import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import httpStatus from 'http-status';
import { usersServices } from './users.services';
import { Request, Response } from 'express';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await usersServices.getAllUsers();

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Users retrieve successfully!',
    data: users,
  });
});

const getMe = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const users = await usersServices.getMe(req.user.id);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Users retrieve successfully!',
      data: users,
    });
  },
);

const updateMyProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const users = await usersServices.updateMe(req.user.id, req.body, req.file);

    successResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Users retrieve successfully!',
      data: users,
    });
  },
);

export const usersController = { getAllUsers, getMe, updateMyProfile };
