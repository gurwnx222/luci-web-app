"use client";
import Image from "next/image";
import { useState } from "react";
export default function NavbarStudio() {
    // setting plan based on selections
    const [plan, setPlan] = useState("Free Plan");
  return (
    <>
      <div className="flex items-center gap-2 ">
        <Image
          src="/luci_logo.png"
          className="rounded-full"
          width={43}
          height={43}
          alt="logo"
        />
        <div className="flex flex-col gap-1">
          <div className="font-bold text-[18px] leading-[100%]">Zen Thai Studio</div>
          <div className="flex items-center gap-1 font-normal text-[14px] leading-[100%] text-[#999999] ">
            <svg
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3.5" cy="3.5" r="3.5" fill="#5F5F60" />
            </svg>

            {plan}
          </div>
        </div>
      </div>
    </>
  );
}
