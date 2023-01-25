import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import { PORT } from './config.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
   cors: 'http://localhost:5173/',
});

io.on('connection', (socket) => {
   socket.on('message', (message) => {
      console.log(message);
      socket.broadcast.emit('message', {
         message: message,
         from: socket.id,
      });
   });
});

app.use(morgan('dev'));
app.use(cors());

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
