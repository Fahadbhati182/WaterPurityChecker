import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#e7eff3] text-center p-4 mt-auto">
      <p className="text-sm text-gray-500">
        © 2024 AquaCheck. All rights reserved.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="text-sm text-primary hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="text-sm text-primary hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
