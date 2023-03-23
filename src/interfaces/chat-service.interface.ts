import { IChatMessage } from './chat-message.interface.js';
import { IGetMessageParam } from './get-message-param.interface.js';

export interface IChatService {
  /**
   *
   * @param amount amount of messages to return
   * @param offset offset at which messages start
   * @param sortField sorting criterion
   * @param sortOrder 1 - for ascending 0 - for descending order
   */
  getChatMessages: ({
    amount,
    offset,
    sortField,
    sortOrder,
  }: IGetMessageParam) => Promise<IChatMessage[]>;
}
