import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericResponse } from '../interface/error';

export const handleZodError = (err: ZodError): TGenericResponse => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod validation error',
    errorSources,
  };
};
