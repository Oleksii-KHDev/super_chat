import { NextFunction, Request, Response } from 'express';

export interface IExceptionHandler {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
