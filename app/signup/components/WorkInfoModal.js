// app/signup/components/WorkInfoModal.js
"use client";
import { useState } from "react";
import ImageUpload from "./ImageUpload";

export default function WorkInfoModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    height: "",
    weight: "",
    bio: "",
    profileImage: null,
    profileImageName: null,
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.occupation.trim() !== "" &&
    formData.height.trim() !== "" &&
    formData.weight.trim() !== "" &&
    formData.bio.trim() !== "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-lg bg-[#FEC9BE] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl my-8 animate-fadeIn">
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
            className="shrink-0"
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
          Enter your work information
        </h2>

        {/* Description */}
        <p className="text-[#5F5F60] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          Give us important information about your business to get you started
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Name */}
          <div>
            <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
              Enter your name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
              placeholder=""
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
              Enter your occupation
            </label>
            <input
              type="text"
              required
              value={formData.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
              placeholder=""
            />
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                Height
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className="w-full p-3 sm:p-4 pr-12 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
                  placeholder=""
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D96073] font-semibold text-sm sm:text-base">
                  cm
                </span>
              </div>
            </div>
            <div>
              <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                Weight
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className="w-full p-3 sm:p-4 pr-12 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
                  placeholder=""
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D96073] font-semibold text-sm sm:text-base">
                  kg
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
              Enter your Bio
            </label>
            <textarea
              required
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all resize-none text-[#262628]"
              placeholder=""
            />
          </div>

          {/* Profile Picture Upload */}
          <ImageUpload
            id="profileImageUpload"
            label="Upload profile picture"
            image={formData.profileImage}
            imageName={formData.profileImageName}
            onImageChange={(image, name) => {
              handleChange("profileImage", image);
              handleChange("profileImageName", name);
            }}
            onImageRemove={() => {
              handleChange("profileImage", null);
              handleChange("profileImageName", null);
            }}
            imageShape="circular"
          />

          {/* Submit Button */}
          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full sm:w-2/3 mx-auto block bg-[#D96073] text-[#FFF6EF] font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-2xl sm:rounded-3xl hover:bg-[#C85563] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation shadow-[0px_4px_20px_-4px_#BA7F88D9]"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
