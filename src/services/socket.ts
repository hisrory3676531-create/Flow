import { io } from 'socket.io-client';

const rawUrl = (import.meta as any).env?.VITE_SERVER_URL || 'http://localhost:3001';
// Удаляем возможные дубликаты слешей в конце
const SERVER_URL = rawUrl.replace(/\/+$/, '');

export const socket = io(SERVER_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});