import { IChatMessage } from './chat-message.interface.js';
export interface IMessageService {
  createMessage: ({
    parentId,
    userId,
    text,
    file,
    padding,
    createdAt,
    user,
  }: IChatMessage) => Promise<IChatMessage | null>;
}
