import React from "react";
import { useNavigation } from "../context/NavigationContext";

const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useNavigation();

  return (
      <nav className="bg-gradient-to-r from-primary via-bright-turquoise-400 to-bright-turquoise-600 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          {/* Left: Logo and App Name */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <img
                src="/archev-icon.svg"
                className="h-8 drop-shadow-lg"
                alt="ArchEv Logo"
            />
            <span className="text-2xl font-bold text-white tracking-wide drop-shadow">
            ArchEv
          </span>
          </button>
          {/* Center: Navigation Links */}
          <ul className="flex gap-8 items-center mx-auto">
            <li>
              <button
                onClick={() => setCurrentPage('home')}
                className={`font-medium transition-colors ${
                  currentPage === 'home' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('instructions')}
                className={`font-medium transition-colors ${
                  currentPage === 'instructions' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Instructions
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('load')}
                className={`font-medium transition-colors ${
                  currentPage === 'load' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Load
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`font-medium transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Dashboard
              </button>
            </li>
          </ul>
          {/* Right: Empty for now */}
          <div className="w-24" />
        </div>
      </nav>
  );
};

export default Navbar;