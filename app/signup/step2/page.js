"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function SignupStep2() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", salonName: "", location: "" });

  const handleNext = (e) => {
    e.preventDefault();
    router.push("/signup/step3");
  };

  return (
    <div className="min-h-screen bg-[#FDE5E0]">
      <Navbar />

      {/* MAIN BOX */}
      <section className="flex items-center justify-center mt-8">
        <div className="w-[700px] h-[530px]  bg-[#FEC9BE] rounded-4xl px-40 py-8 flex flex-col items-start ">
          {/* HEADING */}
          <h1 className="text-[#262628] font-bold text-[32px] leading-none">
            Complete your profile
          </h1>

          <p className="text-[#5F5F60] font-bold text-start text-[18px] leading-none mt-3 ">
            Give us important information about <br /> your business to get you
            started
          </p>

          {/* INPUTS AREA */}
          <div className="w-full max-w-md mt-10 space-y-6 text-black">
            {/* name */}
            <div className="flex flex-col gap-1">
              <form onSubmit={handleNext} className="flex flex-col gap-1">
                <label className="text-[#5F5F60] font-bold text-[16px]">
                  Enter your name
                </label>
                <input
                  type="text"
                  // placeholder=""
                  required
                  className="w-full p-3 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <label className="text-[#5F5F60] mt-2 font-bold text-[16px]">
                Enter your salon name
              </label>

              <input
                type="text"
                // placeholder="Enter age"
                className="w-full p-3 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none"
                value={form.salonName}
                required
                onChange={(e) =>
                  setForm({ ...form, salonName: e.target.value })
                }
              />
                <label className="text-[#5F5F60] mt-2 font-bold text-[16px]">
                Enter your salon location
              </label>

              <input
                className="w-full p-3 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none"
                value={form.location}
                required
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              ></input>
              
            {/* NEXT BUTTON */}
            <button
              type="submit"
              className="w-[40%] translate-x-25 mt-4 bg-[#D96073] text-[#FFF6EF] font-black text-[18px] py-3 rounded-xl shadow-[0px_4px_20px_-4px_#BA7F88D9]"
            >
              Next
            </button>
              </form>
                
            </div>



          </div>
        </div>
      </section>
    </div>
  );
}
