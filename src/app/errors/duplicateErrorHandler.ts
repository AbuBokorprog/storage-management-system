import { TErrorSource, TGenericResponse } from '../interface/error';

export const duplicateErrorHandler = (err: {
  message: string;
}): TGenericResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exist.`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id Error',
    errorSources,
  };
};
