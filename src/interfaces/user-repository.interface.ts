import { User as UserModel } from '@prisma/client';
import { User } from '../entity/user.entity.js';
export interface IUserRepositoryInterface {
  create: (user: User) => Promise<UserModel | null>;
  find: (login: string) => Promise<UserModel | null>;
}
