import { IMessageService } from '../interfaces/message-service.interface.js';
import { Message } from '../entity/message.entity.js';
import { IMessageRepositoryInterface } from '../interfaces/message-repository.interface.js';
import { IChatMessage } from '../interfaces/chat-message.interface.js';

/**
 * @classdesc Service for working with messages
 */
export default class MessageService implements IMessageService {
  constructor(
    private readonly messageRepository: IMessageRepositoryInterface
  ) {}

  /**
   * Add new message to datasource
   *
   * @param {number} parentId ID of parent message
   * @param {number} userId ID of user which sends this message
   * @param {string} text message text
   * @param {string|undefined} filePath path to file which was attached to message
   */
  async createMessage({
    parentId,
    userId,
    text,
    file,
    padding,
    createdAt,
    user,
  }: IChatMessage): Promise<IChatMessage | null> {
    const newMessage = new Message(
      parentId,
      userId,
      text,
      padding,
      createdAt,
      file
    );
    const msg = await this.messageRepository.create(newMessage);
    if (msg) {
      return {
        parentId,
        userId,
        text,
        file,
        padding,
        createdAt,
        user,
        id: msg.id,
      };
    } else {
      return null;
    }
  }
}
