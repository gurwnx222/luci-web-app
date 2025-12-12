"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/Navbar";
import DualRangeSlider from "@/app/components/Slidebar";

export default function SignupStep3() {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    router.push("/signup/success");
  };

  return (
    <div className="min-h-screen bg-[#FDE5E0] flex flex-col items-center ">
      <Navbar />
      <section className="flex bg-[#FEC9BE] mt-6 mx-auto h-[530px] flex-col rounded-4xl p-10 w-[689.9999389648443px]">
        <div className="flex flex-col gap-8  ml-35">
          <div className="font-bold text-[32px] leading-[100%] text-[#262628]">
            Complete your profile
          </div>
          <div className="font-bold text-[#5F5F60] leading-[100%] text-[18px]">
            Give us important information about <br /> your business to get you
            started
          </div>
        </div>
        <div className="flex flex-col gap-4 ml-20 mt-10 text-[#5F5F60]">
          <div className="font-bold text-[18px] leading-[100%] ">
            Provide pics of your salon
          </div>
          {file ? (
            <>
              <span className="text-m font-semibold text-[#5F5F60]  break-words">
                {file.name}
              </span>
              <span className="text-[16px] text-[#262628]">Uploaded ✓</span>
            </>
          ) : (
            <>
              <input
                type="file"
                id="fileUpload"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="fileUpload"
                className="w-[103px] flex items-center justify-center text-black py-3 rounded-xl bg-[#DEAAB2] border-dashed h-[92px] border-2 border-[#D96073] "
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <g clip-path="url(#clip0_536_48)"> */}
                  <path
                    d="M14.0002 26.6666C14.0002 27.1971 14.2109 27.7058 14.5859 28.0809C14.961 28.4559 15.4697 28.6666 16.0002 28.6666C16.5306 28.6666 17.0393 28.4559 17.4144 28.0809C17.7894 27.7058 18.0002 27.1971 18.0002 26.6666V18H26.6668C27.1973 18 27.706 17.7893 28.081 17.4142C28.4561 17.0391 28.6668 16.5304 28.6668 16C28.6668 15.4695 28.4561 14.9608 28.081 14.5858C27.706 14.2107 27.1973 14 26.6668 14H18.0002V5.33331C18.0002 4.80288 17.7894 4.29417 17.4144 3.9191C17.0393 3.54403 16.5306 3.33331 16.0002 3.33331C15.4697 3.33331 14.961 3.54403 14.5859 3.9191C14.2109 4.29417 14.0002 4.80288 14.0002 5.33331V14H5.3335C4.80306 14 4.29436 14.2107 3.91928 14.5858C3.54421 14.9608 3.3335 15.4695 3.3335 16C3.3335 16.5304 3.54421 17.0391 3.91928 17.4142C4.29436 17.7893 4.80306 18 5.3335 18H14.0002V26.6666Z"
                    fill="#D96073"
                  />
                  {/* </g> */}
                  <defs>
                    {/* <clipPath id="clip0_536_48">
                  <rect width="32" height="32" fill="white" />
                </clipPath> */}
                  </defs>
                </svg>
              </label>
            </>
          )}
        </div>
        <div>
          <DualRangeSlider />
        </div>
        <div className="flex justify-center items-center ">
          <button
            onClick={handleSubmit}
            className="bg-[#D96073] text-[#FFF6EF] h-14 w-1/2 mt-4 rounded-3xl font-bold text-[24px] leading-[100%]"
            type="button"
          >
            Next
          </button>
        </div>
        <div></div>
      </section>
    </div>
  );
}

//  <input
//           type="file"
//           className="w-full border p-3 rounded-lg"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-green-600 text-white py-3 rounded-xl"
//         >
//           Complete Signup
//         </button>
