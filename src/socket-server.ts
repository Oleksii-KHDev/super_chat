import { Server } from 'node:http';
import { Server as SocketServer, Socket } from 'socket.io';
import {
  CORS_SETTINGS,
  RETURNS_MESSAGE_COUNT,
  DEFAULT_ORDER_SORTING,
} from './constants.js';
import { IChatMessage } from './interfaces/chat-message.interface.js';
import { IMessageService } from './interfaces/message-service.interface.js';
import MessageService from './services/message.service.js';
import { MessageRepository } from './repositories/message.repository.js';
import PrismaService from './services/prisma.service.js';
import { ChatService } from './services/chat.service.js';
import { IChatService } from './interfaces/chat-service.interface.js';
import { IGetMessageParam } from './interfaces/get-message-param.interface.js';
import { getPublicUrl } from './helpers/index.js';
import { mkdir } from 'node:fs/promises';
import { writeFile } from 'node:fs';
import { ORDER_SORTING } from './types/message.types.js';

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
   * @param socket
   * @param message New message from the chat
   * @param sorting Order sorting
   * @private
   */
  protected async onNewMessage(
    socket: Socket,
    message: IChatMessage,
    sorting: ORDER_SORTING
  ) {
    const newMessage = await this._messageService.createMessage(message);
    if (newMessage) {
      const messages = await this.getAllMessages({
        amount: RETURNS_MESSAGE_COUNT,
        offset: 1,
        ...sorting,
      });

      if (message.fileSource) {
        try {
          const filePath = `${getPublicUrl()}/${newMessage.id}`;
          await mkdir(filePath, { recursive: true });
          writeFile(
            `${filePath}/${newMessage.file}`,
            message.fileSource,
            (err) => {
              if (err) {
                socket.emit(
                  'serverError',
                  'Error during receiving message file'
                );
                return;
              }

              this.socketService?.emit('updateChat', messages);
            }
          );
        } catch (err) {
          socket.emit('serverError', 'Error during receiving message file');
        }
      } else {
        this.socketService?.emit('updateChat', messages);
      }
    }
  }

  protected async onSortMessages(socket: Socket, sorting: ORDER_SORTING) {
    try {
      const messages = await this.getAllMessages({
        amount: RETURNS_MESSAGE_COUNT,
        offset: 1,
        ...sorting,
      });
      socket.emit('chatSorted', messages);
    } catch (err) {
      socket.emit('serverError', 'Error during receiving messages from server');
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
          ...DEFAULT_ORDER_SORTING,
        });
        socket.emit('chatInit', messages);
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });

        socket.on('newMessage', this.onNewMessage.bind(this, socket));
        socket.on('sortMessage', this.onSortMessages.bind(this, socket));
      });
    }
  }
}
