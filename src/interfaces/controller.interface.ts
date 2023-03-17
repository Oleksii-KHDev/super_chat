import { Response, Router } from 'express';
import { IControllerRoute } from './route.interface.js';
export interface IController {
  router: Router;
  sendJson: <T>(res: Response, code: number, message: T) => Response<T>;
  bindRoutes: (routes: IControllerRoute[]) => void;
}
