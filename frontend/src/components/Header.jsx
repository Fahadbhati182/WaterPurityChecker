import React from "react";

const Header = ({ setIsOpen }) => {
  return (
    <header className="flex items-center justify-between border-b border-[#e7eff3] px-10 py-3 bg-white shadow-sm">
      <div className="flex items-center gap-4 text-primary">
        <div className="size-6"></div>
        <h2 className="text-lg text-[#1193D4] font-bold leading-tight tracking-[-0.015em]">
          AquaCheck - Your Water Purity Companion
        </h2>
      </div>
      <nav className="flex gap-9">
        {["Home"].map((link) => (
          <a
            onClick={() => setIsOpen(false)}
            key={link}
            href="#"
            className="text-lg text-[#1193D4] font-medium  hover:text-[#1193D4]/80"
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
