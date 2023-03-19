import { IExceptionHandler } from '../interfaces/exception-handler.interface.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import dedent from 'dedent';
import chalk from 'chalk';

export class ExceptionHandler implements IExceptionHandler {
  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HttpError) {
      console.log(
        dedent`${chalk.red('ERROR: ')} ${err.statusCode}: ${err.message}`
      );

      res
        .status(err.statusCode)
        .send({ status: 'error', message: err.message });
    } else {
      console.log(dedent`${chalk.red('ERROR: ')} ${err.message}}`);
      res
        .status(500)
        .send({ status: 'error', message: 'Something went wrong' });
    }
  }
}
