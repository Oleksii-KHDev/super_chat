import { User } from '../entity/user.entity.js';

export interface IUserService {
  createUser: ({
    login,
    password,
  }: {
    [key: string]: string;
  }) => Promise<User | null>;
  validateUser: ({
    login,
    password,
  }: {
    [key: string]: string;
  }) => Promise<boolean>;
  getUserInfo: (login: string) => Promise<User | null>;
}
