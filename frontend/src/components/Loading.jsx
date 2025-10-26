import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f7f8] text-[#1193D4] px-4">
      {/* Spinning Circle */}
      <div className="relative w-24 h-24 mb-6 animate-spin-slow">
        <div className="absolute inset-0 border-4 border-t-[#1193D4] border-gray-300 rounded-full"></div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-2 text-[#1193D4] text-center">
        Analyzing Your Water Sample...
      </h2>

      {/* Subtext */}
      <p className="text-gray-600 text-center mb-6">
        Our AI model is processing the water quality parameters.
      </p>

      {/* Animated Dots */}
      <div className="flex space-x-2">
        <span className="w-4 h-4 bg-[#1193D4] rounded-full animate-bounce delay-75"></span>
        <span className="w-4 h-4 bg-[#1193D4] rounded-full animate-bounce delay-150"></span>
        <span className="w-4 h-4 bg-[#1193D4] rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default Loading;
