import React, { useState } from "react";
import "../input.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle smooth scroll to the 'Daftar Lagu' section
  const scrollToSection = (e, sectionId) => {
    e.preventDefault(); // Prevent default anchor link behavior
    const section = document.querySelector(sectionId); // Get the section element by id
    if (section) {
      window.scrollTo({
        top: section.offsetTop, // Scroll to the top of the section
        behavior: "smooth", // Enable smooth scroll
      });
    }
    setIsMenuOpen(false); // Close the menu when a section is selected
  };

  return (
    <nav className="bg-custom-blue-seas dark:bg-custom-blue-seas p-5 px-7 md:px-14">
      <div className="flex justify-between items-center">
        {/* Left side: Music Lyrics button */}
        <a
          href="/"
          className="text-lg md:text-xl font-bold text-custom-black font-jakarta"
        >
          Music Lyrics
        </a>

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

        {/* Menu items - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex space-x-8">
          {/* Center: Daftar Lagu */}
          <a
            href="#body-daftarlagu"
            className="text-custom-black text-sm md:text-base font-bold font-jakarta"
            onClick={(e) => scrollToSection(e, "#body-daftarlagu")}
          >
            Daftar Lagu
          </a>
        </div>
      </div>

      {/* Mobile menu - Toggle visibility based on state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-4`}>
        <ul className="space-y-4">
          <li>
            <a
              href="#body-daftarlagu"
              className="block text-custom-black text-base font-medium"
              onClick={(e) => scrollToSection(e, "#body-daftarlagu")}
            >
              Daftar Lagu
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
