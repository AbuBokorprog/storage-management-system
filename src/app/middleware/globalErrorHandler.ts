/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import { handleZodError } from '../errors/zodErrorHandler';
import { validationErrorHandler } from '../errors/mongooseErrorHandler';
import { castErrorHandler } from '../errors/castErrorHandler';
import { duplicateErrorHandler } from '../errors/duplicateErrorHandler';
import { AppError } from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // default error
  let statusCode = err?.statusCode || 500;
  let message = err?.message || 'Something went wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong.',
    },
  ];

  // zod error handler
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    // eslint-disable-next-line no-unused-expressions
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);
  } else if (err.name === 'ValidationError') {
    // mongoose validation error handler
    const simplifyMongooseError = validationErrorHandler(err);
    statusCode = simplifyMongooseError?.statusCode;
    message = simplifyMongooseError?.message;
    errorSources = simplifyMongooseError?.errorSources;
  } else if (err.name === 'CastError') {
    // mongoose validation cast error handler
    const simplifyMongooseError = castErrorHandler(err);
    statusCode = simplifyMongooseError?.statusCode;
    message = simplifyMongooseError?.message;
    errorSources = simplifyMongooseError?.errorSources;
  } else if (err.code === 11000) {
    // mongoose duplicate error handler
    const simplifyMongooseError = duplicateErrorHandler(err);
    statusCode = simplifyMongooseError?.statusCode;
    message = simplifyMongooseError?.message;
    errorSources = simplifyMongooseError?.errorSources;
  } else if (err instanceof AppError) {
    // error
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // ultimate return error
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
