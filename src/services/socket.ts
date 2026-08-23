import { io } from 'socket.io-client';

const BACKEND_URL = 'https://flow-5ty0.onrender.com';

export const socket = io(BACKEND_URL, {
  transports: ['polling', 'websocket'], // polling первым для стабильности на мобильных
  timeout: 20000,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});