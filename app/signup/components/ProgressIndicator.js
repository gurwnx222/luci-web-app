// app/signup/components/ProgressIndicator.js
"use client";

export default function ProgressIndicator({ currentStep = 1 }) {
  const steps = [
    { number: 1, label: "signup" },
    { number: 2, label: "Complete your profile" },
    { number: 3, label: "Thank you" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all ${
                step.number < currentStep
                  ? "bg-[#D96073] text-white"
                  : step.number === currentStep
                  ? "bg-[#D96073] text-white ring-4 ring-[#D96073]/20"
                  : "bg-white text-[#5F5F60] border-2 border-[#D96073]/30"
              }`}
            >
              {step.number < currentStep ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                `0${step.number}`
              )}
            </div>
            <span
              className={`text-xs sm:text-sm mt-1.5 sm:mt-2 font-medium ${
                step.number <= currentStep
                  ? "text-[#5F5F60]"
                  : "text-[#5F5F60]/50"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-16 md:w-20 h-0.5 mx-1 sm:mx-2 mb-6 sm:mb-8 ${
                step.number < currentStep ? "bg-[#D96073]" : "bg-[#D96073]/20"
              } ${
                step.number < currentStep
                  ? ""
                  : "border-t-2 border-dashed border-[#D96073]/30 bg-transparent"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
