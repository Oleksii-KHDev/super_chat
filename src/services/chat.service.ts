import { IChatService } from '../interfaces/chat-service.interface.js';
import { IChatMessage } from '../interfaces/chat-message.interface.js';
import PrismaService from './prisma.service.js';
import { IGetMessageParam } from '../interfaces/get-message-param.interface.js';
export class ChatService implements IChatService {
  constructor(private readonly _prismaService: PrismaService) {}

  /**
   * Returns chat message according to criteria
   *
   * @param amount amount of messages to return
   * @param offset offset at which messages start
   * @param sortField sorting criterion
   * @param sortOrder 1 - for ascending 0 - for descending order
   */
  async getChatMessages({
    amount,
    offset,
    sortField,
    sortOrder,
  }: IGetMessageParam): Promise<IChatMessage[]> {
    const chatMessages = [];
    const client = this._prismaService.getClient();
    const uniqueParentIds = client.message.groupBy({
      by: ['parentId'],
      orderBy: { parentId: 'asc' },
    });
    const messages = client.message.findMany({});
    return [];
  }
}
