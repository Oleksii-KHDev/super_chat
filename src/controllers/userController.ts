import { BaseController } from './base.controller.js';
import { IController } from '../interfaces/controller.interface.js';
import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../interfaces/user-service.interface.js';
import createError from 'http-errors';

/**
 * @classdesc Controller for user authentication (login and register routes)
 */
export class UserController extends BaseController implements IController {
  constructor(private readonly userService: IUserService) {
    super();
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  /**
   * Handler for user/login request
   * @param req
   * @param res
   * @param next
   */
  async login(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.validateUser(req.body);

    if (!result) {
      return next(createError(401, 'Invalid credentials'));
    }

    const user = await this.userService.getUserInfo(req.body.login);

    if (!user) {
      return next(createError(500, "Can't retrieve user information from DB"));
    }

    const resp = {
      status: 'ok',
      user: {
        id: user.id,
        email: user.login,
        name: user.name,
        homePage: user.homeUrl,
        avatar: user.avatar,
      },
    };

    this.sendJson(res, 200, resp);
  }

  /**
   * Handler for user/register route
   *
   * @param req
   * @param res
   * @param next
   */
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
      user: {
        id: result.id,
        email: result.login,
        name: result.name,
        homePage: result.homeUrl,
        avatar: result.avatar,
      },
    });
  }
}
