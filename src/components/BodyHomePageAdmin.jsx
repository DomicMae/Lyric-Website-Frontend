import "../input.css";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BodyHomePageAdmin = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to track the input value
  const [songsData, setSongsData] = useState([]); // State to store songs data
  const [loading, setLoading] = useState(true); // State for loading
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" }); // State for sorting
  const [artists, setArtists] = useState([]); // State to store artists data
  const navigate = useNavigate(); // React Router's useNavigate hook

  // Fetch songs data from API on component mount
  useEffect(() => {
    const fetchSongsData = async () => {
      try {
        const response = await fetch(
          "https://website-lirik-c51g.vercel.app/api/songs"
        );
        const data = await response.json();
        setSongsData(data.data); // Update songsData with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching songs data:", error);
        setLoading(false);
      }
    };

    const fetchArtistsData = async () => {
      try {
        const response = await fetch(
          "https://website-lirik-c51g.vercel.app/api/artists"
        );
        const data = await response.json();
        setArtists(data.data); // Update artists data with fetched data
      } catch (error) {
        console.error("Error fetching artists data:", error);
      }
    };

    fetchSongsData();
    fetchArtistsData();
  }, []);

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

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorting logic applied to the data
  const sortedSongsData = [...songsData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Function to get the artist name based on artistId
  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artistId === artistId);
    return artist ? artist.artistName : "Unknown Artist";
  };

  // Action button handler
  const handleEdit = (songId) => {
    navigate(`/editLagu/${songId}`); // Navigate to the edit page with the song ID in the URL
  };

  return (
    <div className="text-black pt-5 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-10">
        <div className="col-span-1 flex-col">
          {/* Input box and search button */}
          <div className="relative mt-4 shadow-xl">
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
      </div>

      {/* Table to display songs */}
      <div className="p-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            {" "}
            {/* Enable horizontal scrolling */}
            <table className="min-w-full bg-custom-blue-white rounded-md">
              <thead>
                <tr>
                  <th>Number</th>
                  <th
                    className="py-2 cursor-pointer"
                    onClick={() => handleSort("songsName")}
                  >
                    Title{" "}
                    {sortConfig.key === "songsName"
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </th>
                  <th
                    className="py-2 cursor-pointer"
                    onClick={() => handleSort("artistId")}
                  >
                    Artist{" "}
                    {sortConfig.key === "artistId"
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </th>
                  <th>Lyrics</th>
                  <th className="py-2">Link</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th> {/* Action column */}
                </tr>
              </thead>
              <tbody>
                {sortedSongsData.map((song, index) => (
                  <tr key={song._id} className="text-center">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{song.songsName}</td>
                    <td className="py-2">{getArtistName(song.artistId)}</td>
                    <td className="py-2">
                      {song.lirik.length > 20
                        ? song.lirik.slice(0, 20) + "..."
                        : song.lirik}
                    </td>
                    <td className="py-2">
                      <a
                        href={song.songsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {song.songsLink.length > 20
                          ? song.songsLink.slice(0, 20) + "..."
                          : song.songsLink}
                      </a>
                    </td>
                    <td className="py-2">
                      {song.status ? "Active" : "Inactive"}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleEdit(song.songId)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyHomePageAdmin;
