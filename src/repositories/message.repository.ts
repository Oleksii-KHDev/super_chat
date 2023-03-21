import { Message } from '../entity/message.entity.js';
import { IMessage } from '../interfaces/message.interface.js';
import { Message as MessageModel } from '@prisma/client';
import PrismaService from '../services/prisma.service.js';
import { IMessageRepositoryInterface } from '../interfaces/message-repository.interface.js';

/**
 * Repository for get and save users to datasource
 */
export class MessageRepository implements IMessageRepositoryInterface {
  /**
   * Repository for working with SqLite DataBase messages table
   *
   * @private
   */
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    parentId,
    userId,
    text,
    filePath,
  }: IMessage): Promise<MessageModel | null> {
    return this.prismaService.getClient().message.create({
      data: {
        parentId,
        userId,
        text,
        file: filePath,
      },
    });
  }
}
