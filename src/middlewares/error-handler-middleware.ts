import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-json-validator-middleware';

export const installGlobalErrorHandlers = () => {
  process.on('uncaughtException', (err) => _trackError(err));
  process.on('unhandledRejection', (err: any) => _trackError(err));
};

export const errorHandler = (
  error: Error,
  _req: Request,
  resp: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  _trackError(error);

  if (error instanceof SyntaxError) {
    resp.status(400).json({
      message: 'Invalid input syntax',
    });
    return;
  }

  if (error instanceof ValidationError) {
    resp.status(400).json({
      message: 'Invalid input',
      validationErrors: error.validationErrors,
    });
    return;
  }

  resp.status(500).json({
    message: 'Unexpected error processing the request',
  });
};

const _trackError = (error: Error) => {
  console.error(
    'Error detected',
    error.stack || error.message || error.name || 'Unknow error',
  );
};
