import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { encryptedServices } from './encrypted.services';
import { Request, Response } from 'express';

const setEncryptedPin = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { pin } = req.body;
    const data = await encryptedServices.setEncryptedPin(req.user.id, pin);
    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Encrypted pin set!',
      data,
    });
  },
);

const getEncryptedFilesAndFolders = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { pin } = req.body;
    const data = await encryptedServices.getEncryptedFilesAndFolders(
      req.user.id,
      pin,
    );
    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Retrieve all encrypted files and folders!',
      data,
    });
  },
);

const encryptedPinRemove = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { pin } = req.body;
    const data = await encryptedServices.encryptedPinRemove(req.user.id, pin);
    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Encrypted pin removed!',
      data,
    });
  },
);

const toggleFileEncrypt = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { fileId } = req.params;
    const { pin } = req.body;
    await encryptedServices.toggleFileEncrypt(req.user.id, pin, fileId);
    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'The file encrypted successfully!',
    });
  },
);

const toggleFolderEncrypt = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { folderId } = req.params;
    const { pin } = req.body;
    await encryptedServices.toggleFolderEncrypt(req.user.id, pin, folderId);
    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'The folder encrypted successfully!',
    });
  },
);

export const encryptedController = {
  setEncryptedPin,
  getEncryptedFilesAndFolders,
  encryptedPinRemove,
  toggleFileEncrypt,
  toggleFolderEncrypt,
};
