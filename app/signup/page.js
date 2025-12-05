"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function SignupStep1() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });

  const handleNext = () => {
    router.push("/signup/step2");
  };

  return (
    <div className="min-h-screen w-full bg-[#FDE5E0] ">
      <nav className="flex  pt-17 pl-30 pr-30 ">
        <div className="relative flex gap-2">
          <Image src="/logo.png" width={55} height={55} alt="logo" />
          <div className="w-[67px] h-[45px] font-bold text-[36px] text-[#262628]">
            Luci
          </div>
        </div>
      </nav>

      
      <section className="flex">
      {/* part -1 left side */}
        <div className=" bg-amber-400">
          <h1 className="text-3xl font-bold mb-6">Signup – Step 1</h1>

          <div className="w-full max-w-md space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <button
              onClick={handleNext}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Next
            </button>
          </div>
        </div>

        {/* part-2 right side */}
        <div className=" bg-black">
            hdffhssjdfasjofsofo
        </div>
      </section>
    </div>
  );
}
