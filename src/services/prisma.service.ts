import { IDataSource } from '../interfaces/data-source.interface.js';
import { PrismaClient } from '@prisma/client';
export default class PrismaService implements IDataSource {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }
  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      console.log('Connected to DB');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
