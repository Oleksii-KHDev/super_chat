const path = require('node:path');
const express = require('express');
const http = require('node:http');
const { Server } = require('socket.io');

const publicPath = path.join(__dirname, '../client');
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
