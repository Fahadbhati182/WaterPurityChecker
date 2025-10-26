import React, { useState } from "react";

const AquaCheck = ({
  setIsOpen,
  handleSubmit,
  handleChange,
  formData,
  setFormData,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f8] font-display text-[#333333] overflow-hidden">
      {/* Main Section */}
      <main className="flex flex-1 justify-center py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <p className="text-4xl font-black text-[#333333]">
              Enter Water Quality Parameters
            </p>
            <p className="text-gray-500 mt-2">
              Fill out the form below to get an analysis of your water sample.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* pH */}
              <div>
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2 flex items-center">
                    pH Level
                  </p>
                  <input
                    name="ph"
                    type="number"
                    value={formData.ph}
                    onChange={handleChange}
                    placeholder="e.g., 7"
                    className="form-input rounded-lg border border-[#cfdfe7] bg-[#f6f7f8] p-3 h-14 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </label>
              </div>

              {/* TDS */}
              <div>
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2 flex items-center">
                    Total Dissolved Solids (TDS) in ppm
                  </p>
                  <input
                    name="tds"
                    type="number"
                    value={formData.tds}
                    onChange={handleChange}
                    placeholder="e.g., 300"
                    className="form-input rounded-lg border border-[#cfdfe7] bg-[#f6f7f8] p-3 h-14 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </label>
              </div>

              {/* Turbidity */}
              <div>
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2 flex items-center">
                    Turbidity (NTU)
                  </p>
                  <input
                    name="turbidity"
                    type="number"
                    value={formData.turbidity}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    className="form-input rounded-lg border border-[#cfdfe7] bg-[#f6f7f8] p-3 h-14 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </label>
              </div>

              {/* Temperature */}
              <div>
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2 flex items-center">
                    Temperature
                  </p>
                  <input
                    name="temperature"
                    type="number"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="e.g., 20"
                    className="form-input rounded-lg border border-[#cfdfe7] bg-[#f6f7f8] p-3 h-14 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </label>
              </div>

              {/* Color */}
              <div>
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2 flex items-center">
                    Color
                  </p>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="form-select rounded-lg border border-[#cfdfe7] bg-[#f6f7f8] p-3 h-14 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option>Clear</option>
                    <option>Slightly Colored</option>
                    <option>Yellowish</option>
                    <option>Brown</option>
                  </select>
                </label>
              </div>

              {/* Smell */}
              <div>
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2 flex items-center">
                    Smell
                  </p>
                  <select
                    name="smell"
                    value={formData.smell}
                    onChange={handleChange}
                    className="form-select rounded-lg border border-[#cfdfe7] bg-[#f6f7f8] p-3 h-14 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option>Odorless</option>
                    <option>Earthy</option>
                    <option>Fishy</option>
                    <option>Chemical</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <p className="text-base font-medium pb-2">
                Upload Water Sample Image
              </p>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 bg-[#f6f7f8]">
                <div className="text-center">
                  <span className="material-symbols-outlined text-6xl text-gray-400">
                    cloud_upload
                  </span>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                    >
                      <span className="bold">Upload a file</span>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={handleChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full cursor-pointer bg-[#1193D4] text-white font-bold py-4 rounded-lg text-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              >
                Check Purity
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AquaCheck;
