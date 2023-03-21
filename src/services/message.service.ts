import { IMessageService } from '../interfaces/message-service.interface.js';
import { Message } from '../entity/message.entity.js';
import { IMessage } from '../interfaces/message.interface.js';
import { IMessageRepositoryInterface } from '../interfaces/message-repository.interface.js';

/**
 * Service for working with messages
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
    filePath,
  }: IMessage): Promise<Message | null> {
    const newMessage = new Message(parentId, userId, text, filePath);

    if (await this.messageRepository.create(newMessage)) {
      return newMessage;
    } else {
      return null;
    }
  }
}
