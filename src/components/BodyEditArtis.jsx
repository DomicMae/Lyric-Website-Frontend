import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../input.css";

const BodyEditArtis = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for artist search input
  const [artis, setArtis] = useState(""); // State for new artist name input
  const [loading, setLoading] = useState(false); // To show loading state
  const [message, setMessage] = useState(null); // To show success/error message
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [artistId, setArtistId] = useState(null); // State for selected artist's ID
  const [artists, setArtists] = useState([]); // State for storing fetched artists
  const navigate = useNavigate(); // React Router's useNavigate hook

  // Function to search for artists based on the search term
  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(
        "https://website-lirik-c51g.vercel.app/api/artists"
      );
      const data = await response.json();

      // Filter artists based on the search term
      const filteredArtists = data.data.filter((artist) =>
        artist.artistName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setArtists(filteredArtists); // Set the filtered artists to state
      if (filteredArtists.length > 0) {
        setMessage(`${filteredArtists.length} artis ditemukan.`);
      } else {
        setMessage("Tidak ada artis ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
      setMessage("Terjadi kesalahan saat mengambil data artis.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle selecting an artist
  const handleSelectArtist = (id, name) => {
    setArtistId(id); // Set the selected artist's ID
    setArtis(name); // Set the artist's name to be edited
  };

  // Function to handle form submission for updating the artist
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artistId) {
      setMessage("Silakan pilih artis terlebih dahulu.");
      return;
    }

    const artistData = {
      artistName: String(artis),
    };

    setLoading(true); // Set loading state

    try {
      const response = await fetch(
        `https://website-lirik-c51g.vercel.app/api/artists/${artistId}`, // Use PUT method to update artist
        {
          method: "PUT", // Change to PUT for updating
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(artistData), // Send form data as JSON
        }
      );

      // Check if response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Artist successfully updated:", data);

      // Show success message and modal
      setMessage("Artis berhasil diperbarui!");
      setShowModal(true); // Show the modal

      // Clear input field
      setArtis("");
      setArtistId(null); // Clear the artist ID
      setArtists([]); // Clear the list of artists
    } catch (error) {
      console.error("Error updating artist data:", error);
      setMessage("Terjadi kesalahan saat memperbarui artis.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to handle closing the modal and navigating to /admins
  const handleModalClose = () => {
    setShowModal(false); // Hide the modal
    navigate("/admins"); // Redirect to /admins
  };

  return (
    <div className="text-black flex flex-col items-center pt-5 pb-5">
      <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
        Edit Artis
      </h1>

      {/* Search Section */}
      <form className="mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama artis"
          className="w-64 h-14 px-4 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
          required
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 text-lg font-bold text-white bg-custom-blue-seas rounded-xl shadow-md hover:bg-blue-600"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Mencari..." : "Cari"}
        </button>
      </form>

      {/* Display Search Results */}
      {artists.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Hasil Pencarian:</h2>
          <ul className="list-disc pl-5">
            {artists.map((artist) => (
              <li
                key={artist.artistId}
                className="cursor-pointer"
                onClick={() =>
                  handleSelectArtist(artist.artistId, artist.artistName)
                }
              >
                {artist.artistName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Success/Error Message */}
      {message && !showModal && (
        <div
          className={`${
            message.includes("berhasil") ? "text-green-500" : "text-red-500"
          } pb-4`}
        >
          {message}
        </div>
      )}

      {/* Form Section for Editing Selected Artist */}
      {artistId && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Artist Name Input */}
          <div>
            <label className="block text-lg font-medium text-custom-black mb-2">
              Nama Artis Baru
            </label>
            <input
              type="text"
              value={artis}
              onChange={(e) => setArtis(e.target.value)}
              placeholder="Masukkan nama artis baru"
              className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 text-lg font-bold text-white bg-custom-blue-seas rounded-xl shadow-md hover:bg-blue-600"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Mengirim..." : "Perbarui Artis"}
            </button>
          </div>
        </form>
      )}

      {/* Modal Section */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              Artis berhasil diperbarui!
            </h2>
            <button
              onClick={handleModalClose} // Close modal and redirect
              className="px-6 py-2 text-lg font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyEditArtis;
