import React from "react";

const Navbar: React.FC = () => {
  return (
      <nav className="bg-gradient-to-r from-primary via-bright-turquoise-400 to-bright-turquoise-600 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          {/* Left: Logo and App Name */}
          <a href="/" className="flex items-center gap-3">
            <img
                src="/archev-icon.svg"
                className="h-8 drop-shadow-lg"
                alt="Flowbite Logo"
            />
            <span className="text-2xl font-bold text-white tracking-wide drop-shadow">
            ArchEv
          </span>
          </a>
          {/* Center: Navigation Links */}
          <ul className="flex gap-8 items-center mx-auto">
            <li>
              <a href="/" className="text-white hover:text-gray-200 font-medium transition">
                Home
              </a>
            </li>
            <li>
              <a href="/load" className="text-white hover:text-gray-200 font-medium transition">
                Load
              </a>
            </li>
            <li>
              <a href="/dashboardV2" className="text-white hover:text-gray-200 font-medium transition">
                Dashboard
              </a>
            </li>
          </ul>
          {/* Right: Empty for now */}
          <div className="w-24" />
        </div>
      </nav>
  );
};
export default Navbar;