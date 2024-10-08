import "../input.css";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BodyHomePage = () => {
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
    <div className="text-black pt-8 sm:pt-1 pb-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-10 items-center">
        {" "}
        {/* Add items-center to align items vertically */}
        <div className="col-span-1 flex flex-col">
          {" "}
          {/* Center content horizontally */}
          {/* Title */}
          <h1 className="text-4xl font-bold sm:text-6xl text-custom-black pb-4">
            Music Lyrics
          </h1>
          {/* Description */}
          <p className="text-custom-blue-black text-xl font-normal">
            Music Lyrics merupakan website yang menyediakan Lirik Lagu.
          </p>
          {/* Input box and search button */}
          <div className="relative mt-4 shadow-xl w-full">
            {" "}
            {/* Set width to full for proper layout */}
            <input
              type="text"
              value={searchTerm} // Bind input value to state
              onChange={handleInputChange} // Handle input change
              onKeyPress={handleKeyPress} // Handle Enter key press
              placeholder="Ketik judul atau lirik lagu yang ingin dicari.."
              className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
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
        {/* Right side (image) */}
        <div className="col-span-1 flex justify-center">
          <img
            src="/PlayGuitarBoy.svg"
            alt="Playing Guitar"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default BodyHomePage;
