// app/login/page.js
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user, router]);

  const handleNext = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await login(form.email, form.password);

      if (result.success) {
        console.log("Login successful, redirecting to home");
        // Wait a bit for auth state to update
        setTimeout(() => {
          router.push("/home");
        }, 500);
      } else {
        setError(result.error || "Failed to login");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await loginWithGoogle();

      if (result.success) {
        console.log("Google login successful, redirecting to home");
        // Wait a bit for auth state to update
        setTimeout(() => {
          router.push("/home");
        }, 500);
      } else {
        setError(result.error || "Failed to login with Google");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#FDE5E0]">
      {/* MAIN SECTION */}
      <section className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-2/3 mt-4 lg:mt-29 bg-[#FEC9BE] rounded-3xl lg:rounded-tr-4xl lg:rounded-br-4xl lg:rounded-tl-none lg:rounded-bl-none flex flex-col justify-center px-6 sm:px-12 lg:px-45 py-12 lg:py-0 mx-4 lg:mx-0 my-4 lg:my-0 lg:h-150">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 leading-tight text-[#262628]">
            Login to your account
            <div className="font-bold text-[#5F5F60] mt-2.5 text-base sm:text-lg leading-tight">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#D96073] underline">
                create an account
              </Link>
            </div>
          </h1>

          <div className="w-full max-w-sm space-y-4 mt-6 lg:mt-10">
            <form onSubmit={handleNext} className="relative">
              <label
                htmlFor="email"
                className="text-[#5F5F60] font-bold text-base sm:text-lg leading-tight"
              >
                Enter your email
              </label>

              <input
                type="email"
                id="email"
                placeholder=""
                className="w-full mt-2 mb-6 sm:mb-8 text-black p-3 sm:p-4 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none border-0 min-h-[48px]"
                value={form.email}
                required
                disabled={loading}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label
                htmlFor="password"
                className="text-[#5F5F60] font-bold text-base sm:text-lg leading-tight"
              >
                Enter your password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  id="password"
                  className="w-full text-black p-3 sm:p-4 pr-12 sm:pr-14 text-base rounded-lg bg-[#EDCFC9] shadow-[0px_4px_12px_-1px_#26262833] focus:outline-none border-0 min-h-[48px]"
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
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#D96073] p-2 touch-manipulation"
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-2 font-semibold">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-[80%] bg-[#D96073] cursor-pointer flex justify-center items-center mt-6 sm:mt-4 text-[#FFF6EF] mx-auto font-black text-base sm:text-lg py-3 sm:py-4 rounded-xl shadow-[0px_4px_20px_-4px_#BA7F88D9] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C85563] transition-colors min-h-[48px] touch-manipulation"
              >
                {loading ? "Logging in..." : "Login to my account"}
              </button>
            </form>

            <p className="font-light text-sm sm:text-base mt-5 sm:mt-6 leading-tight text-[#5F5F60] text-center">
              or Log in with
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex bg-[#EDCFC9] w-full p-4 sm:p-5 rounded-2xl border border-[#E7C9C3] justify-center items-center gap-3 sm:gap-4 text-sm sm:text-base font-normal leading-tight text-[#5F5F60] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E5C5BF] transition-colors min-h-[56px] touch-manipulation"
            >
              <svg
                width="18"
                height="18"
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
              continue with google
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center items-center w-full lg:w-[45.5%] py-8 lg:py-0 lg:pl-20 xl:pl-40 lg:m-10">
          <div className="relative flex gap-2 items-center">
            <Image
              src="/logo.png"
              width={70}
              height={55}
              alt="logo"
              className="w-14 h-11 sm:w-[70px] sm:h-[55px]"
            />
            <div className="font-bold text-3xl sm:text-[36px] text-[#262628]">
              Luci
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
