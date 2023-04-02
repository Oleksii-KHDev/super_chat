import { IMessage } from '../interfaces/message.interface.js';
import { Message as MessageModel } from '@prisma/client';
import PrismaService from '../services/prisma.service.js';
import { IMessageRepositoryInterface } from '../interfaces/message-repository.interface.js';

/**
 * @classdesc Repository for getting users messages from datasource
 */
export class MessageRepository implements IMessageRepositoryInterface {
  /**
   * Repository for working with SqLite DataBase messages table
   *
   * @private
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Adds new message to datasource
   *
   * @param {number }parentId Parent message or 0 if message on the root level
   * @param userId
   * @param text
   * @param createdAt
   * @param file
   * @param {number} padding? Message left padding
   */
  async create({
    parentId,
    userId,
    text,
    createdAt,
    file,
    padding,
  }: IMessage): Promise<MessageModel | null> {
    return this.prismaService.getClient().message.create({
      data: {
        parentId,
        userId,
        text,
        file,
        padding,
        createdAt,
      },
    });
  }
}
