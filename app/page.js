import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="bg-[#FDE5E0] w-screen h-screen">
      <nav className="flex  pt-17 pl-30 pr-30 justify-between     ">
        <div className="relative flex gap-2">
          <Image src="/logo.png" width={55} height={55} alt="logo" />
          <div className="w-[67px] h-[45px] font-bold text-[36px] text-[#262628]">
            Luci
          </div>
        </div>
        <button className="bg-[#EDCFC9] relative w-[142px] h-14 text-[#262628] font-bold text-[18px] rounded-2xl cursor-pointer">
          Login
        </button>
      </nav>

      {/*Sections */}
      <section className="text-black   flex ">
        {/* left side */}
        <div className="relative ml-30 mt-50 w-1/2 flex flex-col gap-4">
          <div className="  font-bold text-[42px] leading-[100%] text-[#262628]">
            Stop Waiting for Walk-Ins. Start <br /> Getting Guaranteed Bookings
          </div>
          <div className="font-normal text-[18px] text-[#5F5F60] w-[589px] leading-[100%] tracking-normal">
            Connect your salon with thousands of customers searching for Thai
            massage right now. Free registration. Instant visibility. Get your
            first booking within 48 hours.
          </div>

          {/* buttonn */}
          <div>
            <button className="w-[232px] rounded-2xl text-[#FFF6EF] mt-10 h-[69px] bg-[#D96073]">
              Get Started For Free
            </button>
          </div>
        </div>

        {/* right side */}
        <div className="relative w-1\2">
          <div className=" mt-30">
            <Image src="/homeCard-1.png" width={313} height={167} alt="card" />
          </div>

          <div className="-mt-45 ml-147">
            <Image src="/homeCard-2.png" width={87} height={73} alt="card" />
          </div>

          {/* card -3 => there is no png, so writing code */}
          <div className="bg-[#FEC9BE] overflow-visible h-45 w-45 translate-15  -mt-40 rounded-3xl p-6 rotate-345  border-[#D96073] border-2">
            <div className="font-bold text-[24px] leading-[100%] ">
              PRO Plan
            </div>
            <div className="font-bold text-[24px] leading-[100%]  ">$3</div>
            <ul className="mt-5 font-normal text-[12px] leading-[100%] text-[#5F5F60]">
              Features -
              <li className="flex text-[#262628] leading-[100%]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    // fill-rule="evenodd"
                    // clip-rule="evenodd"
                    d="M17.5091 4.24815C17.7618 4.43454 17.9289 4.71275 17.9736 5.0216C18.0184 5.33044 17.9371 5.64464 17.7478 5.89508L10.1764 15.9057C10.0763 16.038 9.95094 16.1496 9.8074 16.2342C9.66386 16.3187 9.50497 16.3746 9.33981 16.3985C9.17464 16.4225 9.00643 16.414 8.84479 16.3737C8.68315 16.3333 8.53125 16.2619 8.39775 16.1634L3.37895 12.463C3.25078 12.3718 3.14234 12.2563 3.05996 12.1232C2.97758 11.99 2.92291 11.8419 2.89914 11.6874C2.87537 11.533 2.88297 11.3753 2.92151 11.2236C2.96004 11.0718 3.02874 10.9291 3.12358 10.8037C3.21843 10.6783 3.33752 10.5727 3.47393 10.4932C3.61033 10.4136 3.7613 10.3617 3.91803 10.3403C4.07476 10.319 4.23412 10.3287 4.3868 10.3689C4.53948 10.4091 4.68243 10.479 4.8073 10.5744L8.93672 13.6197L15.8413 4.48984C15.9351 4.36574 16.0527 4.26104 16.1873 4.18173C16.3219 4.10241 16.4709 4.05003 16.6257 4.02759C16.7806 4.00515 16.9384 4.01307 17.0899 4.05092C17.2415 4.08876 17.3839 4.15578 17.5091 4.24815Z"
                    fill="#262628"
                  />
                </svg>
                10 matches weekly
              </li>
              <li className="flex text-[#262628] leading-[100%]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    // fill-rule="evenodd"
                    // clip-rule="evenodd"
                    d="M17.5091 4.24815C17.7618 4.43454 17.9289 4.71275 17.9736 5.0216C18.0184 5.33044 17.9371 5.64464 17.7478 5.89508L10.1764 15.9057C10.0763 16.038 9.95094 16.1496 9.8074 16.2342C9.66386 16.3187 9.50497 16.3746 9.33981 16.3985C9.17464 16.4225 9.00643 16.414 8.84479 16.3737C8.68315 16.3333 8.53125 16.2619 8.39775 16.1634L3.37895 12.463C3.25078 12.3718 3.14234 12.2563 3.05996 12.1232C2.97758 11.99 2.92291 11.8419 2.89914 11.6874C2.87537 11.533 2.88297 11.3753 2.92151 11.2236C2.96004 11.0718 3.02874 10.9291 3.12358 10.8037C3.21843 10.6783 3.33752 10.5727 3.47393 10.4932C3.61033 10.4136 3.7613 10.3617 3.91803 10.3403C4.07476 10.319 4.23412 10.3287 4.3868 10.3689C4.53948 10.4091 4.68243 10.479 4.8073 10.5744L8.93672 13.6197L15.8413 4.48984C15.9351 4.36574 16.0527 4.26104 16.1873 4.18173C16.3219 4.10241 16.4709 4.05003 16.6257 4.02759C16.7806 4.00515 16.9384 4.01307 17.0899 4.05092C17.2415 4.08876 17.3839 4.15578 17.5091 4.24815Z"
                    fill="#262628"
                  />
                </svg>
                early access to new features
              </li>
            </ul>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-50 -top-70 h-20 border-2 border-dashed border-gray-400"></div>

            {/* corner dot */}
            <div className="absolute left-50 -top-50 -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full"></div>

            {/* horizontal line */}
            <div className="absolute left-50 -top-49 w-99 border-2  border-dashed border-gray-400"></div>
          </div>

          <div className="relative">
            <div className="absolute left-30 -top-40 h-10 border-2 border-dashed border-gray-400"></div>
            <div className="absolute left-30 -top-40 w-119 border-2  border-dashed border-gray-400"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
