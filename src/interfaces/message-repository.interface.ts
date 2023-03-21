import { Message as MessageModel } from '@prisma/client';
import { IMessage } from './message.interface.js';
export interface IMessageRepositoryInterface {
  create: (user: IMessage) => Promise<MessageModel | null>;
}
