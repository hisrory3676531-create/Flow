import { io } from 'socket.io-client';

const BACKEND_URL = 'https://flow-5ty0.onrender.com';

export const socket = io(BACKEND_URL, {
  transports: ['websocket', 'polling']
});