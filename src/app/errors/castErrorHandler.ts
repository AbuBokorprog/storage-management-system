import mongoose from 'mongoose';
import { TErrorSource, TGenericResponse } from '../interface/error';

export const castErrorHandler = (
  err: mongoose.Error.CastError,
): TGenericResponse => {
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id Error',
    errorSources,
  };
};
