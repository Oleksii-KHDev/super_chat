import { Server } from 'node:http';
import { Server as SocketServer } from 'socket.io';
import { CORS_SETTINGS, RETURNS_MESSAGE_COUNT } from './constants.js';
import { IChatMessage } from './interfaces/chat-message.interface.js';
import { IMessageService } from './interfaces/message-service.interface.js';
import MessageService from './services/message.service.js';
import { MessageRepository } from './repositories/message.repository.js';
import PrismaService from './services/prisma.service.js';
import { ChatService } from './services/chat.service.js';
import { IChatService } from './interfaces/chat-service.interface.js';
import { IGetMessageParam } from './interfaces/get-message-param.interface.js';
export class ChatSocketServer {
  protected socketService?: SocketServer;
  private readonly _messageService: IMessageService;
  private readonly _prismaService: PrismaService;

  /**
   * Service for working with chat functionality
   * @private
   */
  private readonly _chatService: IChatService;
  constructor(
    private readonly _httpServer: Server,
    prismaService: PrismaService
  ) {
    this._prismaService = prismaService;
    this._messageService = new MessageService(
      new MessageRepository(this._prismaService)
    );
    this._chatService = new ChatService(this._prismaService);
  }
  public startSocketServer() {
    this.socketService = new SocketServer(this._httpServer, {
      pingTimeout: 1000,
      cors: CORS_SETTINGS,
    });
    return this.socketService;
  }

  /**
   * Save message and send broadcast to all clients
   *
   * @param message New message from the chat
   * @private
   */
  protected async onNewMessage(message: IChatMessage) {
    console.log(message);

    const newMessage = await this._messageService.createMessage(message);

    if (newMessage) {
      this.socketService?.emit('newMessage', newMessage);
    }
  }

  protected async getAllMessages({
    amount,
    offset,
    sortField,
    sortOrder,
  }: IGetMessageParam) {
    return this._chatService.getChatMessages({
      amount,
      offset,
      sortField,
      sortOrder,
    });
  }

  public addServerEvents() {
    if (this.socketService) {
      this.socketService.on('connection', async (socket) => {
        console.log('Client connected');
        const messages = await this.getAllMessages.call(this, {
          amount: RETURNS_MESSAGE_COUNT,
          offset: 1,
          sortField: 'createdAt',
          sortOrder: 'asc',
        });
        socket.emit('chatInit', messages);
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });

        socket.on('newMessage', await this.onNewMessage.bind(this));
      });
    }
  }
}
