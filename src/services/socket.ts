import { io } from 'socket.io-client';

const BACKEND_URL = 'https://flow-5ty0.onrender.com';

export const socket = io(BACKEND_URL, {
  path: '/socket.io/',
  transports: ['polling', 'websocket'],
  upgrade: true,
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 45000,
  withCredentials: false
});

// Автоматический переконнект при выходе из сна или смене сети
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