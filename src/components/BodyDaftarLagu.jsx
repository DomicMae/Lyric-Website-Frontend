import { useState, useEffect } from "react";
import "../input.css";
import { Link } from "react-router-dom";

const BodyDaftarLagu = () => {
  const [songs, setSongs] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(""); // No default letter selected
  const [filteredSongs, setFilteredSongs] = useState([]); // State for filtered songs
  const [isLetterSelected, setIsLetterSelected] = useState(false); // Track if a letter is selected

  useEffect(() => {
    // Fetch song data from the API
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          "https://website-lirik-c51g.vercel.app/api/songs"
        );
        const data = await response.json();
        if (data.statusCode === 200) {
          setSongs(data.data);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    // Filter the songs based on the selected letter
    if (selectedLetter) {
      const filtered = songs.filter((song) =>
        song.songsName.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
      setFilteredSongs(filtered); // Update filtered songs
    } else {
      setFilteredSongs(songs); // Show all songs if no letter is selected
    }
  }, [selectedLetter, songs]);

  // Handle letter selection and set the flag to true
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setIsLetterSelected(true); // Set the flag to true when a letter is clicked
  };

  return (
    <div className="text-black">
      <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8 px-10">
        Daftar Lagu
      </h1>

      {/* Alphabet Song List with Horizontal Scroll */}
      <div className="mt-6 px-10">
        <div className="overflow-x-auto">
          <div className="flex gap-2">
            {[
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "P",
              "Q",
              "R",
              "S",
              "T",
              "U",
              "V",
              "W",
              "X",
              "Y",
              "Z",
            ].map((letter) => (
              <div
                key={letter}
                className={`text-center font-semibold text-custom-black bg-white rounded-lg p-3 shadow-md min-w-[50px] cursor-pointer ${
                  selectedLetter === letter
                    ? "border-black border-4"
                    : "border-gray-300"
                }`}
                onClick={() => handleLetterClick(letter)} // Set the clicked letter
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Display Filtered Songs */}
      <div className="grid grid-cols-6 gap-4 p-10">
        {
          filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <div key={song._id} className="col-span-1 flex-col">
                <div className="mt-6">
                  {/* Link to song lyrics page */}
                  <Link to={`/lyrics/${song.songId}`}>
                    <input
                      type="text"
                      value={song.songsName}
                      readOnly
                      className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
            ))
          ) : isLetterSelected ? ( // Show message only if a letter is selected
            <div className="col-span-6 text-center text-lg font-medium text-red-500">
              Tidak ada lagu yang diawali dengan huruf "{selectedLetter}"
            </div>
          ) : null /* Do not show any message initially */
        }
      </div>
    </div>
  );
};

export default BodyDaftarLagu;
