  "use client";
  import { useRouter } from "next/navigation";
  import { useState } from "react";
  import Image from "next/image";
  import Link from "next/link";
  import { Eye, EyeOff } from "lucide-react";
  // import { SignUpButton } from "@clerk/nextjs";

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
