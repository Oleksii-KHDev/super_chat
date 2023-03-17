import { IController } from '../interfaces/controller.interface.js';
import { Response, Router } from 'express';
import { IControllerRoute } from '../interfaces/route.interface.js';

export abstract class BaseController implements IController {
  protected readonly _router: Router;
  protected readonly _dataSourceClient: object;

  constructor(dataSourceClient: object) {
    this._router = Router();
    this._dataSourceClient = dataSourceClient;
  }

  get router() {
    return this._router;
  }
  public sendJson<T>(res: Response, code: number, message: T): Response<T> {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      console.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
