"use client";
import { useState } from "react";

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const plans = {
    monthly: {
      price: "$9.99",
      priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
      period: "/ month",
      savings: null,
    },
    yearly: {
      price: "$99.99",
      priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
      period: "/ year",
      savings: "Save 20%",
      recommended: true,
    },
  };

  const handleSubscribe = async (planType) => {
    try {
      setLoading(true);
      const priceId = plans[planType].priceId;

      console.log("Selected plan:", planType); // Debug log
      console.log("Price ID:", priceId); // Debug log

      if (!priceId) {
        alert(
          "Price ID not configured. Please check your environment variables.\n\nMake sure NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID and NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID are set in your .env.local file."
        );
        setLoading(false);
        return;
      }

      // Call your API route to create a checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: priceId,
        }),
      });

      const data = await response.json();
      //  console.log("API response:", data); // Debug log

      if (!response.ok || data.error) {
        console.error("Error from API:", data.error);
        alert(`Failed to start checkout: ${data.error || "Unknown error"}`);
        setLoading(false);
        return;
      }

      if (!data.url) {
        //   console.error("No URL in response:", data);
        alert("Failed to get checkout URL. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect directly to Stripe Checkout using the URL
      // console.log("Redirecting to:", data.url);
      window.location.href = data.url;
    } catch (error) {
      // console.error("Subscription error:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start p-6 sm:p-8 md:p-12 lg:p-16 overflow-y-auto">
      {/* Header */}
      <div className="w-full mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#262628] leading-tight">
          Subscription -
        </h1>
      </div>

      {/* Subscription Cards Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl">
        {/* Monthly Plan */}
        <div
          className={`bg-[#F5C4C4] border-2 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 cursor-pointer ${
            selectedPlan === "monthly"
              ? "border-[#D96073] ring-2 ring-[#D96073]"
              : "border-[#D96073] hover:border-[#C74E62]"
          }`}
          onClick={() => setSelectedPlan("monthly")}
        >
          {/* Plan Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#262628]">
              Monthly
            </h2>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-4xl sm:text-5xl font-bold text-[#262628]">
              {plans.monthly.price}
            </span>
            <span className="text-lg text-[#262628]/70 ml-2">
              {plans.monthly.period}
            </span>
          </div>

          {/* Features */}
          <div className="mb-8">
            <p className="text-sm sm:text-base text-[#262628] mb-3">
              Features -
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5"
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
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5"
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
                  early access to new features
                </span>
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSubscribe("monthly");
            }}
            disabled={loading}
            className="w-full bg-[#D96073] hover:bg-[#C74E62] active:bg-[#B5455A] disabled:bg-[#E8939F] text-white text-lg sm:text-xl font-semibold py-3 sm:py-4 px-6 rounded-2xl transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading && selectedPlan === "monthly" ? "Loading..." : "Subscribe"}
          </button>
        </div>

        {/* Yearly Plan - Recommended */}
        <div
          className={`bg-[#F5C4C4] border-2 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 cursor-pointer relative ${
            selectedPlan === "yearly"
              ? "border-[#D96073] ring-2 ring-[#D96073]"
              : "border-[#D96073] hover:border-[#C74E62]"
          }`}
          onClick={() => setSelectedPlan("yearly")}
        >
          {/* Recommended Badge */}
          <div className="absolute -top-3 right-4 bg-[#D96073] text-white px-4 py-1 rounded-full text-sm font-semibold">
            Recommended
          </div>

          {/* Plan Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#262628]">
              Yearly
            </h2>
          </div>

          {/* Price */}
          <div className="mb-2">
            <span className="text-4xl sm:text-5xl font-bold text-[#262628]">
              {plans.yearly.price}
            </span>
            <span className="text-lg text-[#262628]/70 ml-2">
              {plans.yearly.period}
            </span>
          </div>

          {/* Savings Badge */}
          <div className="mb-4">
            <span className="inline-block bg-[#D96073] text-white px-3 py-1 rounded-full text-sm font-semibold">
              {plans.yearly.savings}
            </span>
          </div>

          {/* Features */}
          <div className="mb-8">
            <p className="text-sm sm:text-base text-[#262628] mb-3">
              Features -
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5"
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
                  20 matches weekly
                </span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5"
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
                  early access to new features
                </span>
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSubscribe("yearly");
            }}
            disabled={loading}
            className="w-full bg-[#D96073] hover:bg-[#C74E62] active:bg-[#B5455A] disabled:bg-[#E8939F] text-white text-lg sm:text-xl font-semibold py-3 sm:py-4 px-6 rounded-2xl transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading && selectedPlan === "yearly" ? "Loading..." : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}
