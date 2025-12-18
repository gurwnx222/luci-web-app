// app/signup/step2/page.js
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function SignupStep2() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", salonName: "", location: "" });

  useEffect(() => {
    const email = localStorage.getItem("signupEmail");
    if (!email) {
      router.push("/signup");
    }
  }, [router]);

  const handleNext = (e) => {
    e.preventDefault();

    const profileData = {
      name: form.name,
      salonName: form.salonName,
      location: form.location,
    };

    localStorage.setItem("profileStep2", JSON.stringify(profileData));
    router.push("/signup/step3");
  };

  return (
    <div className="min-h-screen bg-[#FDE5E0] pb-8">
      <Navbar />

      {/* MAIN BOX */}
      <section className="flex items-center justify-center mt-4 sm:mt-8 px-4">
        <div className="w-full max-w-[700px] min-h-[530px] bg-[#FEC9BE] rounded-3xl lg:rounded-4xl px-6 sm:px-12 lg:px-40 py-6 sm:py-8 flex flex-col items-start">
          {/* HEADING */}
          <h1 className="text-[#262628] font-bold text-2xl sm:text-[32px] leading-none">
            Complete your profile
          </h1>

          <p className="text-[#5F5F60] font-bold text-start text-base sm:text-lg leading-none mt-3">
            Give us important information about{" "}
            <br className="hidden sm:block" /> your business to get you started
          </p>

          {/* INPUTS AREA */}
          <div className="w-full mt-6 sm:mt-10 space-y-4 sm:space-y-6 text-black">
            <form onSubmit={handleNext} className="flex flex-col gap-1">
              <label className="text-[#5F5F60] font-bold text-sm sm:text-base">
                Enter your name
              </label>
              <input
                type="text"
                required
                className="w-full p-3 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label className="text-[#5F5F60] mt-4 font-bold text-sm sm:text-base">
                Enter your salon name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none"
                value={form.salonName}
                required
                onChange={(e) =>
                  setForm({ ...form, salonName: e.target.value })
                }
              />

              <label className="text-[#5F5F60] mt-4 font-bold text-sm sm:text-base">
                Enter your salon location
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none"
                value={form.location}
                required
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />

              {/* NEXT BUTTON */}
              <button
                type="submit"
                className="w-full sm:w-[60%] lg:w-[40%] mx-auto mt-6 bg-[#D96073] text-[#FFF6EF] font-black text-base sm:text-lg py-3 rounded-xl shadow-[0px_4px_20px_-4px_#BA7F88D9]"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
