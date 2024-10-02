import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../input.css";

const NavbarLyrics = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-custom-blue-seas dark:bg-custom-blue-seas p-5 px-7 md:px-14">
      <div className="flex justify-between items-center">
        {/* Left side: Music Lyrics button */}
        <Link
          to="/"
          className="text-lg md:text-xl font-bold text-custom-black font-jakarta"
        >
          Music Lyrics
        </Link>

        {/* Center: Daftar Lagu on larger screens */}
        <div className="hidden md:flex space-x-8 ml-auto">
          <Link
            to="/daftarLagu"
            className="text-custom-black text-sm md:text-base font-bold font-jakarta"
          >
            Daftar Lagu
          </Link>
        </div>

        {/* Hamburger menu for mobile screens */}
        <button
          className="block md:hidden text-custom-black font-bold focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Menu Icon (Hamburger) */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile menu - Toggle visibility based on state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-4`}>
        <ul className="space-y-4">
          <li>
            <Link
              to="/daftarLagu"
              className="block text-custom-black text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Daftar Lagu
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLyrics;
