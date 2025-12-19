"use client";
import { useState } from "react";

export default function DualRangeSlider({ minValue = 0, maxValue = 100 }) {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  // Slider: handle min
  const handleMin = (e) => {
    let value = Number(e.target.value);
    if (value >= max) value = max - 1;
    setMin(value);
  };

  // Slider: handle max
  const handleMax = (e) => {
    let value = Number(e.target.value);
    if (value <= min) value = min + 1;
    setMax(value);
  };

  // Input box: handle min typing
  const handleMinInput = (e) => {
    let value = Number(e.target.value);

    if (value < minValue) value = minValue;
    if (value >= max) value = max - 1;

    setMin(value);
  };

  // Input box: handle max typing
  const handleMaxInput = (e) => {
    let value = Number(e.target.value);

    if (value > maxValue) value = maxValue;
    if (value <= min) value = min + 1;

    setMax(value);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-4 select-none">
      {/* SLIDER */}
      <div className="relative h-2 mt-4">
        <div className="absolute w-full h-2 bg-[#F6A9B5] rounded"></div>

        <div
          className="absolute h-2 bg-[#D96073] rounded"
          style={{
            left: `${min}%`,
            right: `${100 - max}%`,
          }}
        ></div>

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={min}
          onChange={handleMin}
          className="absolute -top-2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D96073] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#D96073] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
        />

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={max}
          onChange={handleMax}
          className="absolute -top-2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D96073] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#D96073] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
        />
      </div>

      {/* INPUT BOXES */}
      <div className="flex justify-between mt-6 gap-4">
        <div className="flex flex-col w-1/2">
          <label className="text-sm font-semibold text-[#5F5F60] mb-1">Min</label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8B8B]">
              $
            </span>
            <input
              type="number"
              value={min}
              onChange={handleMinInput}
              className="p-3 pl-6 rounded-xl w-full border border-[#8B8B8B] text-[#8B8B8B] focus:outline-none focus:border-[#D96073] min-h-[48px] text-base"
            />
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-sm font-semibold text-[#5F5F60] mb-1">Max</label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8B8B]">
              $
            </span>
            <input
              type="number"
              value={max}
              onChange={handleMaxInput}
              className="p-3 pl-6 rounded-xl w-full border border-[#8B8B8B] text-[#8B8B8B] focus:outline-none focus:border-[#D96073] min-h-[48px] text-base"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
