// app/signup/step3/page.js
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProgressIndicator from "../components/ProgressIndicator";
import DualRangeSlider from "../../components/Slidebar";

export default function SignupStep3() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("signupEmail");
    const step2Data = localStorage.getItem("profileStep2");

    if (!email || !step2Data) {
      router.push("/signup");
      return;
    }

    try {
      const parsedData = JSON.parse(step2Data);
      const timer = setTimeout(() => {
        setUserRole(parsedData.role);
      }, 100);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error parsing step2 data:", error);
      router.push("/signup");
    }
  }, [router]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImageName(null);
  };

  const handleSubmit = () => {
    const step3Data = {
      image: uploadedImage,
      imageName: imageName,
    };

    localStorage.setItem("profileStep3", JSON.stringify(step3Data));
    router.push("/home");
  };

  const handleBack = () => {
    router.push("/signup/step2");
  };

  const imageShape =
    userRole === "private-massager" ? "rounded-full" : "rounded-lg";
  const imageLabel =
    userRole === "salon-owner"
      ? "Provide pics of your salon"
      : "Upload your profile picture";

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
        <ProgressIndicator currentStep={3} />

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

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#262628]">
            Complete your profile
          </h1>

          {/* Description */}
          <p className="text-[#5F5F60] font-semibold text-base sm:text-lg leading-snug mb-6 sm:mb-8">
            Give us important information about your business to get you started
          </p>

          {/* Image Upload Section */}
          <div className="mb-6 sm:mb-8">
            <label className="text-[#5F5F60] font-semibold text-base sm:text-lg block mb-3 sm:mb-4">
              {imageLabel}
            </label>

            {uploadedImage ? (
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[#EDCFC9] rounded-xl">
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 ${imageShape} overflow-hidden flex-shrink-0 border-2 border-[#D96073]`}
                >
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-[#5F5F60] truncate">
                    {imageName}
                  </p>
                  <p className="text-xs sm:text-sm text-[#262628] font-medium mt-1">
                    Uploaded ✓
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-sm sm:text-base text-[#D96073] font-semibold hover:underline flex-shrink-0 touch-manipulation px-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="fileUpload"
                  className="w-[103px] h-[92px] flex flex-col items-center justify-center rounded-xl bg-[#DEAAB2] border-dashed border-2 border-[#D96073] cursor-pointer hover:bg-[#D9A0AA] transition-colors touch-manipulation group"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-1"
                  >
                    <path
                      d="M14.0002 26.6666C14.0002 27.1971 14.2109 27.7058 14.5859 28.0809C14.961 28.4559 15.4697 28.6666 16.0002 28.6666C16.5306 28.6666 17.0393 28.4559 17.4144 28.0809C17.7894 27.7058 18.0002 27.1971 18.0002 26.6666V18H26.6668C27.1973 18 27.706 17.7893 28.081 17.4142C28.4561 17.0391 28.6668 16.5304 28.6668 16C28.6668 15.4695 28.4561 14.9608 28.081 14.5858C27.706 14.2107 27.1973 14 26.6668 14H18.0002V5.33331C18.0002 4.80288 17.7894 4.29417 17.4144 3.9191C17.0393 3.54403 16.5306 3.33331 16.0002 3.33331C15.4697 3.33331 14.961 3.54403 14.5859 3.9191C14.2109 4.29417 14.0002 4.80288 14.0002 5.33331V14H5.3335C4.80306 14 4.29436 14.2107 3.91928 14.5858C3.54421 14.9608 3.3335 15.4695 3.3335 16C3.3335 16.5304 3.54421 17.0391 3.91928 17.4142C4.29436 17.7893 4.80306 18 5.3335 18H14.0002V26.6666Z"
                      fill="#D96073"
                    />
                  </svg>
                  <span className="text-xs text-[#5F5F60] font-medium group-hover:text-[#D96073] transition-colors">
                    Upload
                  </span>
                </label>
                <p className="text-xs text-[#5F5F60]/70 mt-2">Max size: 5MB</p>
              </>
            )}
          </div>

          {/* Slider Section */}
          <div className="mb-8 sm:mb-10">
            <DualRangeSlider />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-[#D96073] text-[#FFF6EF] h-12 sm:h-14 w-full sm:w-2/3 lg:w-1/2 rounded-2xl sm:rounded-3xl font-bold text-lg sm:text-xl hover:bg-[#C85563] transition-colors min-h-[48px] touch-manipulation shadow-[0px_4px_20px_-4px_#BA7F88D9]"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
