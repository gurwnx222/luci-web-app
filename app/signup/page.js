"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignupStep1() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();

    router.push("/signup/step2");
  };

  return (
    <div className="min-h-screen w-screen bg-[#FDE5E0]">
      {/* NAVBAR */}
      <nav className="flex items-center pt-10 px-20 w-full">
        <div className="relative flex gap-2 items-center">
          <Image src="/logo.png" width={55} height={55} alt="logo" />
          <div className="font-bold text-[36px] text-[#262628]">Luci</div>
        </div>
      </nav>

      {/* MAIN SECTION - TWO COLUMNS */}
      <section className="flex w-full h-[calc(100vh-100px)]">
        {/* LEFT SIDE */}
        <div className="w-2/3 bg-[#FEC9BE] mt-5 h-150 rounded-tr-4xl rounded-br-4xl flex flex-col justify-center px-45  ">
          <h1 className="text-4xl font-bold mb-6 leading-[100%] text-[32px] text-[#262628]">
            Create your business account
            <div className="font-bold text-[#5F5F60] mt-2.5 text-[18px] leading-[100%]">
              Have an account?{" "}
              <Link href="/login" className="text-[#D96073] underline">
                Log in now
              </Link>
            </div>
          </h1>

          <div className="w-full max-w-sm space-y-4 mt-10">
          <form onSubmit={handleNext} className="relative">
              <label
              htmlFor="email"
              className="text-[#5F5F60] font-bold text-[18px] leading-0"
            >
              Enter your email
            </label>

            <input
              type="email"
              placeholder=""
              className="w-full mt-2 mb-8 text-black p-3 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none border-0"
              value={form.email}
               required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label
              htmlFor="password"
              className="text-[#5F5F60]  font-bold text-[18px] leading-0"
            >
              Create password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              id="password"
              className="w-full mt-2 text-black p-3 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none border-0"
              value={form.password}
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* icon for password show and hide */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-86 top-42 -translate-y-1/2 text-[#D96073]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            <button
              type="submit"
              className="w-[80%] bg-[#D96073] cursor-pointer flex justify-center items-center mt-4 text-[#FFF6EF] mx-auto font-black text-[18px]  py-3 rounded-xl shadow-[0px_4px_20px_-4px_#BA7F88D9]"
            >
              Create my account
            </button>
          </form>
          

            <p className="font-light text-[16px] mt-5 leadin-[100%] text-[#5F5F60] text-center">
              or sign up with
            </p>

            <button
              type="button"
              className="flex bg-[#EDCFC9] w-full  p-5 rounded-2xl border  border-[#E7C9C3] justify-center items-center gap-4 text-[16px] font-normal leading-0 text-[#5F5F60]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  // fill-rule="evenodd"
                  // clip-rule="evenodd"
                  d="M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z"
                  fill="#4285F4"
                />
                <path
                  // fill-rule="evenodd"
                  // clip-rule="evenodd"
                  d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
                  fill="#34A853"
                />
                <path
                  // fill-rule="evenodd"
                  // clip-rule="evenodd"
                  d="M3.96409 10.7099C3.78409 10.1699 3.68182 9.59313 3.68182 8.99995C3.68182 8.40677 3.78409 7.82995 3.96409 7.28995V4.95813H0.957273C0.347727 6.17313 0 7.54768 0 8.99995C0 10.4522 0.347727 11.8268 0.957273 13.0418L3.96409 10.7099Z"
                  fill="#FBBC05"
                />
                <path
                  // fill-rule="evenodd"
                  // clip-rule="evenodd"
                  d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
                  fill="#D96073"
                />
              </svg>
              create account with google
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 text-white flex flex-col items-baseline -mt-30   p-30  justify-center text-3xl">
          <div className="flex gap-6 justify-center items-center">
            <div className="text-[#D96073] font-medium text-[13px] text-center flex items-center justify-center leading-0 rounded-full w-8 h-8  border-2 border-[#D96073]">
              01
            </div>
            <div className=" font-bold text-[28px] leading-0 text-[#465668]">
              Create account
            </div>
          </div>
          <div className="h-10 text-[#A1AEBE] w-0 translate-x-3 my-1 rounded-full bg-transparent border-dotted border-2 "></div>
          <div className="flex gap-6 justify-center items-center">
            <div className="text-black font-medium text-[13px] text-center flex items-center justify-center leading-0 rounded-full w-8 h-8  border-2 border-[#A1AEBE]">
              02
            </div>
            <div className=" font-bold text-[28px] leading-0 text-[#465668]">
              Complete profile
            </div>
          </div>
          <div className="h-10 text-[#A1AEBE] w-0 translate-x-3 my-1 rounded-full bg-transparent border-dotted border-2 "></div>
          <div className="flex gap-6 justify-center items-center">
            <div className="text-black font-medium text-[13px] text-center flex items-center justify-center leading-0 rounded-full w-8 h-8  border-2 border-[#A1AEBE]">
              03
            </div>
            <div className=" font-bold text-[28px] leading-0 text-[#465668]">
              Thank you
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
