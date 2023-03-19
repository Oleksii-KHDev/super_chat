import { BaseController } from './base.controller.js';
import { IController } from '../interfaces/controller.interface.js';
import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../interfaces/user-service.interface.js';
import createError from 'http-errors';

export class UserController extends BaseController implements IController {
  constructor(private readonly userService: IUserService) {
    super();
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.validateUser(req.body);

    if (!result) {
      return next(createError(401, 'Invalid credentials'));
    }

    this.sendJson(res, 200, { status: 'ok', message: 'User logged in' });
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this.userService.createUser(req.body);

    if (!result) {
      return next(createError(500, 'This User already exist'));
    }

    this.sendJson(res, 200, {
      status: 'ok',
      message: 'User successfully registered',
    });
  }
}
