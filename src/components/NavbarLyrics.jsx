import "../input.css";
import { Search } from "lucide-react";
import { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NavbarLyrics = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to track the input value
  const navigate = useNavigate(); // React Router's useNavigate hook

  // Function to handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle search when the button is clicked
  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/songs?search=${searchTerm}`); // Navigate to results page with search query
    } else {
      alert("Silakan masukkan judul lagu.");
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <nav className="navbar grid grid-cols-2  bg-custom-blue-seas dark:bg-custom-blue-seas p-5 px-14">
      <div className="col-span-1 items-center space-x-8">
        {/* Logo or Title */}
        <a href="/" className="flex items-center font-bold ">
          <button className="text-custom-black text-xl font-bold font-jakarta">
            Music Lyrics
          </button>
        </a>

        {/* Navigation Links */}
        <ul className="flex space-x-8 items-center font-bold">
          <li>
            <button className="text-custom-black text-base font-bold font-jakarta">
              Daftar Lagu
            </button>
          </li>
        </ul>
      </div>
      {/* Right: Search Input and Button */}
      <div className="col-span-1 flex justify-end items-center space-x-2">
        <div className="relative ">
          <input
            type="text"
            value={searchTerm} // Bind input value to state
            onChange={handleInputChange} // Handle input change
            onKeyPress={handleKeyPress} // Handle Enter key press
            placeholder="Search..."
            className="bg-custom-blue-white p-2 pr-10 text-custom-blue-black rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue-black w-full"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              onClick={handleSearch} // Call search function on button click
              className="text-custom-black font-bold p-2 bg-custom-blue-white rounded-lg hover:bg-gray-300"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLyrics;
