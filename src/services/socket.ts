import { io } from 'socket.io-client';

const BACKEND_URL = 'https://flow-1-xtu5.onrender.com';

export const socket = io(BACKEND_URL, {
  transports: ['polling', 'websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000
});

if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !socket.connected) {
      socket.connect();
    }
  });

  window.addEventListener('online', () => {
    if (!socket.connected) {
      socket.connect();
    }
  });
}