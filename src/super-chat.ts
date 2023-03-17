import PrismaService from './services/prisma.service.js';
// import process from 'node:process';
//
// const dirname = url.fileURLToPath(new URL('.', import.meta.url));
// const publicPath = path.join(dirname, '../client');
//
// const port = process.env.PORT || 3000;
// const app = express();
// app.use(express.static(publicPath));
// const server = http.createServer(app);
// const io = new Server(server);
//
// const prismaService = new PrismaService();
//
// (async () => {
//   await prismaService.connect();
// })();
//
// process.on('exit', async () => {
//   console.log(`Chat process exits`);
//   await prismaService.disconnect();
// });
//
// io.on('connection', (socket) => {
//   console.log('Client connection');
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });
//
// server.listen(port, () => {
//   console.log(`Server has been started on port: ${port}`);
// });

import { App } from './app.js';
import { ExceptionHandler } from './handlers/exeption.handler.js';
import { UserController } from './controllers/userController.js';
import { MessageController } from './controllers/message.controller.js';

async function bootstrap() {
  const prismaService = new PrismaService();
  const app = new App(
    new UserController(prismaService.getClient()),
    new ExceptionHandler(),
    new MessageController(prismaService.getClient()),
    prismaService
  );

  await app.init();
}

bootstrap();
