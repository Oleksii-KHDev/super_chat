import express, { Express } from 'express';
import { Server } from 'node:http';
import { ChatSocketServer } from './socket-server.js';
import { ExceptionHandler } from './handlers/exeption.handler.js';
import { UserController } from './controllers/userController.js';
import { MessageController } from './controllers/message.controller.js';
import PrismaService from './services/prisma.service.js';
import process from 'node:process';
import { getPublicUrl } from './helpers/index.js';
import chalk from 'chalk';
import dedent from 'dedent';
import cors from 'cors';
import { CORS_SETTINGS } from './constants.js';

export class App {
  protected readonly app: Express;
  protected server?: Server;
  protected readonly port: number;
  protected readonly userController: UserController;
  protected readonly exceptionHandler: ExceptionHandler;
  protected readonly messageController: MessageController;
  protected prismaService: PrismaService;

  constructor(
    userController: UserController,
    exceptionHandler: ExceptionHandler,
    messageController: MessageController,
    prismaService: PrismaService
  ) {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.userController = userController;
    this.exceptionHandler = exceptionHandler;
    this.messageController = messageController;
    this.prismaService = prismaService;
  }

  protected useBodyParser() {
    this.app.use(express.json());
  }
  protected useCors() {
    this.app.use(cors(CORS_SETTINGS));
  }
  protected useRoutes() {
    this.app.use('/user', this.userController.router);
    this.app.use('/message', this.messageController.router);
  }

  protected useExceptionHandler() {
    this.app.use(this.exceptionHandler.catch.bind(this.exceptionHandler));
  }

  protected useStaticPath() {
    const publicPath = getPublicUrl();
    this.app.use(express.static(publicPath));
  }

  protected createServer() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server has been started on port: ${this.port}`);
    });
    const socketServer = new ChatSocketServer(this.server, this.prismaService);
    socketServer.startSocketServer();
    socketServer.addServerEvents();
  }

  protected addProcessEvents() {
    process.on('exit', async () => {
      console.log(`Chat process exits`);
      await this.disconnectFromDataSource();
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.log(
        dedent`${chalk.red(
          'Unhandled promise rejection at:'
        )} ${promise}, ${chalk.red('Reason:')} ${reason}`
      );
    });

    process.on('uncaughtException', (err, origin) => {
      console.log(
        dedent`${chalk.red('Unhandled exception type:')} ${origin} 
        ${chalk.red('Description:')} \n`,
        err
      );
    });
  }

  protected async connectToDataSource() {
    await this.prismaService.connect();
  }
  protected async disconnectFromDataSource() {
    await this.prismaService.disconnect();
  }

  /**
   * Initialisation of chat application
   */
  public async init() {
    try {
      this.useCors();
      this.useBodyParser();
      this.useRoutes();
      this.useStaticPath();
      this.useExceptionHandler();
      this.createServer();
      await this.connectToDataSource();
      this.addProcessEvents();
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          dedent`${chalk.red('Error during application initialisation:')} ${
            err.message
          }`
        );
      }
    }
  }
}
