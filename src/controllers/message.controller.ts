import { Request, Response } from 'express';
import { BaseController } from './base.controller.js';
import { IController } from '../interfaces/controller.interface.js';
import PrismaService from '../services/prisma.service.js';

export class MessageController extends BaseController implements IController {
  constructor(protected readonly prismaService: PrismaService) {
    super();
    this.bindRoutes([{ path: '/get', method: 'get', func: this.getMessages }]);
  }

  getMessages(req: Request, res: Response) {
    this.sendJson(res, 200, { status: 'getMessages ok' });
  }
}
