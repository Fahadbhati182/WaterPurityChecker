import React from "react";

const WaterPurityCard = ({ report }) => {
  const {
    ph,
    tds,
    turbidity,
    temperature,
    color,
    smell,
    image,
    aiResult: { purity, status, explanation, suggestions },
  } = report;

  // Map status to color variants
  const statusColors = {
    safe: "bg-[#1193D4]/10 text-[#1193D4]",
    unsafe: "bg-red-100 text-red-600",
    "Needs treatment": "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-10   bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
      {/* Header: Purity + Status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-4xl font-extrabold text-[#1193D4]">{purity}</p>
          <span
            className={`mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${statusColors[status]}`}
          >
            <span className="material-symbols-outlined text-base">
              verified
            </span>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        </div>
        {/* Purity Circle */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
            />
            <circle
              className="text-[#1193D4]"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="currentColor"
              strokeDasharray="282.74"
              strokeDashoffset={282.74 * (1 - parseInt(purity) / 100)}
              strokeLinecap="round"
              strokeWidth="10"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#1193D4]">{purity}</span>
          </div>
        </div>
      </div>

      {/* Water Sample Image */}
      {image != null && (
        <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={image}
            alt="Water Sample"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Water Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-[#f0f4f8] rounded-lg">
          <p className="text-sm text-gray-500">pH Level</p>
          <p className="font-semibold text-[#1193D4]">{ph}</p>
        </div>
        <div className="p-4 bg-[#f0f4f8] rounded-lg">
          <p className="text-sm text-gray-500">Total Dissolved Solids (TDS)</p>
          <p className="font-semibold text-[#1193D4]">{tds} ppm</p>
        </div>
        <div className="p-4 bg-[#f0f4f8] rounded-lg">
          <p className="text-sm text-gray-500">Turbidity</p>
          <p className="font-semibold text-[#1193D4]">{turbidity} NTU</p>
        </div>
        <div className="p-4 bg-[#f0f4f8] rounded-lg">
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="font-semibold text-[#1193D4]">{temperature}°C</p>
        </div>
        <div className="p-4 bg-[#f0f4f8] rounded-lg">
          <p className="text-sm text-gray-500">Color</p>
          <p className="font-semibold text-[#1193D4]">{color}</p>
        </div>
        <div className="p-4 bg-[#f0f4f8] rounded-lg">
          <p className="text-sm text-gray-500">Smell</p>
          <p className="font-semibold text-[#1193D4]">{smell}</p>
        </div>
      </div>

      {/* Explanation */}
      <div>
        <h2 className="text-2xl font-bold text-[#1193D4] mb-2">
          What This Means
        </h2>
        <p className="text-gray-600 leading-relaxed">{explanation}</p>
      </div>

      {/* Suggestions */}
      <div>
        <h2 className="text-xl font-semibold text-[#1193D4] mb-2">
          Suggestions
        </h2>
        <p className="text-gray-600 leading-relaxed">{suggestions}</p>
      </div>

      
    </div>
  );
};

export default WaterPurityCard;
