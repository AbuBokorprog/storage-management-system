import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { dashboardService } from './dashboard.service';
import successResponse from '../../utils/successRespon';
import httpStatus from 'http-status';

const dashboardSummary = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await dashboardService.dashboardSummary(req.user.id);

    successResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Dashboard summary retrieved successfully!',
      data,
    });
  },
);

export const dashboardController = { dashboardSummary };
