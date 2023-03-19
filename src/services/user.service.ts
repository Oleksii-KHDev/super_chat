import { IUserService } from '../interfaces/user-service.interface.js';
import { User } from '../entity/user.entity.js';
import { IUserRepositoryInterface } from '../interfaces/user-repository.interface.js';

const { SALT } = process.env;

/**
 * Service for working with users
 */
export default class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepositoryInterface) {}

  /**
   * Creates new user
   *
   * @param {string} login user login
   * @param {string} password user password
   * @param {string} name user name
   * @param {string|undefined} homeUrl home url
   */
  async createUser({
    login,
    password,
    name,
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
      homeUrl
    );
    await newUser.createHashPassword(password as string, Number(SALT));

    if (await this.userRepository.create(newUser)) {
      return newUser;
    } else {
      return null;
    }
  }

  async getUserInfo(login: string): Promise<User | null> {
    const existedUser = await this.userRepository.find(login);

    if (!existedUser) {
      return null;
    }

    let { homePage } = existedUser;
    const { name } = existedUser;

    if (!homePage) {
      homePage = '';
    }

    return new User(login, name, undefined, homePage);
  }

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
