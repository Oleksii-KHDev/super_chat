import { IController } from '../interfaces/controller.interface.js';
import { Response, Router } from 'express';
import { IControllerRoute } from '../interfaces/route.interface.js';

export abstract class BaseController implements IController {
  protected readonly _router: Router;

  protected constructor() {
    this._router = Router();
  }

  /**
   * Returns router for current controller
   */
  get router() {
    return this._router;
  }

  /**
   * Sends JSON response to client
   *
   * @param res Response object
   * @param code HTTP status code
   * @param message JSON object
   */
  public sendJson<T>(res: Response, code: number, message: T): Response<T> {
    res.type('application/json');
    return res.status(code).json(message);
  }

  /**
   * Binds routes to their handlers
   *
   * @param routes
   */
  public bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      console.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
