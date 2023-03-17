import express, { Express } from 'express';
import { Server } from 'node:http';
import { Server as SocketServer } from 'socket.io';
import { ExceptionHandler } from './handlers/exeption.handler.js';
import { UserController } from './controllers/userController.js';
import { MessageController } from './controllers/message.controller.js';
import { IDataSource } from './interfaces/data-source.interface.js';
import process from 'node:process';
import path from 'node:path';
import * as url from 'url';
import chalk from 'chalk';
import dedent from 'dedent';

export class App {
  protected readonly app: Express;
  protected server?: Server;
  protected socketServer?: SocketServer;
  protected readonly port: number;
  protected readonly userController: UserController;
  protected readonly exceptionHandler: ExceptionHandler;
  protected readonly messageController: MessageController;
  protected dataSource: IDataSource;

  constructor(
    /**
     * @TODO
     * Add interfaces here
     */
    userController: UserController,
    exceptionHandler: ExceptionHandler,
    messageController: MessageController,
    dataSource: IDataSource
  ) {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.userController = userController;
    this.exceptionHandler = exceptionHandler;
    this.messageController = messageController;
    this.dataSource = dataSource;
  }

  protected useRoutes() {
    this.app.use('/user', this.userController.router);
    this.app.use('/message', this.messageController.router);
  }

  protected useExceptionHandler() {
    this.app.use(this.exceptionHandler.catch.bind(this.exceptionHandler));
  }

  protected useStaticPath() {
    const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const publicPath = path.join(dirname, '../client');
    this.app.use(express.static(publicPath));
  }

  protected createServer() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server has been started on port: ${this.port}`);
    });
    this.socketServer = new SocketServer(this.server);
  }

  protected addServerEvents() {
    if (this.socketServer) {
      this.socketServer.on('connection', (socket) => {
        console.log('Client connection');
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });
    }
  }

  protected addProcessEvents() {
    process.on('exit', async () => {
      console.log(`Chat process exits`);
      this.disconnectFromDataSource();
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

  protected connectToDataSource() {
    if (this.socketServer) {
      this.dataSource.connect();
    }
  }
  protected disconnectFromDataSource() {
    this.dataSource.connect();
  }
  public async init() {
    this.useRoutes();
    this.useExceptionHandler();
    this.useStaticPath();
    this.createServer();
    this.connectToDataSource();
    this.addProcessEvents();
  }
}
