import path from 'node:path';
import express from 'express';
import http from 'node:http';
import * as url from 'node:url';
import { Server } from 'socket.io';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const publicPath = path.join(dirname, '../client');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Client connection');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server has been started on port: ${port}`);
});
