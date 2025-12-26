// app/signup/step3/page.js
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProgressIndicator from "../components/ProgressIndicator";
import DualRangeSlider from "../../components/Slidebar";
import { createSalonProfile, registerPrivateMassager } from "../../lib/api";

export default function SignupStep3() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store actual File object
  const [imagePreview, setImagePreview] = useState(null); // Store preview URL
  const [priceRange, setPriceRange] = useState({ min: 100, max: 800 });
  const [selectedMassages, setSelectedMassages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const massageTypes = [
    "Neck/Shoulder",
    "Oil massage",
    "Foot massage",
    "Aromatherapy",
    "Hot compress",
    "Others",
    "Nuad Thai",
  ];

  useEffect(() => {
    const email = localStorage.getItem("signupEmail");
    const step2Data = localStorage.getItem("profileStep2");
    console.log("Step 2 Data: ", step2Data);
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

      // Store the actual File object
      setImageFile(file);

      // Create preview URL for display
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    // Revoke the preview URL to free up memory
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Callback for the DualRangeSlider to update price range
  const handlePriceRangeChange = useCallback((min, max) => {
    setPriceRange({ min, max });
  }, []);

  // Handle massage selection toggle
  const toggleMassageSelection = (massage) => {
    setSelectedMassages((prev) => {
      if (prev.includes(massage)) {
        return prev.filter((m) => m !== massage);
      } else {
        return [...prev, massage];
      }
    });
  };

  const handleSubmitSalonOwner = async (email, step2Data) => {
    // Create FormData for salon owner
    const formData = new FormData();
    formData.append("salonImage", imageFile);
    formData.append("salonName", step2Data.salonName || "");
    formData.append("ownerEmail", email);
    formData.append("ownerName", step2Data.name || "Owner name not parsed");
    formData.append("priceRange", `$${priceRange.min}-$${priceRange.max}`);

    // Add location as JSON string
    if (step2Data.location) {
      formData.append(
        "location",
        JSON.stringify({
          city: step2Data.location.city || "",
          country: step2Data.location.country || "",
          province: step2Data.location.province || "",
          streetAddress: step2Data.location.streetAddress || "",
        })
      );
    }

    // Add massage types
    formData.append("typesOfMassages", JSON.stringify(selectedMassages));

    // Add subscription ID if available
    if (step2Data.subscriptionID) {
      formData.append("subscriptionID", step2Data.subscriptionID);
    }

    // Call the API
    const response = await createSalonProfile(formData);

    if (response.success) {
      // Store step 3 data
      const step3Data = {
        imageName: imageFile.name,
        priceRange: priceRange,
        selectedMassages: selectedMassages,
      };
      localStorage.setItem("profileStep3", JSON.stringify(step3Data));

      // Store the profile IDs correctly based on backend response structure
      if (response.data?.profileId) {
        localStorage.setItem("salonProfileId", response.data.profileId);
      }

      if (response.data?.ownerId) {
        localStorage.setItem("ownerId", response.data.ownerId);
      }

      console.log("Salon profile created:", {
        profileId: response.data?.profileId,
        ownerId: response.data?.ownerId,
      });

      return true;
    }
    return false;
  };

  const handleSubmitPrivateMassager = async (email, step2Data) => {
    // Create FormData for private massager
    const formData = new FormData();
    formData.append("profilePicture", imageFile);
    formData.append("ownerEmail", email);
    formData.append("ownerName", step2Data.name || "");
    formData.append("occupation", step2Data.occupation || "");
    formData.append("gender", step2Data.gender || "");
    formData.append("height", step2Data.height || "");
    formData.append("weight", step2Data.weight || "");
    formData.append("aboutMe", step2Data.aboutMe || "");
    formData.append("priceRange", `$${priceRange.min}-$${priceRange.max}`);

    // Add massage types
    formData.append("typesOfMassages", JSON.stringify(selectedMassages));

    // Add subscription ID if available
    if (step2Data.subscriptionID) {
      formData.append("subscriptionID", step2Data.subscriptionID);
    }

    // Call the API
    const response = await registerPrivateMassager(formData);

    if (response.success) {
      // Store step 3 data
      const step3Data = {
        imageName: imageFile.name,
        priceRange: priceRange,
        selectedMassages: selectedMassages,
      };
      localStorage.setItem("profileStep3", JSON.stringify(step3Data));

      // Store the profile IDs correctly based on backend response structure
      if (response.status === 201 || response.status === 200) {
        console.log("RESPONSE:", response.data);
      }
      if (response.data?.owner?.id) {
        localStorage.setItem("massagerProfileId", response.data.owner.id);
      }

      if (response.data?.profileMassager?.ownerId) {
        localStorage.setItem("ownerId", response.data.profileMassager.ownerId);
      }

      console.log("Massager profile created:", {
        profileId: response.data?.profileId,
        ownerId: response.data?.owner?._id,
      });

      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    // Clear previous errors
    setError(null);

    // Validate image upload
    if (!imageFile) {
      setError("Please upload an image");
      return;
    }

    // Validate massage selection
    if (selectedMassages.length === 0) {
      setError("Please select at least one massage type");
      return;
    }

    // Get all data from localStorage
    const email = localStorage.getItem("signupEmail");
    const step2Data = JSON.parse(localStorage.getItem("profileStep2") || "{}");

    // Validate required data based on role
    if (userRole === "salon-owner") {
      if (!step2Data.salonName) {
        setError("Salon name is missing. Please go back to step 2.");
        return;
      }
      if (!step2Data.location || !step2Data.location.streetAddress) {
        setError("Location details are missing. Please go back to step 2.");
        return;
      }
    } else if (userRole === "private-massager") {
      if (!step2Data.name || !step2Data.occupation || !step2Data.gender) {
        setError("Personal information is missing. Please go back to step 2.");
        return;
      }
    }

    setIsLoading(true);

    try {
      let success = false;

      if (userRole === "salon-owner") {
        success = await handleSubmitSalonOwner(email, step2Data);
      } else if (userRole === "private-massager") {
        success = await handleSubmitPrivateMassager(email, step2Data);
      }

      if (success) {
        // Navigate to home
        router.push("/home");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setError(error.message || "Failed to create profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
            className="flex items-center gap-2 text-[#D96073] font-semibold text-sm sm:text-base mb-6 sm:mb-8 hover:gap-3 transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Image Upload Section */}
          <div className="mb-6 sm:mb-8">
            <label className="text-[#5F5F60] font-semibold text-base sm:text-lg block mb-3 sm:mb-4">
              {imageLabel}
            </label>

            {imagePreview ? (
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[#EDCFC9] rounded-xl">
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 ${imageShape} overflow-hidden flex-shrink-0 border-2 border-[#D96073]`}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-[#5F5F60] truncate">
                    {imageFile?.name}
                  </p>
                  <p className="text-xs sm:text-sm text-[#262628] font-medium mt-1">
                    Uploaded ✓
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isLoading}
                  className="text-sm sm:text-base text-[#D96073] font-semibold hover:underline flex-shrink-0 touch-manipulation px-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={isLoading}
                />
                <label
                  htmlFor="fileUpload"
                  className={`w-[103px] h-[92px] flex flex-col items-center justify-center rounded-xl bg-[#DEAAB2] border-dashed border-2 border-[#D96073] cursor-pointer hover:bg-[#D9A0AA] transition-colors touch-manipulation group ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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

          {/* Massage Selection Section */}
          <div className="mb-6 sm:mb-8">
            <label className="text-[#5F5F60] font-semibold text-base sm:text-lg block mb-3 sm:mb-4">
              What kind of massages you provide??
            </label>

            <div className="bg-[#EDCFC9] rounded-xl p-4 sm:p-5 border-2 border-dashed border-[#D96073]">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {massageTypes.map((massage) => (
                  <button
                    key={massage}
                    type="button"
                    onClick={() => toggleMassageSelection(massage)}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all touch-manipulation ${
                      selectedMassages.includes(massage)
                        ? "bg-[#D96073] text-white"
                        : "bg-[#FEC9BE] text-[#5F5F60] hover:bg-[#F5B8AD]"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {massage}
                  </button>
                ))}
              </div>
              {selectedMassages.length > 0 && (
                <p className="text-xs text-[#5F5F60] mt-3">
                  Selected: {selectedMassages.length} massage type
                  {selectedMassages.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {/* Slider Section */}
          <div className="mb-8 sm:mb-10">
            <DualRangeSlider
              onRangeChange={handlePriceRangeChange}
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={
                isLoading || !imageFile || selectedMassages.length === 0
              }
              className="bg-[#D96073] text-[#FFF6EF] h-12 sm:h-14 w-full sm:w-2/3 lg:w-1/2 rounded-2xl sm:rounded-3xl font-bold text-lg sm:text-xl hover:bg-[#C85563] transition-colors min-h-[48px] touch-manipulation shadow-[0px_4px_20px_-4px_#BA7F88D9] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="button"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Profile...
                </>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
