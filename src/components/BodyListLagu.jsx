import "../input.css";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const BodyListLagu = () => {
  const [songs, setSongs] = useState([]); // State to hold the list of songs
  const [loading, setLoading] = useState(true); // State to handle loading
  const [apiSongs, setApiSongs] = useState([]); // State to hold songs from the second API
  const [searchParams] = useSearchParams(); // React Router's hook to get query params
  const navigate = useNavigate(); // Hook for navigation

  const searchTerm = searchParams.get("search") || ""; // Get the search term from URL

  // Fetch songs with artist names based on search term
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Fetch songsWithArtist data
        const response = await fetch(
          "https://website-lirik-c51g.vercel.app/api/songsWithArtist"
        );
        const data = await response.json();

        if (data.statusCode === 200) {
          // Filter songs that start with the search term
          const filteredSongs = data.data.filter((song) =>
            song.songsName.toLowerCase().startsWith(searchTerm.toLowerCase())
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
    return <p>No songs found that start with "{searchTerm}"!</p>; // Handle no results
  }

  return (
    <div className="text-black pt-10 pb-5 font-jakarta">
      <div className="grid grid-cols-1 gap-4 p-10">
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
