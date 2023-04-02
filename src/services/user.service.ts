import { IUserService } from '../interfaces/user-service.interface.js';
import { User } from '../entity/user.entity.js';
import { IUserRepositoryInterface } from '../interfaces/user-repository.interface.js';

const { SALT } = process.env;

/**
 * @classdesc Service for working with users
 */
export default class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepositoryInterface) {}

  /**
   * Creates new user
   *
   * @param {string} login user login
   * @param {string} password user password
   * @param {string} name user name
   * @param {string} avatar user's avatar file
   * @param {string|undefined} homeUrl home url
   */
  async createUser({
    login,
    password,
    name,
    avatar,
    homeUrl,
  }: {
    [key: string]: string | undefined;
  }): Promise<User | null> {
    const existedUser = await this.userRepository.find(login as string);

    if (existedUser) {
      return null;
    }

    const newUser = new User(
      login as string,
      name as string,
      password as string,
      homeUrl,
      undefined,
      avatar as string
    );
    await newUser.createHashPassword(password as string, Number(SALT));

    const user = await this.userRepository.create(newUser);

    if (!user) {
      return null;
    }

    newUser.id = user.id;
    return newUser;
  }

  /**
   * Returns information about existing user
   *
   * @param login
   */
  async getUserInfo(login: string): Promise<User | null> {
    const existedUser = await this.userRepository.find(login);

    if (!existedUser) {
      return null;
    }

    let { homePage } = existedUser;
    const { name, id, avatar } = existedUser;

    if (!homePage) {
      homePage = '';
    }

    return new User(login, name, undefined, homePage, id, avatar);
  }

  /**
   * Checks user password
   *
   * @param login
   * @param checkPassword
   */
  async validateUser({
    login,
    checkPassword,
  }: {
    [key: string]: string;
  }): Promise<boolean> {
    const existedUser = await this.userRepository.find(login);

    if (!existedUser) {
      return false;
    }

    const { password: hashPassword, name } = existedUser;
    const newUser = new User(login, name, hashPassword);

    return newUser.comparePassword(checkPassword);
  }
}
