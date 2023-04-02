import PrismaService from './services/prisma.service.js';

import { App } from './app.js';
import { ExceptionHandler } from './handlers/exeption.handler.js';
import { UserController } from './controllers/userController.js';
import { MessageController } from './controllers/message.controller.js';
import UserService from './services/user.service.js';
import { UsersRepository } from './repositories/user.repository.js';

/**
 * Starts chat server
 */
async function bootstrap() {
  const prismaService = new PrismaService();
  const app = new App(
    new UserController(new UserService(new UsersRepository(prismaService))),
    new ExceptionHandler(),
    new MessageController(prismaService),
    prismaService
  );

  await app.init();
}

bootstrap();
