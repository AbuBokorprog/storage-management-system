import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import httpStatus from 'http-status';
import { usersServices } from './users.services';

const createUser = catchAsync(async (req, res) => {
  const user = await usersServices.createUser(req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User created successfully!',
    data: user,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const users = await usersServices.getAllUsers();

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User created successfully!',
    data: users,
  });
});

export const usersController = { createUser, getAllUsers };
