import "../input.css";
import { Search } from "lucide-react"; // Import the Search icon
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const BodyListLagu = () => {
  const [songs, setSongs] = useState([]); // State to hold the list of songs
  const [loading, setLoading] = useState(true); // State to handle loading
  const [apiSongs, setApiSongs] = useState([]); // State to hold songs from the second API
  const [searchParams, setSearchParams] = useSearchParams(); // React Router's hook to get query params
  const navigate = useNavigate(); // Hook for navigation

  const searchTerm = searchParams.get("search") || ""; // Get the search term from URL
  const [searchTerm1, setSearchTerm1] = useState(searchTerm); // State to track the input value

  // Function to handle input change
  const handleInputChange = (e) => {
    setSearchTerm1(e.target.value); // Update input state
  };

  // Function to handle search when the button is clicked
  const handleSearch = () => {
    if (searchTerm1) {
      setSearchParams({ search: searchTerm1 }); // Update URL query params
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

  // Fetch songs with artist names based on search term
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        // Fetch songsWithArtist data
        const response = await fetch(
          "https://website-lirik-c51g.vercel.app/api/songsWithArtist"
        );
        const data = await response.json();

        if (data.statusCode === 200) {
          // Filter songs that match the search term
          const filteredSongs = data.data.filter((song) =>
            song.songsName.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setSongs(filteredSongs);
        } else {
          console.error("Failed to fetch songs");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [searchTerm]);

  // Fetch songs from the second API to get songId
  useEffect(() => {
    const fetchApiSongs = async () => {
      try {
        const response = await fetch(
          "https://website-lirik-c51g.vercel.app/api/songs"
        );
        const data = await response.json();

        if (data.statusCode === 200) {
          setApiSongs(data.data); // Store the fetched songs
        } else {
          console.error("Failed to fetch API songs");
        }
      } catch (error) {
        console.error("Error fetching API songs:", error);
      }
    };

    fetchApiSongs();
  }, []);

  const handleSongSelect = (selectedSongId) => {
    // Find the corresponding songId from the second API based on the selected song's _id
    const matchedSong = apiSongs.find((song) => song._id === selectedSongId);

    if (matchedSong) {
      navigate(`/lyrics/${matchedSong.songId}`); // Navigate to the lyrics page with the songId
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading state while fetching data
  }

  if (songs.length === 0) {
    return (
      <div className="text-black pb-5 font-jakarta">
        <div className="grid grid-cols-1 gap-4 p-10">
          <ul>
            <li className="relative w-full">
              <input
                type="text"
                value={searchTerm1}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                className="bg-custom-blue-white p-2 pr-10 text-custom-blue-black rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue-black w-full"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={handleSearch}
                  className="text-custom-black font-bold p-2 bg-custom-blue-white rounded-lg hover:bg-gray-300"
                >
                  <Search />
                </button>
              </div>
            </li>
          </ul>
          <p className="text-black mt-4">
            No songs found that match "{searchTerm}"!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black pb-5 font-jakarta">
      <div className="grid grid-cols-1 gap-4 p-10">
        <ul>
          <li className="relative w-full">
            <input
              type="text"
              value={searchTerm1}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Search..."
              className="bg-custom-blue-white p-2 pr-10 text-custom-blue-black rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue-black w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={handleSearch}
                className="text-custom-black font-bold p-2 bg-custom-blue-white rounded-lg hover:bg-gray-300"
              >
                <Search />
              </button>
            </div>
          </li>
        </ul>
        {songs.map((song) => (
          <div
            key={song._id}
            className="col-span-1 flex items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleSongSelect(song._id)} // Handle song selection
          >
            {/* Song Info (Name and Artist) */}
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-custom-black">
                {song.songsName}
              </h2>
              <p className="text-sm text-gray-600">
                {song.artist?.artistName || "Unknown Artist"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyListLagu;
