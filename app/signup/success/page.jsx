// app/signup/success/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function SignupSuccess() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (!profile) {
      router.push("/signup");
      return;
    }

    const data = JSON.parse(profile);
    setUserName(data.name || "User");

    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FDE5E0] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="bg-[#FEC9BE] rounded-3xl lg:rounded-4xl p-6 sm:p-10 lg:p-16 text-center max-w-2xl w-full">
          <div className="mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#D96073] rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#262628] mb-3 sm:mb-4 break-words px-2">
            Welcome, {userName}!
          </h1>

          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#5F5F60] font-semibold mb-2">
            Your profile is complete
          </p>

          <p className="text-sm sm:text-base text-[#5F5F60] mb-6 sm:mb-8">
            Redirecting you to your dashboard...
          </p>

          <div className="flex gap-2 justify-center">
            <div
              className="w-2 h-2 bg-[#D96073] rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#D96073] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#D96073] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
