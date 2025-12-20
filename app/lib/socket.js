// Socket.IO connection utility
import { io } from 'socket.io-client';

// Chat backend runs on port 5001, main backend runs on port 3000
const SOCKET_URL = process.env.NEXT_PUBLIC_CHAT_SOCKET_URL || 'http://192.168.18.47:5001';

let socket = null;

export const getSocket = (userId) => {
  if (!socket || !socket.connected) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Connect user when socket is ready
    if (userId) {
      socket.on('connect', () => {
        socket.emit('user_connected', userId);
      });
    }
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const connectUser = (userId) => {
  if (socket && socket.connected) {
    socket.emit('user_connected', userId);
  } else {
    socket?.on('connect', () => {
      socket.emit('user_connected', userId);
    });
  }
};
