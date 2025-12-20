// API utility for chat backend communication
// Chat backend runs on port 5001, main backend runs on port 3000
const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://192.168.18.47:5001/api';

export const chatApi = {
  // User endpoints
  async registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to register user');
    return response.json();
  },

  async getUser(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  // Conversation endpoints
  async getConversations(userId) {
    const response = await fetch(`${API_BASE_URL}/conversations/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch conversations');
    return response.json();
  },

  async createOrGetConversation(userId1, userId2) {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId1, userId2 }),
    });
    if (!response.ok) throw new Error('Failed to create/get conversation');
    return response.json();
  },

  // Message endpoints
  async getMessages(conversationId, page = 1, limit = 50) {
    const response = await fetch(
      `${API_BASE_URL}/messages/${conversationId}?page=${page}&limit=${limit}`
    );
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  async markMessagesAsRead(conversationId, userId) {
    const response = await fetch(`${API_BASE_URL}/messages/mark-read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, userId }),
    });
    if (!response.ok) throw new Error('Failed to mark messages as read');
    return response.json();
  },

  async getUnreadCount(userId) {
    const response = await fetch(`${API_BASE_URL}/messages/unread/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch unread count');
    return response.json();
  },

  // Image upload
  async uploadImage(imageBase64, filename) {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageBase64, filename }),
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
  },
};
