import { Message } from '../entity/message.entity.js';
import { IMessage } from './message.interface.js';
export interface IMessageService {
  createMessage: ({
    parentId,
    userId,
    text,
    filePath,
  }: IMessage) => Promise<Message | null>;
}
