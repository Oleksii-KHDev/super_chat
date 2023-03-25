import { IChatService } from '../interfaces/chat-service.interface.js';
import { IChatMessage } from '../interfaces/chat-message.interface.js';
import PrismaService from './prisma.service.js';
import { IGetMessageParam } from '../interfaces/get-message-param.interface.js';
import { SortField, SortOrder } from '../types/message.types.js';
export class ChatService implements IChatService {
  private _client;
  private _chatMessages: IChatMessage[] = [];
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
    const rootMessages = await this.getMessagesFromDataSource(
      0,
      sortField,
      sortOrder
    );

    if (rootMessages.length > 0) {
      for (const rootMessage of rootMessages) {
        this._chatMessages.push(rootMessage);
        const messages = await this.getMessagesFromDataSource(
          rootMessage.id,
          sortField,
          sortOrder
        );

        if (messages.length > 0) {
          await this.getMessages(
            sortField,
            sortOrder,
            amount * offset,
            messages
          );
        }
      }
    }

    return this._chatMessages;
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
    chatMessages?: IChatMessage[]
  ): Promise<void> {
    if (!chatMessages || this._chatMessages.length > maxCount) {
      return;
    }

    for (const msg of chatMessages) {
      this._chatMessages.push(msg);
      if (msg) {
        const messages = await this.getMessagesFromDataSource(
          msg.id as number,
          sortField,
          sortOrder
        );
        await this.getMessages(sortField, sortOrder, maxCount, messages);
      }
    }
  }

  private async getMessagesFromDataSource(
    parentId: number,
    sortField: SortField,
    sortOrder: SortOrder
  ) {
    return this._client.message.findMany({
      where: {
        parentId: parentId,
      },
      orderBy: {
        [sortField]: sortOrder,
      },
      include: {
        user: true,
      },
    });
  }
}
