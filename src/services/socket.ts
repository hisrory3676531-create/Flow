import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3001';

export const socket: Socket = io(SOCKET_SERVER_URL, {
  autoConnect: true,
  transports: ['websocket', 'polling']
});