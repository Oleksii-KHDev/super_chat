import { Server } from 'node:http';
import { Server as SocketServer } from 'socket.io';
import { CORS_SETTINGS } from './constants.js';
export class ChatSocketServer {
  protected socketService?: SocketServer;
  constructor(private readonly _httpServer: Server) {}
  public startSocketServer() {
    this.socketService = new SocketServer(this._httpServer, {
      pingTimeout: 1000,
      cors: CORS_SETTINGS,
    });
    return this.socketService;
  }

  public addServerEvents() {
    if (this.socketService) {
      this.socketService.on('connection', (socket) => {
        console.log('Client connected');
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });
    }
  }
}
