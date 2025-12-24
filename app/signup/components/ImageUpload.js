// app/signup/components/ImageUpload.js
"use client";

export default function ImageUpload({
  id,
  label,
  image,
  imageName,
  onImageChange,
  onImageRemove,
  imageShape = "rounded", // "rounded" or "circular"
}) {
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
        onImageChange(reader.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const shapeClass = imageShape === "circular" ? "rounded-full" : "rounded-lg";

  return (
    <div>
      <label className="text-[#5F5F60] font-semibold text-sm sm:text-base block mb-2">
        {label}
      </label>

      {image ? (
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-[#EDCFC9] rounded-lg">
          <div
            className={`relative w-16 h-16 sm:w-20 sm:h-20 ${shapeClass} overflow-hidden flex-shrink-0 border-2 border-[#D96073]`}
          >
            <img
              src={image}
              alt="Upload preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-semibold text-[#5F5F60] truncate">
              {imageName}
            </p>
            <p className="text-xs sm:text-sm text-[#262628] font-medium">
              Uploaded ✓
            </p>
          </div>
          <button
            type="button"
            onClick={onImageRemove}
            className="text-sm text-[#D96073] font-semibold hover:underline flex-shrink-0 touch-manipulation px-2"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <input
            type="file"
            id={id}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor={id}
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
  );
}
