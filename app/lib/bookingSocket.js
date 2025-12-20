// Socket.IO connection utility for main backend (booking notifications)
// Main backend runs on port 3000, chat backend runs on port 5001
import { io } from 'socket.io-client';

// IMPORTANT: This should match NEXT_PUBLIC_API_URL in your .env.local
// Main backend runs on port 3000 (for booking notifications)
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.18.47:3000';

let socket = null;

export const getBookingSocket = (userId) => {
  if (!socket || !socket.connected) {
    console.log('🔌 Connecting to booking socket:', SOCKET_URL);
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 20000,
    });

    // Connect user when socket is ready
    if (userId) {
      socket.on('connect', () => {
        console.log('✅ Booking socket connected, emitting user_connected:', userId);
        socket.emit('user_connected', userId);
      });

      socket.on('connect_error', (error) => {
        console.error('❌ Booking socket connection error:', error);
        console.error('❌ Check if backend is running on:', SOCKET_URL);
      });

      socket.on('disconnect', (reason) => {
        console.warn('⚠️ Booking socket disconnected:', reason);
      });
    }
  }

  return socket;
};

export const disconnectBookingSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const connectBookingUser = (userId) => {
  if (socket && socket.connected) {
    socket.emit('user_connected', userId);
  } else {
    socket?.on('connect', () => {
      socket.emit('user_connected', userId);
    });
  }
};

