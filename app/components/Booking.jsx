import Image from "next/image";

export default function BookingPage() {
  // data
  const people = [
    {
      id: 1,
      name: "yash chandan",
      age: 22,
      weight: "70kg",
      image: "/images/person1.png",
    },
    {
      id: 2,
      name: "Gurwinder",
      age: 20,
      weight: "60kg",
      image: "/images/person1.png",
    },
    {
      id: 3,
      name: "yash chandan",
      age: 22,
      weight: "70kg",
      image: "/images/person1.png",
    },
    {
      id: 4,
      name: "yash chandan",
      age: 22,
      weight: "70kg",
      image: "/images/person1.png",
    },
    {
      id: 5,
      name: "yash chandan",
      age: 22,
      weight: "70kg",
      image: "/images/person1.png",
    },
    {
      id: 6,
      name: "yash chandan",
      age: 22,
      weight: "70kg",
      image: "/images/person1.png",
    },
    {
      id: 7,
      name: "yash chandan",
      age: 22,
      weight: "70kg",
      image: "/images/person1.png",
    },
    {
      id: 8,
      name: "yash chandan",
      age: 22,
      weight: "70kg",
      image: "/images/person1.png",
    },
  ];

  return (
    <div className="w-full h-auto">
      <div className="font-bold text-[40px] static text-[#262628] px-22 pt-12 pb-6">
        Booking Requests
      </div>
      <div className="grid grid-cols-3 px-22 overflow-y-auto h-[550px]       gap-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-[#EDCFC9] p-10  border-2 rounded-4xl  border-[#FFAE9E] w-[313px] h-[290px]"
          >
            <div className="flex gap-2 justify-start  items-center">
              <Image
                src={person.image}
                alt={person.name}
                width={43}
                height={43}
                className="rounded-4xl border-2 border-[#999999] object-cover"
              />{" "}
              <div className="font-normal text-[16px] text-[#262628]">
                {person.name}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-8">
              <div className="font-normal text-[16px] leading-[100%] text-[#5F5F60] ">
                Bio -
              </div>
              <div className="font-normal text-[24px] leading-[100%] text-[#262628] ">
                Age - {person.age}
              </div>
              <div className="font-normal text-[24px] leading-[100%] text-[#262628] ">
                Weight - {person.weight}
              </div>
            </div>
            <div className="flex gap-30 mt-4 ">
              <button className="rounded-2xl bg-[#F69DAB] cursor-pointer">
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.2275 31.1127C29.4775 31.3628 29.8166 31.5032 30.1703 31.5032C30.5239 31.5032 30.863 31.3628 31.1131 31.1127C31.3631 30.8627 31.5036 30.5235 31.5036 30.1699C31.5036 29.8163 31.3631 29.4772 31.1131 29.2271L24.5134 22.6274L31.1131 16.0278C31.3631 15.7777 31.5036 15.4386 31.5036 15.085C31.5036 14.7313 31.3631 14.3922 31.1131 14.1422C30.863 13.8921 30.5239 13.7516 30.1703 13.7516C29.8166 13.7516 29.4775 13.8921 29.2275 14.1422L22.6278 20.7418L16.0281 14.1422C15.7781 13.8921 15.4389 13.7516 15.0853 13.7516C14.7317 13.7516 14.3926 13.8921 14.1425 14.1422C13.8925 14.3922 13.752 14.7313 13.752 15.085C13.752 15.4386 13.8925 15.7777 14.1425 16.0278L20.7422 22.6274L14.1425 29.2271C13.8925 29.4772 13.752 29.8163 13.752 30.1699C13.752 30.5235 13.8925 30.8627 14.1425 31.1127C14.3926 31.3628 14.7317 31.5032 15.0853 31.5032C15.4389 31.5032 15.7781 31.3628 16.0281 31.1127L22.6278 24.5131L29.2275 31.1127Z"
                    fill="#262628"
                  />
                </svg>
              </button>
              <button className=" rounded-2xl bg-[#D96073] w-12 cursor-pointer flex justify-center items-center  text-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_545_83)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.2563 7.28662C28.5062 7.53666 28.6466 7.87574 28.6466 8.22929C28.6466 8.58284 28.5062 8.92192 28.2563 9.17196L13.2669 24.1626C13.1307 24.2989 12.969 24.407 12.791 24.4807C12.613 24.5545 12.4223 24.5924 12.2296 24.5924C12.0369 24.5924 11.8462 24.5545 11.6682 24.4807C11.4902 24.407 11.3285 24.2989 11.1923 24.1626L3.74426 16.7146C3.62038 16.5907 3.52211 16.4437 3.45507 16.2818C3.38802 16.12 3.35352 15.9465 3.35352 15.7713C3.35352 15.5961 3.38802 15.4226 3.45507 15.2608C3.52211 15.0989 3.62038 14.9518 3.74426 14.828C3.86814 14.7041 4.0152 14.6058 4.17706 14.5388C4.33892 14.4717 4.5124 14.4372 4.68759 14.4372C4.86278 14.4372 5.03626 14.4717 5.19812 14.5388C5.35998 14.6058 5.50704 14.7041 5.63092 14.828L12.2309 21.428L26.3696 7.28662C26.6196 7.03666 26.9587 6.89624 27.3123 6.89624C27.6658 6.89624 28.0062 7.03666 28.2563 7.28662Z"
                      fill="#FFF6EF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_545_83">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
