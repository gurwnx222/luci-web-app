// app/signup/page.js
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignupStep1() {
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const result = await signup(form.email, form.password);

    if (result.success) {
      localStorage.setItem("signupEmail", form.email);
      router.push("/signup/step2");
    } else {
      setError(result.error || "Failed to create account");
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    const result = await loginWithGoogle();

    if (result.success) {
      localStorage.setItem("signupEmail", result.user.email);
      router.push("/signup/step2");
    } else {
      setError(result.error || "Failed to sign up with Google");
    }
    setLoading(false);
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

      {/* MAIN SECTION - CENTERED */}
      <section className="flex justify-center items-center w-full min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-88px)] px-4 sm:px-6 lg:px-8 py-8">
        {/* FORM CONTAINER - CENTERED WITH MAX WIDTH */}
        <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-[#FEC9BE] rounded-2xl sm:rounded-3xl flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-2xl mx-auto w-full">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight text-[#262628]">
              Create your business account
              <div className="font-bold text-[#5F5F60] mt-2 sm:mt-2.5 text-sm sm:text-base md:text-lg leading-tight">
                Have an account?{" "}
                <Link href="/login" className="text-[#D96073] underline">
                  Log in now
                </Link>
              </div>
            </h1>

            <div className="w-full space-y-4 mt-6 sm:mt-8 lg:mt-10">
              <form onSubmit={handleNext} className="relative">
                <label
                  htmlFor="email"
                  className="text-[#5F5F60] font-bold text-sm sm:text-base md:text-lg leading-tight block"
                >
                  Enter your email
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder=""
                  className="w-full mt-2 mb-5 sm:mb-6 md:mb-8 text-black text-sm sm:text-base p-3 sm:p-3.5 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none border-0"
                  value={form.email}
                  required
                  disabled={loading}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <label
                  htmlFor="password"
                  className="text-[#5F5F60] font-bold text-sm sm:text-base md:text-lg leading-tight block"
                >
                  Create password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    id="password"
                    className="w-full mt-2 text-black text-sm sm:text-base p-3 pr-12 sm:p-3.5 sm:pr-12 rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none border-0"
                    value={form.password}
                    required
                    disabled={loading}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D96073] p-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="sm:w-5 sm:h-5" />
                    ) : (
                      <Eye size={18} className="sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>

                {error && (
                  <p className="text-red-600 text-xs sm:text-sm mt-2 font-semibold">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-[85%] md:w-[80%] bg-[#D96073] cursor-pointer flex justify-center items-center mt-4 sm:mt-5 text-[#FFF6EF] mx-auto font-black text-sm sm:text-base md:text-lg py-3 sm:py-3.5 rounded-xl shadow-[0px_4px_20px_-4px_#BA7F88D9] hover:bg-[#C55566] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating account..." : "Create my account"}
                </button>
              </form>

              <p className="font-light text-xs sm:text-sm md:text-base mt-4 sm:mt-5 leading-tight text-[#5F5F60] text-center">
                or sign up with
              </p>

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="flex bg-[#EDCFC9] w-full p-3.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-[#E7C9C3] justify-center items-center gap-2.5 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base font-normal leading-tight text-[#5F5F60] hover:bg-[#E5C5BF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.96409 10.7099C3.78409 10.1699 3.68182 9.59313 3.68182 8.99995C3.68182 8.40677 3.78409 7.82995 3.96409 7.28995V4.95813H0.957273C0.347727 6.17313 0 7.54768 0 8.99995C0 10.4522 0.347727 11.8268 0.957273 13.0418L3.96409 10.7099Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
                    fill="#D96073"
                  />
                </svg>
                <span>continue with google</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
