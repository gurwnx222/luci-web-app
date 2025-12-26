// app/signup/step2/page.js
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProgressIndicator from "../components/ProgressIndicator";

export default function SignupStep2() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState("role"); // "role", "salon-form", "work-form"
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    // Common
    name: "",
    // Salon Owner
    salonName: "",
    country: "",
    city: "",
    province: "",
    streetAddress: "",
    // Private Massager
    occupation: "",
    gender: "",
    height: "",
    weight: "",
    aboutMe: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("signupEmail");
    if (!email) {
      router.push("/signup");
    }
  }, [router]);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === "salon-owner") {
      setCurrentView("salon-form");
    } else {
      setCurrentView("work-form");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    if (currentView === "salon-form" || currentView === "work-form") {
      setCurrentView("role");
      setSelectedRole(null);
    } else {
      router.push("/signup");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      role: selectedRole,
      ...(selectedRole === "salon-owner"
        ? {
            name: formData.name,
            salonName: formData.salonName,
            location: {
              country: formData.country,
              city: formData.city,
              province: formData.province,
              streetAddress: formData.streetAddress,
            },
          }
        : {
            name: formData.name,
            occupation: formData.occupation,
            gender: formData.gender,
            height: formData.height,
            weight: formData.weight,
            aboutMe: formData.aboutMe,
          }),
    };

    localStorage.setItem("profileStep2", JSON.stringify(profileData));

    router.push("/signup/step3");
  };

  const isFormValid = () => {
    if (selectedRole === "salon-owner") {
      return (
        formData.name.trim() &&
        formData.salonName.trim() &&
        formData.country.trim() &&
        formData.city.trim() &&
        formData.province.trim() &&
        formData.streetAddress.trim()
      );
    } else {
      return (
        formData.name.trim() &&
        formData.occupation.trim() &&
        formData.gender.trim() &&
        formData.height.trim() &&
        formData.weight.trim() &&
        formData.aboutMe.trim()
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDE5E0]">
      {/* NAVBAR */}
      <nav className="w-full bg-[#FDE5E0] py-3 px-4 sm:py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
            <Image
              src="/logo.png"
              fill
              alt="logo"
              className="object-contain"
              sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
              priority
            />
          </div>
          <div className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-[#262628]">
            Luci
          </div>
        </div>
      </nav>

      {/* MAIN SECTION */}
      <section className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-88px)] px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} />

        {/* CONTENT CONTAINER */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-[#FEC9BE] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
          {/* Back Button */}
          <button
            onClick={handleBack}
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

          {/* ROLE SELECTION VIEW */}
          {currentView === "role" && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#262628] mb-3 sm:mb-4">
                What is your role?
              </h2>
              <p className="text-[#5F5F60] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                Select the occupation you have, either salon owner or Private
                Massager to curate a specific features for only you.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => handleRoleSelect("salon-owner")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#EDCFC9] border-2 border-[#E7C9C3] hover:border-[#D96073] hover:bg-[#E5C5BF] transition-all group min-h-[56px] sm:min-h-[64px] touch-manipulation"
                >
                  <span className="text-[#5F5F60] font-medium text-base sm:text-lg">
                    Salon Owner
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#D96073] flex items-center justify-center group-hover:bg-[#D96073] transition-colors flex-shrink-0">
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-transparent group-hover:bg-white transition-colors" />
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect("private-massager")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#EDCFC9] border-2 border-[#E7C9C3] hover:border-[#D96073] hover:bg-[#E5C5BF] transition-all group min-h-[56px] sm:min-h-[64px] touch-manipulation"
                >
                  <span className="text-[#5F5F60] font-medium text-base sm:text-lg">
                    Private Massager
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#D96073] flex items-center justify-center group-hover:bg-[#D96073] transition-colors flex-shrink-0">
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-transparent group-hover:bg-white transition-colors" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* SALON OWNER FORM */}
          {currentView === "salon-form" && (
            <form onSubmit={handleSubmit} className="animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#262628] mb-3 sm:mb-4">
                Enter your salon information
              </h2>
              <p className="text-[#5F5F60] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                Give us important information about your business to get you
                started
              </p>

              <div className="space-y-5 sm:space-y-6">
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
                  />
                </div>

                <div>
                  <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                    Enter your salon name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.salonName}
                    onChange={(e) => handleChange("salonName", e.target.value)}
                    className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
                    />
                  </div>
                  <div>
                    <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
                    />
                  </div>
                  <div>
                    <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                      Province
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.province}
                      onChange={(e) => handleChange("province", e.target.value)}
                      className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                    What&apos;s your salon&apos;s street address ?
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={(e) =>
                      handleChange("streetAddress", e.target.value)
                    }
                    className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628]"
                  />
                </div>

                <div className="pt-4 sm:pt-6">
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full sm:w-2/3 mx-auto block bg-[#D96073] text-[#FFF6EF] font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-2xl sm:rounded-3xl hover:bg-[#C85563] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation shadow-[0px_4px_20px_-4px_#BA7F88D9]"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* PRIVATE MASSAGER FORM */}
          {currentView === "work-form" && (
            <form onSubmit={handleSubmit} className="animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#262628] mb-3 sm:mb-4">
                Enter your work information
              </h2>
              <p className="text-[#5F5F60] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                Give us important information about your business to get you
                started
              </p>

              <div className="space-y-5 sm:space-y-6">
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
                  />
                </div>

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
                  />
                </div>

                <div>
                  <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                    Select your gender
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all min-h-[48px] text-[#262628] appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23D96073' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "12px",
                    }}
                  >
                    <option value="" disabled>
                      Choose an option
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

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
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D96073] font-semibold text-sm sm:text-base">
                        kg
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
                    Enter your Bio
                  </label>
                  <textarea
                    required
                    value={formData.aboutMe}
                    onChange={(e) => handleChange("aboutMe", e.target.value)}
                    rows={4}
                    className="w-full p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none focus:ring-2 focus:ring-[#D96073]/30 transition-all resize-none text-[#262628]"
                  />
                </div>

                <div className="pt-4 sm:pt-6">
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full sm:w-2/3 mx-auto block bg-[#D96073] text-[#FFF6EF] font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-2xl sm:rounded-3xl hover:bg-[#C85563] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation shadow-[0px_4px_20px_-4px_#BA7F88D9]"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
