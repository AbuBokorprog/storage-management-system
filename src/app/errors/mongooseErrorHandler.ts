import mongoose from 'mongoose';
import { TErrorSource, TGenericResponse } from '../interface/error';

export const validationErrorHandler = (
  err: mongoose.Error.ValidationError,
): TGenericResponse => {
  const errorSources: TErrorSource = Object.values(err?.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Mongoose validation error',
    errorSources,
  };
};
