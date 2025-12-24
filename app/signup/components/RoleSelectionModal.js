// app/signup/components/RoleSelectionModal.js
"use client";

export default function RoleSelectionModal({ isOpen, onClose, onSelectRole }) {
  if (!isOpen) return null;

  const roles = [
    { id: "salon-owner", label: "Salon Owner" },
    { id: "private-massager", label: "Private Massager" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md sm:max-w-lg bg-[#FEC9BE] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl animate-fadeIn">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#D96073] font-semibold text-sm sm:text-base mb-6 sm:mb-8 hover:gap-3 transition-all touch-manipulation"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#262628] mb-3 sm:mb-4">
          What is your role?
        </h2>

        {/* Description */}
        <p className="text-[#5F5F60] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          Select the occupation you have, either salon owner or Private Massager
          to curate a specific features for only you.
        </p>

        {/* Role Options */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#EDCFC9] border-2 border-[#E7C9C3] hover:border-[#D96073] hover:bg-[#E5C5BF] transition-all group min-h-[56px] sm:min-h-[64px] touch-manipulation"
            >
              <span className="text-[#5F5F60] font-medium text-base sm:text-lg">
                {role.label}
              </span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#D96073] flex items-center justify-center group-hover:bg-[#D96073] transition-colors flex-shrink-0">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-transparent group-hover:bg-white transition-colors" />
              </div>
            </button>
          ))}
        </div>

        {/* Next Button (disabled state) */}
        <button
          disabled
          className="w-full sm:w-2/3 mx-auto block bg-[#D96073]/50 text-[#FFF6EF] font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-2xl sm:rounded-3xl cursor-not-allowed min-h-[48px] touch-manipulation"
        >
          Next
        </button>
      </div>
    </div>
  );
}
