import { PrismaClient } from '@prisma/client';
export default class PrismaService {
  private readonly _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient();
  }

  /**
   * @inheritDoc
   */
  async connect(): Promise<void> {
    try {
      await this._client.$connect();
      console.log('Connected to DB');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }

  /**
   * @inheritDoc
   */
  async disconnect(): Promise<void> {
    await this._client.$disconnect();
  }

  /**
   * @inheritDoc
   */
  getClient(): PrismaClient {
    return this._client;
  }
}
