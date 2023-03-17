import { BaseController } from './base.controller.js';
import { IController } from '../interfaces/controller.interface.js';
import { Request, Response } from 'express';

export class UserController extends BaseController implements IController {
  constructor(dataSourceClient: object) {
    super(dataSourceClient);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request, res: Response) {
    this.sendJson(res, 200, { status: 'login ok' });
  }

  register(req: Request, res: Response) {
    this.sendJson(res, 200, { status: 'login ok' });
  }
}
