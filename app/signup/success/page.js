"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";


export default function SignupStep4() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false); 

  const completeProfile = () => {
    if(selected.length === 0){
      setError(true);
      return;
    }
    setError(false);
    router.push("/login");   
  }

  const toggleSelection = (item) =>{
    setSelected(prev => 
      prev.includes(item)
      ? prev.filter(i => i !== item) // remove
      : [...prev, item] // add
    );
  };

  const options = [
    "Neck/Shoulder",
    "Oil massage",
    "Foot massage",
    "Aromatherapy",
    "Hot compress",
    "Others",
    "Nuad Thai",
  ];



  return (
    <div className="bg-[#FDE5E0] min-h-screen w-full flex flex-col items-center">
      <Navbar />

      {/* container */}
      <section className="bg-[#FEC9BE] w-[690px]  p-10 mt-8 rounded-4xl flex flex-col  ">
        <div className="flex flex-col gap-4 mt-6 leading-[100%] items-center justify-center">
          <h1 className=" font-bold text-[32px]   text-[#262628] ">
            Complete your profile
          </h1> 
          <p className="font-bold text-[18px]  text-[#5F5F60]">
            Give us important information about <br /> your business to get you
            started
          </p>
        </div>
        <div className="text-[#5F5F60] mt-10 px-20  font-bold leading-[100%] text-[18px]">
          What kind of massages you provide??
        </div>
        <div className="w-full border-2 border-dashed border-[#D96073]  p-4 rounded-2xl mt-4">
          <div className="grid grid-cols-3 gap-3 "  >
            {options.map((item, index) => {
              const isSelected = selected.includes(item);
              return (
              <button
                key={index}
                onClick={() => toggleSelection(item)}
                className={`py-2 cursor-pointer  rounded-xl font-normal text-[14px]  transition-all duration-200 ${
                  isSelected
                    ? "bg-[#F2BAC3] text-[#D96073]"
                    : "bg-[#F5C8BF] text-[#5F5F60]"
                } `}
              >
                {item}
              </button>
              );
            })}
          </div>

          {error && 
          <p className="text-red-600 text-sm mt-2 font-semibold">
              * This field is required
          </p>
          }
        </div>

      
        <div className="flex   flex-col items-center mx-auto rounded-3xl h-12 mt-4 bg-[#D96073] w-[40%] justify-center">
          <button
          type="button"
          onClick={completeProfile}
          className="text-[18px] cursor-pointer font-bold text-[#FFF6EF]"
          >
            Complete my profile
          </button>
        </div>
      </section>
    </div>
  );
}
