"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";



const STORAGE_KEY = "chat_messages";

export default function ChatPage() {
    const fileInputRef = useRef(null);
  const users = [
    { id: 1, name: "Samuel Johnson", image: "/images/person1.png" },
    { id: 2, name: "Alex Brown", image: "/images/person1.png" },
    { id: 3, name: "Emma Watson", image: "/images/person1.png" },
  ];

  const [mounted, setMounted] = useState(false);
  const [activeUser, setActiveUser] = useState(users[0]);
  const [input, setInput] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview URL
    const imageUrl = URL.createObjectURL(file);

    // Add image as a message
    setMessages((prev) => ({
      ...prev,
      [activeUser.id]: [
        ...prev[activeUser.id],
        {
          id: Date.now(),
          type: "image",
          image: imageUrl,
          sender: "me",
          time: "Now",
        },
      ],
    }));
  };

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        text: "What time you want to book your massage?",
        sender: "me",
        time: "8:30 am",
      },
      {
        id: 2,
        text: "Let’s go for 3:30 pm",
        sender: "other",
        time: "8:35 am",
      },
    ],
    2: [],
    3: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- LOAD FROM LOCAL STORAGE ---------- */
  useEffect(() => {
    if (!mounted) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, [mounted]);
  //   save to local strorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Auto scroll code

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeUser]);

  //   send messages
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [activeUser.id]: [
        ...prev[activeUser.id],
        {
          id: Date.now(),
          text: input,
          sender: "me",
          time: "Now",
        },
      ],
    }));

    setInput("");
  };

  return (
    <div className="h-full flex flex-col bg-[#262628] rounded-4xl overflow-hidden">
      {/* 🔹 TOP PROFILE BAR (DIFFERENT BG) */}
      <div className="bg-[#EED4CF] rounded-t-3xl px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setActiveUser(user)}
              className={`min-w-[80px] sm:min-w-[90px] cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-2xl flex-shrink-0 ${
                activeUser.id === user.id
                  ? "bg-[#D96073] text-white"
                  : "bg-[#f3c9c1] text-gray-600"
              }`}
            >
              <div className="relative">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="rounded-full w-8 h-8 sm:w-9 sm:h-9"
                />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <span className="text-[10px] sm:text-xs text-center leading-tight break-words max-w-full">
                {user.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 CHAT AREA (LIGHT PINK BG) */}
      <div className="flex-1 bg-[#EED4CF] mt-2 rounded-t-3xl overflow-y-auto px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 md:space-y-10 chat-scroll">
        <div className="text-center text-xs sm:text-sm text-gray-500">Today</div>

        {messages[activeUser.id]?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[380px]">
              <div
                className={`px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-2xl shadow text-sm sm:text-base ${
                  msg.sender === "me"
                    ? "bg-[#D96073] text-white rounded-br-none"
                    : "bg-[#fff5f1] text-black rounded-bl-none"
                }`}
              >
              {msg.type === "image" ? (
                <img 
                    src={msg.image}
                    alt="uploaded"
                    className="rounded-xl max-w-[150px] sm:max-w-[200px]"
                />
              ): (
                msg.text
              )}
                
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
                Seen · {msg.time}
              </div>
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* 🔹 INPUT BAR */}
      <div className="bg-[#EED4CF] px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-[#fff5f1] px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-2xl">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
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
          {/* HIDDEN FILE INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <input
            type="text"
            placeholder="Enter your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 text-[#262628] bg-transparent outline-none text-sm sm:text-base min-w-0"
          />
          <button 
            onClick={sendMessage} 
            className="text-[#D96073] text-lg sm:text-xl flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
