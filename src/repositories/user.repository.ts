import { IUserRepositoryInterface } from '../interfaces/user-repository.interface.js';
import { User } from '../entity/user.entity.js';
import { User as UserModel } from '@prisma/client';
import PrismaService from '../services/prisma.service.js';

/**
 * @classdesc Repository for getting and saving users to datasource
 */
export class UsersRepository implements IUserRepositoryInterface {
  /**
   * Service for working with SqLite DataBase
   *
   * @private
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Adds information about new user to datasource
   *
   * @param login
   * @param password
   * @param name
   * @param homeUrl
   * @param avatar
   */
  async create({
    login,
    password,
    name,
    homeUrl,
    avatar,
  }: User): Promise<UserModel | null> {
    if (typeof password === 'string') {
      return this.prismaService.getClient().user.create({
        data: {
          email: login,
          name,
          password,
          homePage: homeUrl,
          avatar,
        },
      });
    } else {
      return null;
    }
  }

  /**
   * Finds user in datasource
   * @param login
   */
  async find(login: string): Promise<UserModel | null> {
    return this.prismaService.getClient().user.findFirst({
      where: {
        email: login,
      },
    });
  }
}
