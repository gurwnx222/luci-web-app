"use client";
import { useState, useEffect } from "react";

export default function DualRangeSlider({
  minValue = 1,
  maxValue = 1000,
  onRangeChange,
  disabled = false,
}) {
  const [min, setMin] = useState(100);
  const [max, setMax] = useState(800);

  // Notify parent component when values change
  useEffect(() => {
    if (onRangeChange) {
      onRangeChange(min, max);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max]); // Only depend on min and max values

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

  // Calculate percentage for visual display
  const minPercent = ((min - minValue) / (maxValue - minValue)) * 100;
  const maxPercent = ((max - minValue) / (maxValue - minValue)) * 100;

  return (
    <div className="w-full max-w-sm mx-auto mt-4 select-none">
      {/* SLIDER */}
      <div className="relative h-2 mt-4">
        <div className="absolute w-full h-2 bg-[#F6A9B5] rounded"></div>

        <div
          className="absolute h-2 bg-[#D96073] rounded"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={min}
          onChange={handleMin}
          disabled={disabled}
          className="absolute -top-2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D96073] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#D96073] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:disabled:cursor-not-allowed [&::-moz-range-thumb]:disabled:cursor-not-allowed"
        />

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={max}
          onChange={handleMax}
          disabled={disabled}
          className="absolute -top-2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D96073] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#D96073] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:disabled:cursor-not-allowed [&::-moz-range-thumb]:disabled:cursor-not-allowed"
        />
      </div>

      {/* INPUT BOXES */}
      <div className="flex justify-between mt-6 gap-4">
        <div className="flex flex-col w-1/2">
          <label className="text-sm font-semibold text-[#5F5F60] mb-1">
            Min
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8B8B]">
              $
            </span>
            <input
              type="number"
              value={min}
              onChange={handleMinInput}
              min={minValue}
              max={maxValue}
              disabled={disabled}
              className="p-3 pl-6 rounded-xl w-full border border-[#8B8B8B] text-[#8B8B8B] focus:outline-none focus:border-[#D96073] min-h-[48px] text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-sm font-semibold text-[#5F5F60] mb-1">
            Max
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8B8B]">
              $
            </span>
            <input
              type="number"
              value={max}
              onChange={handleMaxInput}
              min={minValue}
              max={maxValue}
              disabled={disabled}
              className="p-3 pl-6 rounded-xl w-full border border-[#8B8B8B] text-[#8B8B8B] focus:outline-none focus:border-[#D96073] min-h-[48px] text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
