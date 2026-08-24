import { io } from 'socket.io-client';

const BACKEND_URL = 'https://flow-production-71b0.up.railway.app';

export const socket = io(BACKEND_URL, {
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
  autoConnect: true,
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