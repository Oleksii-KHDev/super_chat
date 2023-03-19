import { PrismaClient } from '@prisma/client';
export default class PrismaService {
  private readonly _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient();
  }

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

  async disconnect(): Promise<void> {
    await this._client.$disconnect();
  }

  getClient(): PrismaClient {
    return this._client;
  }
}
