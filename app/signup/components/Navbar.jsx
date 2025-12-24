// app/signup/components/Navbar.js
"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#FDE5E0] py-3 px-4 sm:py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0">
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
        </Link>
      </div>
    </nav>
  );
}
