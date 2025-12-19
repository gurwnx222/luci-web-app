import React from "react";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div className="bg-[#FDE5E0] w-full min-h-screen">
      <nav className="flex justify-between items-center pt-6 sm:pt-8 md:pt-10 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="flex gap-2 items-center">
          <Image
            src="/logo.png"
            width={55}
            height={55}
            alt="logo"
            className="w-10 h-10 sm:w-[55px] sm:h-[55px]"
          />
          <div className="font-bold text-2xl sm:text-3xl md:text-[36px] text-[#262628]">
            Luci
          </div>
        </div>

        <Link href="/login">
          <button className="bg-[#EDCFC9] w-24 sm:w-32 md:w-[142px] h-12 sm:h-14 text-[#262628] font-bold text-sm sm:text-base md:text-[18px] rounded-2xl hover:bg-[#E0C0BA] transition-colors">
            Login
          </button>
        </Link>
      </nav>
      {/*Sections */}
      <section className="text-black flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-0">
        {/* left side */}
        <div className="relative lg:ml-30 mt-8 sm:mt-12 md:mt-16 lg:mt-50 w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6">
          <div className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight text-[#262628]">
            Stop Waiting for Walk-Ins. Start{" "}
            <span className="hidden sm:inline">
              <br />
            </span>{" "}
            Getting Guaranteed Bookings
          </div>
          <div className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-[#5F5F60] max-w-full lg:w-[589px] leading-relaxed sm:leading-normal tracking-normal">
            Connect your salon with thousands of customers searching for Thai
            massage right now. Free registration. Instant visibility. Get your
            first booking within 48 hours.
          </div>

          {/* buttonn */}
          <div>
            <Link href="/signup">
              <button className="w-full sm:w-[232px] rounded-2xl cursor-pointer text-[#FFF6EF] mt-6 sm:mt-8 md:mt-10 h-14 sm:h-16 md:h-[69px] bg-[#D96073] font-semibold text-base sm:text-lg hover:bg-[#C85563] transition-colors">
                Get Started For Free
              </button>
            </Link>
          </div>
        </div>

        {/* right side */}
        <div className="relative w-full ml-18 lg:w-1/2 mt-8 lg:mt-0 mb-8 lg:mb-0 hidden md:block">
          <div className="mt-8 lg:mt-30 flex justify-center lg:justify-start">
            <Image
              src="/homeCard-1.png"
              width={313}
              height={167}
              alt="card"
              className="w-48 sm:w-60 md:w-[313px] h-auto"
            />
          </div>

          <div className="mt-4 lg:-mt-45 ml-32 sm:ml-40 lg:ml-147 flex justify-center lg:justify-start">
            <Image
              src="/homeCard-2.png"
              width={87}
              height={73}
              alt="card"
              className="w-16 sm:w-20 md:w-[87px] h-auto"
            />
          </div>

          {/* card -3 => there is no png, so writing code */}
          <div className="bg-[#FEC9BE] overflow-visible h-36 w-36 sm:h-40 sm:w-40 lg:h-45 lg:w-45 mx-auto lg:mx-0 lg:translate-x-15 mt-4 lg:-mt-40 rounded-3xl p-4 sm:p-6 rotate-12 lg:rotate-345 border-[#D96073] border-2">
            <div className="font-bold text-lg sm:text-xl lg:text-[24px] leading-tight">
              PRO Plan
            </div>
            <div className="font-bold text-lg sm:text-xl lg:text-[24px] leading-tight">
              $3
            </div>
            <ul className="mt-3 sm:mt-5 font-normal text-xs sm:text-[12px] leading-tight text-[#5F5F60]">
              Features -
              <li className="flex text-[#262628] leading-tight items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M17.5091 4.24815C17.7618 4.43454 17.9289 4.71275 17.9736 5.0216C18.0184 5.33044 17.9371 5.64464 17.7478 5.89508L10.1764 15.9057C10.0763 16.038 9.95094 16.1496 9.8074 16.2342C9.66386 16.3187 9.50497 16.3746 9.33981 16.3985C9.17464 16.4225 9.00643 16.414 8.84479 16.3737C8.68315 16.3333 8.53125 16.2619 8.39775 16.1634L3.37895 12.463C3.25078 12.3718 3.14234 12.2563 3.05996 12.1232C2.97758 11.99 2.92291 11.8419 2.89914 11.6874C2.87537 11.533 2.88297 11.3753 2.92151 11.2236C2.96004 11.0718 3.02874 10.9291 3.12358 10.8037C3.21843 10.6783 3.33752 10.5727 3.47393 10.4932C3.61033 10.4136 3.7613 10.3617 3.91803 10.3403C4.07476 10.319 4.23412 10.3287 4.3868 10.3689C4.53948 10.4091 4.68243 10.479 4.8073 10.5744L8.93672 13.6197L15.8413 4.48984C15.9351 4.36574 16.0527 4.26104 16.1873 4.18173C16.3219 4.10241 16.4709 4.05003 16.6257 4.02759C16.7806 4.00515 16.9384 4.01307 17.0899 4.05092C17.2415 4.08876 17.3839 4.15578 17.5091 4.24815Z"
                    fill="#262628"
                  />
                </svg>
                <span className="text-xs">10 matches weekly</span>
              </li>
              <li className="flex text-[#262628] leading-tight items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M17.5091 4.24815C17.7618 4.43454 17.9289 4.71275 17.9736 5.0216C18.0184 5.33044 17.9371 5.64464 17.7478 5.89508L10.1764 15.9057C10.0763 16.038 9.95094 16.1496 9.8074 16.2342C9.66386 16.3187 9.50497 16.3746 9.33981 16.3985C9.17464 16.4225 9.00643 16.414 8.84479 16.3737C8.68315 16.3333 8.53125 16.2619 8.39775 16.1634L3.37895 12.463C3.25078 12.3718 3.14234 12.2563 3.05996 12.1232C2.97758 11.99 2.92291 11.8419 2.89914 11.6874C2.87537 11.533 2.88297 11.3753 2.92151 11.2236C2.96004 11.0718 3.02874 10.9291 3.12358 10.8037C3.21843 10.6783 3.33752 10.5727 3.47393 10.4932C3.61033 10.4136 3.7613 10.3617 3.91803 10.3403C4.07476 10.319 4.23412 10.3287 4.3868 10.3689C4.53948 10.4091 4.68243 10.479 4.8073 10.5744L8.93672 13.6197L15.8413 4.48984C15.9351 4.36574 16.0527 4.26104 16.1873 4.18173C16.3219 4.10241 16.4709 4.05003 16.6257 4.02759C16.7806 4.00515 16.9384 4.01307 17.0899 4.05092C17.2415 4.08876 17.3839 4.15578 17.5091 4.24815Z"
                    fill="#262628"
                  />
                </svg>
                <span className="text-xs">early access to features</span>
              </li>
            </ul>
          </div>

          {/* Decorative lines - hidden on mobile for cleaner look */}
          <div className="relative hidden lg:block">
            {/* vertical line */}
            <div className="absolute left-50 -top-70 h-20 border-2 border-dashed border-gray-400"></div>

            {/* corner dot */}
            <div className="absolute left-50 -top-50 -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full"></div>

            {/* horizontal line */}
            <div className="absolute left-50 -top-49 w-99 border-2 border-dashed border-gray-400"></div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute left-30 -top-40 h-10 border-2 border-dashed border-gray-400"></div>
            <div className="absolute left-30 -top-40 w-119 border-2 border-dashed border-gray-400"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
