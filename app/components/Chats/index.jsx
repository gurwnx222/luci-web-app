"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { chatApi } from "@/app/lib/chatApi";
import { getSocket, connectUser, disconnectSocket } from "@/app/lib/socket";

export default function ChatPage() {
  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);
  const socketRef = useRef(null);

  // Current user (salon owner) - in production, get from auth context
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Users and conversations
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  
  // Messages
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Initialize current user (salon owner)
  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Check if user exists in localStorage
        let userId = localStorage.getItem('chat_user_id');
        let user = null;

        if (userId) {
          try {
            user = await chatApi.getUser(userId);
          } catch (error) {
            // User doesn't exist, create new one
            userId = null;
          }
        }

        // If no user, create a default salon owner user
        if (!user) {
          const newUser = await chatApi.registerUser({
            name: "Salon Owner",
            email: `salon-owner-${Date.now()}@example.com`,
            phone: "+1234567890",
            avatar: "",
          });
          user = newUser.user;
          userId = user._id;
          localStorage.setItem('chat_user_id', userId);
        }

        setCurrentUserId(userId);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error initializing user:", error);
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Connect to Socket.IO when user is ready
  useEffect(() => {
    if (!currentUserId) return;

    const socket = getSocket(currentUserId);
    socketRef.current = socket;

    // Connect user
    connectUser(currentUserId);

    // Listen for new messages
    socket.on('receive_message', (data) => {
      const { message } = data;
      if (message.conversationId === activeConversation?._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    // Listen for message sent confirmation
    socket.on('message_sent', (data) => {
      const { message } = data;
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.tempId !== message.tempId);
        return [...filtered, message];
      });
      setSending(false);
    });

    // Listen for message status updates
    socket.on('message_status_update', (data) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId
            ? { ...msg, isDelivered: data.isDelivered, isRead: data.isRead }
            : msg
        )
      );
    });

    // Listen for user status updates
    socket.on('user_status', (data) => {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === data.userId
            ? { ...user, isOnline: data.isOnline }
            : user
        )
      );
    });

    // Listen for typing indicators
    socket.on('user_typing', (data) => {
      // Handle typing indicator if needed
    });

    return () => {
      socket.off('receive_message');
      socket.off('message_sent');
      socket.off('message_status_update');
      socket.off('user_status');
      socket.off('user_typing');
    };
  }, [currentUserId, activeConversation]);

  // Load users and conversations
  useEffect(() => {
    if (!currentUserId) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [allUsers, userConversations] = await Promise.all([
          chatApi.getAllUsers(),
          chatApi.getConversations(currentUserId),
        ]);

        // Filter out current user
        const otherUsers = allUsers.filter((u) => u._id !== currentUserId);
        setUsers(otherUsers);
        setConversations(userConversations);

        // Set first conversation as active if available
        if (userConversations.length > 0) {
          const firstConv = userConversations[0];
          const otherParticipant = firstConv.participants.find(
            (p) => p._id !== currentUserId
          );
          setActiveConversation(firstConv);
          setActiveUser(otherParticipant);
        } else if (otherUsers.length > 0) {
          // If no conversations, set first user as active
          setActiveUser(otherUsers[0]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentUserId]);

  // Load messages when conversation changes
  useEffect(() => {
    if (!activeConversation?._id) return;

    const loadMessages = async () => {
      try {
        const conversationMessages = await chatApi.getMessages(activeConversation._id);
        setMessages(conversationMessages);
        
        // Mark messages as read
        if (currentUserId) {
          await chatApi.markMessagesAsRead(activeConversation._id, currentUserId);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();
  }, [activeConversation, currentUserId]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle user selection
  const handleUserSelect = async (user) => {
    setActiveUser(user);
    
    // Find or create conversation
    try {
      const conversation = await chatApi.createOrGetConversation(
        currentUserId,
        user._id
      );
      setActiveConversation(conversation);
    } catch (error) {
      console.error("Error creating/getting conversation:", error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !activeConversation || !activeUser || sending) return;

    const tempId = `temp-${Date.now()}`;
    const tempMessage = {
      _id: tempId,
      tempId,
      text: input,
      sender: currentUser,
      conversationId: activeConversation._id,
      messageType: 'text',
      createdAt: new Date(),
      isDelivered: false,
      isRead: false,
    };

    // Optimistically add message
    setMessages((prev) => [...prev, tempMessage]);
    setSending(true);
    const messageText = input;
    setInput("");

    try {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('send_message', {
          conversationId: activeConversation._id,
          senderId: currentUserId,
          receiverId: activeUser._id,
          text: messageText,
          messageType: 'text',
          tempId,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSending(false);
      // Remove temp message on error
      setMessages((prev) => prev.filter((m) => m.tempId !== tempId));
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeConversation || !activeUser) return;

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(',')[1];
        
        try {
          const uploadResult = await chatApi.uploadImage(base64, file.name);
          
          if (socketRef.current && socketRef.current.connected) {
            const tempId = `temp-img-${Date.now()}`;
            const tempMessage = {
              _id: tempId,
              tempId,
              imageUrl: uploadResult.url,
              sender: currentUser,
              conversationId: activeConversation._id,
              messageType: 'image',
              createdAt: new Date(),
              isDelivered: false,
              isRead: false,
            };

            setMessages((prev) => [...prev, tempMessage]);
            setSending(true);

            socketRef.current.emit('send_message', {
              conversationId: activeConversation._id,
              senderId: currentUserId,
              receiverId: activeUser._id,
              messageType: 'image',
              imageUrl: uploadResult.url,
              tempId,
            });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Now";
    if (minutes < 60) return `${minutes}m ago`;
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#262628] rounded-4xl">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#262628] rounded-4xl overflow-hidden">
      {/* 🔹 TOP PROFILE BAR */}
      <div className="bg-[#EED4CF] rounded-t-3xl px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className={`min-w-[80px] sm:min-w-[90px] cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-2xl flex-shrink-0 transition-colors ${
                activeUser?._id === user._id
                  ? "bg-[#D96073] text-white"
                  : "bg-[#f3c9c1] text-gray-600"
              }`}
            >
              <div className="relative">
                <Image
                  src={user.avatar || "/images/person1.png"}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="rounded-full w-8 h-8 sm:w-9 sm:h-9 object-cover"
                />
                <span
                  className={`absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-white ${
                    user.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>
              <span className="text-[10px] sm:text-xs text-center leading-tight break-words max-w-full">
                {user.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 CHAT AREA */}
      <div className="flex-1 bg-[#EED4CF] mt-2 rounded-t-3xl overflow-y-auto px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 md:space-y-10 chat-scroll">
        {messages.length > 0 && (
          <div className="text-center text-xs sm:text-sm text-gray-500">
            {new Date(messages[0]?.createdAt).toLocaleDateString()}
          </div>
        )}

        {messages.map((msg) => {
          const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
          const isMe = senderId === currentUserId;
          return (
            <div
              key={msg._id || msg.tempId}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[380px]">
                <div
                  className={`px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-2xl shadow text-sm sm:text-base ${
                    isMe
                      ? "bg-[#D96073] text-white rounded-br-none"
                      : "bg-[#fff5f1] text-black rounded-bl-none"
                  }`}
                >
                  {msg.messageType === "image" ? (
                    <img
                      src={msg.imageUrl}
                      alt="uploaded"
                      className="rounded-xl max-w-[150px] sm:max-w-[200px]"
                    />
                  ) : (
                    msg.text
                  )}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
                  {msg.isRead ? "Seen" : msg.isDelivered ? "Delivered" : "Sending"} ·{" "}
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* 🔹 INPUT BAR */}
      <div className="bg-[#EED4CF] px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-[#fff5f1] px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-2xl">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
            disabled={!activeUser || sending}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                d="M20.4 9.6C20.0817 9.6 19.7765 9.72643 19.5515 9.95147C19.3264 10.1765 19.2 10.4817 19.2 10.8V14.856L17.424 13.08C16.7969 12.4579 15.9494 12.1088 15.066 12.1088C14.1826 12.1088 13.3351 12.4579 12.708 13.08L11.868 13.932L8.892 10.944C8.26491 10.3219 7.41735 9.97275 6.534 9.97275C5.65065 9.97275 4.80309 10.3219 4.176 10.944L2.4 12.732V6C2.4 5.68174 2.52643 5.37652 2.75147 5.15147C2.97652 4.92643 3.28174 4.8 3.6 4.8H13.2C13.5183 4.8 13.8235 4.67357 14.0485 4.44853C14.2736 4.22348 14.4 3.91826 14.4 3.6C14.4 3.28174 14.2736 2.97652 14.0485 2.75147C13.8235 2.52643 13.5183 2.4 13.2 2.4H3.6C2.64522 2.4 1.72955 2.77928 1.05442 3.45442C0.379285 4.12955 0 5.04522 0 6V20.664C0.00316207 21.5478 0.355648 22.3945 0.980585 23.0194C1.60552 23.6444 2.45221 23.9968 3.336 24H18.264C18.5892 23.9974 18.9124 23.9489 19.224 23.856C19.9169 23.6616 20.5269 23.2453 20.9605 22.6709C21.394 22.0965 21.6271 21.3957 21.624 20.676V10.8C21.624 10.6404 21.5922 10.4823 21.5304 10.3352C21.4686 10.188 21.3781 10.0546 21.2641 9.94287C21.1501 9.83112 21.015 9.74324 20.8666 9.68436C20.7182 9.62549 20.5596 9.59681 20.4 9.6ZM3.6 21.6C3.28174 21.6 2.97652 21.4736 2.75147 21.2485C2.52643 21.0235 2.4 20.7183 2.4 20.4V16.116L5.868 12.648C6.04338 12.4736 6.28066 12.3757 6.528 12.3757C6.77534 12.3757 7.01262 12.4736 7.188 12.648L16.152 21.6H3.6ZM19.2 20.4C19.1923 20.6324 19.1173 20.8575 18.984 21.048L13.56 15.6L14.412 14.76C14.498 14.6722 14.6007 14.6024 14.7141 14.5548C14.8274 14.5072 14.9491 14.4827 15.072 14.4827C15.1949 14.4827 15.3166 14.5072 15.43 14.5548C15.5433 14.6024 15.646 14.6722 15.732 14.76L19.2 18.252V20.4ZM22.8 2.4H21.6V1.2C21.6 0.88174 21.4736 0.576515 21.2485 0.351472C21.0235 0.126428 20.7183 0 20.4 0C20.0817 0 19.7765 0.126428 19.5515 0.351472C19.3264 0.576515 19.2 0.88174 19.2 1.2V2.4H18C17.6817 2.4 17.3765 2.52643 17.1515 2.75147C16.9264 2.97652 16.8 3.28174 16.8 3.6C16.8 3.91826 16.9264 4.22348 17.1515 4.44853C17.3765 4.67357 17.6817 4.8 18 4.8H19.2V6C19.2 6.31826 19.3264 6.62348 19.5515 6.84853C19.7765 7.07357 20.0817 7.2 20.4 7.2C20.7183 7.2 21.0235 7.07357 21.2485 6.84853C21.4736 6.62348 21.6 6.31826 21.6 6V4.8H22.8C23.1183 4.8 23.4235 4.67357 23.6485 4.44853C23.8736 4.22348 24 3.91826 24 3.6C24 3.28174 23.8736 2.97652 23.6485 2.75147C23.4235 2.52643 23.1183 2.4 22.8 2.4Z"
                fill="#D96073"
              />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <input
            type="text"
            placeholder={activeUser ? "Enter your message..." : "Select a user to chat"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            className="flex-1 text-[#262628] bg-transparent outline-none text-sm sm:text-base min-w-0"
            disabled={!activeUser || sending}
          />
          <button
            onClick={sendMessage}
            disabled={!activeUser || !input.trim() || sending}
            className="text-[#D96073] text-lg sm:text-xl flex-shrink-0 hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
