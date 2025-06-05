import React from "react";

const Navbar: React.FC = () => {
  return (
      <nav className="bg-gradient-to-r from-primary via-bright-turquoise-400 to-bright-turquoise-600 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center gap-3">
            <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 drop-shadow-lg"
                alt="Flowbite Logo"
            />
            <span className="text-2xl font-bold text-white tracking-wide drop-shadow">
            ArchEv
          </span>
          </a>
          <ul className="flex gap-6 items-center">
            <li>
              <a href="/" className="text-white hover:text-gray-200 font-medium transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 font-medium transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 font-medium transition">
                Docs
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200 font-medium transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
};
export default Navbar;