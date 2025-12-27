// app/success/page.js
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    setSessionId(searchParams.get("session_id"));
  }, [searchParams]);

  return (
    <div className="bg-[#262628] min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-[#EED4CF] rounded-4xl p-8 sm:p-12 md:p-16 max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-[#D96073] rounded-full p-4">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="#FFF6EF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#262628] mb-4">
          Welcome to PRO!
        </h1>
        <p className="text-lg sm:text-xl text-[#262628] mb-8">
          Your subscription has been successfully activated. You now have access
          to all PRO features!
        </p>

        {/* Features Reminder */}
        <div className="bg-[#F5C4C4] border-2 border-[#D96073] rounded-2xl p-6 mb-8 text-left">
          <h2 className="text-xl font-bold text-[#262628] mb-4">
            Your PRO Benefits:
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#262628"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base sm:text-lg text-[#262628]">
                10 matches weekly
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#262628"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base sm:text-lg text-[#262628]">
                Early access to new features
              </span>
            </div>
          </div>
        </div>

        {/* Session ID (for debugging) */}
        {sessionId && (
          <p className="text-sm text-[#262628]/60 mb-6">
            Session ID: {sessionId}
          </p>
        )}

        {/* Back to Dashboard Button */}
        <Link href="/">
          <button className="w-full bg-[#D96073] hover:bg-[#C74E62] active:bg-[#B5455A] text-white text-lg sm:text-xl font-semibold py-3 sm:py-4 px-6 rounded-2xl transition-colors duration-200">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
