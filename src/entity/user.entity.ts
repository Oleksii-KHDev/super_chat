import bcryptjs from 'bcryptjs';

/**
 * Class for user business entity
 */
export class User {
  constructor(
    private readonly _login: string,
    private _name: string,
    private _password?: string,
    private _homeUrl?: string,
    private _id?: number
  ) {}

  get login(): string {
    return this._login;
  }

  get password() {
    return this._password;
  }

  get homeUrl(): string | undefined {
    return this._homeUrl;
  }

  get name(): string {
    return this._name;
  }

  get id(): number | undefined {
    return this._id;
  }

  /**
   * Create has for user password
   *
   * @param pass user password
   * @param salt salt for creating has
   */
  public async createHashPassword(pass: string, salt: number): Promise<void> {
    this._password = await bcryptjs.hash(pass, salt);
  }

  /**
   * Check user password
   *
   * @param pass user password
   * @return results of checking
   */
  public async comparePassword(pass: string): Promise<boolean> {
    if (this._password) {
      return bcryptjs.compare(pass, this._password);
    }
    return false;
  }
}
