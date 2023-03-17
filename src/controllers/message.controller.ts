import { Request, Response } from 'express';
import { BaseController } from './base.controller.js';
import { IController } from '../interfaces/controller.interface.js';

export class MessageController extends BaseController implements IController {
  constructor(dataSourceClient: object) {
    super(dataSourceClient);
    this.bindRoutes([{ path: '/get', method: 'get', func: this.getMessages }]);
  }

  getMessages(req: Request, res: Response) {
    this.sendJson(res, 200, { status: 'getMessages ok' });
  }
}
