import { IChatService } from '../interfaces/chat-service.interface.js';
import { IChatMessage } from '../interfaces/chat-message.interface.js';
import PrismaService from './prisma.service.js';
import { IGetMessageParam } from '../interfaces/get-message-param.interface.js';
import { SortField, SortOrder } from '../types/message.types.js';

export class ChatService implements IChatService {
  private _client;
  constructor(private readonly _prismaService: PrismaService) {
    this._client = _prismaService.getClient();
  }

  /**
   * Returns chat message according to criteria
   *
   * @param amount amount of messages to return
   * @param offset offset at which messages start
   * @param sortField sorting criterion
   * @param sortOrder 1 - for ascending 0 - for descending order
   */
  public async getChatMessages({
    amount,
    offset,
    sortField,
    sortOrder,
  }: IGetMessageParam): Promise<IChatMessage[]> {
    const chatMessages = [];
    const rootMessages = await this.getMessagesFromDataSource(
      0,
      sortField,
      sortOrder
    );

    if (rootMessages.length > 0) {
      for (const rootMessage of rootMessages) {
        if (chatMessages.length >= amount * offset) {
          break;
        }

        chatMessages.push(rootMessage);
        const messages = await this.getMessagesFromDataSource(
          rootMessage.id,
          SortField.createdAt,
          SortOrder.desc
        );

        if (messages.length > 0) {
          await this.getMessages(
            SortField.createdAt,
            SortOrder.desc,
            amount * offset,
            chatMessages,
            messages
          );
        }
      }
    }

    return offset === 1
      ? chatMessages
      : chatMessages.splice(0, offset - 1).slice(0, amount);
  }

  /**
   * Returns all messages without parent
   *
   * @private
   */
  private async getMessages(
    sortField: SortField,
    sortOrder: SortOrder,
    maxCount: number,
    chatMessages: IChatMessage[],
    messages: IChatMessage[]
  ): Promise<void> {
    if (!messages || chatMessages.length > maxCount) {
      return;
    }

    for (const msg of messages) {
      if (msg) {
        if (chatMessages.length >= maxCount) {
          break;
        }

        chatMessages.push(msg);
        const subMessages = await this.getMessagesFromDataSource(
          msg.id as number,
          sortField,
          sortOrder
        );

        if (subMessages.length > 0) {
          await this.getMessages(
            sortField,
            sortOrder,
            maxCount,
            chatMessages,
            subMessages
          );
        }
      }
    }
  }

  private async getMessagesFromDataSource(
    parentId: number,
    sortField: SortField,
    sortOrder: SortOrder
  ) {
    const args = {
      where: {
        parentId: parentId,
      },
      orderBy: {},
      include: {
        user: true,
      },
    };

    if (sortField === SortField.email) {
      args.orderBy = {
        user: {
          [sortField]: sortOrder,
        },
      };
    } else {
      args.orderBy = {
        [sortField]: sortOrder,
      };
    }

    return this._client.message.findMany(args);
  }
}
